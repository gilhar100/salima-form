import { enhancedQuestionAnalyses } from './enhanced-question-analyses';
import { selectAdvancedVariation, generateAdvancedVariations } from './advanced-variation-engine';
import { getAdjustedValue } from '@/lib/calculations';
import { questions } from '@/data/questions';

export interface EnhancedConditionalAnalysisResult {
  questionId: number;
  analysis: string;
  dimension: string;
  tone: 'positive' | 'negative' | 'neutral';
  needsBalance: boolean;
  scoreCategory: 'high' | 'moderate' | 'low';
}

// פונקציה לקבלת ניתוח משופר עם וריאציות מתקדמות
export const getEnhancedConditionalAnalysis = (
  questionId: number, 
  score: number, 
  variationSeed: number = 0,
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): EnhancedConditionalAnalysisResult | null => {
  const question = questions.find(q => q.id === questionId);
  if (!question) return null;

  const adjustedScore = getAdjustedValue(score, question.isReversed);
  const analysis = enhancedQuestionAnalyses.find(qa => qa.questionId === questionId);
  
  if (!analysis || !analysis.analyses) return null;

  let selectedVariations: string[] = [];
  let scoreCategory: 'high' | 'moderate' | 'low' = 'moderate';

  // בחירת הניתוחים המתאימים על פי הציון המותאם
  if (analysis.analyses.above3 && adjustedScore > 3) {
    selectedVariations = analysis.analyses.above3;
    scoreCategory = adjustedScore >= 4 ? 'high' : 'moderate';
  } else if (analysis.analyses.below3 && adjustedScore < 3) {
    selectedVariations = analysis.analyses.below3;
    scoreCategory = 'low';
  } else if (analysis.analyses.at3AndAbove && adjustedScore >= 3) {
    selectedVariations = analysis.analyses.at3AndAbove;
    scoreCategory = adjustedScore >= 4 ? 'high' : 'moderate';
  } else if (analysis.analyses.at3AndBelow && adjustedScore <= 3) {
    selectedVariations = analysis.analyses.at3AndBelow;
    scoreCategory = adjustedScore < 2.5 ? 'low' : 'moderate';
  }

  if (selectedVariations.length === 0) return null;

  // בחירת וריאציה על בסיס הזרע עם התאמת מגדר
  const selectedAnalysis = selectAdvancedVariation(selectedVariations, variationSeed);
  
  // זיהוי טון הניתוח
  const tone = identifyTone(selectedAnalysis);
  const needsBalance = (tone === 'negative' || scoreCategory === 'low') && adjustedScore < 4;

  // יצירת ניתוח מאוזן עבור ציונים נמוכים עד בינוניים
  let finalAnalysis = selectedAnalysis;
  if (needsBalance && scoreCategory !== 'high') {
    finalAnalysis = createBalancedAnalysis(selectedAnalysis, adjustedScore, genderHint);
  }

  return {
    questionId,
    analysis: finalAnalysis,
    dimension: analysis.dimension,
    tone,
    needsBalance,
    scoreCategory
  };
};

// פונקציה לזיהוי טון הניתוח
const identifyTone = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveKeywords = ["מצוין", "טוב", "חזק", "מוצלח", "יעיל", "מפותח", "מתאפיין", "מחובר", "משדר", "מהווה", "מעורר", "מלהיב", "מקדם"];
  const negativeKeywords = ["קושי", "חסר", "נמוך", "בעייתי", "חלש", "מתקשה", "חוסר", "ייתכן ו", "רצוי", "מתעלם", "נמנע"];
  
  const lowercaseText = text.toLowerCase();
  const hasPositive = positiveKeywords.some(keyword => lowercaseText.includes(keyword));
  const hasNegative = negativeKeywords.some(keyword => lowercaseText.includes(keyword));
  
  if (hasPositive && !hasNegative) return 'positive';
  if (hasNegative && !hasPositive) return 'negative';
  return 'neutral';
};

