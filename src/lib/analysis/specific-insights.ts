
import { keywordInsights } from './keyword-insights';

// תובנות כלליות לכל ממד אם לא נמצאה התאמה ספציפית
const genericInsights = {
  'S': {
    strength: `יכולת אסטרטגית מפותחת - נקודת חוזקה משמעותית בחשיבה ותכנון ארוך טווח`,
    moderate: `בסיס אסטרטגי יציב עם פוטנציאל טוב לפיתוח והעמקה של החשיבה האסטרטגית`,
    development: `הזדמנות לפיתוח משמעותי ביכולות החשיבה האסטרטגית והובלת שינויים`
  },
  'L': {
    strength: `יכולת למידה מפותחת - נקודת חוזקה בפיתוח עצמי וצמיחה מתמשכת`,
    moderate: `בסיס למידה יציב עם פוטנציאל לפיתוח גישה שיטתית יותר ללמידה`,
    development: `הזדמנות לפיתוח משמעותי בתרבות למידה ופיתוח עצמי מתמשך`
  },
  'I': {
    strength: `יכולת השראה מפותחת - כוח מניע משמעותי להשפעה חיובית על אחרים`,
    moderate: `בסיס השראה יציב עם פוטנציאל לפיתוח הכריזמה והכוח המעורר השראה`,
    development: `הזדמנות לפיתוח משמעותי ביכולת להעניק השראה ולהניע אחרים`
  },
  'M': {
    strength: `יכולת ליצור משמעות מפותחת - חוזקה בחיבור אנשים למטרה גדולה`,
    moderate: `בסיס יציב ליצירת משמעות עם פוטנציאל לפיתוח העומק והעוצמה`,
    development: `הזדמנות לפיתוח משמעותי ביכולת ליצור תחושת משמעות ומטרה`
  },
  'A': {
    strength: `יכולת הסתגלות מפותחת - חוזקה בגמישות ופתיחות לשינוי`,
    moderate: `בסיס הסתגלות יציב עם פוטנציאל לפיתוח הגמישות המחשבתית`,
    development: `הזדמנות לפיתוח משמעותי בגמישות ויכולת הסתגלות למצבים חדשים`
  },
  'A2': {
    strength: `יכולת אותנטיות מפותחת - חוזקה ביושרה ובבניית אמון`,
    moderate: `בסיס אותנטיות יציב עם פוטנציאל לפיתוח השקיפות והכנות`,
    development: `הזדמנות לפיתוח משמעותי באותנטיות ויכולת בניית אמון`
  }
};

// פונקציה לקבלת תובנה ספציפית בהתבסס על תוכן השאלה ורמת הביצוע
export const getSpecificInsight = (questionText: string, dimension: string, score: number, category: 'strength' | 'moderate' | 'development'): string => {
  // חיפוש תובנה רלוונטית על בסיס מילות מפתח
  const dimensionInsights = keywordInsights[dimension as keyof typeof keywordInsights];
  if (dimensionInsights) {
    for (const [keyword, insight] of Object.entries(dimensionInsights)) {
      if (questionText.includes(keyword)) {
        return insight[category];
      }
    }
  }

  // תובנות כלליות אם לא נמצאה התאמה ספציפית
  const dimensionGeneric = genericInsights[dimension as keyof typeof genericInsights];
  return dimensionGeneric ? dimensionGeneric[category] : `תחום זה מציג ${category === 'strength' ? 'חוזקה' : category === 'moderate' ? 'פוטנציאל' : 'הזדמנות לפיתוח'}`;
};
