import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { CourseProvider } from './context/CourseContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <CourseProvider>
            <App />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#3C3C3C',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: '16px',
                  padding: '16px',
                },
                success: {
                  style: {
                    background: '#58CC02',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#58CC02',
                  },
                },
                error: {
                  style: {
                    background: '#FF4B4B',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#FF4B4B',
                  },
                },
              }}
            />
          </CourseProvider>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
