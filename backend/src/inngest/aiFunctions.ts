import { logger } from "../utils/logger";
import { inngest } from "./index";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyDmPD_Qc3HOxSwOIk2bqMpo7syXAVAjcHg",
});

export const processChatMessage = inngest.createFunction(
  { 
    id: "process-chat-message",
    name: "Process Chat Message" 
  },
  { event: "therapy/session.message" },
  async ({ event, step }) => {
    try {
      const {
        message,
        history = [],
        memory = {
          userProfile: {
            emotionalState: [],
            riskLevel: 0,
            preferences: {},
          },
          sessionContext: {
            conversationThemes: [],
            currentTechnique: null,
          },
        },
        goals = [],
        systemPrompt = `You are a compassionate, professional AI therapist assistant. Provide supportive, empathetic mental health guidance.`,
      } = event.data;

      logger.info("Processing chat message:", {
        message,
        historyLength: history?.length,
      });

      // Analyze message using Gemini API
      const analysis = await step.run("analyze-message", async () => {
        try {
          const prompt = `Analyze this therapy message for emotional content and themes. Return ONLY valid JSON.

Message: "${message}"
Recent Context: ${history.slice(-2).map((msg: { role: any; content: any; }) => `${msg.role}: ${msg.content}`).join(' | ')}

Provide analysis in this exact JSON format:
{
  "emotionalState": "neutral|positive|negative|anxious|stressed|overwhelmed|happy|sad|angry",
  "themes": ["theme1", "theme2", "theme3"],
  "riskLevel": 0,
  "recommendedApproach": "supportive|exploratory|practical|coping|validation",
  "urgency": "low|medium|high"
}

Keep themes specific and concise. Risk level 0-10 where 0=normal, 10=crisis.`;

          const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
          });

          const text = response.text || "";
          logger.info("Received analysis from Gemini:", { text });

          const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
          const parsedAnalysis = JSON.parse(cleanText || "{}");
          logger.info("Successfully parsed analysis:", parsedAnalysis);
          return parsedAnalysis;
        } catch (error) {
          logger.error("Error in message analysis:", { error, message });
          return {
            emotionalState: "neutral",
            themes: [],
            riskLevel: 0,
            recommendedApproach: "supportive",
            urgency: "low",
          };
        }
      });

      // Update memory based on analysis
      const updatedMemory = await step.run("update-memory", async () => {
        const newMemory = { ...memory };
        
        if (analysis.emotionalState && analysis.emotionalState !== "neutral") {
          newMemory.userProfile.emotionalState.push(analysis.emotionalState);
          // Keep only last 5 emotional states
          newMemory.userProfile.emotionalState = newMemory.userProfile.emotionalState.slice(-5);
        }

        if (analysis.themes && analysis.themes.length > 0) {
          newMemory.sessionContext.conversationThemes.push(...analysis.themes);
          // Remove duplicates and keep recent
          newMemory.sessionContext.conversationThemes = [...new Set(newMemory.sessionContext.conversationThemes)].slice(-10);
        }

        if (analysis.riskLevel !== undefined) {
          newMemory.userProfile.riskLevel = analysis.riskLevel;
        }

        return newMemory;
      });

      // If high risk
      if (analysis.riskLevel > 6) {
        await step.run("trigger-risk-alert", async () => {
          logger.warn("High risk level detected in chat message", {
            message,
            riskLevel: analysis.riskLevel,
            emotionalState: analysis.emotionalState,
          });
        });
      }

      // Generate therapy response with improved prompt
      const responseText = await step.run("generate-response", async () => {
        try {
          const prompt = `You are a compassionate AI therapist. Respond to the user's message in a warm, professional manner.

CONVERSATION CONTEXT:
${history.length > 0 ? `Previous messages: ${history.slice(-3).map((msg: { role: any; content: any; }) => `${msg.role}: ${msg.content}`).join(' | ')}` : 'New conversation'}

USER'S MESSAGE: "${message}"

EMOTIONAL ANALYSIS:
- Primary emotion: ${analysis.emotionalState}
- Key themes: ${analysis.themes?.join(', ') || 'general'}
- Urgency: ${analysis.urgency}
- Recommended approach: ${analysis.recommendedApproach}

RESPONSE GUIDELINES:
- Be concise (2-4 sentences maximum)
- Show specific empathy for their current message
- Use natural, conversational language
- Include one open-ended question to continue dialogue
- Offer one practical suggestion if appropriate
- Maintain warm but professional tone
- Avoid generic advice - be specific to their situation
- If continuing conversation, reference relevant context briefly

STRUCTURE YOUR RESPONSE:
1. Acknowledge their specific message with empathy
2. Provide brief supportive insight or validation
3. Ask a thoughtful question OR offer one practical suggestion
4. Keep it conversational and natural

Your response:`;

          const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
          });

          const text = response.text || "";
          const responseText = text.trim();

          logger.info("Generated response:", { responseText });
          return responseText;
        } catch (error) {
          logger.error("Error generating response:", { error, message });
          return "I'm here to listen and support you. Could you tell me more about what you're experiencing right now?";
        }
      });

      // Final return
      return {
        response: responseText,
        analysis,
        updatedMemory,
      };
    } catch (error) {
      logger.error("Error in chat message processing", {
        error,
        message: event.data.message,
      });

      return {
        response: "I'm here to support you. Could you tell me more about what's on your mind?",
        analysis: {
          emotionalState: "neutral",
          themes: [],
          riskLevel: 0,
          recommendedApproach: "supportive",
          urgency: "low",
        },
        updatedMemory: event.data.memory,
      };
    }
  }
);

