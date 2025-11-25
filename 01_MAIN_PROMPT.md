# Duolingo Clone - Complete Development Prompt for Claude Code CLI

## PROJECT OVERVIEW

Build a comprehensive, production-ready web application that EXACTLY replicates Duolingo's UI/UX and core features for a job application assignment. This must match Duolingo's design system, animations, and user experience as closely as possible while demonstrating excellent code quality, modular architecture, and production readiness.

### What You're Building

A full-stack language learning web application that is a faithful replica of Duolingo's mobile/web app, featuring:
- Duolingo's exact visual design and color scheme
- Multiple interactive lesson types matching Duolingo's question formats
- Progress tracking system (XP, levels, streaks, hearts)
- Learning path with skill tree
- Gamification elements (leaderboard, achievements, daily goals)
- User authentication and profiles
- Smooth animations and micro-interactions matching Duolingo

---

## TECHNICAL STACK (MANDATORY)

- **Frontend**: React 18+ with TypeScript
- **Backend**: Node.js with Express and TypeScript
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS + Custom CSS for Duolingo-specific styles
- **Animations**: Framer Motion (for smooth, bouncy animations)
- **Icons**: Lucide React or Heroicons
- **Fonts**: Nunito or DM Sans (Google Fonts)
- **State Management**: Context API + Custom Hooks
- **Audio**: HTML5 Audio API for sound effects
- **Authentication**: JWT-based

---

## CRITICAL SUCCESS FACTORS

This project MUST include:
✅ Duolingo's exact color scheme (bright green #58CC02, blue #1CB0F6, etc.)
✅ Typography (rounded, friendly fonts like Nunito)
✅ Learning path visualization (vertical skill tree with circular nodes)
✅ Lesson interface and question layouts matching Duolingo
✅ Character mascot (Duo the owl or similar friendly character)
✅ Animation style (bouncy, playful, encouraging)
✅ Sound effects for correct/incorrect answers
✅ Celebration screens and confetti
✅ Hearts system visual design
✅ Streak flame icon and display
✅ XP progress bar style
✅ Button styles (rounded, with shadows)
✅ Multiple interactive lesson/question types (8+ types)
✅ Progress tracking system (XP, levels, streaks)
✅ Course structure (multiple lessons organized into skills)
✅ User authentication and profiles
✅ Leaderboard system
✅ Hearts/lives system
✅ Streak tracking (daily practice)
✅ Achievement/badge system
✅ Responsive, colorful, engaging UI
✅ Smooth animations and transitions
✅ Production-ready code quality

---

## CORE FEATURES TO IMPLEMENT

### 1. USER AUTHENTICATION & ONBOARDING

**Sign Up Flow (Multi-Step):**

**Step 1: Welcome Screen**
- Large Duo character illustration
- "The free, fun, and effective way to learn Spanish!"
- "Get Started" button (green)
- "I Already Have an Account" link

**Step 2: Age Verification**
- "How old are you?"
- Simple age selector
- Continue button

**Step 3: Learning Goal**
- "Why are you learning Spanish?"
- Options with icons:
  - 🎓 For school
  - 💼 For work
  - ✈️ For travel
  - 🧠 Brain training
  - 👥 Culture & family
  - 💬 Other

**Step 4: Daily Goal**
- "How much time can you dedicate?"
- Options with cute illustrations:
  - Casual (5 min/day)
  - Regular (10 min/day)
  - Serious (15 min/day)
  - Intense (20 min/day)

**Step 5: Create Account**
- Email input
- Username input
- Password input
- "Continue" button
- "By continuing, you agree to..." text

**Step 6: Placement Test (Optional)**
- "Do you have any experience with Spanish?"
- "Yes, test my level" button
- "No, start from scratch" button

**After Signup:**
- Welcome confetti animation
- "Welcome to Duolingo!" screen
- Quick tutorial overlay explaining interface
- Start first lesson

### 2. DASHBOARD / HOME SCREEN

**Components:**

**A. Top Bar**
```
[Avatar] [Username]                    [🔥 15] [❤️ 5] [🔔]
```

**B. Daily Goal Progress**
- Large circular progress indicator
- Green when complete, gray when incomplete
- Shows XP: "45 / 100 XP"
- "Daily Goal" label
- "Change goal" button

