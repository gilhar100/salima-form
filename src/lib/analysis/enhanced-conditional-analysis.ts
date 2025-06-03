
import { enhancedQuestionAnalyses } from './enhanced-question-analyses';
import { selectRandomVariation, removeNumericalReferences } from './variation-engine';
import { getAdjustedValue } from '@/lib/calculations';
import { questions } from '@/data/questions';

export interface EnhancedConditionalAnalysisResult {
  questionId: number;
  analysis: string;
  dimension: string;
  tone: 'positive' | 'negative' | 'neutral';
  needsBalance: boolean;
}

// פונקציה לקבלת ניתוח משופר עם וריאציות - ללא חשיפת ציונים
export const getEnhancedConditionalAnalysis = (
  questionId: number, 
  score: number, 
  variationSeed: number = 0
): EnhancedConditionalAnalysisResult | null => {
  const question = questions.find(q => q.id === questionId);
  if (!question) return null;

  const adjustedScore = getAdjustedValue(score, question.isReversed);
  const analysis = enhancedQuestionAnalyses.find(qa => qa.questionId === questionId);
  
  if (!analysis || !analysis.analyses) return null;

  let selectedVariations: string[] = [];

  // בחירת הניתוחים המתאימים על פי הציון המותאם - ללא חשיפה
  if (analysis.analyses.above3 && adjustedScore > 3) {
    selectedVariations = analysis.analyses.above3;
  } else if (analysis.analyses.below3 && adjustedScore < 3) {
    selectedVariations = analysis.analyses.below3;
  } else if (analysis.analyses.at3AndAbove && adjustedScore >= 3) {
    selectedVariations = analysis.analyses.at3AndAbove;
  } else if (analysis.analyses.at3AndBelow && adjustedScore <= 3) {
    selectedVariations = analysis.analyses.at3AndBelow;
  }

  if (selectedVariations.length === 0) return null;

  // בחירת וריאציה על בסיס הזרע
  const selectedAnalysis = selectRandomVariation(selectedVariations, variationSeed);
  
  // הסרת רמזים מספריים מהטקסט הסופי
  const cleanAnalysis = removeNumericalReferences(selectedAnalysis);
  
  // זיהוי טון הניתוח
  const tone = identifyTone(cleanAnalysis);
  const needsBalance = tone === 'negative' && adjustedScore < 4;

  return {
    questionId,
    analysis: cleanAnalysis,
    dimension: analysis.dimension,
    tone,
    needsBalance
  };
};

// פונקציה לזיהוי טון הניתוח
const identifyTone = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveKeywords = ["מצוין", "טוב", "חזק", "מוצלח", "יעיל", "מפותח", "מתאפיין", "מחובר", "משדר", "מהווה", "מעורר", "מלהיב"];
  const negativeKeywords = ["קושי", "חסר", "נמוך", "בעייתי", "חלש", "מתקשה", "חוסר", "ייתכן ו", "רצוי", "מתעלם", "נמנע"];
  
  const lowercaseText = text.toLowerCase();
  const hasPositive = positiveKeywords.some(keyword => lowercaseText.includes(keyword));
  const hasNegative = negativeKeywords.some(keyword => lowercaseText.includes(keyword));
  
  if (hasPositive && !hasNegative) return 'positive';
  if (hasNegative && !hasPositive) return 'negative';
  return 'neutral';
};

// פונקציה ליצירת ניתוח מקיף עם מניעת סתירות - ללא ציונים
export const generateEnhancedDimensionAnalysis = (
  dimensionQuestions: number[],
  answers: { questionId: number; value: number }[],
  userSeed: number = Date.now()
): string => {
  const analyses: EnhancedConditionalAnalysisResult[] = [];

  // איסוף כל הניתוחים
  dimensionQuestions.forEach((questionId, index) => {
    const answer = answers.find(a => a.questionId === questionId);
    if (answer) {
      const variationSeed = userSeed + index;
      const analysis = getEnhancedConditionalAnalysis(questionId, answer.value, variationSeed);
      if (analysis && analysis.analysis.trim()) {
        analyses.push(analysis);
      }
    }
  });

  if (analyses.length === 0) return "";
  
  // סינון לפי עקביות טון
  const consistentAnalyses = filterByConsistentTone(analyses);
  
  if (consistentAnalyses.length === 0) return "";
  
  if (consistentAnalyses.length === 1) {
    return consistentAnalyses[0].analysis;
  }

  // חיבור הניתוחים לפסקה קוהרנטית ללא ציונים
  return combineAnalysesNaturally(consistentAnalyses, userSeed);
};

// פונקציה לסינון ניתוחים על פי טון עקבי
const filterByConsistentTone = (analyses: EnhancedConditionalAnalysisResult[]): EnhancedConditionalAnalysisResult[] => {
  // ספירת טונים
  const toneCount = analyses.reduce((acc, analysis) => {
    acc[analysis.tone] = (acc[analysis.tone] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // מציאת הטון הדומיננטי
  const dominantTone = Object.entries(toneCount).reduce((a, b) => 
    toneCount[a[0]] > toneCount[b[0]] ? a : b
  )[0];
  
  // החזרת ניתוחים עקביים או נייטרליים
  return analyses.filter(analysis => 
    analysis.tone === dominantTone || analysis.tone === 'neutral'
  );
};

// פונקציה לחיבור טבעי של ניתוחים ללא ציונים
const combineAnalysesNaturally = (analyses: EnhancedConditionalAnalysisResult[], seed: number): string => {
  const connectors = [
    "בנוסף,", "כמו כן,", "יחד עם זאת,", "יתרה מכך,", "במקביל,", "לעומת זאת,", "בהקשר זה,"
  ];
  
  let result = analyses[0].analysis;
  
  for (let i = 1; i < analyses.length; i++) {
    const connectorIndex = (seed + i) % connectors.length;
    const connector = connectors[connectorIndex];
    
    // הוספת מחבר והמשפט הבא
    result += ` ${connector} ${analyses[i].analysis}`;
  }
  
  return removeNumericalReferences(result);
};

// פונקציה לבדיקת איכות הניתוח - ללא ציונים
export const validateAnalysisQuality = (analysis: string): boolean => {
  if (!analysis || analysis.trim().length < 10) return false;
  if (analysis.includes("undefined") || analysis.includes("null")) return false;
  
  // וידוא שאין רמזים מספריים
  const hasNumericalReferences = /\d+\s*(ומעלה|ומטה|נקודות)|מתחת\s*ל\d+|מעל\s*\d+|ציון/.test(analysis);
  if (hasNumericalReferences) return false;
  
  const wordCount = analysis.split(" ").length;
  return wordCount >= 5 && wordCount <= 300;
};