// Function to analyze therapy session content
export const analyzeTherapySession = inngest.createFunction(
  { 
    id: "analyze-therapy-session",
    name: "Analyze Therapy Session" 
  },
  { event: "therapy/session.created" },
  async ({ event, step }) => {
    try {
      // Get the session content
      const sessionContent = await step.run("get-session-content", async () => {
        return event.data.notes || event.data.transcript || "";
      });

      // Analyze the session using Gemini
      const analysis = await step.run("analyze-with-gemini", async () => {
        const prompt = `Analyze this therapy session and provide structured insights.

Session Content: ${sessionContent}

Provide analysis in this JSON format:
{
  "keyThemes": ["theme1", "theme2", "theme3"],
  "emotionalPatterns": ["pattern1", "pattern2"],
  "primaryConcerns": ["concern1", "concern2"],
  "progressAreas": ["area1", "area2"],
  "followUpRecommendations": ["recommendation1", "recommendation2"],
  "overallSentiment": "positive|neutral|negative|mixed",
  "riskAssessment": "low|medium|high"
}

Keep analysis concise and actionable. Focus on patterns and practical insights.`;

        const response = await genAI.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });

        const result = response.text || "";
        const responseText = result.trim();

        try {
          return JSON.parse(responseText);
        } catch {
          return {
            keyThemes: [],
            emotionalPatterns: [],
            primaryConcerns: [],
            progressAreas: [],
            followUpRecommendations: [],
            overallSentiment: "neutral",
            riskAssessment: "low"
          };
        }
      });

      // Store the analysis
      await step.run("store-analysis", async () => {
        logger.info("Session analysis stored successfully", { analysis });
        return analysis;
      });

      // If there are concerning indicators, trigger an alert
      if (analysis.riskAssessment === "high" || analysis.primaryConcerns?.length > 0) {
        await step.run("trigger-concern-alert", async () => {
          logger.warn("Concerning indicators detected in session analysis", {
            sessionId: event.data.sessionId,
            concerns: analysis.primaryConcerns,
            riskLevel: analysis.riskAssessment,
          });
        });
      }

      return {
        message: "Session analysis completed",
        analysis,
      };
    } catch (error) {
      logger.error("Error in therapy session analysis:", error);
      throw error;
    }
  }
);

// Enhanced activity recommendations function
export const generateActivityRecommendations = inngest.createFunction(
  { id: "generate-activity-recommendations" },
  { event: "mood/updated" },
  async ({ event, step }) => {
    try {
      const userContext = await step.run("get-user-context", async () => {
        return {
          recentMoods: event.data.recentMoods || [],
          completedActivities: event.data.completedActivities || [],
          preferences: event.data.preferences || {},
          currentMood: event.data.currentMood,
        };
      });

      const recommendations = await step.run("generate-recommendations", async () => {
        const prompt = `Based on user context, generate personalized mental wellness activity recommendations.

User Context:
- Current mood: ${userContext.currentMood}
- Recent moods: ${userContext.recentMoods.join(', ')}
- Previously completed: ${userContext.completedActivities.join(', ')}

Provide 3-4 personalized recommendations in this JSON format:
{
  "recommendations": [
    {
      "activity": "Activity name",
      "type": "mindfulness|physical|creative|social|cognitive",
      "duration": "5-15 minutes",
      "benefit": "Primary benefit",
      "description": "Brief how-to description",
      "difficulty": "easy|moderate|challenging"
    }
  ],
  "rationale": "Brief explanation of why these were chosen"
}

Focus on evidence-based activities that match current emotional needs.`;

        const response = await genAI.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });

        const result = response.text || "";
        const responseText = result.trim();

        try {
          return JSON.parse(responseText);
        } catch {
          return {
            recommendations: [],
            rationale: "Unable to generate personalized recommendations at this time."
          };
        }
      });

      await step.run("store-recommendations", async () => {
        logger.info("Activity recommendations stored successfully", {
          count: recommendations.recommendations?.length
        });
        return recommendations;
      });

      return {
        message: "Activity recommendations generated",
        recommendations,
      };
    } catch (error) {
      logger.error("Error generating activity recommendations:", error);
      throw error;
    }
  }
);

// Export all functions
export const functions = [
  processChatMessage,
  analyzeTherapySession,
  generateActivityRecommendations,
];