**C. Learning Path (Main Area)**
- Vertical skill tree in center
- Skills displayed as circular nodes
- Lock icons on locked skills
- Progress rings around unlocked skills
- Connecting lines between nodes

**D. Quick Actions**
- "Continue" button (large, green) - jumps to next lesson
- "Review" button (gray) - practice weak skills

**E. Bottom Navigation (Mobile)**
```
[🏠 Home] [💪 Practice] [🏆 Leaderboard] [👤 Profile]
```

### 3. LEARNING PATH / SKILL TREE

**Structure:**

**Units (Sections):**
- Unit 1: "Get Started"
- Unit 2: "Form Basic Sentences"
- Unit 3: "Get Around"
- Unit 4: "Order Food"
- Unit 5: "Talk About Activities"
- etc. (15-20 units total)

**Each Unit Contains:**
- 3-5 skills
- Unit review (after all skills completed)
- Unit achievement badge

**Skill Node States:**
- **Locked State**: Gray circle with lock icon 🔒
- **Available State (Level 0)**: Gold/yellow circle with "START" label
- **In Progress (Level 1-4)**: Colored circle with progress ring, "LEVEL X" badge
- **Mastered (Level 5)**: Rainbow/gold circle with checkmark or crown, "LEGENDARY" badge

**Visual Elements:**
- Circular nodes (80px diameter)
- Icon/emoji inside circle
- Progress ring around circle
- Skill title below
- Connecting dotted/solid lines

### 4. SKILL DETAIL VIEW

When clicking a skill, show modal with:
- Skill icon and title
- Description text
- Lessons list:
  - ✅ Lesson 1: Completed
  - ⭐ Lesson 2: Available (START button)
  - 🔒 Lesson 3: Locked
- "Practice this skill" button
- Progress indicator (e.g., "1/4 Lessons Complete")

### 5. LESSON INTERFACE

**Layout:**
```
┌─────────────────────────────────────┐
│ [X]   ━━━━━●━━━━━━━━━━━━━━  ❤️❤️❤️❤️❤️│  Header
├─────────────────────────────────────┤
│                                     │
│         QUESTION CONTENT            │  Main Area
│          (varies by type)           │
│                                     │
├─────────────────────────────────────┤
│ [Skip]                    [Check]   │  Footer
└─────────────────────────────────────┘
```

**Header:**
- Close button (X) with confirmation
- Horizontal progress bar (shows 3/15)
- Hearts remaining (5 red hearts ❤️)

**Footer:**
- Skip button (gray, small, left)
- Check button (green, large, right)

### 6. QUESTION TYPES (IMPLEMENT ALL 8+)

#### A. Translation (Text Input)
- Display text in Spanish
- User types English translation
- Accept multiple correct answers
- Fuzzy matching for minor typos

#### B. Multiple Choice (Text)
- Question with 3-4 answer options
- Large tappable buttons
- Selected option highlights

#### C. Multiple Choice (Image)
- Word shown, 3-4 images to choose from
- Click image to select
- Selected image gets colored border

#### D. Listen and Type
- Large speaker button (plays audio)
- "Slow" button for slower playback
- Text input for answer
- Use Web Speech API or pre-recorded audio

#### E. Select Word (Fill in Blank)
- Sentence with blank (___)
- 3-4 word options below
- Click word to fill blank

#### F. Sentence Builder (Word Bank)
- Prompt in English
- Empty area to build sentence
- Word bank with draggable/tappable words
- Arrange words in correct order

#### G. Match Pairs
- Two columns (English | Spanish)
- Click words to connect pairs
- Line draws between matched pairs
- All pairs must be matched

#### H. Speak (Pronunciation) - Optional
- Display phrase
- Microphone button
- Web Speech Recognition API
- Give pronunciation feedback

### 7. ANSWER FEEDBACK

**Correct Answer:**
- Full screen green overlay
- Large animated checkmark ✓
- "Excellent!" text
- "+10 XP" badge
- Confetti particles
- Happy sound effect

**Incorrect Answer:**
- Full screen red overlay
- Large X with shake animation
- "Correct solution:" text
- Show correct answer
- Lose 1 heart animation
- Sad sound effect

### 8. LESSON COMPLETE SCREEN

