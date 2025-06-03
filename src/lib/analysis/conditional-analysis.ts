
import { questionAnalyses, QuestionAnalysis } from './question-analyses';
import { getAdjustedValue } from '@/lib/calculations';
import { questions } from '@/data/questions';

export interface ConditionalAnalysisResult {
  questionId: number;
  analysis: string;
  score: number;
  adjustedScore: number;
}

// פונקציה ליצירת וריאציות בניסוח
const createVariations = (text: string, index: number): string => {
  const variations = [
    { prefix: "ניכר כי ", suffix: "" },
    { prefix: "עולה כי ", suffix: "" },
    { prefix: "נראה ש", suffix: "" },
    { prefix: "", suffix: " - דבר המעיד על יכולותיך" },
    { prefix: "", suffix: " - תכונה חשובה בעבודתך" },
    { prefix: "", suffix: "" }
  ];
  
  const variation = variations[index % variations.length];
  return `${variation.prefix}${text}${variation.suffix}`;
};

// פונקציה לקבלת ניתוח מותנה לשאלה ספציפית
export const getConditionalAnalysis = (
  questionId: number, 
  score: number, 
  variationIndex: number = 0
): ConditionalAnalysisResult | null => {
  const question = questions.find(q => q.id === questionId);
  if (!question) return null;

  const adjustedScore = getAdjustedValue(score, question.isReversed);
  const analysis = questionAnalyses.find(qa => qa.questionId === questionId);
  
  if (!analysis || !analysis.analyses) return null;

  let selectedAnalysis = "";

  // בחירת הניתוח המתאים על פי הציון המותאם
  if (analysis.analyses.above3 && adjustedScore > 3) {
    selectedAnalysis = analysis.analyses.above3;
  } else if (analysis.analyses.below3 && adjustedScore < 3) {
    selectedAnalysis = analysis.analyses.below3;
  } else if (analysis.analyses.at3AndAbove && adjustedScore >= 3) {
    selectedAnalysis = analysis.analyses.at3AndAbove;
  } else if (analysis.analyses.at3AndBelow && adjustedScore <= 3) {
    selectedAnalysis = analysis.analyses.at3AndBelow;
  }

  if (!selectedAnalysis) return null;

  // יצירת וריאציה בניסוח
  const variedAnalysis = createVariations(selectedAnalysis, variationIndex);

  return {
    questionId,
    analysis: variedAnalysis,
    score,
    adjustedScore
  };
};

// פונקציה ליצירת ניתוח מקיף לכל הממדים
export const generateDimensionAnalysis = (
  dimensionQuestions: number[],
  answers: { questionId: number; value: number }[]
): string => {
  const analyses: string[] = [];
  let variationIndex = 0;

  dimensionQuestions.forEach(questionId => {
    const answer = answers.find(a => a.questionId === questionId);
    if (answer) {
      const analysis = getConditionalAnalysis(questionId, answer.value, variationIndex);
      if (analysis && analysis.analysis.trim()) {
        analyses.push(analysis.analysis);
        variationIndex++;
      }
    }
  });

  // חיבור הניתוחים לפסקה אחת קוהרנטית
  if (analyses.length === 0) return "";
  
  if (analyses.length === 1) {
    return analyses[0];
  }

  // חיבור מספר ניתוחים עם מחברים מתאימים
  const connectors = ["בנוסף, ", "כמו כן, ", "יחד עם זאת, ", "מאידך, ", "יתרה מכך, "];
  let result = analyses[0];
  
  for (let i = 1; i < analyses.length; i++) {
    const connector = connectors[(i - 1) % connectors.length];
    result += ` ${connector}${analyses[i]}`;
  }

  return result;
};

// פונקציה לבדיקת סתירות בניתוח
export const checkForContradictions = (analyses: string[]): boolean => {
  const positiveWords = ["מצוין", "טוב", "חזק", "מוצלח", "יעיל"];
  const negativeWords = ["קושי", "חסר", "נמוך", "בעייתי", "חלש"];
  
  let hasPositive = false;
  let hasNegative = false;
  
  analyses.forEach(analysis => {
    const lowerAnalysis = analysis.toLowerCase();
    if (positiveWords.some(word => lowerAnalysis.includes(word))) {
      hasPositive = true;
    }
    if (negativeWords.some(word => lowerAnalysis.includes(word))) {
      hasNegative = true;
    }
  });
  
  return hasPositive && hasNegative;
};
