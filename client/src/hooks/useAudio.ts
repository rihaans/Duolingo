import { useCallback, useRef } from 'react';
import { soundGenerator } from '../utils/soundGenerator';

export const useAudio = () => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const useGeneratedSounds = useRef<boolean>(true); // Use generated sounds by default

  const playSound = useCallback((soundName: string, generatorFallback?: () => void) => {
    // If using generated sounds or audio file fails, use Web Audio API
    if (useGeneratedSounds.current && generatorFallback) {
      generatorFallback();
      return;
    }

    try {
      if (!audioRefs.current[soundName]) {
        audioRefs.current[soundName] = new Audio(`/sounds/${soundName}.mp3`);
        audioRefs.current[soundName].volume = 0.5;
      }

      const audio = audioRefs.current[soundName];
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.log('Audio file not found, using generated sound');
        // Fallback to generated sound if audio file fails
        if (generatorFallback) {
          generatorFallback();
        }
      });
    } catch (error) {
      console.log('Error loading sound file, using generated sound');
      if (generatorFallback) {
        generatorFallback();
      }
    }
  }, []);

  const playCorrect = useCallback(() => {
    playSound('correct', () => soundGenerator.playCorrectSound());
  }, [playSound]);

  const playIncorrect = useCallback(() => {
    playSound('incorrect', () => soundGenerator.playIncorrectSound());
  }, [playSound]);

  const playLessonComplete = useCallback(() => {
    playSound('lesson-complete', () => soundGenerator.playLessonCompleteSound());
  }, [playSound]);

  const playLevelUp = useCallback(() => {
    playSound('level-up', () => soundGenerator.playLevelUpSound());
  }, [playSound]);

  const playHeartBreak = useCallback(() => {
    playSound('heart-break', () => soundGenerator.playHeartBreakSound());
  }, [playSound]);

  return {
    playSound,
    playCorrect,
    playIncorrect,
    playLessonComplete,
    playLevelUp,
    playHeartBreak,
  };
};