**Layout:**
```
╔═══════════════════════════════════╗
║         🎉 🎉 🎉                  ║
║    Lesson Complete!               ║
║    Total XP: 150                  ║
║    Accuracy: 93%                  ║
║   [Continue]                      ║
╚═══════════════════════════════════╝
```

**Features:**
- Confetti animation (react-confetti)
- XP earned (count-up animation)
- Accuracy percentage
- Level up notification if applicable
- New achievement badges

### 9. HEARTS SYSTEM

**Mechanics:**
- Start each lesson with 5 hearts ❤️
- Lose 1 heart per incorrect answer
- 0 hearts = lesson failed, must restart
- Hearts refill over time (1 heart per 5 hours)

**Visual:**
- Top-right corner: ❤️❤️❤️❤️❤️
- Heart loss animation (breaks apart)

**0 Hearts Screen:**
- "You ran out of hearts"
- Options:
  - Practice to earn hearts
  - Wait 5 hours (show countdown)
  - Try Again (if have hearts)

### 10. XP SYSTEM

**Earning XP:**
- +10 XP per correct answer
- +5 XP in practice mode
- Bonus XP for lesson completion

**Levels:**
- Level 1: 0-99 XP
- Level 2: 100-299 XP
- Level 3: 300-599 XP
- etc. (exponential growth)

**Level Up Celebration:**
- Fireworks/sparkles
- "Level Up!" screen
- Level badge animation

### 11. STREAK SYSTEM

**Mechanics:**
- Track consecutive days of practice
- Must meet daily goal to count
- Miss a day = streak resets to 0

**Visual:**
- Flame icon 🔥 with number
- Top bar: "🔥 15"
- Flame colors:
  - 0-6 days: Orange
  - 7-29 days: Red
  - 30+ days: Blue/rainbow

**Streak Reminder:**
- If haven't practiced: "Don't lose your 15 day streak!"
- Sad Duo character

### 12. DAILY GOAL WIDGET

**Layout:**
- Large circular progress indicator
- Center shows: "45 / 100 XP"
- Green when complete, gray when incomplete
- "Change goal" button

**Goal Options:**
- Casual: 50 XP (5 min/day)
- Regular: 100 XP (10 min/day)
- Serious: 150 XP (15 min/day)
- Intense: 200 XP (20 min/day)

**Goal Reached Animation:**
- Confetti burst
- Green checkmark
- "Daily goal complete!"

### 13. LEADERBOARD

**Layout:**
```
╔═══════════════════════════════════╗
║  Leaderboards                     ║
║  [Weekly] [All-Time]              ║
║  🥇 1. Maria        2,450 XP      ║
║  🥈 2. John         2,120 XP      ║
║  🥉 3. Sofia        1,980 XP      ║
║     24. You         1,150 XP      ║ (Highlighted)
╚═══════════════════════════════════╝
```

**Features:**
- Weekly leaderboard (resets Monday)
- Shows top 50 users
- User's position highlighted
- Medals for top 3 (🥇🥈🥉)
- Tabs: Weekly / All-Time

### 14. ACHIEVEMENTS / BADGES

**Badge Categories:**
- Lesson Milestones (First Lesson, 10 Lessons, 50 Lessons)
- Streak Achievements (7 days, 30 days, 100 days)
- XP Milestones (Level 5, Level 10, Level 25)
- Perfect Lessons (No mistakes)
- Time-based (Weekend Warrior, Night Owl, Early Bird)

**Badge Examples:**
- 🎓 "Scholar" - Complete 10 lessons
- 🔥 "Hot Streak" - 7 day streak
- 🌟 "Perfectionist" - Complete lesson with 0 mistakes
- 🦉 "Night Owl" - Practice after 9pm
- ⏰ "Early Bird" - Practice before 9am

**Badge Display:**
- Profile shows badge collection
- Grid layout with icons
- Locked badges in gray
- Unlocked badges in full color
- Toast notification when earned

### 15. PROFILE PAGE

**Layout:**
- Avatar and username
- Current language learning
- Quick stats (XP, Level, Streak)
- Detailed statistics
- Achievement badges
- Settings links
- Edit profile button

### 16. PRACTICE MODE

**Purpose:**
- Review completed skills without pressure
- Unlimited hearts (no penalty)
- Reduced XP (5 XP per correct vs 10)

