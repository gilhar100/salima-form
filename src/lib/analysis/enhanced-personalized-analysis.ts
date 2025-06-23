
import { Answer } from "@/lib/types";
import { generateSalimaParagraphs } from "./salima-paragraph-generator";

// פונקציה מרכזית ליצירת ניתוח מותאם אישית משופר
export const getEnhancedPersonalizedAnalysis = async (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): Promise<string> => {
  console.log(`Generating intelligent analysis for dimension ${dimension}:`, answers);
  
  if (answers.length === 0) {
    return "לא נמצאו תשובות רלוונטיות לממד זה.";
  }

  try {
    // יצירת פסקאות SALIMA מותאמות אישית
    const paragraphs = await generateSalimaParagraphs(answers, userIdentifier);
    
    // מיפוי הממדים לשמות התצוגה
    const dimensionNameMap: Record<string, string> = {
      'S': 'אסטרטגיה',
      'L': 'לומד',
      'I': 'השראה',
      'M': 'משמעות',
      'A': 'אדפטיביות',
      'A2': 'אותנטיות'
    };
    
    const dimensionDisplayName = dimensionNameMap[dimension];
    const analysis = paragraphs[dimensionDisplayName];
    
    if (!analysis || analysis.trim().length < 30) {
      return `בממד ${getDimensionDisplayName(dimension)} נדרש מידע נוסף לצורך ניתוח מדויק יותר.`;
    }
    
    return analysis;
  } catch (error) {
    console.error('Error in enhanced personalized analysis:', error);
    return `שגיאה ביצירת ניתוח עבור ממד ${getDimensionDisplayName(dimension)}.`;
  }
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
