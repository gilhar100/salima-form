
// פונקציה להערכת רמת הביצוע עם תיאורים מפורטים
export const evaluateDimensionLevel = (score: number) => {
  if (score >= 4.5) return {
    level: "מצוין",
    description: "ביצוע יוצא דופן ומעולה",
    percentage: 100
  };
  if (score >= 3.7) return {
    level: "גבוה",
    description: "ביצוע טוב עם פוטנציאל להמשך פיתוח",
    percentage: 80
  };
  if (score >= 2.7) return {
    level: "בינוני",
    description: "",
    percentage: 60
  };
  if (score >= 1.7) return {
    level: "נמוך",
    description: "זקוק לפיתוח וחיזוק מיידי",
    percentage: 40
  };
  return {
    level: "נמוך מאוד",
    description: "דורש התערבות מיידית ופיתוח מעמיק",
    percentage: 20
  };
};
