import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Auth Components
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import OnboardingFlow from './components/Auth/OnboardingFlow';
import PrivateRoute from './components/Auth/PrivateRoute';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Page Components
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import LessonPage from './pages/LessonPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import PracticePage from './pages/PracticePage';
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from './pages/SettingsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-duo-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/learn" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/learn" replace /> : <Signup />}
        />
        <Route
          path="/onboarding"
          element={user ? <Navigate to="/learn" replace /> : <OnboardingFlow />}
        />

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <PrivateRoute>
              <MainLayout>
                <LearnPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* Lesson page without sidebar (fullscreen) */}
        <Route
          path="/lesson/:lessonId"
          element={
            <PrivateRoute>
              <LessonPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/practice"
          element={
            <PrivateRoute>
              <MainLayout>
                <PracticePage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <LeaderboardPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />

        {/* Public auth routes */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
