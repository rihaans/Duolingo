import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { courseService } from '../services/courseService';
import { useAuth } from '../hooks/useAuth';
import { Course, Skill, Lesson } from '../types';

interface CourseContextType {
  course: Course | null;
  skills: Skill[];
  loading: boolean;
  error: string | null;
  refreshCourse: () => Promise<void>;
  getSkillById: (skillId: string) => Skill | undefined;
  getLessonById: (lessonId: string) => Lesson | undefined;
  unlockNextSkill: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch course data when user logs in
  useEffect(() => {
    if (user) {
      fetchCourse();
    } else {
      // Clear course when user logs out
      setCourse(null);
      setSkills([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);

      // Default to Spanish course
      const courseData = await courseService.getCourse('spanish');
      setCourse(courseData);

      // Flatten all skills from all units
      const allSkills = courseData.units.flatMap(unit => unit.skills);
      setSkills(allSkills);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course data');
      setLoading(false);
    }
  };

  const refreshCourse = async () => {
    await fetchCourse();
  };

  const getSkillById = (skillId: string): Skill | undefined => {
    return skills.find(skill => skill.id === skillId);
  };

  const getLessonById = (lessonId: string): Lesson | undefined => {
    for (const skill of skills) {
      const lesson = skill.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return lesson;
      }
    }
    return undefined;
  };

  const unlockNextSkill = async () => {
    // Find the next locked skill and unlock it
    const nextLockedSkill = skills.find(skill => !skill.isUnlocked);

    if (nextLockedSkill) {
      try {
        // Update skill unlock status on backend
        // await skillService.unlockSkill(nextLockedSkill.id);

        // For now, just update local state
        setSkills(prevSkills =>
          prevSkills.map(skill =>
            skill.id === nextLockedSkill.id
              ? { ...skill, isUnlocked: true }
              : skill
          )
        );

        // Refresh course to get latest data
        await fetchCourse();
      } catch (err) {
        console.error('Error unlocking skill:', err);
      }
    }
  };

  const value: CourseContextType = {
    course,
    skills,
    loading,
    error,
    refreshCourse,
    getSkillById,
    getLessonById,
    unlockNextSkill,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};
