
import { Answer, UserInfo, SurveyResult, Question, DimensionResult } from "./types";

// Create the dimension mapping that calculations expects
const dimensionMapping: Record<number, { dimension: string; isReversed: boolean }> = {
  1: { dimension: "S", isReversed: false },
  2: { dimension: "S", isReversed: false },
  3: { dimension: "S", isReversed: false },
  4: { dimension: "L", isReversed: false },
  5: { dimension: "L", isReversed: false },
  6: { dimension: "A", isReversed: false },
  7: { dimension: "A", isReversed: false },
  8: { dimension: "S", isReversed: false },
  9: { dimension: "M", isReversed: false },
  10: { dimension: "S", isReversed: false },
  11: { dimension: "A2", isReversed: false },
  12: { dimension: "S", isReversed: false },
  13: { dimension: "S", isReversed: false },
  14: { dimension: "A2", isReversed: false },
  15: { dimension: "A2", isReversed: false },
  16: { dimension: "I", isReversed: false },
  17: { dimension: "A", isReversed: false },
  18: { dimension: "M", isReversed: false },
  19: { dimension: "M", isReversed: false },
  20: { dimension: "A", isReversed: false },
  21: { dimension: "A2", isReversed: false },
  22: { dimension: "I", isReversed: false },
  23: { dimension: "I", isReversed: false },
  24: { dimension: "I", isReversed: false },
  25: { dimension: "I", isReversed: false },
  26: { dimension: "S", isReversed: false },
  27: { dimension: "L", isReversed: false },
  28: { dimension: "L", isReversed: false },
  29: { dimension: "M", isReversed: false },
  30: { dimension: "A", isReversed: false },
  31: { dimension: "A2", isReversed: false },
  32: { dimension: "A", isReversed: false },
  33: { dimension: "A2", isReversed: false },
  34: { dimension: "I", isReversed: false },
  35: { dimension: "I", isReversed: false },
  36: { dimension: "L", isReversed: false },
  37: { dimension: "S", isReversed: false },
  38: { dimension: "L", isReversed: false },
  39: { dimension: "A2", isReversed: false },
  40: { dimension: "I", isReversed: false },
  41: { dimension: "I", isReversed: false },
  42: { dimension: "L", isReversed: false },
  43: { dimension: "A", isReversed: false },
  44: { dimension: "L", isReversed: false },
  45: { dimension: "A2", isReversed: false },
  46: { dimension: "L", isReversed: false },
  47: { dimension: "S", isReversed: false },
  48: { dimension: "L", isReversed: false },
  49: { dimension: "M", isReversed: false },
  50: { dimension: "M", isReversed: false },
  51: { dimension: "A2", isReversed: false },
  52: { dimension: "A", isReversed: false },
  53: { dimension: "L", isReversed: false },
  54: { dimension: "I", isReversed: false },
  55: { dimension: "I", isReversed: false },
  56: { dimension: "I", isReversed: false },
  57: { dimension: "A2", isReversed: false },
  58: { dimension: "L", isReversed: false },
  59: { dimension: "L", isReversed: false },
  60: { dimension: "M", isReversed: false },
  61: { dimension: "L", isReversed: false },
  62: { dimension: "A", isReversed: false },
  63: { dimension: "M", isReversed: false },
  64: { dimension: "I", isReversed: false },
  65: { dimension: "M", isReversed: false },
  66: { dimension: "M", isReversed: false },
  67: { dimension: "M", isReversed: false },
  68: { dimension: "A2", isReversed: false },
  69: { dimension: "M", isReversed: false },
  70: { dimension: "I", isReversed: false },
  71: { dimension: "M", isReversed: false },
  72: { dimension: "I", isReversed: false },
  73: { dimension: "M", isReversed: false },
  74: { dimension: "M", isReversed: false },
  75: { dimension: "I", isReversed: false },
  76: { dimension: "M", isReversed: false },
  77: { dimension: "A", isReversed: false },
  78: { dimension: "M", isReversed: false },
  79: { dimension: "I", isReversed: false },
  80: { dimension: "A2", isReversed: false },
  81: { dimension: "L", isReversed: false },
  82: { dimension: "L", isReversed: false },
  83: { dimension: "I", isReversed: false },
  84: { dimension: "A", isReversed: false },
  85: { dimension: "M", isReversed: false },
  86: { dimension: "M", isReversed: false },
  87: { dimension: "S", isReversed: false },
  88: { dimension: "L", isReversed: false },
  89: { dimension: "A2", isReversed: false },
  90: { dimension: "I", isReversed: false }
};