// פונקציה ליצירת ניתוח מאוזן
const createBalancedAnalysis = (
  analysis: string, 
  score: number, 
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string => {
  const balancingPhrases = [
    "חשוב להמשיך ולפתח",
    "יש מקום לחיזוק",
    "כדאי להשקיע ב",
    "רצוי להתמקד ב",
    "ניתן לשפר"
  ];
  
  // אם הניתוח כבר מאוזן, החזר כפי שהוא
  if (analysis.includes("רצוי") || analysis.includes("כדאי") || analysis.includes("חשוב")) {
    return analysis;
  }
  
  // עבור ציונים נמוכים, הוסף הנחיה לפיתוח
  if (score < 3.5) {
    const balancePhrase = balancingPhrases[Math.floor(Math.random() * balancingPhrases.length)];
    const skillArea = extractSkillArea(analysis);
    
    if (skillArea) {
      return `${analysis} ${balancePhrase} ${skillArea}.`;
    }
  }
  
  return analysis;
};

// פונקציה לחילוץ תחום המיומנות מהניתוח
const extractSkillArea = (analysis: string): string => {
  const skillKeywords = {
    "הקשבה": "כישורי הקשבה",
    "גמישות": "גמישות מחשבתית",
    "חזון": "קשר לחזון",
    "למידה": "למידה מתמדת",
    "מנהיגות": "מנהיגות אישית",
    "שיתוף": "שיתוף פעולה",
    "משמעות": "יצירת משמעות"
  };
  
  for (const [keyword, skill] of Object.entries(skillKeywords)) {
    if (analysis.includes(keyword)) {
      return skill;
    }
  }
  
  return "התחום הזה";
};

// פונקציה ליצירת ניתוח מקיף עם מניעת סתירות
export const generateEnhancedDimensionAnalysis = (
  dimensionQuestions: number[],
  answers: { questionId: number; value: number }[],
  userSeed: number = Date.now(),
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string => {
  const analyses: EnhancedConditionalAnalysisResult[] = [];

  // איסוף כל הניתוחים
  dimensionQuestions.forEach((questionId, index) => {
    const answer = answers.find(a => a.questionId === questionId);
    if (answer) {
      const variationSeed = userSeed + index;
      const analysis = getEnhancedConditionalAnalysis(questionId, answer.value, variationSeed, genderHint);
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

  // חיבור פשוט של הניתוחים
  return combineAnalysesSimply(consistentAnalyses, genderHint);
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

// פונקציה לחיבור פשוט של ניתוחים
const combineAnalysesSimply = (
  analyses: EnhancedConditionalAnalysisResult[], 
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string => {
  const simpleConnectors = ["כמו כן", "בנוסף", "יחד עם זאת"];
  
  let result = analyses[0].analysis;
  
  // הוספת ניתוח נוסף אחד בלבד לשמירה על פשטות
  if (analyses.length > 1) {
    const connector = simpleConnectors[0]; // תמיד אותו מחבר לעקביות
    result += `. ${connector}, ${analyses[1].analysis}`;
  }
  
  return result;
};

// פונקציה לבדיקת מתאימות מחבר
const shouldUseConnector = (firstPart: string, secondPart: string): boolean => {
  const firstTone = identifyTone(firstPart);
  const secondTone = identifyTone(secondPart);
  
  // אל תשתמש במחבר אם יש סתירה בטון
  return firstTone === secondTone || firstTone === 'neutral' || secondTone === 'neutral';
};

// פונקציה לבדיקת איכות הניתוח
export const validateAnalysisQuality = (analysis: string): boolean => {
  if (!analysis || analysis.trim().length < 10) return false;
  if (analysis.includes("undefined") || analysis.includes("null")) return false;
  
  // וידוא שאין רמזים מספריים
  const hasNumericalReferences = /\d+\s*(ומעלה|ומטה|נקודות)|מתחת\s*ל\d+|מעל\s*\d+|ציון/.test(analysis);
  if (hasNumericalReferences) return false;
  
  const wordCount = analysis.split(" ").length;
  return wordCount >= 5 && wordCount <= 300;
};
