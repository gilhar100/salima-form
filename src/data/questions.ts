
import { Question } from "@/lib/types";

// מיפוי הממדים עם כותרות ותיאורים
export const dimensionInfo = {
  S: {
    title: "אסטרטג",
    description: "היכולת לחשוב אסטרטגית, לתכנן לטווח ארוך ולהגדיר חזון וכיוון ברור."
  },
  L: {
    title: "לומד",
    description: "הנכונות ללמידה מתמדת, התפתחות אישית ומקצועית והסתגלות לשינויים."
  },
  I: {
    title: "השראה",
    description: "היכולת להניע ולהשפיע על אחרים, לעורר מוטיבציה ולהוביל דרך דוגמה אישית."
  },
  M: {
    title: "משמעות",
    description: "היכולת ליצור תחושת משמעות, מטרה וערך בעבודה ובמשימות."
  },
  A: {
    title: "אדפטיבי",
    description: "היכולת להסתגל במהירות לשינויים, להיות גמיש ולפתח פתרונות יצירתיים."
  },
  A2: {
    title: "אותנטיות",
    description: "היכולת להיות אמיתי, להביע את האני האמיתי ולפעול בהתאם לערכים אישיים."
  }
};

// מיפוי של הממדים לפי שאלות
export const dimensionMapping: Record<number, { dimension: Question["dimension"], isReversed: boolean }> = {
  // אסטרטג (S)
  1: { dimension: "S", isReversed: false },
  6: { dimension: "S", isReversed: false },
  10: { dimension: "S", isReversed: false },
  23: { dimension: "S", isReversed: false },
  31: { dimension: "S", isReversed: false },
  38: { dimension: "S", isReversed: false },
  43: { dimension: "S", isReversed: false },
  51: { dimension: "S", isReversed: false },
  57: { dimension: "S", isReversed: false },
  64: { dimension: "S", isReversed: false },
  73: { dimension: "S", isReversed: false },
  83: { dimension: "S", isReversed: false },
  89: { dimension: "S", isReversed: false },
  
  // לומד (L)
  2: { dimension: "L", isReversed: false },
  11: { dimension: "L", isReversed: false },
  14: { dimension: "L", isReversed: false },
  19: { dimension: "L", isReversed: false },
  22: { dimension: "L", isReversed: false },
  29: { dimension: "L", isReversed: false },
  33: { dimension: "L", isReversed: false },
  42: { dimension: "L", isReversed: false },
  45: { dimension: "L", isReversed: false },
  52: { dimension: "L", isReversed: false },
  69: { dimension: "L", isReversed: false },
  70: { dimension: "L", isReversed: false },
  72: { dimension: "L", isReversed: false },
  76: { dimension: "L", isReversed: false },
  82: { dimension: "L", isReversed: false },
  85: { dimension: "L", isReversed: false },
  88: { dimension: "L", isReversed: false },
  
  // יתר הממדים - מיפוי כללי לדוגמה, יש להחליף ספציפית לפי המיפוי המדויק
  // השראה (I)
  3: { dimension: "I", isReversed: false },
  7: { dimension: "I", isReversed: false },
  13: { dimension: "I", isReversed: false },
  18: { dimension: "I", isReversed: false },
  24: { dimension: "I", isReversed: false },
  28: { dimension: "I", isReversed: false },
  34: { dimension: "I", isReversed: false },
  39: { dimension: "I", isReversed: false },
  46: { dimension: "I", isReversed: false },
  53: { dimension: "I", isReversed: false },
  59: { dimension: "I", isReversed: false },
  65: { dimension: "I", isReversed: false },
  71: { dimension: "I", isReversed: false },
  77: { dimension: "I", isReversed: false },
  
  // משמעות (M)
  4: { dimension: "M", isReversed: false },
  8: { dimension: "M", isReversed: false },
  15: { dimension: "M", isReversed: false },
  20: { dimension: "M", isReversed: false },
  25: { dimension: "M", isReversed: false },
  30: { dimension: "M", isReversed: false },
  35: { dimension: "M", isReversed: false },
  40: { dimension: "M", isReversed: false },
  47: { dimension: "M", isReversed: false },
  54: { dimension: "M", isReversed: false },
  60: { dimension: "M", isReversed: false },
  66: { dimension: "M", isReversed: false },
  74: { dimension: "M", isReversed: false },
  78: { dimension: "M", isReversed: false },
  84: { dimension: "M", isReversed: false },
  
  // אדפטיבי (A)
  5: { dimension: "A", isReversed: false },
  9: { dimension: "A", isReversed: false },
  16: { dimension: "A", isReversed: false },
  21: { dimension: "A", isReversed: false },
  26: { dimension: "A", isReversed: false },
  32: { dimension: "A", isReversed: false },
  36: { dimension: "A", isReversed: false },
  41: { dimension: "A", isReversed: false },
  48: { dimension: "A", isReversed: false },
  55: { dimension: "A", isReversed: false },
  61: { dimension: "A", isReversed: false },
  67: { dimension: "A", isReversed: false },
  75: { dimension: "A", isReversed: false },
  79: { dimension: "A", isReversed: false },
  86: { dimension: "A", isReversed: false },
  
  // אותנטיות (A2)
  12: { dimension: "A2", isReversed: false },
  17: { dimension: "A2", isReversed: false },
  27: { dimension: "A2", isReversed: false },
  37: { dimension: "A2", isReversed: false },
  44: { dimension: "A2", isReversed: false },
  49: { dimension: "A2", isReversed: false },
  50: { dimension: "A2", isReversed: false },
  56: { dimension: "A2", isReversed: false },
  58: { dimension: "A2", isReversed: false },
  62: { dimension: "A2", isReversed: false },
  63: { dimension: "A2", isReversed: false },
  68: { dimension: "A2", isReversed: false },
  80: { dimension: "A2", isReversed: false },
  81: { dimension: "A2", isReversed: false },
  87: { dimension: "A2", isReversed: false },
  90: { dimension: "A2", isReversed: false },
};

