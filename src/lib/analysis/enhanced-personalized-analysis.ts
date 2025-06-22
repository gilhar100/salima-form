
import { Answer } from "@/lib/types";

// מחולל ניתוח מותאם אישית על בסיס השאלות החדשות
interface QuestionInsight {
  id: number;
  dimension: string;
  high_text: string;
  low_text: string;
}

// מיפוי תובנות השאלות החדשות
const questionInsights: QuestionInsight[] = [
  {
    id: 82,
    dimension: "L",
    high_text: "את/ה שומר/ת הכל בפנים ולא מבקש/ת עזרה – מה שעלול להחליש אותך ולבודד אותך.",
    low_text: "את/ה יודע/ת להיעזר כשצריך – ביטוי לאותנטיות ובשלות."
  },
  {
    id: 15,
    dimension: "S",
    high_text: "את/ה יוזם/ת אפשרויות חדשות ומחפש/ת אזורי צמיחה בלתי ממומשים – ביטוי לאומץ והובלה.",
    low_text: "ייתכן שאת/ה נצמד/ת למסלולים קיימים ולא מזהה הזדמנויות רעננות למימוש חזון."
  },
  {
    id: 4,
    dimension: "S",
    high_text: "את/ה יוזם/ת רפורמות מתוך חזון דינמי והבנה של ההקשר המשתנה – ביטוי לאפקטיביות בהובלה.",
    low_text: "ייתכן שאת/ה מגיב/ה באיחור לשינויים, ומתקשה לתרגם חזון לשינוי בפועל."
  },
  {
    id: 36,
    dimension: "L",
    high_text: "את/ה מגלה סקרנות אמיתית ולומד/ת בהתלהבות – ביטוי ללהבה פנימית של התפתחות.",
    low_text: "ייתכן שאת/ה לומד/ת רק מתוך הכרח, ולא ממקום של עניין פנימי – מה שעלול להגביל עומק ואותנטיות בלמידה."
  },
  {
    id: 32,
    dimension: "L",
    high_text: "את/ה רואה ערך בכל אדם ופתוח/ה ללמוד ממנו – ביטוי עמוק לתודעת \"התלמיד הנצחי\".",
    low_text: "ייתכן שאת/ה מתקשה להכיר בערך של שונות ובלמידה מתוך גיוון – דבר שעלול לצמצם את ההתפתחות האישית."
  },
  {
    id: 29,
    dimension: "A",
    high_text: "את/ה מתמקד/ת בפתרונות קיימים ומתקדם/ת דרך פעולה מציאותית.",
    low_text: "ייתכן שאת/ה עסוק/ה בעיקר במה שאין, ולא בונה על מה שיש."
  },
  {
    id: 18,
    dimension: "A",
    high_text: "את/ה מצליח/ה להתבונן מבחוץ גם ברגעי קושי – גישה רגשית מאוזנת שמאפשרת קבלת החלטות שקולה.",
    low_text: "ייתכן שאת/ה נבלע/ת באירועים ופחות מצליח/ה לראות את התמונה הרחבה."
  },
  {
    id: 14,
    dimension: "S",
    high_text: "את/ה שומר/ת על מיקוד גם בזמנים סוערים, מתוך תודעה חזונית בהירה.",
    low_text: "ייתכן שאת/ה מאבד/ת כיוון בעת משבר ופועל/ת תגובתית."
  },
  {
    id: 70,
    dimension: "M",
    high_text: "את/ה מקשר/ת בין פרקטיקות לבין ערכים – מנהיגות שפועלת מתוך עומק.",
    low_text: "ייתכן שתהליכים מתקיימים מנותקים מערכים – דבר שעלול לגרום לתחושת ניכור ארגוני."
  },
  {
    id: 12,
    dimension: "S",
    high_text: "את/ה קושר/ת כל פעולה לתמונה רחבה יותר, פועל/ת מתוך תודעה של מיפוי, ראייה ארוכת טווח ויוזמה.",
    low_text: "ייתכן שאת/ה מתמקד/ת במשימות בודדות ללא חיבור להקשר האסטרטגי הכולל."
  },
  {
    id: 76,
    dimension: "A2",
    high_text: "את/ה יוצר/ת קשרים אישיים ואותנטיים – מחזק/ת אמון ושייכות.",
    low_text: "ייתכן שאת/ה שומר/ת על מרחק מקצועי בלבד – מה שעלול לפגוע באמון הדדי."
  },
  {
    id: 55,
    dimension: "I",
    high_text: "את/ה מדגיש/ה הישגים קטנים – דבר שמעודד תחושת מסוגלות ומחזק השראה מתמשכת.",
    low_text: "ייתכן שאת/ה מתמקד/ת רק בתוצאה הסופית – מה שעלול לגרום לתחושת שחיקה."
  },
  {
    id: 5,
    dimension: "S",
    high_text: "את/ה מבטיח/ה שכל עשייה מקושרת לתמונה הגדולה – דבר שמעיד על בהירות וחיבור לחזון.",
    low_text: "ייתכן שאת/ה פועל/ת מתוך שיקולי יעילות בלבד, ולא מקשר/ת את העשייה לתכלית ארגונית רחבה."
  },
  {
    id: 88,
    dimension: "A2",
    high_text: "את/ה יוצר/ת מרחב פתוח דרך הקשבה אמפתית – מה שמחזק שייכות.",
    low_text: "ייתכן שאת/ה שומע/ת אבל לא באמת מקשיב/ה – מה שפוגע בתחושת החיבור."
  },
  {
    id: 81,
    dimension: "A2",
    high_text: "את/ה מודה בטעות ולוקח/ת אחריות – גישה שמעוררת אמון ודוגמה אישית.",
    low_text: "ייתכן שאת/ה נוטה להשליך אחריות – מה שמחליש אמינות ופתיחות."
  },
  {
    id: 28,
    dimension: "A",
    high_text: "את/ה משדר/ת נחישות גם במצבים לא ברורים – מה שמייצר יציבות לצוות.",
    low_text: "ייתכן שאת/ה מושפע/ת מאוד מהכאוס סביבך, ומתקשה לייצר תחושת ביטחון."
  },
  {
    id: 30,
    dimension: "A",
    high_text: "את/ה נצמד/ת לתחום אחריותך בלבד – גישה שמגבילה הסתגלות והשפעה",
    low_text: "את/ה מוכן/ה לפעול מעבר להגדרה הפורמלית של תפקידך – מתוך אחריות מערכתית."
  },
  {
    id: 65,
    dimension: "M",
    high_text: "את/ה יוזם/ת שיח ערכי בעבודה – גישה שמקדמת עומק, חיבור אישי ומחויבות.",
    low_text: "ייתכן שאת/ה מתמקד/ת בהיבטים טכניים בלבד – מה שמקשה על גיוס רגשי אמיתי."
  },
  {
    id: 77,
    dimension: "A2",
    high_text: "את/ה רואה את האדם שמולך ולא רק את המערכת – גישה שמחזקת נאמנות ותחושת שייכות.",
    low_text: "ייתכן שאת/ה מתמקד/ת בעיקר בדרישות הארגוניות – מה שעלול לגרום לתחושת ניכור."
  },
  {
    id: 26,
    dimension: "A",
    high_text: "את/ה חי/ה בתודעה שמזהה שינוי כהזדמנות, ומתקדם/ת תוך כדי למידה והתנסות.",
    low_text: "ייתכן שאת/ה רואה בשינוי איום – גישה שמובילה לרתיעה וסטגנציה."
  },
  // ממשיך עם יתר השאלות...
  {
    id: 90,
    dimension: "A2",
    high_text: "את/ה פתוח/ה לרגשות, יודע/ת להכיל ולהיות שם בשביל אחרים – מנהיגות נוכחת.",
    low_text: "ייתכן שאת/ה מתמקד/ת רק בעובדות – מה שמקשה על חיבור רגשי ואותנטי."
  },
  {
    id: 54,
    dimension: "I",
    high_text: "את/ה מאמין/ה ביכולת של כל אדם להשפיע – גישה שמעוררת השראה ומחזקת את הסובבים.",
    low_text: "ייתכן שאת/ה שומר/ת את זכות ההובלה לעצמך – דבר שמקטין את תחושת השותפות בצוות."
  },
  {
    id: 85,
    dimension: "A2",
    high_text: "את/ה יודע/ת לתת מילה טובה כשצריך – דבר שמחזק מוטיבציה ושייכות.",
    low_text: "ייתכן שאת/ה ממעט/ת לבטא הכרה – מה שעלול להשאיר מאמץ ללא תגמול רגשי."
  },
  {
    id: 58,
    dimension: "I",
    high_text: "את/ה יוצר/ת שיח מעורר השראה – מה שמעודד רגש, משמעות ופעולה.",
    low_text: "ייתכן שהשפה שלך עניינית בלבד – דבר שעלול לדכא השראה או חזון."
  },
  {
    id: 87,
    dimension: "A2",
    high_text: "את/ה נסגר/ת או מתרחק/ת בעת מתח – מה שעלול להשאיר אחרים לבד.",
    low_text: "את/ה נשאר/ת נוכח/ת גם כשקשה – ביטוי לאחריות רגשית ובשלות."
  },
  {
    id: 1,
    dimension: "S",
    high_text: "את/ה בוחן/ת הנחות פעולה מתוך ערנות להזדמנויות ושינויים. גישה זו מעידה על חיים בצומת תודעתי ועל מיקוד באפקטיביות ניהולית.",
    low_text: "ייתכן שאת/ה נצמד/ת להנחות עבר גם כשהסביבה משתנה, מה שמקשה על זיהוי הזדמנויות או ניהול אפקטיבי."
  }
  // ניתן להמשיך עם יתר השאלות...
];

