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

## 📌 Day-01 Progress

### ✅ Completed
- **Header Component**: Responsive navigation with dark/light theme toggle  
- **Layout Setup**: Root layout with meta tags and font configuration  
- **UI Foundation**: Tailwind CSS configuration with custom design system  
- **Component Structure**: Reusable UI components using Shadcn UI  

### 🐛 Issues Fixed
- React hydration errors in Header component  
- CSS variable configuration for dark/light themes  
- Font optimization with Geist Sans/Mono  

### 🔄 Next Steps
- Implement emotion selection interface  
- Build AI chat interface component  
- Set up API routes for AI integration  

---

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