// Add the missing getAdjustedValue function and export it
export const getAdjustedValue = (score: number, isReversed: boolean): number => {
  return isReversed ? 6 - score : score;
};

// Dimension titles and descriptions
const dimensionInfo = {
  S: { title: "אסטרטגיה", description: "חשיבה אסטרטגית וחזון ארוך טווח" },
  L: { title: "למידה", description: "פתיחות ללמידה ולשיפור מתמיד" },
  I: { title: "השראה", description: "יכולת להשיב ולעורר מוטיבציה" },
  M: { title: "משמעות", description: "יצירת תחושת מטרה ומשמעות" },
  A: { title: "הסתגלות", description: "גמישות ויכולת הסתגלות לשינויים" },
  A2: { title: "אותנטיות", description: "מנהיגות אמיתית ושקופה" }
};

export const calculateSurveyResults = (answers: Answer[], userInfo: UserInfo): SurveyResult => {
  console.log("Starting survey calculation with answers:", answers);
  
  // רק שאלות 1-90 נכללות בחישוב SLQ (לא כולל שאלות האבטיפוסים 91-105)
  const slqAnswers = answers.filter(answer => answer.questionId <= 90);
  console.log("SLQ answers (1-90 only):", slqAnswers);
  
  // חישוב ציונים לממדים
  const dimensionScores: Record<string, number[]> = {
    S: [], L: [], I: [], M: [], A: [], A2: []
  };

  slqAnswers.forEach(answer => {
    const mapping = dimensionMapping[answer.questionId];
    if (mapping && Object.keys(dimensionScores).includes(mapping.dimension)) {
      let score = answer.value;
      
      // הפוך ציון עבור שאלות הפוכות (רק עבור שאלות SLQ)
      if (mapping.isReversed) {
        score = 6 - score;
      }
      
      dimensionScores[mapping.dimension].push(score);
    }
  });

  console.log("Dimension scores arrays:", dimensionScores);

  // חישוב ממוצעים לכל ממד וליצור DimensionResult אובייקטים מלאים
  const dimensions = Object.keys(dimensionScores).reduce((acc, dimensionKey) => {
    const scores = dimensionScores[dimensionKey];
    const average = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    const info = dimensionInfo[dimensionKey as keyof typeof dimensionInfo];
    
    // Get question IDs for this dimension
    const questionIds = Object.entries(dimensionMapping)
      .filter(([_, mapping]) => mapping.dimension === dimensionKey && parseInt(_) <= 90)
      .map(([questionId, _]) => parseInt(questionId));
    
    acc[dimensionKey] = {
      dimension: dimensionKey as any,
      score: Math.round(average * 100) / 100,
      questions: questionIds,
      title: info.title,
      description: info.description
    };
    return acc;
  }, {} as Record<string, DimensionResult>);

  console.log("Calculated dimensions:", dimensions);

  // חישוב SLQ (ציון מנהיגות כולל) - רק מהשאלות הראשונות 1-90
  const slq = Object.values(dimensions).reduce((sum, dim) => sum + dim.score, 0) / Object.keys(dimensions).length;
  const roundedSlq = Math.round(slq * 100) / 100;

  console.log("Calculated SLQ:", roundedSlq);

  const result: SurveyResult = {
    slq: roundedSlq,
    dimensions: {
      S: dimensions.S,
      L: dimensions.L,
      I: dimensions.I,
      M: dimensions.M,
      A: dimensions.A,
      A2: dimensions.A2
    },
    userInfo,
    date: new Date().toLocaleDateString('he-IL')
  };

  console.log("Final survey result:", result);
  return result;
};
