# Sagemate AI Therapist

Sagemate is an AI-powered therapist web application that provides mental health support, guidance, and conversational assistance. Built with modern technologies, it combines a smooth user interface with powerful backend services to deliver personalized therapy-like experiences.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)  
- **Styling**: Tailwind CSS + CSS Variables  
- **UI Components**: Shadcn UI  
- **Fonts**: Geist Sans & Geist Mono  
- **Icons**: Lucide React  

### Backend
- **Runtime**: Node.js  
- **Framework**: Next.js API Routes / Express.js (planned)  
- **Database**: MongoDB (planned)  
- **Auth**: NextAuth.js (planned)  

### AI
- **AI Service**: OpenAI GPT-4 (planned)

---

## ✨ Features

- Interactive AI-based therapy chatbot  
- Personalized mental health suggestions  
- Responsive and modern UI using Tailwind CSS  
- Reusable UI components via Shadcn UI  
- Persistent data storage with MongoDB  

---
### 📋 Daily Progress Report - Sagemate AI Therapist
---

### 📅 Date: October 4, 2025
**🎯 Today's Focus**
Complete project foundation setup and initial UI components implementation.

✅ Completed Tasks
1. Project Foundation & Setup
Next.js 14 Project Initialization with TypeScript configuration

Tailwind CSS Integration with custom design system

Shadcn UI Components setup and configuration

Project Structure establishment with proper folder organization

2. Core Layout & Navigation
Root Layout Implementation with meta tags and font configuration

Responsive Header Component with navigation menu

Dark/Light Theme System using next-themes

Theme Toggle Component for user preference switching

3. UI Components Development
Reusable Button Component with multiple variants and sizes

Ripple Visual Effect Component for interactive backgrounds

Header Navigation with mobile-responsive menu

Authentication UI Components (SignInButton)

4. Design System Implementation
CSS Variables Configuration for consistent theming

Color System Setup with light and dark mode support

Typography System using Geist Sans & Geist Mono fonts

Component Styling with Tailwind CSS utilities

5. Home Page Structure
Basic Landing Page Layout with hero section

Initial Emotion State Scaffolding for future implementation

Responsive Design for mobile and desktop devices

Animation Foundation setup with CSS transitions

🛠 Technical Implementation
Configuration Files
Next.js Config with proper settings

Tailwind Config with custom design tokens

TypeScript Config with path aliases

ESLint Configuration for code quality

PostCSS Setup for CSS processing

Component Architecture
Layout Components for consistent page structure

UI Primitives for reusable elements

Provider Components for theme management

Utility Functions for common operations

**🎨 Design System Features**
Color Palette
Light Theme: Clean, accessible colors with proper contrast

Dark Theme: Comfortable dark mode with reduced eye strain

Primary Colors: Brand-consistent primary and secondary colors

Semantic Colors: Meaningful color usage throughout the app

**Typography**
- Font System: Geist Sans for body, Geist Mono for code

- Text Hierarchy: Clear heading and paragraph styles

- Readability: Optimized font sizes and line heights

- Responsive Text: Scalable typography across devices

**Components**
- Consistent Styling: Unified design language

- Interactive States: Hover, focus, and active states

- Accessibility: WCAG compliant components

Responsive Behavior: Mobile-first approach

### 🔧 Issues Fixed
**Technical Issues**
- React Hydration Errors in Header component

- CSS Variable Configuration for theme switching

- Font Optimization and loading performance

**Component Re-rendering issues**

**UI/UX Issues**
- Theme Persistence across page reloads

- Mobile Menu functionality and animations

- Color Contrast in both light and dark modes

- Component Consistency across the application

**📱 Responsive Design**
- Breakpoints Implemented
- Mobile: < 768px (sm)

- Tablet: 768px - 1024px (md)

- Desktop: > 1024px (lg)

### Responsive Features
- Flexible Navigation that adapts to screen size

- Scalable Typography that maintains readability

- Adaptive Layouts that reorganize content

- Touch-Friendly interactive elements

### 🚀 Features Implemented
**Core Features**
- Theme System - Complete light/dark mode support

- Responsive Navigation - Mobile-friendly header

- Reusable Components - Consistent UI elements

- Layout Foundation - Scalable page structure

**UI Components**
- Header with logo, navigation, and theme toggle

- Buttons with multiple variants and states

- Cards for content containers

- Input Fields for form elements

- cons from Lucide React library


---
### 📅 Date: October 5, 2025
**🎯 Today's Focus**
Enhanced the user interface and experience of the Sagemate AI Therapist application with dynamic theming and improved visual design.

