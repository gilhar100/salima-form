
import { getEnhancedPersonalizedAnalysis } from './enhanced-personalized-analysis';

// פונקציה מרכזית לקבלת ניתוח מותאם אישית משופר ללא ציונים
export const getPersonalizedAnalysis = async (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[],
  userIdentifier?: string
): Promise<string> => {
  console.log(`Getting personalized paragraph for dimension ${dimension}:`, answersForDimension);
  
  if (answersForDimension.length === 0) {
    return "לא זוהו תשובות רלוונטיות לממד זה. אנא ודא שהשאלון הושלם במלואו.";
  }

  // שימוש במנוע הניתוח החדש
  const analysis = await getEnhancedPersonalizedAnalysis(dimension, answersForDimension, userIdentifier);
  
  // וידוא איכות הפסקה
  if (!analysis || analysis.trim().length < 20) {
    return `בממד ${getDimensionDisplayName(dimension)} נדרש מידע נוסף לצורך ניתוח מדויק יותר.`;
  }
  
  return analysis;
};

// פונקציה לקבלת שם תצוגה של ממד
const getDimensionDisplayName = (dimension: string): string => {
  const dimensionNames: Record<string, string> = {
    'S': 'חשיבה אסטרטגית',
    'L': 'למידה',
    'I': 'השראה',
    'M': 'משמעות',
    'A': 'הסתגלות',
    'A2': 'אותנטיות'
  };
  
  return dimensionNames[dimension] || dimension;
};

// פונקציה לניתוח מפורט של תשובות (נשמרת לתאימות לאחור)
export const analyzeSpecificAnswers = async (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[],
  userIdentifier?: string
): Promise<string> => {
  return await getPersonalizedAnalysis(dimension, answersForDimension, userIdentifier);
};
