
import { Answer } from "@/lib/types";
import { generateIntelligentParagraph } from "./enhanced-paragraph-generator";

// פונקציה מרכזית ליצירת ניתוח מותאם אישית משופר
export const getEnhancedPersonalizedAnalysis = (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): string => {
  console.log(`Generating intelligent analysis for dimension ${dimension}:`, answers);
  
  if (answers.length === 0) {
    return "לא נמצאו תשובות רלוונטיות לממד זה.";
  }

  // שימוש במחולל הפסקאות החכם
  const analysis = generateIntelligentParagraph(dimension, answers, userIdentifier);
  
  // וידוא איכות הפסקה
  if (!analysis || analysis.trim().length < 30) {
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

// ייצוא הפונקציה הראשית לתאימות לאחור
export const generateDimensionAnalysis = getEnhancedPersonalizedAnalysis;