**✅ Completed Tasks**
1. Dynamic Emotion-Based Background System
**Implemented real-time background gradient transitions based on user's emotional state**

**Added emotion-specific color themes for each emotional state**:

- 😢 Sad: Blue-themed gradients

- 😔 Low: Slate/gray-themed gradients

- 😐 Neutral: Gray/slate-themed gradients

- 🙂 Good: Green/emerald-themed gradients

- 😄 Great: Amber/orange-themed gradients

Smooth transition animations with 1000ms duration for seamless user experience

2. **Enhanced Homepage UI/UX**
Improved visual hierarchy with better typography and spacing

- Refined emotion selection cards with solid backgrounds for better light mode visibility

- Enhanced slider component with dynamic gradient effects

- Better contrast management for both light and dark modes

- Professional CTA button with multiple color variations

3. **Login Page Redesign**
Complete UI overhaul while maintaining authentication logic

Added password visibility toggle for better UX

Improved form validation and error states

Enhanced visual elements with animated backgrounds and icons

Better responsive design across all device sizes

4. **Features Section Implementation**
Added comprehensive features showcase with animated cards

- Included key mental health features:

- 24/7 Support (HeartPulse icon)

- Smart Insights (Lightbulb icon)

- Private & Secure (Lock icon)

- Evidence-Based (MessageSquareHeart icon)

- Smooth scroll animations using Framer Motion

🛠 Technical Improvements
**Frontend Enhancements**
- Dynamic CSS classes for real-time theme switching

- Framer Motion animations for smooth page transitions

- Improved component structure with better reusability

- Enhanced color system with theme-aware styling

**UI/UX Refinements**
- Consistent design language across all components

- Better accessibility with proper contrast ratios

- Mobile-first responsive design

- Professional visual effects (backdrop blur, gradients, shadows)

**Code Quality**
- Maintained existing logic while improving visuals

- Clean component architecture

- TypeScript implementation for better type safety

- Consistent naming conventions

🎨 **Design System Updates**
- Color Palette Enhancements
- Emotion-based dynamic theming

- Improved light/dark mode compatibility

- Consistent primary/secondary color usage

**Typography**
- Better font hierarchy with appropriate weights

- Improved readability across all screen sizes

- Consistent text contrast in both themes

Interactive Elements
- Enhanced button states (hover, active, disabled)

- Smooth micro-interactions

- Visual feedback for all user actions

🚀 Features Added/Enhanced
✅ **New Features**
- Dynamic background theming based on emotional state

- Password visibility toggle in login form

- Professional features showcase section

- Enhanced loading states with spinners

🔄 **Improved Features**
- Emotion selection interface with better visual feedback

- Login form UX with improved validation

- Responsive design across all components

- Animation performance and smoothness

📱 **Responsive Design**
- Breakpoint Optimization
- Mobile: < 768px

- Tablet: 768px - 1024px

- Desktop: > 1024px

- Component Adaptability
- Flexible grid systems

**Scalable typography**

- Adaptive spacing

- Mobile-friendly interactions

🐛 Issues Resolved
**Visual Issues**
- ✅ Fixed light mode contrast problems

- ✅ Improved text readability in both themes

- ✅ Enhanced border visibility in light mode

- ✅ Better backdrop blur handling

**Functional Issues**
- ✅ Maintained all existing authentication logic

- ✅ Preserved emotion selection functionality

- ✅ Ensured smooth state transitions

- ✅ Fixed responsive layout issues

📈 **User Experience Improvements**
- Emotional Design
- Therapeutic color psychology implementation

- Calming visual transitions

- Intuitive emotion mapping

- Supportive visual language

**Interaction Design**
- Predictable user flows

- Clear visual feedback

- Accessible interface elements

- Consistent navigation patterns







## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x  
- npm >= 9.x  
- MongoDB (local or cloud)  

### Installation
1. Clone the repository:

```bash
git clone https://github.com/yourusername/sagemate.git
cd sagemate

Install dependencies:

npm install


Configure environment variables:

Create a .env file in the root:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000/api


Run the development server:

npm run dev


Open http://localhost:3000
 in your browser to view the app.

🗂 Project Structure
sagemate/
├─ src/
│  ├─ app/
│  │  ├─ globals.css
│  │  └─ components/
│  ├─ server/
│  ├─ db/
│  └─ utils/
├─ .env
├─ package.json
└─ README.md

📈 Future Work

Implement AI chatbot functionality

Add user authentication (JWT + cookies)

Build therapy session logging

Enhance UI components with Shadcn UI

Integrate analytics for user interactions

🤝 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

⚖️ License

MIT License © 2025 Saurabh Pandey