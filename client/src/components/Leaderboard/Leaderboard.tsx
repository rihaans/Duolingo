import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Zap, Loader2, Medal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { progressService } from '../../services/progressService';
import { LeaderboardEntry } from '../../types';
import DefaultAvatar from '../UI/DefaultAvatar';
import toast from 'react-hot-toast';

type LeaderboardType = 'weekly' | 'all-time';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [type, setType] = useState<LeaderboardType>('weekly');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [type]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await progressService.getLeaderboard(type);
      setLeaderboard(data.leaderboard);
      setUserRank(data.userRank);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      toast.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-orange-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-blue-400 to-purple-500';
  };

  const getTopThreeStyle = (rank: number) => {
    if (rank === 1) {
      return {
        container: 'order-2 scale-110',
        height: 'h-72',
        bgGradient: 'from-yellow-400 via-yellow-500 to-orange-500',
        ringColor: 'ring-yellow-400',
      };
    }
    if (rank === 2) {
      return {
        container: 'order-1 scale-100',
        height: 'h-60',
        bgGradient: 'from-gray-300 via-gray-400 to-gray-500',
        ringColor: 'ring-gray-400',
      };
    }
    if (rank === 3) {
      return {
        container: 'order-3 scale-100',
        height: 'h-60',
        bgGradient: 'from-orange-400 via-orange-500 to-orange-600',
        ringColor: 'ring-orange-400',
      };
    }
    return {
      container: '',
      height: '',
      bgGradient: '',
      ringColor: '',
    };
  };

  const isCurrentUser = (entry: LeaderboardEntry) => {
    return user && entry.user.id === user._id;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header with Trophy Icon */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.8, rotate: { duration: 0.5, delay: 0.3 } }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 shadow-2xl">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">Leaderboard</h1>
            <p className="text-gray-600 text-lg">
              Compete with learners around the world!
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setType('weekly')}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md ${
                type === 'weekly'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Weekly
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setType('all-time')}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md ${
                type === 'all-time'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All-Time
            </motion.button>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Loading leaderboard...</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Top 3 Podium */}
                {topThree.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-2 border-gray-100"
                  >
                    <div className="flex justify-center items-end gap-4 mb-8">
                      {topThree.map((entry) => {
                        const style = getTopThreeStyle(entry.rank);
                        return (
                          <motion.div
                            key={entry.user.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: entry.rank * 0.2 }}
                            className={`${style.container} flex-1 max-w-[200px]`}
                          >
                            <div className="text-center">
                              {/* Avatar with Medal */}
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative inline-block mb-3"
                              >
                                {entry.user.avatar ? (
                                  <img
                                    src={entry.user.avatar}
                                    alt={entry.user.displayName}
                                    className={`w-24 h-24 rounded-full object-cover ring-4 ${style.ringColor} shadow-xl`}
                                  />
                                ) : (
                                  <div className={`ring-4 ${style.ringColor} rounded-full shadow-xl`}>
                                    <DefaultAvatar size="large" />
                                  </div>
                                )}
                                {/* Medal Badge */}
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: entry.rank * 0.2 + 0.3, type: 'spring' }}
                                  className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg"
                                >
                                  <span className="text-3xl">{getMedalEmoji(entry.rank)}</span>
                                </motion.div>
                                {/* Crown for 1st place */}
                                {entry.rank === 1 && (
                                  <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: -10, opacity: 1 }}
                                    transition={{ delay: 0.8, type: 'spring' }}
                                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                                  >
                                    <Crown className="w-8 h-8 text-yellow-500 fill-yellow-400" />
                                  </motion.div>
                                )}
                              </motion.div>

                              {/* User Info */}
                              <h3 className="font-bold text-gray-800 text-lg mb-1 truncate px-2">
                                {entry.user.displayName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                Level {entry.user.level}
                              </p>

                              {/* XP Display */}
                              <div
                                className={`bg-gradient-to-br ${style.bgGradient} rounded-2xl p-4 text-white shadow-lg`}
                              >
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <Zap className="w-5 h-5" />
                                  <span className="text-2xl font-bold">{entry.user.xp}</span>
                                </div>
                                <p className="text-xs opacity-90">XP</p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Rest of Leaderboard */}
                {restOfLeaderboard.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100"
                  >
                    <div className="space-y-2">
                      {restOfLeaderboard.map((entry, index) => {
                        const isCurrent = isCurrentUser(entry);
                        return (
                          <motion.div
                            key={entry.user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                              isCurrent
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-md'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            {/* Rank */}
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                                isCurrent
                                  ? 'bg-green-500 text-white'
                                  : 'bg-white text-gray-700'
                              } shadow-sm`}
                            >
                              {entry.rank}
                            </div>

                            {/* Avatar */}
                            {entry.user.avatar ? (
                              <img
                                src={entry.user.avatar}
                                alt={entry.user.displayName}
                                className="w-14 h-14 rounded-full object-cover shadow-md"
                              />
                            ) : (
                              <div className="shadow-md">
                                <DefaultAvatar size="small" />
                              </div>
                            )}

                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`font-bold truncate ${
                                  isCurrent ? 'text-green-700' : 'text-gray-800'
                                }`}
                              >
                                {entry.user.displayName}
                                {isCurrent && (
                                  <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                    You
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-600">@{entry.user.username}</p>
                            </div>

                            {/* XP and Level */}
                            <div className="text-right">
                              <div className="flex items-center gap-1 justify-end mb-1">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span className="font-bold text-lg text-gray-800">
                                  {entry.user.xp}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600">Level {entry.user.level}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* User's Rank Badge (if not in visible list) */}
                {userRank && userRank > 10 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-xl p-6 text-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.displayName}
                            className="w-16 h-16 rounded-full object-cover shadow-lg"
                          />
                        ) : (
                          <div className="shadow-lg">
                            <DefaultAvatar size="medium" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-green-100 mb-1">Your Rank</p>
                          <p className="text-4xl font-bold">#{userRank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-2">
                          <Zap className="w-6 h-6" />
                          <span className="text-3xl font-bold">{user?.totalXP || 0}</span>
                        </div>
                        <p className="text-green-100">Level {user?.level || 1}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Empty State */}
                {leaderboard.length === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-gray-100"
                  >
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      No rankings yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to earn XP and appear on the leaderboard!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
