
import { Answer, UserInfo, SurveyResult, Question, DimensionResult } from "./types";

// Create the dimension mapping that calculations expects
const dimensionMapping: Record<number, { dimension: string; isReversed: boolean }> = {
  1: { dimension: "S", isReversed: false },
  2: { dimension: "S", isReversed: false },
  3: { dimension: "S", isReversed: false },
  4: { dimension: "L", isReversed: false },
  5: { dimension: "L", isReversed: false },
  6: { dimension: "A", isReversed: false },
  7: { dimension: "A", isReversed: false },
  8: { dimension: "S", isReversed: false },
  9: { dimension: "M", isReversed: false },
  10: { dimension: "S", isReversed: false },
  11: { dimension: "A2", isReversed: false },
  12: { dimension: "S", isReversed: false },
  13: { dimension: "S", isReversed: false },
  14: { dimension: "A2", isReversed: false },
  15: { dimension: "A2", isReversed: false },
  16: { dimension: "I", isReversed: false },
  17: { dimension: "A", isReversed: false },
  18: { dimension: "M", isReversed: false },
  19: { dimension: "M", isReversed: false },
  20: { dimension: "A", isReversed: false },
  21: { dimension: "A2", isReversed: false },
  22: { dimension: "I", isReversed: false },
  23: { dimension: "I", isReversed: false },
  24: { dimension: "I", isReversed: false },
  25: { dimension: "I", isReversed: false },
  26: { dimension: "S", isReversed: false },
  27: { dimension: "L", isReversed: false },
  28: { dimension: "L", isReversed: false },
  29: { dimension: "M", isReversed: false },
  30: { dimension: "A", isReversed: false },
  31: { dimension: "A2", isReversed: false },
  32: { dimension: "A", isReversed: false },
  33: { dimension: "A2", isReversed: false },
  34: { dimension: "I", isReversed: false },
  35: { dimension: "I", isReversed: false },
  36: { dimension: "L", isReversed: false },
  37: { dimension: "S", isReversed: false },
  38: { dimension: "L", isReversed: false },
  39: { dimension: "A2", isReversed: false },
  40: { dimension: "I", isReversed: false },
  41: { dimension: "I", isReversed: false },
  42: { dimension: "L", isReversed: false },
  43: { dimension: "A", isReversed: false },
  44: { dimension: "L", isReversed: false },
  45: { dimension: "A2", isReversed: false },
  46: { dimension: "L", isReversed: false },
  47: { dimension: "S", isReversed: false },
  48: { dimension: "L", isReversed: false },
  49: { dimension: "M", isReversed: false },
  50: { dimension: "M", isReversed: false },
  51: { dimension: "A2", isReversed: false },
  52: { dimension: "A", isReversed: false },
  53: { dimension: "L", isReversed: false },
  54: { dimension: "I", isReversed: false },
  55: { dimension: "I", isReversed: false },
  56: { dimension: "I", isReversed: false },
  57: { dimension: "A2", isReversed: false },
  58: { dimension: "L", isReversed: false },
  59: { dimension: "L", isReversed: false },
  60: { dimension: "M", isReversed: false },
  61: { dimension: "L", isReversed: false },
  62: { dimension: "A", isReversed: false },
  63: { dimension: "M", isReversed: false },
  64: { dimension: "I", isReversed: false },
  65: { dimension: "M", isReversed: false },
  66: { dimension: "M", isReversed: false },
  67: { dimension: "M", isReversed: false },
  68: { dimension: "A2", isReversed: false },
  69: { dimension: "M", isReversed: false },
  70: { dimension: "I", isReversed: false },
  71: { dimension: "M", isReversed: false },
  72: { dimension: "I", isReversed: false },
  73: { dimension: "M", isReversed: false },
  74: { dimension: "M", isReversed: false },
  75: { dimension: "I", isReversed: false },
  76: { dimension: "M", isReversed: false },
  77: { dimension: "A", isReversed: false },
  78: { dimension: "M", isReversed: false },
  79: { dimension: "I", isReversed: false },
  80: { dimension: "A2", isReversed: false },
  81: { dimension: "L", isReversed: false },
  82: { dimension: "L", isReversed: false },
  83: { dimension: "I", isReversed: false },
  84: { dimension: "A", isReversed: false },
  85: { dimension: "M", isReversed: false },
  86: { dimension: "M", isReversed: false },
  87: { dimension: "S", isReversed: false },
  88: { dimension: "L", isReversed: false },
  89: { dimension: "A2", isReversed: false },
  90: { dimension: "I", isReversed: false },
  
  // Archetype questions 91-105
  91: { dimension: "M", isReversed: false },
  92: { dimension: "I", isReversed: false },
  93: { dimension: "I", isReversed: false },
  94: { dimension: "L", isReversed: false },
  95: { dimension: "A", isReversed: false },
  96: { dimension: "I", isReversed: false },
  97: { dimension: "S", isReversed: false },
  98: { dimension: "I", isReversed: false },
  99: { dimension: "A2", isReversed: false },
  100: { dimension: "A", isReversed: false },
  101: { dimension: "S", isReversed: false },
  102: { dimension: "M", isReversed: false },
  103: { dimension: "A2", isReversed: false },
  104: { dimension: "S", isReversed: false },
  105: { dimension: "L", isReversed: false }
};