// יצירת מיפוי מהיר לתובנות
const insightMap = new Map<number, QuestionInsight>();
questionInsights.forEach(insight => {
  insightMap.set(insight.id, insight);
});

// פונקציה ליצירת ניתוח מקיף לכל ממד
export const generateDimensionAnalysis = (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): string => {
  
  // סינון התשובות הרלוונטיות לממד
  const relevantAnswers = answers.filter(answer => {
    const insight = insightMap.get(answer.questionId);
    return insight && insight.dimension === dimension;
  });

  if (relevantAnswers.length === 0) {
    return "לא נמצאו תשובות רלוונטיות לממד זה.";
  }

  // יצירת תובנות בהתבסס על הציונים
  const insights: string[] = [];
  
  relevantAnswers.forEach(answer => {
    const insight = insightMap.get(answer.questionId);
    if (insight) {
      // הפיכת ערך אם השאלה הפוכה
      const isReversed = getQuestionReversed(answer.questionId);
      const effectiveValue = isReversed ? (6 - answer.value) : answer.value;
      
      // בחירת התובנה המתאימה
      const selectedInsight = effectiveValue > 3 ? insight.high_text : insight.low_text;
      
      if (selectedInsight && selectedInsight !== "nan") {
        insights.push(selectedInsight);
      }
    }
  });

  if (insights.length === 0) {
    return "לא נמצאו תובנות מתאימות לממד זה.";
  }

  // שילוב התובנות לפסקה מקיפה
  return combineInsights(insights, dimension, userIdentifier);
};

