import { Answer, UserInfo, SurveyResult, Question } from "./types";
import { dimensionMapping } from "@/data/questions";

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

  // חישוב ממוצעים לכל ממד
  const dimensions = Object.keys(dimensionScores).reduce((acc, dimension) => {
    const scores = dimensionScores[dimension];
    const average = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    acc[dimension] = {
      score: Math.round(average * 100) / 100,
      questionCount: scores.length
    };
    return acc;
  }, {} as Record<string, { score: number; questionCount: number }>);

  console.log("Calculated dimensions:", dimensions);

  // חישוב SLQ (ציון מנהיגות כולל) - רק מהשאלות הראשונות 1-90
  const slq = Object.values(dimensions).reduce((sum, dim) => sum + dim.score, 0) / Object.keys(dimensions).length;
  const roundedSlq = Math.round(slq * 100) / 100;

  console.log("Calculated SLQ:", roundedSlq);

  const result: SurveyResult = {
    slq: roundedSlq,
    dimensions: {
      S: dimensions.S || { score: 0, questionCount: 0 },
      L: dimensions.L || { score: 0, questionCount: 0 },
      I: dimensions.I || { score: 0, questionCount: 0 },
      M: dimensions.M || { score: 0, questionCount: 0 },
      A: dimensions.A || { score: 0, questionCount: 0 },
      A2: dimensions.A2 || { score: 0, questionCount: 0 }
    },
    userInfo,
    date: new Date().toLocaleDateString('he-IL'),
    totalQuestions: slqAnswers.length,
    answeredQuestions: slqAnswers.length
  };

  console.log("Final survey result:", result);
  return result;
};
