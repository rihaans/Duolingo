import api from './api';
import { ApiResponse, LessonCompleteResponse, Lesson } from '../types';

export const lessonService = {
  async getLesson(lessonId: string): Promise<Lesson> {
    const response = await api.get<ApiResponse<{ lesson: Lesson }>>(`/lessons/${lessonId}`);
    if (response.data.data && response.data.data.lesson) {
      return response.data.data.lesson;
    }
    // Fallback: if lesson is directly in data
    if (response.data.data) {
      return response.data.data as any as Lesson;
    }
    throw new Error('Failed to get lesson');
  },

  async startLesson(lessonId: string): Promise<{ hearts: number }> {
    const response = await api.post<ApiResponse<{ hearts: number }>>(
      `/lessons/${lessonId}/start`
    );
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to start lesson');
  },

  async submitAnswer(
    lessonId: string,
    data: {
      questionId: string;
      answer: string;
      isCorrect: boolean;
      correctAnswer: string;
      questionText: string;
      questionType: string;
    }
  ): Promise<{
    isCorrect: boolean;
    xpEarned: number;
    hearts: number;
    outOfHearts: boolean;
  }> {
    const response = await api.post(
      `/lessons/${lessonId}/submit-answer`,
      data
    );
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to submit answer');
  },

  async completeLesson(
    lessonId: string,
    data: {
      correctAnswers: number;
      totalQuestions: number;
      isPractice?: boolean;
    }
  ): Promise<LessonCompleteResponse> {
    const response = await api.post<ApiResponse<LessonCompleteResponse>>(
      `/lessons/${lessonId}/complete`,
      data
    );
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to complete lesson');
  },
};
