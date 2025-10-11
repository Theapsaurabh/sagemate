import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { User } from "../models/User";
import { Types } from "mongoose";
import { ChatSession } from "../models/chat";
import { GoogleGenAI } from "@google/genai";


const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyDmPD_Qc3HOxSwOIk2bqMpo7syXAVAjcHg",
});

// Enhanced helper function to clean and optimize AI responses
function optimizeTherapistResponse(rawResponse: string, analysis: any): string {
  let cleaned = rawResponse
    // Remove common AI verbose patterns
    .replace(/^(Okay, |Alright, |I understand, |That's completely understandable, |I hear you, |I appreciate you sharing that, |Thank you for sharing, )/gi, '')
    .replace(/(which is completely (normal|understandable|natural))\.?/gi, '')
    .replace(/(it's (completely|totally) (normal|understandable|natural)) to feel that way\.?/gi, '')
    .replace(/It sounds like you're (feeling|experiencing|dealing with)/gi, '')
    .replace(/Based on what you've shared,/gi, '')
    .replace(/Given our previous discussion,/gi, '')
    .trim()
    .replace(/^[a-z]/, (char) => char.toUpperCase());

  // Remove redundant therapist jargon
  cleaned = cleaned
    .replace(/Let me (offer|provide) some (thoughts|perspective|guidance)/gi, '')
    .replace(/As your therapist,/gi, '')
    .replace(/In my professional opinion,/gi, '');

  // Ensure response length is therapeutic (2-4 sentences max)
  const sentences = cleaned.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length > 4) {
    cleaned = sentences.slice(0, 3).join('. ') + '.';
  }

  // Add therapeutic punctuation for emphasis
  if (analysis.emotionalTone === 'anxious' || analysis.emotionalTone === 'negative') {
    cleaned = cleaned.replace(/([^.])$/, '$1.'); // Ensure it ends with period
  }

  return cleaned;
}

// Enhanced theme extraction with therapeutic categories
function extractThemes(messages: any[]): string[] {
  const themes = new Set<string>();
  
  if (!messages || !Array.isArray(messages)) {
    return [];
  }
  
  // Therapeutic theme categories
  const therapeuticThemes = {
    emotional: ['anxiety', 'depression', 'anger', 'fear', 'sadness', 'happiness', 'joy', 'frustration', 'overwhelm', 'calm'],
    relational: ['relationships', 'family', 'friends', 'loneliness', 'isolation', 'connection', 'conflict', 'communication'],
    life: ['work', 'career', 'purpose', 'goals', 'transition', 'change', 'identity', 'self-esteem', 'confidence'],
    clinical: ['trauma', 'grief', 'loss', 'stress', 'sleep', 'health', 'coping', 'triggers', 'healing'],
    practical: ['money', 'finance', 'daily routine', 'habits', 'self-care', 'boundaries', 'decision making']
  };
  
  messages.forEach(msg => {
    // Extract from message metadata if available
    if (msg.metadata?.analysis?.themes) {
      msg.metadata.analysis.themes.forEach((theme: string) => {
        if (theme && typeof theme === 'string') {
          themes.add(theme.toLowerCase().trim());
        }
      });
    }
    
    // Enhanced theme extraction from content
    if (msg.content && typeof msg.content === 'string') {
      const content = msg.content.toLowerCase();
      
      Object.values(therapeuticThemes).flat().forEach(theme => {
        if (content.includes(theme) || 
            content.includes(theme + 's') || 
            content.includes(theme + 'ing') ||
            content.includes(theme + 'ed')) {
          themes.add(theme);
        }
      });
    }
  });
  
  return Array.from(themes).slice(0, 8);
}

// Get all chat sessions for a user
export const getChatSessions = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.user.id);
    
    logger.info(`Fetching chat sessions for user: ${userId}`);
    
    const sessions = await ChatSession.find({ userId })
      .sort({ createdAt: -1 })
      .select('sessionId messages createdAt updatedAt status')
      .exec();

    logger.info(`Found ${sessions.length} chat sessions for user: ${userId}`);
    
    res.json(sessions.map(session => ({
      sessionId: session.sessionId,
      messages: session.messages,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      status: session.status
    })));
  } catch (error) {
    logger.error("Error fetching chat sessions:", error);
    res.status(500).json({ 
      message: "Error fetching chat sessions",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Create a new chat session
export const createChatSession = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const userId = new Types.ObjectId(req.user.id);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const sessionId = uuidv4();

    const session = new ChatSession({
      sessionId,
      userId,
      startTime: new Date(),
      status: "active",
      messages: [],
    });
    
    await session.save();
    
    logger.info(`Created new chat session: ${sessionId} for user: ${userId}`);
    
    res.status(201).json({
      message: "Chat session created successfully",
      sessionId: session.sessionId,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    });
  } catch (error) {
    logger.error("Error creating chat session:", error);
    res.status(500).json({
      message: "Error creating chat session",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Professional therapist system prompt
const THERAPIST_SYSTEM_PROMPT = `You are Dr. Maya, an experienced licensed clinical psychologist with 15 years of practice in cognitive-behavioral therapy, mindfulness-based approaches, and solution-focused therapy. You provide professional, empathetic, and clinically sound guidance.

**CORE THERAPEUTIC PRINCIPLES:**
- Practice active listening and reflective responses
- Use evidence-based techniques (CBT, DBT, mindfulness)
- Empower client autonomy and self-discovery
- Provide practical coping strategies
- Maintain professional boundaries while being warm
- Focus on client strengths and resources
- Help identify patterns and underlying needs

**COMMUNICATION STYLE:**
- Professional yet conversational
- Empathetic but not overly sentimental
- Specific and actionable insights
- Balanced validation with gentle challenge when helpful
- Uses therapeutic questions to promote insight
- Provides psychoeducation when relevant

**RESPONSE GUIDELINES:**
- Keep responses 2-4 sentences maximum
- Focus on one key therapeutic point per response
- Include at least one reflective element and one forward-looking element
- Use "you" language to maintain client focus
- Avoid jargon unless explaining it
- Balance validation with gentle guidance`;

// Enhanced prompt templates for different therapeutic contexts
const PROMPT_TEMPLATES = {
  emotionalExploration: `CLIENT STATEMENT: "{message}"

CONVERSATION CONTEXT: {history}

ANALYSIS: Client shows {emotionalTone} emotional tone, focusing on {primaryFocus}

THERAPEUTIC APPROACH:
1. Reflect and validate the emotional experience
2. Explore the meaning or impact
3. Offer perspective or coping strategy
4. Gently guide toward insight or action

RESPONSE (2-4 sentences, professional therapist tone):`,

  problemSolving: `CLIENT CHALLENGE: "{message}"

CONTEXT: {history}

CLINICAL FOCUS: Practical problem-solving with {responseStyle} approach

THERAPEUTIC STRATEGY:
- Identify the core concern
- Explore existing coping attempts
- Suggest 1-2 evidence-based techniques
- Empower client's agency

CONCISE PROFESSIONAL RESPONSE:`,

  crisisSupport: `CLIENT DISTRESS SIGNAL: "{message}"

URGENCY LEVEL: {emotionalTone}

IMMEDIATE THERAPEUTIC PRIORITIES:
1. Ensure emotional safety and validation
2. Provide grounding if needed
3. Offer concrete support options
4. Maintain therapeutic connection

SUPPORTIVE PROFESSIONAL RESPONSE (calm, reassuring, practical):`,

  general: `CLIENT: "{message}"

CONVERSATION FLOW: {history}

As a professional therapist, provide a clinically appropriate response that:
- Validates the client's experience
- Offers psychological insight
- Suggests constructive perspective
- Maintains therapeutic alliance

Response (natural, professional, 2-3 sentences):`
};

// Send message to chat session - UPDATED WITH PROFESSIONAL THERAPIST PROMPTS
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;
    const userId = new Types.ObjectId(req.user.id);

    console.log('=== SEND MESSAGE DEBUG ===');
    console.log('Session ID:', sessionId);
    console.log('User ID:', userId.toString());
    console.log('Message:', message);

    logger.info("Processing message:", { sessionId, message, userId });
    
    // Find or create session
    let session = await ChatSession.findOne({ sessionId });

    if (!session) {
      console.log('Session not found, creating new session...');
      session = new ChatSession({
        sessionId: sessionId,
        userId: userId,
        startTime: new Date(),
        status: "active",
        messages: [],
      });
      await session.save();
    }

    if (session && !session.userId) {
      console.log('Session found without user ID, assigning to current user...');
      session.userId = userId;
      await session.save();
    }

    console.log('Session ready for processing:', session.sessionId);
    
    // Enhanced clinical analysis
    const analysisPrompt = `As a clinical supervisor, analyze this therapy session moment.

Client statement: "${message}"
Session history: ${session.messages.length} messages, ${session.messages.length > 0 ? 'ongoing work' : 'initial engagement'}

Provide BRIEF clinical analysis in JSON:
{
  "emotionalTone": "calm|anxious|depressed|angry|mixed|neutral|positive",
  "primaryFocus": "emotional expression|problem description|relationship issue|self-reflection|crisis|practical concern",
  "clinicalUrgency": "low|medium|high",
  "therapeuticNeed": "validation|coping skills|problem-solving|insight development|crisis support",
  "suggestedApproach": "supportive listening|CBT techniques|mindfulness|solution-focused|grounding exercises"
}`;

    console.log('Sending clinical analysis request to Gemini...');
    const analysisResponse = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: analysisPrompt,
    });
    
    const analysisText = analysisResponse.text;
    console.log('Raw clinical analysis:', analysisText);
    
    let clinicalAnalysis;
    try {
      const cleanedText = analysisText?.replace(/```json\n?|\n?```/g, '').trim() || "{}";
      clinicalAnalysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.log('Failed to parse clinical analysis, using default:', parseError);
      clinicalAnalysis = {
        emotionalTone: "neutral",
        primaryFocus: "emotional expression",
        clinicalUrgency: "low",
        therapeuticNeed: "validation",
        suggestedApproach: "supportive listening"
      };
    }
    
    logger.info("Clinical analysis completed:", clinicalAnalysis);

    // SELECT APPROPRIATE THERAPEUTIC PROMPT BASED ON ANALYSIS
    let therapeuticPrompt;
    
    if (clinicalAnalysis.clinicalUrgency === "high") {
      therapeuticPrompt = PROMPT_TEMPLATES.crisisSupport
        .replace("{message}", message)
        .replace("{emotionalTone}", clinicalAnalysis.emotionalTone);
    } else if (clinicalAnalysis.therapeuticNeed.includes("problem-solving")) {
      therapeuticPrompt = PROMPT_TEMPLATES.problemSolving
        .replace("{message}", message)
        .replace("{history}", session.messages.slice(-2).map((msg: any) => `${msg.role}: ${msg.content}`).join(' | '))
        .replace("{responseStyle}", clinicalAnalysis.suggestedApproach);
    } else if (clinicalAnalysis.primaryFocus.includes("emotional")) {
      therapeuticPrompt = PROMPT_TEMPLATES.emotionalExploration
        .replace("{message}", message)
        .replace("{history}", session.messages.slice(-2).map((msg: any) => `${msg.role}: ${msg.content}`).join(' | '))
        .replace("{emotionalTone}", clinicalAnalysis.emotionalTone)
        .replace("{primaryFocus}", clinicalAnalysis.primaryFocus);
    } else {
      therapeuticPrompt = PROMPT_TEMPLATES.general
        .replace("{message}", message)
        .replace("{history}", session.messages.slice(-2).map((msg: any) => `${msg.role}: ${msg.content}`).join(' | '));
    }

    // FINAL PROFESSIONAL THERAPIST PROMPT
    const finalPrompt = `${THERAPIST_SYSTEM_PROMPT}

${therapeuticPrompt}

Remember: You are Dr. Maya, a licensed psychologist. Respond with clinical expertise, empathy, and professional insight.`;

    console.log('Sending final therapeutic prompt to Gemini...');
    const responseResult = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: finalPrompt,
    });
    
    let therapeuticResponse = responseResult.text || "I'm here to work with you on this. Could you tell me more about what you're experiencing?";

    // Apply professional optimization
    therapeuticResponse = optimizeTherapistResponse(therapeuticResponse, clinicalAnalysis);
    
    console.log('Generated professional response:', therapeuticResponse);
    
    // Update session with enhanced metadata
    const userMessage = {
      role: "user" as const,
      content: message,
      timestamp: new Date(),
      metadata: {
        clinicalAnalysis,
        themes: extractThemes([...session.messages, { content: message }]),
      },
    };

    const assistantMessage = {
      role: "assistant" as const,
      content: therapeuticResponse,
      timestamp: new Date(),
      metadata: {
        clinicalAnalysis,
        therapeuticApproach: clinicalAnalysis.suggestedApproach,
        focusArea: clinicalAnalysis.primaryFocus,
        responseStyle: "professional_therapist",
        themes: extractThemes([...session.messages, userMessage]),
      },
    };

    session.messages.push(userMessage);
    session.messages.push(assistantMessage);
    session.updatedAt = new Date();
    await session.save();
    
    logger.info("Therapeutic session updated:", { 
      sessionId, 
      messageCount: session.messages.length,
      therapeuticApproach: clinicalAnalysis.suggestedApproach
    });
    
    res.json({
      response: therapeuticResponse,
      message: therapeuticResponse,
      analysis: clinicalAnalysis,
      metadata: {
        therapeuticApproach: clinicalAnalysis.suggestedApproach,
        focusArea: clinicalAnalysis.primaryFocus,
        responseStyle: "professional_therapist",
      },
    });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    logger.error("Error in therapeutic message processing:", error);
    res.status(500).json({
      message: "Error processing therapeutic message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get session history
export const getSessionHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = new Types.ObjectId(req.user.id);

    logger.info(`Fetching session history for: ${sessionId}, user: ${userId}`);

    const session = await ChatSession.findOne({ 
      sessionId: sessionId,
      userId: userId 
    });

    if (!session) {
      logger.warn("Session not found for history:", { sessionId, userId });
      res.status(404).json({ message: "Session not found" });
      return;
    }

    res.json({
      messages: session.messages,
      startTime: session.startTime,
      status: session.status,
    });
    return;
  } catch (error) {
    logger.error("Error fetching session history:", error);
    res.status(500).json({ message: "Error fetching session history" });
    return;
  }
};

// Get specific chat session
export const getChatSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = new Types.ObjectId(req.user.id);
    
    logger.info(`Getting chat session: ${sessionId} for user: ${userId}`);
    
    const chatSession = await ChatSession.findOne({ 
      sessionId: sessionId,
      userId: userId 
    });
    
    if (!chatSession) {
      logger.warn(`Chat session not found: ${sessionId} for user: ${userId}`);
      res.status(404).json({ error: "Chat session not found" });
      return;
    }
    
    logger.info(`Found chat session: ${sessionId}`);
    res.json(chatSession);
    return;
  } catch (error) {
    logger.error("Failed to get chat session:", error);
    res.status(500).json({ error: "Failed to get chat session" });
    return;
  }
};

// Get chat history
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = new Types.ObjectId(req.user.id);

    console.log('=== GET CHAT HISTORY DEBUG ===');
    console.log('Session ID from params:', sessionId);
    console.log('User ID:', userId.toString());

    logger.info(`Fetching chat history for session: ${sessionId}, user: ${userId}`);

    let session = await ChatSession.findOne({ 
      sessionId: sessionId
    });

    if (!session) {
      console.log('Session not found, returning empty history');
      res.json([]);
      return;
    }

    console.log('Session found:', session.sessionId);
    res.json(session.messages || []);
    return;
  } catch (error) {
    console.error('Error in getChatHistory:', error);
    logger.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Error fetching chat history" });
    return;
  }
};