
import { Answer } from "@/lib/types";
import { 
  filterAnswersForDimension, 
  getInsightText, 
  calculateDimensionStats 
} from "./scoring-logic";
import { combineInsightsNaturally } from "./paragraph-composition";

// פונקציה ליצירת ניתוח מקיף לכל ממד
export const generateDimensionAnalysis = (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): string => {
  
  // סינון התשובות הרלוונטיות לממד
  const relevantAnswers = filterAnswersForDimension(dimension, answers);

  if (relevantAnswers.length === 0) {
    return "לא נמצאו תשובות רלוונטיות לממד זה.";
  }

  // יצירת תובנות בהתבסס על הציונים
  const insights: string[] = [];
  
  relevantAnswers.forEach(answer => {
    const insightText = getInsightText(answer.questionId, answer.value);
    if (insightText) {
      insights.push(insightText);
    }
  });

  if (insights.length === 0) {
    return "לא נמצאו תובנות מתאימות לממד זה.";
  }

  // שילוב התובנות לפסקה מקיפה בסגנון טבעי
  return combineInsightsNaturally(insights, dimension, userIdentifier);
};

// ייצוא הפונקציה הראשית
export const getEnhancedPersonalizedAnalysis = (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): string => {
  return generateDimensionAnalysis(dimension, answers, userIdentifier);
};
