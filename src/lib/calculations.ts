
import { Question, Answer, DimensionResult, SurveyResult, UserInfo, Dimension } from "@/lib/types";
import { dimensionInfo, dimensionMapping, questions } from "@/data/questions";

// פונקציה להפיכת ערכים בשאלות הפוכות
export function getAdjustedValue(value: number, isReversed: boolean): number {
  if (!isReversed) return value;
  
  // הפיכת ערכים: 1↔5, 2↔4, 3 נשאר
  const reversedValues = {
    1: 5,
    2: 4,
    3: 3,
    4: 2,
    5: 1
  };
  
  return reversedValues[value as 1 | 2 | 3 | 4 | 5];
}

// פונקציה לחישוב הציון הממוצע עבור ממד ספציפי
export function calculateDimensionScore(answers: Answer[], dimension: Dimension): number {
  // סינון השאלות השייכות לממד זה
  const dimensionQuestionIds = Object.entries(dimensionMapping)
    .filter(([_, details]) => details.dimension === dimension)
    .map(([id]) => parseInt(id));
  
  if (dimensionQuestionIds.length === 0) return 0;

  // חישוב הציון הכולל עבור הממד
  const dimensionAnswers = answers.filter(a => dimensionQuestionIds.includes(a.questionId));
  
  if (dimensionAnswers.length === 0) return 0;
  
  const totalScore = dimensionAnswers.reduce((sum, answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return sum;
    
    return sum + getAdjustedValue(answer.value, question.isReversed);
  }, 0);
  
  // חישוב הממוצע
  return Number((totalScore / dimensionAnswers.length).toFixed(2));
}

// פונקציה לחישוב כל התוצאות של השאלון
export function calculateSurveyResults(answers: Answer[], userInfo: UserInfo): SurveyResult {
  // חישוב התוצאות לכל ממד
  const dimensions = {
    S: {
      dimension: "S" as Dimension,
      score: calculateDimensionScore(answers, "S"),
      questions: Object.entries(dimensionMapping)
        .filter(([_, details]) => details.dimension === "S")
        .map(([id]) => parseInt(id)),
      title: dimensionInfo.S.title,
      description: dimensionInfo.S.description
    },
    L: {
      dimension: "L" as Dimension,
      score: calculateDimensionScore(answers, "L"),
      questions: Object.entries(dimensionMapping)
        .filter(([_, details]) => details.dimension === "L")
        .map(([id]) => parseInt(id)),
      title: dimensionInfo.L.title,
      description: dimensionInfo.L.description
    },
    I: {
      dimension: "I" as Dimension,
      score: calculateDimensionScore(answers, "I"),
      questions: Object.entries(dimensionMapping)
        .filter(([_, details]) => details.dimension === "I")
        .map(([id]) => parseInt(id)),
      title: dimensionInfo.I.title,
      description: dimensionInfo.I.description
    },
    M: {
      dimension: "M" as Dimension,
      score: calculateDimensionScore(answers, "M"),
      questions: Object.entries(dimensionMapping)
        .filter(([_, details]) => details.dimension === "M")
        .map(([id]) => parseInt(id)),
      title: dimensionInfo.M.title,
      description: dimensionInfo.M.description
    },
    A: {
      dimension: "A" as Dimension,
      score: calculateDimensionScore(answers, "A"),
      questions: Object.entries(dimensionMapping)
        .filter(([_, details]) => details.dimension === "A")
        .map(([id]) => parseInt(id)),
      title: dimensionInfo.A.title,
      description: dimensionInfo.A.description
    },
    A2: {
      dimension: "A2" as Dimension,
      score: calculateDimensionScore(answers, "A2"),
      questions: Object.entries(dimensionMapping)
        .filter(([_, details]) => details.dimension === "A2")
        .map(([id]) => parseInt(id)),
      title: dimensionInfo.A2.title,
      description: dimensionInfo.A2.description
    },
  };
  
  // חישוב ציון SLQ כללי (ממוצע של כל הממדים)
  const slq = Number(((
    dimensions.S.score + 
    dimensions.L.score + 
    dimensions.I.score + 
    dimensions.M.score + 
    dimensions.A.score + 
    dimensions.A2.score
  ) / 6).toFixed(2));
  
  // החזרת התוצאות
  return {
    dimensions,
    slq,
    userInfo,
    date: new Date().toISOString()
  };
}

// פונקציה להערכת רמת הביצוע בכל ממד
export function evaluateDimensionLevel(score: number): string {
  if (score >= 4.5) return "גבוה מאוד";
  if (score >= 3.7) return "גבוה";
  if (score >= 2.7) return "בינוני";
  if (score >= 1.7) return "נמוך";
  return "נמוך מאוד";
}

// פונקציה לקבלת המלצות לשיפור
export function getDimensionRecommendations(dimension: Dimension, score: number): string {
  if (score >= 3.7) return "יש לך יכולות טובות בממד זה. המשך לפתח ולחזק אותן.";
  
  switch(dimension) {
    case "S":
      return "כדאי לפתח חשיבה אסטרטגית ארוכת טווח. הקדש זמן לתכנון ולהגדרת יעדים ברורים.";
    case "L":
      return "כדאי להקדיש יותר זמן ללמידה והתפתחות אישית. חפש הזדמנויות ללמידה והרחבת אופקים.";
    case "I":
      return "עבוד על יכולת ההשפעה וההשראה שלך. נסה לחבר אנשים לחזון ולהניע אותם דרך דוגמה אישית.";
    case "M":
      return "פתח את היכולת ליצור משמעות ותכלית. חבר את הצוות למטרות ולערכים משותפים.";
    case "A":
      return "שפר את הגמישות והיכולת להסתגל לשינויים. פתח חשיבה יצירתית ופתיחות לדרכים חדשות.";
    case "A2":
      return "עבוד על פיתוח אותנטיות ואמינות. היה נאמן לערכים שלך ופעל בעקביות.";
    default:
      return "יש מקום לשיפור בממד זה. עבוד על פיתוח מיומנויות ספציפיות.";
  }
}