// Dimension information for display
export const dimensionInfo = {
  S: { title: "אסטרטגיה", description: "חשיבה אסטרטגית ותכנון ארוך טווח" },
  L: { title: "למידה", description: "למידה מתמדת והתפתחות אישית" },
  I: { title: "השראה", description: "יכולת להשפיע ולהשריש" },
  M: { title: "משמעות", description: "יצירת משמעות ומטרה" },
  A: { title: "אדפטיביות", description: "גמישות והסתגלות לשינויים" },
  A2: { title: "אותנטיות", description: "אמינות ויושרה אישית" }
};

// Helper function to get adjusted value based on reverse scoring
export const getAdjustedValue = (value: number, isReversed: boolean): number => {
  return isReversed ? 6 - value : value;
};

interface CalculateSurveyResultProps {
  answers: Answer[];
  questions: Question[];
  userInfo: UserInfo;
}

export const calculateSurveyResult = ({ answers, questions, userInfo }: CalculateSurveyResultProps): SurveyResult => {
  const dimensionScores: Record<string, { sum: number; count: number }> = {};

  answers.forEach((answer) => {
    const questionId = answer.questionId;
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      console.warn(`Question with ID ${questionId} not found.`);
      return;
    }

    const dimension = question.dimension;
    const isReversed = question.isReversed;
    const value = answer.value;

    if (!dimensionScores[dimension]) {
      dimensionScores[dimension] = { sum: 0, count: 0 };
    }

    dimensionScores[dimension].sum += isReversed ? 6 - value : value;
    dimensionScores[dimension].count++;
  });

  const dimensions: Record<string, DimensionResult> = {};

  for (const dimension in dimensionScores) {
    const { sum, count } = dimensionScores[dimension];
    const average = count > 0 ? sum / count : 0;
    const dimensionKey = dimension as keyof typeof dimensionInfo;
    const info = dimensionInfo[dimensionKey] || { title: dimension, description: "" };

    // Get question IDs for this dimension
    const questionIds = answers
      .filter(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        return question?.dimension === dimension;
      })
      .map(answer => answer.questionId);

    dimensions[dimension] = {
      dimension: dimensionKey,
      score: parseFloat(average.toFixed(2)),
      questions: questionIds,
      title: info.title,
      description: info.description
    };
  }

  const slq =
    Object.values(dimensions).reduce((acc, curr) => acc + curr.score, 0) /
    Object.keys(dimensions).length;

  return {
    dimensions: {
      S: dimensions.S,
      L: dimensions.L,
      I: dimensions.I,
      M: dimensions.M,
      A: dimensions.A,
      A2: dimensions.A2,
    },
    slq: parseFloat(slq.toFixed(2)),
    userInfo: userInfo,
    date: new Date().toLocaleDateString('he-IL'),
  };
};

// Export for backward compatibility
export const calculateSurveyResults = (answers: Answer[], userInfo: UserInfo) => {
  // This is a simplified version that doesn't require questions parameter
  // We'll create a minimal questions array from the dimensionMapping
  const questions: Question[] = answers.map(answer => {
    const mapping = dimensionMapping[answer.questionId];
    return {
      id: answer.questionId,
      text: `Question ${answer.questionId}`,
      dimension: mapping?.dimension as any || 'S',
      isReversed: mapping?.isReversed || false
    };
  });

  return calculateSurveyResult({ answers, questions, userInfo });
};