// פונקציה לקבלת מידע על היפוך שאלה
const getQuestionReversed = (questionId: number): boolean => {
  // מיפוי ידני של השאלות ההפוכות
  const reversedQuestions = [82, 30, 87, 21, 23, 51, 3, 35, 53, 19, 37, 78, 31, 38, 9, 34, 80, 50, 46, 27, 16];
  return reversedQuestions.includes(questionId);
};

// פונקציה לשילוב תובנות לפסקה אחת
const combineInsights = (insights: string[], dimension: string, userIdentifier?: string): string => {
  if (insights.length === 1) {
    return insights[0];
  }

  // יצירת זרע לוריאציה
  const seed = userIdentifier ? 
    userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
    Date.now();

  // מיון התובנות לפי אורך (הקצרות קודם)
  const sortedInsights = insights.sort((a, b) => a.length - b.length);
  
  // בחירת 2-3 תובנות מרכזיות
  const selectedInsights = sortedInsights.slice(0, Math.min(3, sortedInsights.length));
  
  // שילוב עם מחברים טבעיים
  const connectors = ["בנוסף, ", "כמו כן, ", "יחד עם זאת, ", ""];
  
  let combined = selectedInsights[0];
  
  if (selectedInsights.length > 1) {
    const connector = connectors[seed % connectors.length];
    combined += ` ${connector}${selectedInsights[1]}`;
  }
  
  if (selectedInsights.length > 2) {
    combined += ` מאידך, ${selectedInsights[2]}`;
  }

  return combined;
};

// ייצוא הפונקציה הראשית
export const getEnhancedPersonalizedAnalysis = (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): string => {
  return generateDimensionAnalysis(dimension, answers, userIdentifier);
};

