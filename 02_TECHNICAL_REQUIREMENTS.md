# Technical Requirements & Specifications

## PROJECT SCOPE

### Assignment Details
- **Type**: Job Application Assignment (Full Position)
- **Objective**: Create a full-fledged web version of Duolingo (existing mobile/iOS app)
- **Timeline**: 4-7 days (can take extension up to 7 days)
- **Submission Format**: ZIP file + Demo video (max 5 minutes)

### Evaluation Criteria
1. **Code Quality** (Readability, maintainability, best practices)
2. **Modular Approach** (Well-structured code, component design, separation of concerns)
3. **Production Readiness** (How complete and functional the application is)

---

## MANDATORY TECHNICAL STACK

### Frontend Requirements
- **Framework**: React 18+ (MANDATORY)
- **Language**: TypeScript (MANDATORY)
- **Build Tool**: Vite (recommended) or Create React App
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Context API + Custom Hooks (or Redux if preferred)
- **Routing**: React Router v6
- **HTTP Client**: Axios or Fetch API
- **Animation**: Framer Motion (for Duolingo-style animations)
- **Icons**: Lucide React or Heroicons
- **Fonts**: Nunito (Google Fonts) to match Duolingo

### Backend Requirements
- **Runtime**: Node.js (MANDATORY)
- **Framework**: Express.js (MANDATORY)
- **Language**: TypeScript (MANDATORY)
- **Database**: MongoDB (MANDATORY)
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

### Additional Libraries & Tools
- **Confetti**: react-confetti (for celebrations)
- **Toast Notifications**: react-hot-toast or sonner
- **Audio**: HTML5 Audio API (sound effects)
- **Speech**: Web Speech API (optional, for listen/speak questions)
- **Date Handling**: date-fns or Day.js
- **Environment**: dotenv

---

## CORE FEATURES REQUIREMENTS

### 1. Authentication System (MANDATORY)
**Must Have:**
- User registration (email, username, password)
- User login with JWT
- Password hashing (bcrypt)
- Protected routes
- Token-based authentication
- Logout functionality

**Should Have:**
- Multi-step onboarding flow (welcome, age, goals, daily goal, account creation)
- Password validation (minimum 8 characters)
- Email validation
- Username uniqueness check
- "Remember me" functionality

**Nice to Have:**
- Password reset flow
- Email verification
- Social auth (Google, Facebook)

### 2. Learning Path / Skill Tree (MANDATORY)
**Must Have:**
- Visual skill tree with circular nodes
- At least 15-20 skills organized in units
- Progressive unlocking (complete previous to unlock next)
- Skill states:
  - Locked (gray, with lock icon)
  - Available (gold/yellow, "START" label)
  - In Progress (colored, with level indicator)
  - Completed (rainbow/gold, with checkmark)
- Each skill contains 3-5 lessons
- Click skill to view lessons
- Visual connecting lines between skills

**Should Have:**
- Unit groupings (Unit 1, Unit 2, etc.)
- Unit reviews/tests
- Skill descriptions on hover
- Progress rings around skill nodes
- Level badges (Level 0-5 per skill)

**Nice to Have:**
- Animated path drawing as skills unlock
- Treasure chests between units
- Character checkpoints
- Shortcut paths

### 3. Lesson System (MANDATORY - MOST CRITICAL)
**Must Have:**

**Lesson Interface:**
- Clean lesson layout matching Duolingo
- Progress bar showing X/15 questions
- Hearts display (5 hearts, lose 1 per mistake)
- Close button with confirmation
- Skip button (no XP earned)
- Check button (validates answer, disabled until answer provided)

**Question Types (Minimum 6-8 types):**
1. **Translation** - Type translation of given text
2. **Multiple Choice (Text)** - Select correct option from 3-4 choices
3. **Multiple Choice (Image)** - Select correct image matching word
4. **Listen and Type** - Type what you hear (audio playback)
5. **Fill in Blank** - Complete sentence with missing word
6. **Sentence Builder** - Construct sentence from word bank
7. **Match Pairs** - Connect related words/phrases
8. **Select Missing Word** - Choose missing word in dialogue (optional but recommended)

**Answer Feedback:**
- Correct: Green overlay, checkmark, "Excellent!", +10 XP, confetti, happy sound
- Incorrect: Red overlay, X icon, show correct answer, -1 heart, sad sound
- Immediate feedback after each answer
- Smooth overlay animations

