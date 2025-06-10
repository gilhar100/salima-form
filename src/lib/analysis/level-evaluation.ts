
// פונקציה להערכת רמת הביצוע עם תיאורים מפורטים
export const evaluateDimensionLevel = (score: number) => {
  if (score >= 4.6) return {
    level: "גבוה מאוד",
    description: "ביצוע יוצא דופן ומעולה",
    percentage: 100
  };
  if (score >= 4.1) return {
    level: "גבוה",
    description: "ביצוע טוב עם פוטנציאל להמשך פיתוח",
    percentage: 85
  };
  if (score >= 3.5) return {
    level: "בינוני-גבוה",
    description: "ביצוע מעל הממוצע עם כיוון חיובי",
    percentage: 70
  };
  if (score >= 2.5) return {
    level: "בינוני",
    description: "",
    percentage: 60
  };
  if (score >= 1.5) return {
    level: "בינוני-נמוך",
    description: "זקוק לפיתוח וחיזוק מיידי",
    percentage: 40
  };
  return {
    level: "נמוך",
    description: "דורש התערבות מיידית ופיתוח מעמיק",
    percentage: 20
  };
};
