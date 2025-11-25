import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Unit, Skill } from '../../types';
import SkillNode from './SkillNode';
import SkillModal from './SkillModal';

interface LearningPathProps {
  units: Unit[];
}

const LearningPath: React.FC<LearningPathProps> = ({ units }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(
    new Set(units.map((unit) => unit.id))
  );

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto py-8">
        {units.map((unit, unitIndex) => {
          const isExpanded = expandedUnits.has(unit.id);

          return (
            <div key={unit.id} className="mb-8">
              {/* Unit Header */}
              <motion.button
                onClick={() => toggleUnit(unit.id)}
                className="w-full mb-6 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {unit.order}
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">{unit.title}</h3>
                    <p className="text-sm text-blue-100">
                      {unit.skills.length} skills
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-white" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-white" />
                )}
              </motion.button>

              {/* Skills Path */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Vertical connecting line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-gray-200 -translate-x-1/2 z-0" />

                    {/* Skills */}
                    <div className="relative z-10 space-y-8 py-4">
                      {unit.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.id}
                          className="flex justify-center"
                          initial={{ opacity: 0, x: skillIndex % 2 === 0 ? -50 : 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: skillIndex * 0.1 }}
                        >
                          <SkillNode skill={skill} onClick={handleSkillClick} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom connector to next unit */}
                    {unitIndex < units.length - 1 && (
                      <div className="flex justify-center py-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* End of path decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏆</span>
          </div>
        </motion.div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </>
  );
};

export default LearningPath;
