
import { Answer } from "@/lib/types";
import { 
  filterAnswersForDimension, 
  getInsightText, 
  calculateDimensionStats 
} from "./scoring-logic";
import { combineInsightsNaturally } from "./paragraph-composition";

// פונקציה ליצירת ניתוח מקיף וייחודי לכל ממד
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

  // יצירת תובנות בהתבסס על הציונים הפרטניים של כל שאלה
  const insights: string[] = [];
  
  relevantAnswers.forEach(answer => {
    // קבלת התובנה המתאימה לפי הכלל: מעל 3 = high_text, 3 ומטה = low_text
    const insightText = getInsightText(answer.questionId, answer.value);
    if (insightText && insightText.trim() && insightText !== "nan") {
      insights.push(insightText);
    }
  });

  if (insights.length === 0) {
    return "לא נמצאו תובנות מתאימות לממד זה.";
  }

  // יצירת פסקה ייחודית ומותאמת אישית
  const personalizedParagraph = combineInsightsNaturally(insights, dimension, userIdentifier);
  
  // וידוא שהפסקה אינה ריקה או קצרה מדי
  if (!personalizedParagraph || personalizedParagraph.trim().length < 15) {
    return insights[0]; // החזרת התובנה הראשונה כגיבוי
  }
  
  return personalizedParagraph;
};

// ייצוא הפונקציה הראשית
export const getEnhancedPersonalizedAnalysis = (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): string => {
  return generateDimensionAnalysis(dimension, answers, userIdentifier);
};
