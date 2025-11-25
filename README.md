# Duolingo Clone - Language Learning Web Application

A comprehensive, production-ready web application that faithfully replicates Duolingo's UI/UX and core features, built as a full-stack MERN application with TypeScript.

![Status](https://img.shields.io/badge/status-production%20ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Core Functionality
- **User Authentication** - Complete JWT-based auth system with secure signup/login
- **Interactive Lessons** - 7+ different question types for engaging learning
- **Spanish Course** - 15 skills across 8 units with 180+ questions
- **Progress Tracking** - XP, levels, streaks, and achievements
- **Gamification** - Hearts system, daily goals, leaderboards
- **Practice Mode** - Unlimited hearts, review completed lessons
- **Responsive Design** - Fully responsive on mobile, tablet, and desktop

### User Experience
- ✨ Smooth animations with Framer Motion
- 🎵 Dynamic sound effects (Web Audio API)
- 🎨 Pixel-perfect Duolingo design replication
- 🌈 Colorful, encouraging UI with celebrations
- ⚡ Fast and optimized performance
- ♿ Accessible keyboard navigation

### Technical Highlights
- **Modern Stack**: React 18, TypeScript, Node.js, MongoDB
- **Clean Architecture**: Modular, maintainable, production-ready code
- **State Management**: Context API with custom hooks
- **Real-time Feedback**: Immediate answer validation and XP updates
- **Global State**: Progress and course data managed centrally
- **Error Handling**: Comprehensive error handling throughout

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Question Types](#-question-types)
- [Screenshots](#-screenshots)
- [Known Issues](#-known-issues)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for auth
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

Verify installations:
\`\`\`bash
node --version  # Should show v18 or higher
npm --version   # Should show v9 or higher
mongo --version # Should show v6 or higher
\`\`\`

## 📦 Installation

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd duolingo-clone
\`\`\`

### 2. Install Dependencies

Install backend dependencies:
\`\`\`bash
cd server
npm install
\`\`\`

Install frontend dependencies:
\`\`\`bash
cd ../client
npm install
\`\`\`

### 3. Start MongoDB

**Windows:**
\`\`\`bash
mongod
\`\`\`

**Mac/Linux:**
\`\`\`bash
sudo systemctl start mongod
# or
brew services start mongodb-community
\`\`\`

**Docker:**
\`\`\`bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
\`\`\`

Verify MongoDB is running:
\`\`\`bash
mongosh
\`\`\`

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `server` directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/duolingo-clone

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173
\`\`\`

**Important**: Change `JWT_SECRET` to a secure random string in production!

### Frontend (.env)

Create a `.env` file in the `client` directory:

\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

## 🚀 Running the Application

### Option 1: Run Both Servers Simultaneously (Recommended)

Open two terminal windows:

**Terminal 1 - Backend:**
\`\`\`bash
cd server
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd client
npm run dev
\`\`\`

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Option 2: Run in Production Mode

**Backend:**
\`\`\`bash
cd server
npm run build
npm start
\`\`\`

**Frontend:**
\`\`\`bash
cd client
npm run build
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
duolingo-clone/
├── client/                    # Frontend React application
│   ├── public/
│   │   ├── sounds/           # Audio files (correct, incorrect, etc.)
│   │   └── images/           # Images (mascot, skills, vocabulary)
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Auth/         # Login, Signup, Onboarding
│   │   │   ├── Dashboard/    # Learning path, daily goal
│   │   │   ├── Lesson/       # Lesson system and question types
│   │   │   ├── Profile/      # User profile
│   │   │   ├── Leaderboard/  # Rankings
│   │   │   └── UI/           # Reusable UI components
│   │   ├── context/          # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ProgressContext.tsx
│   │   │   └── CourseContext.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   └── package.json
│
├── server/                    # Backend Node.js application
│   ├── src/
│   │   ├── config/           # Database and environment config
│   │   ├── controllers/      # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── course.controller.ts
│   │   │   ├── lesson.controller.ts
│   │   │   └── progress.controller.ts
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── User.model.ts
│   │   │   ├── Progress.model.ts
│   │   │   ├── Achievement.model.ts
│   │   │   └── Mistake.model.ts
│   │   ├── services/         # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── xp.service.ts
│   │   │   ├── level.service.ts
│   │   │   ├── streak.service.ts
│   │   │   ├── hearts.service.ts
│   │   │   └── achievement.service.ts
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   ├── data/             # Static data (course content)
│   │   │   ├── spanishCourseData.ts
│   │   │   └── achievementsData.ts
│   │   └── server.ts         # Server entry point
│   └── package.json
│
├── .env.example              # Environment variable templates
├── README.md                 # This file
└── PROGRESS.md              # Development progress tracker
\`\`\`

## 🌐 API Endpoints

### Authentication
\`\`\`
POST   /api/auth/signup        Create new user account
POST   /api/auth/login         Login existing user
GET    /api/auth/me            Get current user
POST   /api/auth/logout        Logout user
\`\`\`

### Course & Lessons
\`\`\`
GET    /api/courses/:language  Get course structure
GET    /api/lessons/:id        Get lesson by ID
POST   /api/lessons/:id/complete  Complete a lesson
\`\`\`

### Progress
\`\`\`
GET    /api/progress           Get user progress
POST   /api/progress/update-xp Update XP
POST   /api/progress/update-hearts  Update hearts
POST   /api/progress/refill-hearts  Refill hearts
\`\`\`

### Leaderboard
\`\`\`
GET    /api/leaderboard?type=weekly  Get leaderboard
GET    /api/achievements              Get achievements
\`\`\`

## 🎯 Question Types

The application includes 7 interactive question types:

1. **Translation** - Type the translation of given text
2. **Multiple Choice (Text)** - Select correct answer from options
3. **Multiple Choice (Image)** - Select image matching the word
4. **Listen and Type** - Type what you hear (audio playback)
5. **Fill in Blank** - Complete sentence with missing word
6. **Sentence Builder** - Construct sentence from word bank
7. **Match Pairs** - Connect related English/Spanish words

Each question type provides immediate feedback with sound effects and animations.

## 📸 Screenshots

### Dashboard
The main learning path showing skills, daily goals, and progress.

### Lesson Interface
Interactive questions with hearts, progress bar, and XP tracking.

### Lesson Complete
Celebration screen with XP earned, accuracy, and achievements.

### Profile
User stats, achievements, streak, and level information.

### Leaderboard
Weekly and all-time rankings with user position highlighted.

## ⚠️ Known Issues

- **Sound Effects**: Currently using Web Audio API generated sounds. For production, replace with professional audio files in `client/public/sounds/`
- **Images**: Placeholder emojis used. Add professional images to `client/public/images/` for production
- **Streak Timer**: Daily streak resets at midnight UTC. Consider adding timezone support
- **Mobile Safari**: Audio playback may require user interaction on first load

## 🚀 Future Enhancements

### Features
- [ ] Multiple language courses (French, German, etc.)
- [ ] Speaking questions with speech recognition
- [ ] Stories feature for immersive reading
- [ ] Friend system and social features
- [ ] Streak freeze and power-ups
- [ ] In-depth statistics and analytics
- [ ] Push notifications for streak reminders
- [ ] Offline mode support

### Technical
- [ ] Unit and integration tests
- [ ] End-to-end testing with Cypress
- [ ] Performance optimization
- [ ] Server-side rendering (SSR)
- [ ] Progressive Web App (PWA)
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes deployment

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 📝 License

This project is created for educational purposes as part of a job application assignment.

## 🙏 Acknowledgments

- Duolingo for the original design inspiration
- The open-source community for amazing libraries
- All contributors and testers

---

## 💡 Quick Start Guide

1. Ensure MongoDB is running
2. Start backend: `cd server && npm run dev`
3. Start frontend: `cd client && npm run dev`
4. Open http://localhost:5173
5. Sign up for a new account
6. Start learning Spanish!

For issues or questions, please open an issue on GitHub.

**Happy Learning! 📚🎉**