**Access:**
- "Practice" button on home screen
- "Practice this skill" in skill detail

### 17. MISTAKES REVIEW

**Purpose:**
- Show questions user got wrong recently
- Focused practice on weak areas

**Access:**
- "Review Mistakes" button on home
- After lesson: "Practice Mistakes"

---

## TECHNICAL IMPLEMENTATION

### FRONTEND FOLDER STRUCTURE

```
client/
├── public/
│   ├── sounds/
│   │   ├── correct.mp3
│   │   ├── incorrect.mp3
│   │   ├── lesson-complete.mp3
│   │   ├── level-up.mp3
│   │   └── heart-break.mp3
│   ├── images/
│   │   ├── duo/  (mascot images)
│   │   ├── skills/  (skill icons)
│   │   └── vocabulary/  (vocab images)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── OnboardingFlow.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── DailyGoalWidget.tsx
│   │   │   ├── LearningPath.tsx
│   │   │   └── SkillNode.tsx
│   │   ├── Lesson/
│   │   │   ├── LessonContainer.tsx
│   │   │   ├── LessonHeader.tsx
│   │   │   ├── QuestionRenderer.tsx
│   │   │   ├── QuestionTypes/
│   │   │   │   ├── TranslationQuestion.tsx
│   │   │   │   ├── MultipleChoiceText.tsx
│   │   │   │   ├── MultipleChoiceImage.tsx
│   │   │   │   ├── ListenAndTypeQuestion.tsx
│   │   │   │   ├── MatchPairsQuestion.tsx
│   │   │   │   ├── FillInBlankQuestion.tsx
│   │   │   │   └── SentenceBuilderQuestion.tsx
│   │   │   ├── AnswerFeedback.tsx
│   │   │   ├── LessonComplete.tsx
│   │   │   └── LessonFailed.tsx
│   │   ├── Profile/
│   │   ├── Leaderboard/
│   │   ├── Practice/
│   │   ├── Layout/
│   │   ├── UI/
│   │   └── Settings/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useLesson.ts
│   │   ├── useProgress.ts
│   │   ├── useAudio.ts
│   │   └── useSpeechRecognition.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── courseService.ts
│   │   ├── lessonService.ts
│   │   └── progressService.ts
│   ├── utils/
│   │   ├── answerValidator.ts
│   │   ├── xpCalculator.ts
│   │   ├── levelCalculator.ts
│   │   └── streakHelper.ts
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── course.types.ts
│   │   ├── lesson.types.ts
│   │   └── question.types.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── ProgressContext.tsx
│   │   └── CourseContext.tsx
│   ├── data/
│   │   ├── spanishCourse.ts
│   │   └── achievements.ts
│   └── pages/
│       ├── HomePage.tsx
│       ├── LearnPage.tsx
│       ├── LeaderboardPage.tsx
│       └── ProfilePage.tsx
```

### BACKEND FOLDER STRUCTURE

```
server/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── environment.ts
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── Progress.model.ts
│   │   ├── Achievement.model.ts
│   │   └── Mistake.model.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── course.controller.ts
│   │   ├── lesson.controller.ts
│   │   └── progress.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── xp.service.ts
│   │   ├── level.service.ts
│   │   ├── streak.service.ts
│   │   └── hearts.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── errorHandler.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── course.routes.ts
│   │   ├── lesson.routes.ts
│   │   └── progress.routes.ts
│   ├── utils/
│   │   └── answerChecker.ts
│   ├── data/
│   │   ├── spanishCourseData.ts
│   │   └── achievementsData.ts
│   └── server.ts
```

### KEY TYPESCRIPT INTERFACES

```typescript
// user.types.ts
interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  learningLanguage: string;
  totalXP: number;
  level: number;
  currentStreak: number;
  hearts: number;
  dailyGoal: number;
  achievements: string[];
}

// course.types.ts
interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  lessons: Lesson[];
  userProgress: SkillProgress;
}

interface Lesson {
  id: string;
  skillId: string;
  title: string;
  questions: Question[];
  isCompleted: boolean;
}

// question.types.ts
type QuestionType = 
  | 'translation'
  | 'multiple-choice-text'
  | 'multiple-choice-image'
  | 'listen-and-type'
  | 'fill-in-blank'
  | 'sentence-builder'
  | 'match-pairs';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  xpReward: number;
}
```

