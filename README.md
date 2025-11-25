# Duolingo Clone - Spanish Learning Web Application

A full-stack web application that replicates Duolingo's UI/UX and core features for learning Spanish, built with React, TypeScript, Node.js, and MongoDB.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

### Core Functionality
- **User Authentication** - JWT-based auth system with signup/login
- **Interactive Lessons** - 7+ different question types (translation, multiple choice, listening, etc.)
- **Spanish Course** - Multiple skills with comprehensive lessons
- **Progress Tracking** - XP points, user levels, daily streaks
- **Gamification** - Hearts/lives system, daily goals, leaderboards
- **Practice Mode** - Review completed lessons
- **Responsive Design** - Works on mobile, tablet, and desktop

### User Experience
- ✨ Smooth animations with Framer Motion
- 🎵 Sound effects for correct/incorrect answers
- 🎨 Duolingo-inspired design and color scheme
- 🌈 Colorful, engaging UI with celebration effects
- ⚡ Fast performance with Vite

### Technical Highlights
- **Modern Stack**: React 18, TypeScript, Node.js, MongoDB
- **Clean Architecture**: Modular component structure
- **State Management**: Context API with custom hooks
- **RESTful API**: Express.js backend with proper routing
- **Type Safety**: Full TypeScript implementation

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Question Types](#-question-types)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Known Issues](#-known-issues)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.2.0 | UI library with modern hooks |
| **TypeScript** | ^5.3.2 | Type-safe development |
| **Vite** | ^5.0.0 | Lightning-fast build tool and dev server |
| **Tailwind CSS** | ^3.3.5 | Utility-first CSS framework |
| **Framer Motion** | ^10.16.0 | Smooth animations and transitions |
| **React Router** | ^6.20.0 | Client-side routing |
| **Axios** | ^1.6.0 | HTTP client for API requests |
| **React Hot Toast** | ^2.4.1 | Toast notifications |
| **Lucide React** | ^0.294.0 | Beautiful SVG icons |
| **React Confetti** | ^6.1.0 | Celebration effects |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v18+ | JavaScript runtime environment |
| **Express.js** | ^4.18.2 | Web application framework |
| **TypeScript** | ^5.3.2 | Type-safe backend development |
| **MongoDB** | v6+ | NoSQL database |
| **Mongoose** | ^8.0.0 | MongoDB ODM for data modeling |
| **JWT** | ^9.0.2 | JSON Web Tokens for authentication |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **express-validator** | ^7.0.1 | Input validation middleware |
| **Helmet** | ^7.1.0 | Security headers |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **express-rate-limit** | ^7.1.5 | Rate limiting middleware |

### Development Tools
- **ts-node-dev** - TypeScript development with hot reload
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

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

## 📜 Available Scripts

### Backend (server/)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload (ts-node-dev) |
| `npm run build` | Compile TypeScript to JavaScript (outputs to dist/) |
| `npm start` | Run production build from dist/ |
| `npm run clean-db` | Clean/reset the database |

### Frontend (client/)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server (http://localhost:5173) |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |

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

## 🏗️ Architecture

### Application Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         Client (React)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Components: Auth, Dashboard, Lesson, Profile, etc.    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Context API: Auth, Progress, Course State Management  │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Services: API calls, Axios interceptors              │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTP/REST API
┌──────────────────────┴───────────────────────────────────────┐
│                      Server (Express)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Routes: auth, course, lesson, progress, leaderboard  │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Controllers: Handle requests and responses            │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Services: Business logic (XP, streaks, levels)        │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Models: Mongoose schemas (User, Progress, etc.)       │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬───────────────────────────────────────┘
                       │ Mongoose ODM
┌──────────────────────┴───────────────────────────────────────┐
│                      MongoDB Database                         │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │   Users    │  │  Progress  │  │  Achievements        │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Key Design Patterns
- **MVC Pattern**: Models, Controllers, and Views separation
- **Service Layer**: Business logic separated from controllers
- **Repository Pattern**: Mongoose models abstract database operations
- **Context API**: Global state management on the frontend
- **Custom Hooks**: Reusable stateful logic
- **Composition**: Small, reusable React components

## ⚠️ Known Issues

- **Sound Effects**: Currently using Web Audio API generated sounds
- **Images**: Placeholder emojis and icons used for vocabulary items
- **Streak Timer**: Daily streak resets at midnight UTC (no timezone support yet)
- **Mobile Safari**: Audio playback may require user interaction on first load

## 🐛 Troubleshooting

### MongoDB Connection Issues
**Problem**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions**:
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB (Windows)
mongod

# Start MongoDB (Mac/Linux)
sudo systemctl start mongod
# or
brew services start mongodb-community

# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"
```

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find and kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Find and kill process on port 5000 (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

### CORS Errors
**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: Ensure the backend `.env` file has the correct `CORS_ORIGIN`:
```env
CORS_ORIGIN=http://localhost:5173
```

### TypeScript Compilation Errors
**Problem**: TypeScript errors after installing dependencies

**Solutions**:
```bash
# Clean and reinstall dependencies
cd client
rm -rf node_modules package-lock.json
npm install

cd ../server
rm -rf node_modules package-lock.json
npm install
```

### Frontend Build Errors
**Problem**: Vite build fails

**Solutions**:
```bash
# Clear Vite cache
cd client
rm -rf node_modules/.vite
npm run dev
```

### Environment Variables Not Loading
**Problem**: Application can't connect to database or API

**Solution**: Ensure `.env` files exist in both `client` and `server` directories with correct values:
- `server/.env` - Backend configuration
- `client/.env` - Frontend configuration

## 🚀 Deployment

### Building for Production

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

### Deployment Options

**Backend** - Deploy to platforms like Heroku, Railway, Render, or any Node.js hosting
**Frontend** - Deploy to Vercel, Netlify, or any static hosting service

### Production Environment Variables

**Backend (.env):**
```env
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secure-random-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🔮 Future Enhancements

### Potential Features
- [ ] Additional language courses (French, German, etc.)
- [ ] More question types (speaking with speech recognition)
- [ ] Streak freeze and power-ups
- [ ] Enhanced statistics and analytics
- [ ] Dark mode theme
- [ ] Friend system for competitive learning

### Technical Improvements
- [ ] Unit and integration tests
- [ ] End-to-end testing
- [ ] Performance optimization (code splitting, lazy loading)
- [ ] Progressive Web App (PWA) features
- [ ] Docker containerization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/duolingo-clone.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes and commit**
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Code Style Guidelines
- Use TypeScript for all new files
- Follow existing code formatting
- Write meaningful commit messages
- Add comments for complex logic


## 📝 License

This project is created for educational purposes. Feel free to use it as a learning resource.

**Note**: Duolingo is a registered trademark. This project is not affiliated with, endorsed by, or connected to Duolingo.

## 👥 Authors

Created with dedication and attention to detail for educational purposes.

## 🙏 Acknowledgments

- **Duolingo** - For the original design inspiration
- **Open Source Community** - For the amazing libraries and tools used in this project



---

## 💡 Quick Start Guide

1. **Ensure MongoDB is running**
   ```bash
   mongosh  # Should connect successfully
   ```

2. **Start the backend**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Sign up for a new account
   - Start learning Spanish!

---

<div align="center">

**Made with ❤️ using React, Node.js, and MongoDB**

**Happy Learning! 📚🎉**


</div>
