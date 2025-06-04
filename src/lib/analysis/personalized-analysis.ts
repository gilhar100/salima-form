
import { getParameterParagraph } from './paragraph-generator';

// פונקציה מרכזית לקבלת ניתוח מותאם אישית משופר ללא ציונים
export const getPersonalizedAnalysis = (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[],
  userIdentifier?: string
): string => {
  console.log(`Getting personalized paragraph for dimension ${dimension}:`, answersForDimension);
  
  if (answersForDimension.length === 0) {
    return "לא זוהו תשובות רלוונטיות לממד זה. אנא ודא שהשאלון הושלם במלואו.";
  }

  // יצירת זרע ייחודי למשתמש לצורך עקביות בוריאציות
  const userSeed = userIdentifier ? 
    userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
    Date.now();

  // קבלת פסקה מקיפה מהמחולל החדש
  const paragraph = getParameterParagraph(
    dimension,
    userSeed,
    'neutral' // ברירת מחדל לכינוי נייטרלי
  );
  
  // וידוא איכות הפסקה
  if (!paragraph || paragraph.trim().length < 20) {
    return `בממד ${getDimensionDisplayName(dimension)} נדרש מידע נוסף לצורך ניתוח מדויק יותר.`;
  }
  
  return paragraph;
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
export const analyzeSpecificAnswers = (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[],
  userIdentifier?: string
): string => {
  return getPersonalizedAnalysis(dimension, answersForDimension, userIdentifier);
};