// רשימת השאלות
export const questions: Question[] = [
  {
    id: 1,
    text: "אני מגדיר/ה מטרות ברורות לטווח הארוך",
    dimension: dimensionMapping[1].dimension,
    isReversed: dimensionMapping[1].isReversed
  },
  {
    id: 2,
    text: "אני מחפש/ת הזדמנויות ללמידה והתפתחות אישית",
    dimension: dimensionMapping[2].dimension,
    isReversed: dimensionMapping[2].isReversed
  },
  {
    id: 3,
    text: "אני מצליח/ה לעורר השראה בקרב אנשים",
    dimension: dimensionMapping[3].dimension,
    isReversed: dimensionMapping[3].isReversed
  },
  // יש להזין את שאר השאלות כאן בפורמט דומה
  // לדוגמה מוסיפים כמה שאלות נוספות
  {
    id: 4,
    text: "אני יוצר/ת תחושת משמעות במקום העבודה",
    dimension: dimensionMapping[4].dimension,
    isReversed: dimensionMapping[4].isReversed
  },
  {
    id: 5,
    text: "אני מסתגל/ת במהירות לשינויים בסביבה",
    dimension: dimensionMapping[5].dimension,
    isReversed: dimensionMapping[5].isReversed
  },
  {
    id: 6,
    text: "אני חושב/ת בצורה אסטרטגית כשאני מתכנן/ת קדימה",
    dimension: dimensionMapping[6].dimension,
    isReversed: dimensionMapping[6].isReversed
  },
  {
    id: 7,
    text: "אני מעורר/ת מוטיבציה אצל אחרים",
    dimension: dimensionMapping[7].dimension,
    isReversed: dimensionMapping[7].isReversed
  },
  {
    id: 8,
    text: "אני מחבר/ת אנשים למטרה המשותפת",
    dimension: dimensionMapping[8].dimension,
    isReversed: dimensionMapping[8].isReversed
  },
  {
    id: 9,
    text: "אני גמיש/ה בהתמודדות עם אתגרים חדשים",
    dimension: dimensionMapping[9].dimension,
    isReversed: dimensionMapping[9].isReversed
  },
  {
    id: 10,
    text: "אני מזהה הזדמנויות עסקיות חדשות",
    dimension: dimensionMapping[10].dimension,
    isReversed: dimensionMapping[10].isReversed
  },
  // הערה: יש להוסיף את כל 90 השאלות, כאן רק מוצגות 10 לדוגמה
];

// פונקציה לקבלת כל השאלות לפי ממד
export function getQuestionsByDimension(dimension: Question["dimension"]): Question[] {
  return questions.filter(q => q.dimension === dimension);
}
