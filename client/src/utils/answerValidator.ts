// Answer validation utilities

export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[¿?¡!.,;:]/g, '')
    .replace(/\s+/g, ' ');
};

export const validateAnswer = (
  userAnswer: string,
  correctAnswer: string | string[]
): boolean => {
  const normalizedUserAnswer = normalizeText(userAnswer);

  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some(
      (answer) => normalizeText(answer) === normalizedUserAnswer
    );
  }

  return normalizeText(correctAnswer) === normalizedUserAnswer;
};

export const isSimilar = (str1: string, str2: string, threshold: number = 0.8): boolean => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) {
    return true;
  }

  const editDistance = levenshteinDistance(longer, shorter);
  const similarity = (longer.length - editDistance) / longer.length;

  return similarity >= threshold;
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};
