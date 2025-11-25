import api from './api';
import { Course, Skill, Lesson, ApiResponse } from '../types';

export const courseService = {
  async getCourse(language: string): Promise<Course> {
    const response = await api.get<ApiResponse<{ course: Course }>>(
      `/courses/${language}`
    );
    if (response.data.data) {
      return response.data.data.course;
    }
    throw new Error('Failed to get course');
  },

  async getSkill(skillId: string): Promise<Skill> {
    const response = await api.get<ApiResponse<{ skill: Skill }>>(
      `/skills/${skillId}`
    );
    if (response.data.data) {
      return response.data.data.skill;
    }
    throw new Error('Failed to get skill');
  },

  async getLesson(lessonId: string): Promise<Lesson> {
    const response = await api.get<ApiResponse<{ lesson: Lesson }>>(
      `/lessons/${lessonId}`
    );
    if (response.data.data) {
      return response.data.data.lesson;
    }
    throw new Error('Failed to get lesson');
  },
};
