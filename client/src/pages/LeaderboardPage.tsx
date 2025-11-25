import React from 'react';
import { motion } from 'framer-motion';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import TopBar from '../components/Dashboard/TopBar';

const LeaderboardPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      <TopBar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Leaderboard />
      </div>
    </motion.div>
  );
};

export default LeaderboardPage;