**Lesson Flow:**
- 12-15 questions per lesson
- Mix of question types
- Track mistakes for review
- Lesson complete celebration screen
- 0 hearts = lesson failed screen

**Should Have:**
- Question variety within lesson
- Adaptive difficulty
- Hints system (reveal correct answer, costs hearts)
- Undo button (go back to previous question)
- Timer display (optional)
- Pause/resume functionality

**Nice to Have:**
- Speaking questions (Web Speech Recognition)
- Timed challenges
- Hard mode (fewer hints, more difficult)

### 4. Progress Tracking (MANDATORY)
**Must Have:**

**XP System:**
- Earn 10 XP per correct answer
- Earn 5 XP in practice mode
- Bonus XP for lesson completion
- Total XP tracked for each user
- Weekly XP for leaderboard
- Daily XP for goal tracking

**Level System:**
- Calculate level from total XP
- Level 1 = 0-99 XP
- Level 2 = 100-299 XP
- Exponential growth
- Level up celebration screen

**Streak System:**
- Track consecutive days of practice
- Must meet daily goal to maintain streak
- Flame icon 🔥 with count
- Reset to 0 if day missed
- Current streak and longest streak tracked

**Hearts System:**
- 5 hearts per lesson
- Lose 1 heart per incorrect answer
- 0 hearts = lesson failed
- Hearts refill over time (1 per 5 hours)
- Show hearts remaining in lesson header

**Daily Goal:**
- User sets daily XP goal (50, 100, 150, 200 XP)
- Circular progress widget on dashboard
- Celebrate when goal reached
- Track completion for streak

**Should Have:**
- Practice mode (unlimited hearts, reduced XP)
- Mistakes review (focused practice on wrong answers)
- Skill mastery levels (0-5 crowns per skill)
- Detailed statistics page
- Progress graphs and charts

**Nice to Have:**
- Streak freeze (save streak if miss 1 day)
- Heart refill via perfect practice
- Combo multipliers
- Time practiced tracking

### 5. Gamification Features (MANDATORY)
**Must Have:**

**Leaderboard:**
- Weekly XP leaderboard
- Shows top 50 users
- User's rank highlighted
- Medals for top 3 (🥇🥈🥉)
- Resets every Monday
- Tabs: Weekly / All-Time

**Achievements/Badges:**
- At least 10 achievements
- Categories: lessons, streaks, XP, perfect lessons
- Examples:
  - First Lesson (complete 1 lesson)
  - Scholar (complete 10 lessons)
  - Hot Streak (7 day streak)
  - Perfectionist (lesson with 0 mistakes)
  - Overachiever (reach Level 10)
- Display in profile
- Toast notification when earned
- Locked vs unlocked states

**Should Have:**
- Friends leaderboard (if friends system)
- More achievement types
- Badge descriptions
- Achievement progress tracking

**Nice to Have:**
- Trophies for major milestones
- Seasonal events
- Limited-time challenges

### 6. User Profile (MANDATORY)
**Must Have:**
- Username and avatar display
- Total XP, current level, current streak
- Basic statistics:
  - Lessons completed
  - Time practiced
  - Accuracy rate
  - Current/longest streak
- Achievement badges display
- Settings link
- Edit profile capability
- Logout button

**Should Have:**
- Detailed statistics page
- Progress graphs
- Streak calendar
- Learning history
- Skill completion overview

**Nice to Have:**
- Profile customization
- Badges showcase
- Share achievements
- Profile visibility settings

### 7. Course Content (MANDATORY)
**Must Have:**
- Spanish language course (hardcoded)
- At least 15-20 skills
- Each skill: 3-5 lessons
- Each lesson: 12-15 questions
- Mix of question types across lessons
- Real Spanish vocabulary and phrases
- Proper translations
- Progressive difficulty

**Course Structure Example:**
1. Basics 1 (greetings, introductions)
2. Basics 2 (common nouns, articles)
3. Phrases (useful expressions)
4. Food (food vocabulary)
5. Animals (animal names)
6. Plurals (plural forms)
7. Colors
8. Numbers
9. Family
10. Present Tense
11. Adjectives
12. Questions
13. Negatives
14. Past Tense
15. Future Tense
... (continue to 20)

**Should Have:**
- Multiple language support (Spanish, French)
- Themed vocabulary units
- Grammar explanations
- Cultural notes

