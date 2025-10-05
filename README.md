# Sagemate AI Therapist

Sagemate is an AI-powered therapist web application that provides mental health support, guidance, and conversational assistance. Built with modern technologies, it combines a smooth user interface with powerful backend services to deliver personalized therapy-like experiences.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)  
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables  
- **UI Components**: Shadcn UI  
- **Fonts**: Geist Sans & Geist Mono  
- **Icons**: Lucide React  
- **State Management**: React Hooks
- **Theme System**: next-themes

### Backend
- **Runtime**: Node.js  
- **Framework**: Next.js API Routes
- **Database**: MongoDB (planned)  
- **Auth**: NextAuth.js (planned)  

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Build Tool**: PostCSS

---

## ✨ Features

### ✅ Implemented
- **Responsive Header**: Fixed navigation with theme toggle and progress indicator
- **Theme System**: Complete light/dark mode with system preference detection
- **Landing Page**: Animated visuals with emotion states and ripple effects
- **UI Components**: Reusable Button and Ripple components
- **Authentication**: Sign In button with login routing
- **Global Design System**: CSS variables, utilities, and animations

### 🔄 Planned Features
- Interactive AI-based therapy chatbot  
- Personalized mental health suggestions  
- User authentication and sessions
- Therapy session history
- Mood tracking and analytics
- Persistent data storage with MongoDB  

---

## 📌 Development Progress

### Initial Release (Commit e1c3475)

#### ✅ Completed Features
- **Project Setup**: Next.js 14 with TypeScript, Tailwind, ESLint configuration
- **Responsive Header**: 
  - Fixed navigation with scroll-aware styles
  - Desktop and mobile menu support
  - Progress indicator on scroll
  - Theme toggle functionality
- **Theme System**:
  - Global light/dark theme providers
  - System preference detection
  - Smooth theme transitions
- **Landing Page**:
  - Animated ripple visual components
  - Emotion state scaffolding
  - Responsive design
- **UI Foundation**:
  - Reusable Button component with variants
  - Ripple visual effect component
  - Theme toggle component
  - Global design tokens and CSS variables

#### 🎨 Design System
- **Typography**: Geist Sans & Geist Mono fonts
- **Colors**: Complete light/dark theme with CSS variables
- **Animations**: Custom keyframes and transition utilities
- **Layout**: Responsive grid and flexbox systems
- **Components**: Shadcn UI based component library

#### 🔧 Technical Implementation
- **Configuration**: TypeScript paths, PostCSS with Tailwind, ESLint
- **State Management**: React hooks for theme and UI state
- **Performance**: Optimized fonts and component structure
- **Accessibility**: Focus management and semantic HTML

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x  
- npm >= 9.x  

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/sagemate.git
cd sagemate
```
Install dependencies:

```bash
npm install
```
Run the development server:

```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`


Building for Production
```bash
npm run build
npm start
```

---
🗂 **Project Structure**
text
```
sagemate/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and CSS variables
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Home page component
│   │   └── api/                 # API routes (future)
│   ├── components/
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── header.tsx           # Navigation header
│   │   └── provider.tsx         # Theme provider
│   ├── lib/                     # Utility functions
│   └── types/                   # TypeScript type definitions
├── public/                      # Static assets
├── tailwind.config.js           # Tailwind configuration
├── next.config.js               # Next.js configuration
└── package.json
```

🎨 UI/UX Features
---

**Modern Design:** Clean, accessible interface with glass morphism effects

**Responsive:** Mobile-first approach with seamless desktop experience

**Theme Support:** Full dark/light mode with system preference detection

**Smooth Animations:** CSS transitions, ripple effects, and micro-interactions

**Accessibility:** WCAG compliant with proper focus management

**Typography:** Optimized font loading with Geist font family



📈 Development Roadmap
---

**Phase 1**: Foundation ✅
- Project setup and configuration

- Design system implementation

- Core layout and navigation

- Theme system

**Phase 2**: Core Features (Current)
Emotion selection interface

- AI chat interface components

- Basic API route structure

- User authentication system

**Phase 3**: AI Integration
- OpenAI GPT-4 integration

- Chat session management

- Message persistence

- Therapy conversation flows

**Phase 4**: User System
- NextAuth.js authentication

- User profiles and history

- Session analytics and insights


🐛### Known Issues
---
Hydration warnings in development mode (being addressed)

Mobile📱 menu animations need refinement

Theme persistence across page reloads


🤝 Contributin
---
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.
---

⚖️ License
---
** This project is licensed under the MIT License - see the LICENSE file for details **.

🙏 Acknowledgments
---
- Next.js for the amazing React framework

- Tailwind CSS for the utility-first CSS

- Shadcn UI for the beautiful components

- Lucide for the elegant icons



🚀CodeRabbit🔥 for AI-powered🤖 code reviews
---

MIT License © 2025 
<div clasName="align-item: center ">
  Saurabh Pandey ❤️
  
</div>

