import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to learn page if user is logged in
    if (user) {
      navigate('/learn');
    }
  }, [user, navigate]);

  return null;
};

export default HomePage;
