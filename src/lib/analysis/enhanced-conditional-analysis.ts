
import { enhancedQuestionAnalyses } from './enhanced-question-analyses';
import { selectRandomVariation, createVariation } from './variation-engine';
import { getAdjustedValue } from '@/lib/calculations';
import { questions } from '@/data/questions';

export interface EnhancedConditionalAnalysisResult {
  questionId: number;
  analysis: string;
  score: number;
  adjustedScore: number;
  dimension: string;
}

// פונקציה לקבלת ניתוח משופר עם וריאציות
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

  // בחירת הניתוחים המתאימים על פי הציון המותאם
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

  // בחירת וריאציה על בסיס הזרע (seed) כדי להבטיח עקביות לאותו משתמש
  const variationIndex = variationSeed % selectedVariations.length;
  const selectedAnalysis = selectedVariations[variationIndex];

  return {
    questionId,
    analysis: selectedAnalysis,
    score,
    adjustedScore,
    dimension: analysis.dimension
  };
};

// פונקציה ליצירת ניתוח מקיף עם מניעת סתירות
export const generateEnhancedDimensionAnalysis = (
  dimensionQuestions: number[],
  answers: { questionId: number; value: number }[],
  userSeed: number = Date.now()
): string => {
  const analyses: EnhancedConditionalAnalysisResult[] = [];
  const dimensionInsights: Record<string, string[]> = {};

  // איסוף כל הניתוחים
  dimensionQuestions.forEach((questionId, index) => {
    const answer = answers.find(a => a.questionId === questionId);
    if (answer) {
      const variationSeed = userSeed + index; // זרע ייחודי לכל שאלה
      const analysis = getEnhancedConditionalAnalysis(questionId, answer.value, variationSeed);
      if (analysis && analysis.analysis.trim()) {
        analyses.push(analysis);
        
        // קיבוץ תובנות לפי ממד
        if (!dimensionInsights[analysis.dimension]) {
          dimensionInsights[analysis.dimension] = [];
        }
        dimensionInsights[analysis.dimension].push(analysis.analysis);
      }
    }
  });

  if (analyses.length === 0) return "";
  
  // בדיקת עקביות וסינון סתירות
  const consistentAnalyses = filterConsistentAnalyses(analyses);
  
  if (consistentAnalyses.length === 0) return "";
  
  if (consistentAnalyses.length === 1) {
    return consistentAnalyses[0].analysis;
  }

  // חיבור הניתוחים לפסקה קוהרנטית
  return combineAnalysesNaturally(consistentAnalyses, userSeed);
};

// פונקציה לסינון ניתוחים עקביים
const filterConsistentAnalyses = (analyses: EnhancedConditionalAnalysisResult[]): EnhancedConditionalAnalysisResult[] => {
  // מילות מפתח חיוביות ושליליות
  const positiveKeywords = ["מצוין", "טוב", "חזק", "מוצלח", "יעיל", "מפותח", "מתאפיינ", "מחובר", "משדר", "מהווה"];
  const negativeKeywords = ["קושי", "חסר", "נמוך", "בעייתי", "חלש", "מתקשה", "חוסר", "ייתכן ו", "רצוי"];
  
  const categorizedAnalyses = analyses.map(analysis => {
    const text = analysis.analysis.toLowerCase();
    const isPositive = positiveKeywords.some(keyword => text.includes(keyword));
    const isNegative = negativeKeywords.some(keyword => text.includes(keyword));
    
    return {
      ...analysis,
      tone: isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'
    };
  });
  
  // בחירת ניתוחים עקביים בטון
  const toneCount = categorizedAnalyses.reduce((acc, analysis) => {
    acc[analysis.tone] = (acc[analysis.tone] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const dominantTone = Object.entries(toneCount).reduce((a, b) => toneCount[a[0]] > toneCount[b[0]] ? a : b)[0];
  
  return categorizedAnalyses
    .filter(analysis => analysis.tone === dominantTone || analysis.tone === 'neutral')
    .map(({ tone, ...rest }) => rest);
};

// פונקציה לחיבור טבעי של ניתוחים
const combineAnalysesNaturally = (analyses: EnhancedConditionalAnalysisResult[], seed: number): string => {
  const connectors = [
    "בנוסף,", "כמו כן,", "יחד עם זאת,", "מאידך,", "יתרה מכך,", 
    "עם זאת,", "כתוצאה מכך,", "במקביל,", "באופן דומה,", "יתר על כן,"
  ];
  
  let result = analyses[0].analysis;
  
  for (let i = 1; i < analyses.length; i++) {
    const connectorIndex = (seed + i) % connectors.length;
    const connector = connectors[connectorIndex];
    
    // הוספת מחבר והמשפט הבא
    result += ` ${connector} ${analyses[i].analysis}`;
  }
  
  return result;
};

// פונקציה לבדיקת איכות הניתוח
export const validateAnalysisQuality = (analysis: string): boolean => {
  // בדיקות בסיסיות לאיכות הניתוח
  if (!analysis || analysis.trim().length < 10) return false;
  if (analysis.includes("undefined") || analysis.includes("null")) return false;
  
  // בדיקת אורך סביר
  const wordCount = analysis.split(" ").length;
  return wordCount >= 5 && wordCount <= 200;
};
