
import { generateDimensionAnalysis } from './conditional-analysis';

// הפונקציה המרכזית לקבלת ניתוח מותאם אישית
export const getPersonalizedAnalysis = (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[]
): string => {
  console.log(`Getting personalized analysis for dimension ${dimension}:`, answersForDimension);
  
  if (answersForDimension.length === 0) {
    return "לא זוהו תשובות רלוונטיות לממד זה. אנא ודא שהשאלון הושלם במלואו.";
  }

  // קבלת רשימת מספרי השאלות עבור הממד
  const questionIds = answersForDimension.map(a => a.questionId);
  
  // יצירת ניתוח מותנה על בסיס הציונים
  const analysis = generateDimensionAnalysis(questionIds, answersForDimension);
  
  if (!analysis || analysis.trim() === "") {
    return `בממד ${dimension} נדרש מידע נוסף לצורך ניתוח מדויק יותר.`;
  }
  
  return analysis;
};

// פונקציה לניתוח מפורט של תשובות (נשמרת לתאימות לאחור)
export const analyzeSpecificAnswers = (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[]
): string => {
  return getPersonalizedAnalysis(dimension, answersForDimension);
};
