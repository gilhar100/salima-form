
import { Answer } from "@/lib/types";
import { createInsightMap, getQuestionReversed } from "./question-insights-data";

// פונקציה לחישוב ציון אפקטיבי של שאלה
export const calculateEffectiveScore = (questionId: number, value: number): number => {
  const isReversed = getQuestionReversed(questionId);
  return isReversed ? (6 - value) : value;
};

// פונקציה לסינון תשובות רלוונטיות לממד
export const filterAnswersForDimension = (
  dimension: string,
  answers: Answer[]
): Answer[] => {
  const insightMap = createInsightMap();
  
  return answers.filter(answer => {
    const insight = insightMap.get(answer.questionId);
    return insight && insight.dimension === dimension;
  });
};

// פונקציה לקבלת תובנה מתאימה לפי ציון
export const getInsightText = (questionId: number, value: number): string | null => {
  const insightMap = createInsightMap();
  const insight = insightMap.get(questionId);
  
  if (!insight) return null;
  
  const effectiveValue = calculateEffectiveScore(questionId, value);
  
  // בחירת התובנה המתאימה לפי הכלל החדש:
  // אם הציון הסופי מעל 3 → high_text
  // אם הציון הסופי 3 או פחות → low_text
  const selectedInsight = effectiveValue > 3 ? insight.high_text : insight.low_text;
  
  return (selectedInsight && selectedInsight !== "nan") ? selectedInsight : null;
};

// פונקציה לחישוב סטטיסטיקות ממד
export const calculateDimensionStats = (answers: Answer[]): {
  averageScore: number;
  totalQuestions: number;
  positiveCount: number;
  developmentalCount: number;
} => {
  if (answers.length === 0) {
    return { averageScore: 0, totalQuestions: 0, positiveCount: 0, developmentalCount: 0 };
  }

  let totalScore = 0;
  let positiveCount = 0;
  let developmentalCount = 0;

  answers.forEach(answer => {
    const effectiveScore = calculateEffectiveScore(answer.questionId, answer.value);
    totalScore += effectiveScore;
    
    if (effectiveScore > 3) {
      positiveCount++;
    } else {
      developmentalCount++;
    }
  });

  return {
    averageScore: totalScore / answers.length,
    totalQuestions: answers.length,
    positiveCount,
    developmentalCount
  };
};
