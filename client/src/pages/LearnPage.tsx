import React from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard/Dashboard';

const LearnPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      <Dashboard />
    </motion.div>
  );
};

export default LearnPage;
