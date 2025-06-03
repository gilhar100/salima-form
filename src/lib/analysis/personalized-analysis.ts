
import { generateEnhancedDimensionAnalysis, validateAnalysisQuality } from './enhanced-conditional-analysis';

// פונקציה מרכזית לקבלת ניתוח מותאם אישית משופר
export const getPersonalizedAnalysis = (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[],
  userIdentifier?: string
): string => {
  console.log(`Getting enhanced personalized analysis for dimension ${dimension}:`, answersForDimension);
  
  if (answersForDimension.length === 0) {
    return "לא זוהו תשובות רלוונטיות לממד זה. אנא ודא שהשאלון הושלם במלואו.";
  }

  // יצירת זרע ייחודי למשתמש לצורך עקביות
  const userSeed = userIdentifier ? 
    userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
    Date.now();

  // קבלת רשימת מספרי השאלות עבור הממד
  const questionIds = answersForDimension.map(a => a.questionId);
  
  // יצירת ניתוח משופר עם וריאציות
  const analysis = generateEnhancedDimensionAnalysis(questionIds, answersForDimension, userSeed);
  
  // וידוא איכות הניתוח
  if (!validateAnalysisQuality(analysis)) {
    return `בממד ${dimension} נדרש מידע נוסף לצורך ניתוח מדויק יותר.`;
  }
  
  return analysis;
};

// פונקציה לניתוח מפורט של תשובות (נשמרת לתאימות לאחור)
export const analyzeSpecificAnswers = (
  dimension: string, 
  answersForDimension: { questionId: number; value: number }[],
  userIdentifier?: string
): string => {
  return getPersonalizedAnalysis(dimension, answersForDimension, userIdentifier);
};
