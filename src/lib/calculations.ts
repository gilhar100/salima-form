
import { Answer, UserInfo, SurveyResult, Question, DimensionResult } from "./types";
import { dimensionMapping } from "@/data/questions";

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
      questionCount: scores.length,
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