### API ENDPOINTS

**Auth:**
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

**Course:**
- `GET /api/courses/spanish` - Get course structure

**Lessons:**
- `GET /api/lessons/:id` - Get lesson
- `POST /api/lessons/:id/submit-answer` - Submit answer
- `POST /api/lessons/:id/complete` - Complete lesson

**Progress:**
- `GET /api/progress/:userId` - Get progress
- `POST /api/progress/update-streak` - Update streak

**Leaderboard:**
- `GET /api/leaderboard/weekly` - Weekly rankings

### MONGODB SCHEMAS

**User Schema:**
```typescript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalXP: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  currentStreak: { type: Number, default: 0 },
  hearts: { type: Number, default: 5, min: 0, max: 5 },
  dailyGoal: { type: Number, default: 100 },
  achievements: [{ type: String }]
}
```

---

## COURSE CONTENT DATA

Create comprehensive Spanish course in `/server/src/data/spanishCourseData.ts`:

**Structure:**
- 15-20 skills minimum
- 3-5 lessons per skill
- 12-15 questions per lesson
- Mix of all question types

**Example Skills:**
1. Basics 1 (Greetings, basic phrases)
2. Basics 2 (Common nouns)
3. Phrases (Useful phrases)
4. Food (Food vocabulary)
5. Animals (Animal names)
6. Plurals (Plural forms)
7. Present Tense (Verb conjugation)
8. Colors
9. Numbers
10. Family
11. Clothing
12. Present Tense 2
13. Questions
14. Negatives
15. Past Tense

---

## KEY PACKAGES TO INSTALL

**Frontend:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "framer-motion": "^10.16.0",
    "react-confetti": "^6.1.0",
    "lucide-react": "^0.294.0",
    "react-hot-toast": "^2.4.1"
  }
}
```

**Backend:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

---

## DEVELOPMENT PHASES (7 DAYS)

### Phase 1: Backend Foundation (Day 1-2)
1. Setup Node.js + Express + TypeScript
2. MongoDB connection
3. User model and authentication
4. Create course data (Spanish skills & lessons)
5. API endpoints
6. Test with Postman

### Phase 2: Frontend Setup & Auth (Day 2-3)
1. React + Vite + TypeScript
2. Tailwind CSS + Duolingo colors
3. Authentication pages
4. Onboarding flow
5. Protected routes

### Phase 3: Dashboard & Learning Path (Day 3-4)
1. Dashboard layout
2. Daily goal widget
3. Learning path / skill tree
4. Skill nodes with states
5. Skill detail modal

### Phase 4: Lesson System (Day 4-6) - MOST IMPORTANT
1. Lesson container
2. Implement ALL 8+ question types
3. Answer validation
4. Feedback overlays
5. Lesson complete screen
6. Hearts system
7. XP earning

### Phase 5: Gamification (Day 6-7)
1. Streak tracking
2. Level system
3. Leaderboard
4. Achievements
5. Practice mode
6. Sound effects
7. Animations

### Phase 6: Polish (Day 7)
1. UI/UX refinements
2. Responsive design
3. README documentation
4. Demo video

---

## CRITICAL REMINDERS

1. **UI Must Match Duolingo**: Exact colors, rounded buttons, bouncy animations
2. **Question Variety**: At least 8 question types
3. **Course Content**: Meaningful Spanish lessons
4. **Animations**: Use Framer Motion
5. **Sound Effects**: Audio feedback
6. **Mobile Responsive**: Must work on mobile
7. **Production Quality**: Clean code, error handling
8. **Comprehensive README**: Clear setup instructions

---

## ENVIRONMENT VARIABLES

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/duolingo-clone
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

---

## SUCCESS CRITERIA

This project will be evaluated on:
1. **Code Quality**: Readability, maintainability, best practices
2. **Modular Approach**: Well-structured code, component design, separation of concerns
3. **Production Readiness**: How complete and functional the application is
4. **UI/UX Match**: How closely it replicates Duolingo's design
5. **Feature Completeness**: All core features implemented

---

**Now start building! Create the backend first, then frontend, prioritizing the lesson system and gamification features. Good luck! 🚀**