**Nice to Have:**
- Stories feature
- Podcasts
- Live events

### 8. Practice & Review Features
**Must Have:**
- Practice mode (review completed lessons, no hearts)
- Mistake review (questions user got wrong)
- Access from dashboard

**Should Have:**
- Weak skills identification
- Targeted practice recommendations
- Practice history

**Nice to Have:**
- Timed practice
- Story practice
- Conversation practice

---

## API ENDPOINTS SPECIFICATION

### Authentication Endpoints
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/refresh-token
```

### User Endpoints
```
GET    /api/users/:id
PUT    /api/users/:id
GET    /api/users/:id/stats
GET    /api/users/:id/achievements
PUT    /api/users/:id/daily-goal
```

### Course Endpoints
```
GET    /api/courses/:language
GET    /api/skills/:id
GET    /api/skills/:id/lessons
```

### Lesson Endpoints
```
GET    /api/lessons/:id
POST   /api/lessons/:id/start
POST   /api/lessons/:id/submit-answer
POST   /api/lessons/:id/complete
POST   /api/lessons/:id/hint
```

### Progress Endpoints
```
GET    /api/progress/:userId
POST   /api/progress/update-xp
POST   /api/progress/update-streak
POST   /api/progress/refill-hearts
GET    /api/progress/mistakes
POST   /api/progress/review-mistake
```

### Leaderboard Endpoints
```
GET    /api/leaderboard/weekly
GET    /api/leaderboard/all-time
GET    /api/leaderboard/user/:userId/rank
```

### Achievement Endpoints
```
GET    /api/achievements
GET    /api/achievements/:userId
POST   /api/achievements/check
```

---

## DATABASE SCHEMAS

### User Schema
```typescript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (hashed, required)
  displayName: String
  avatar: String
  learningLanguage: String (default: 'spanish')
  nativeLanguage: String (default: 'english')
  totalXP: Number (default: 0)
  level: Number (default: 1)
  currentStreak: Number (default: 0)
  longestStreak: Number (default: 0)
  hearts: Number (default: 5, min: 0, max: 5)
  lastHeartRefill: Date
  lastPracticeDate: Date
  dailyGoal: Number (default: 100)
  achievements: [String]
  createdAt: Date
  updatedAt: Date
}
```

### Progress Schema
```typescript
{
  userId: ObjectId (ref: User)
  totalXP: Number
  weeklyXP: Number
  todayXP: Number
  level: Number
  currentStreak: Number
  streakDates: [Date]
  skillsProgress: [{
    skillId: String
    level: Number (0-5)
    lessonsCompleted: [String]
    isUnlocked: Boolean
    lastPracticed: Date
  }]
  lessonsCompleted: [{
    lessonId: String
    completedAt: Date
    accuracy: Number
    xpEarned: Number
  }]
  createdAt: Date
  updatedAt: Date
}
```

### Mistake Schema
```typescript
{
  userId: ObjectId (ref: User)
  lessonId: String
  questionId: String
  questionText: String
  questionType: String
  userAnswer: String
  correctAnswer: String
  reviewedCount: Number (default: 0)
  createdAt: Date
}
```

### Achievement Schema
```typescript
{
  userId: ObjectId (ref: User)
  achievementId: String
  unlockedAt: Date
}
```

### Leaderboard Schema
```typescript
{
  userId: ObjectId (ref: User)
  username: String
  avatar: String
  weeklyXP: Number
  level: Number
  weekStartDate: Date
  rank: Number
}
```

---

## CODE QUALITY REQUIREMENTS

### TypeScript Standards
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Proper interfaces for all data structures
- Generics where appropriate
- Type guards for runtime checks
- Proper error typing

### Code Organization
- **DRY Principle**: No code duplication
- **SOLID Principles**: Especially Single Responsibility
- **Separation of Concerns**: Clear boundaries between layers
- **Component Composition**: Reusable, composable components
- **Service Layer**: API calls isolated in service files
- **Utility Functions**: Common logic extracted to utils
- **Constants**: Magic numbers/strings in constants file

### Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Files: PascalCase for components, camelCase for utils
- Functions: camelCase, descriptive (`calculateUserLevel`)
- Variables: camelCase, meaningful names
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase
- Avoid abbreviations (except common: id, url, xp)

### File Structure Best Practices
- Group related files in folders
- Index files for clean imports
- Separate business logic from UI
- Colocate related components
- Keep files under 300 lines (split if larger)

### Error Handling
- Try-catch blocks for async operations
- Proper error messages
- Error boundaries in React
- API error handling with proper status codes
- User-friendly error displays
- Logging for debugging

### Comments & Documentation
- JSDoc comments for functions
- Complex logic explained
- Why, not what (code should be self-explanatory)
- API endpoint documentation
- README with setup instructions
- Component prop documentation (TypeScript interfaces)

### Testing Considerations (Optional but Impressive)
- Unit tests for utilities
- Component tests (React Testing Library)
- API endpoint tests
- Test coverage reports

---

## PERFORMANCE REQUIREMENTS

### Frontend Performance
- Lazy loading for routes
- Image optimization
- Minimize bundle size
- Efficient re-renders (React.memo, useMemo, useCallback)
- Virtual scrolling for long lists (optional)
- Code splitting

### Backend Performance
- Database indexing (username, email)
- Query optimization
- Pagination for large datasets
- Caching strategy (optional)
- Rate limiting to prevent abuse

### Loading States
- Skeleton loaders
- Loading spinners
- Optimistic UI updates (where appropriate)
- Progressive enhancement

---

## SECURITY REQUIREMENTS

### Authentication Security
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with expiration (7 days)
- Secure token storage
- HTTP-only cookies (if using cookie storage)
- CSRF protection (if using cookies)

### API Security
- CORS properly configured
- Helmet.js for security headers
- Rate limiting (express-rate-limit)
- Input validation (express-validator)
- SQL injection prevention (Mongoose parameterization)
- XSS protection (sanitize inputs)

### Data Privacy
- Passwords never logged
- Sensitive data not in logs
- Environment variables for secrets
- User data access control

---

## RESPONSIVE DESIGN REQUIREMENTS

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-Specific
- Touch-friendly buttons (min 44x44px)
- Bottom navigation (Home, Practice, Leaderboard, Profile)
- Vertical skill tree scrolling
- Smaller lesson cells (35-40px)
- Hamburger menu

### Desktop-Specific
- Sidebar navigation (persistent)
- Larger lesson cells (55-60px)
- Multi-column layouts
- Hover states

### Tablet
- Adaptive layouts
- Navigation transitions
- Optimized touch targets

---

## ACCESSIBILITY REQUIREMENTS

### Keyboard Navigation
- Tab through interactive elements
- Arrow keys for lesson navigation
- Enter to submit
- Escape to close modals
- Skip to main content link

### Screen Readers
- Semantic HTML
- ARIA labels
- Alt text for images
- Proper heading hierarchy
- Focus indicators

### Visual
- Sufficient color contrast (WCAG AA)
- Text resizing support
- No critical info by color alone
- Focus visible

---

## ANIMATION REQUIREMENTS

### Animation Library
- Use Framer Motion for complex animations
- CSS transitions for simple effects

### Required Animations
- Button press (scale down on click)
- Modal slide-up with bounce
- Confetti on lesson complete
- XP counter (count-up animation)
- Heart loss (break apart)
- Progress bar filling
- Skill unlock (pop/bounce)
- Level up celebration (scale + rotate)
- Page transitions (fade)
- Loading states

### Animation Principles
- Smooth transitions (0.2-0.3s)
- Ease functions (ease-out for entering, ease-in for exiting)
- Spring physics for bouncy feel
- No jarring movements
- Performance optimized (GPU acceleration)

---

## AUDIO REQUIREMENTS

### Required Sound Effects
- Correct answer: Cheerful chime
- Incorrect answer: Gentle buzz
- Lesson complete: Triumphant fanfare
- XP earned: Coin sound
- Level up: Victory music
- Heart lost: Breaking sound
- Button click: Subtle tap (optional)

### Audio Implementation
- HTML5 Audio API
- Preload sounds
- Volume control (0.5 default)
- Mute/unmute toggle
- Graceful fallback if audio fails

---

## SUBMISSION REQUIREMENTS

### File Structure
```
project-root/
├── client/          # Frontend
├── server/          # Backend
├── README.md        # Comprehensive documentation
└── .env.example     # Environment variables template
```

### README Must Include
1. Project title and description
2. Features list
3. Tech stack
4. Prerequisites (Node version, MongoDB version)
5. Installation steps (detailed, step-by-step)
6. Environment variables setup
7. How to run (backend and frontend)
8. API endpoints documentation
9. Project structure overview
10. Screenshots (optional but recommended)
11. Known issues / limitations
12. Future enhancements
13. Author information

### Demo Video (Max 5 Minutes)
**Must Show:**
1. Signup/login flow (30 sec)
2. Dashboard and learning path (45 sec)
3. Start and complete a lesson showing multiple question types (2 min)
4. Gamification features: XP, level up, streak, hearts (1 min)
5. Leaderboard and profile (30 sec)
6. Brief code walkthrough (30 sec)

**Video Tips:**
- Screen recording (OBS, Loom)
- Clear audio
- Show functionality, not code
- Smooth transitions
- Practice before final recording

### Delivery Format
1. ZIP entire project (client + server)
2. Upload ZIP to Google Drive
3. Upload video to Google Drive
4. Set both links to "Anyone with the link can view"
5. Reply to email with both links

### What NOT to Include in ZIP
- `node_modules/` folders
- `.env` files (only .env.example)
- Build folders (`dist/`, `build/`)
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`)
- Git files (`.git/`) - optional, can include for history

---

## TIMELINE & PRIORITIZATION

### High Priority (Must Complete)
1. Authentication (login, signup)
2. Learning path visualization
3. Lesson system with 6-8 question types
4. XP and level system
5. Hearts system
6. Basic profile page
7. Responsive design

### Medium Priority (Should Complete)
1. Streak tracking
2. Daily goal widget
3. Leaderboard
4. Achievement badges
5. Practice mode
6. Mistakes review
7. Sound effects
8. Animations

### Low Priority (Nice to Have)
1. Advanced animations
2. Speaking questions
3. Multiple languages
4. Social features
5. Timed challenges

### Recommended 7-Day Schedule
- **Day 1-2**: Backend (auth, database, API, course data)
- **Day 3**: Frontend setup, auth pages, dashboard layout
- **Day 4-5**: Lesson system (all question types, feedback)
- **Day 6**: Gamification (XP, streak, leaderboard, achievements)
- **Day 7**: Polish, README, video, submission

---

## SUCCESS METRICS

### Minimum Viable Product (MVP)
- User can signup/login
- User can see learning path with skills
- User can complete lessons with 6+ question types
- Correct/incorrect feedback works
- XP and hearts system functional
- Progress saved to database
- Basic responsive design

### Target Excellence
- All planned features implemented
- Polished UI matching Duolingo closely
- Smooth animations throughout
- Sound effects working
- Comprehensive README
- Clean, well-organized code
- Production-ready quality
- Impressive demo video

---

## TOOLS & RESOURCES

### Development Tools
- **Code Editor**: VS Code
- **API Testing**: Postman, Insomnia, or Thunder Client
- **Database GUI**: MongoDB Compass
- **Git**: Version control (optional but recommended)

### Design Resources
- **Colors**: Duolingo website for reference
- **Icons**: Lucide React, Heroicons
- **Fonts**: Google Fonts (Nunito)
- **Images**: Unsplash, Pexels for vocabulary images
- **Sounds**: Free sound effects websites (freesound.org)

### Documentation
- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org
- Express Docs: https://expressjs.com
- MongoDB Docs: https://docs.mongodb.com
- Framer Motion: https://www.framer.com/motion
- Tailwind CSS: https://tailwindcss.com

---

## FINAL CHECKLIST

Before submission, verify:
- [ ] Backend runs without errors
- [ ] Frontend runs without errors
- [ ] MongoDB connection works
- [ ] User signup/login functional
- [ ] Learning path displays correctly
- [ ] Lessons can be started and completed
- [ ] All question types implemented and working
- [ ] XP, hearts, streak systems working
- [ ] Leaderboard displays data
- [ ] Profile page shows stats
- [ ] Responsive on mobile and desktop
- [ ] No console errors
- [ ] Clean TypeScript (no `any` types)
- [ ] Code is formatted and organized
- [ ] README is comprehensive
- [ ] .env.example files included
- [ ] Demo video recorded and clear
- [ ] Both files uploaded to Google Drive
- [ ] Links set to "Anyone can view"

---

**This is a comprehensive, production-ready specification. Follow it carefully to create an impressive Duolingo clone that will stand out in your job application! 🚀**
