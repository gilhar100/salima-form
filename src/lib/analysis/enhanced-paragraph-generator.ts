
import { Answer } from "@/lib/types";
import { 
  filterAnswersForDimension, 
  getInsightText 
} from "./scoring-logic";

// מבנה לסיווג טון תובנות
interface InsightClassification {
  text: string;
  tone: 'positive' | 'constructive' | 'neutral';
  theme: 'leadership' | 'development' | 'relationships' | 'vision' | 'execution';
}

// פונקציה לסיווג תובנות לפי טון ונושא
const classifyInsight = (insight: string): InsightClassification => {
  const positiveIndicators = [
    "ביטוי ל", "מחזק", "מעיד על", "תודעה", "יוזם", "מגלה", 
    "פועל/ת מתוך", "מצליח", "יודע/ת", "אותנטי", "מתוך חזון", "כישור"
  ];
  
  const constructiveIndicators = [
    "ייתכן ש", "מה שעלול", "דבר שעלול", "מתקשה", "לא מזהה", 
    "מגיב/ה באיחור", "נבלע/ת", "מאבד/ת", "עסוק/ה בעיקר", "מתעלם", "רצוי", "כדאי"
  ];

  const leadershipThemes = ["הובלה", "מנהיגות", "חזון", "אסטרטגי", "יוזם"];
  const relationshipThemes = ["קשר", "אמון", "הקשבה", "שייכות", "אמפתי"];
  const developmentThemes = ["למידה", "התפתחות", "צמיחה", "שיפור"];
  const visionThemes = ["חזון", "תמונה גדולה", "ערכים", "משמעות"];
  const executionThemes = ["פעולה", "מימוש", "תוצאות", "יעילות"];

  const hasPositive = positiveIndicators.some(indicator => insight.includes(indicator));
  const hasConstructive = constructiveIndicators.some(indicator => insight.includes(indicator));
  
  let tone: 'positive' | 'constructive' | 'neutral';
  if (hasPositive && !hasConstructive) tone = 'positive';
  else if (hasConstructive && !hasPositive) tone = 'constructive';
  else tone = 'neutral';

  let theme: 'leadership' | 'development' | 'relationships' | 'vision' | 'execution' = 'execution';
  if (leadershipThemes.some(t => insight.includes(t))) theme = 'leadership';
  else if (relationshipThemes.some(t => insight.includes(t))) theme = 'relationships';
  else if (developmentThemes.some(t => insight.includes(t))) theme = 'development';
  else if (visionThemes.some(t => insight.includes(t))) theme = 'vision';

  return { text: insight, tone, theme };
};

// פונקציות פתיחה מגוונות לפי סוג המימצא הכללי
const getOpeningByOverallTone = (
  overallTone: 'positive' | 'balanced' | 'constructive',
  dimension: string
): string => {
  const dimensionNames: Record<string, string> = {
    'S': 'בחשיבה האסטרטגית שלך',
    'L': 'בגישה ללמידה',
    'I': 'ביכולת ההשראה שלך',
    'M': 'ביצירת משמעות',
    'A': 'בהסתגלות למצבים',
    'A2': 'באותנטיות שלך'
  };

  const dimensionContext = dimensionNames[dimension] || '';

  if (overallTone === 'positive') {
    const positiveOpeners = [
      `${dimensionContext} ניכרים חוזקות ברורים`,
      `אתה מציג יכולות חזקות ${dimensionContext}`,
      `${dimensionContext} בולטות תכונות חיוביות`,
      `נראה כי ${dimensionContext} יש לך יסודות חזקים`
    ];
    return positiveOpeners[Math.floor(Math.random() * positiveOpeners.length)];
  } 
  
  if (overallTone === 'constructive') {
    const constructiveOpeners = [
      `${dimensionContext} ישנם תחומים הדורשים התייחסות`,
      `נראה כי ${dimensionContext} קיימים אתגרים לטיפול`,
      `${dimensionContext} מומלץ להתמקד בשיפורים`,
      `${dimensionContext} יש מקום לחיזוק והתפתחות`
    ];
    return constructiveOpeners[Math.floor(Math.random() * constructiveOpeners.length)];
  }

  // balanced
  const balancedOpeners = [
    `${dimensionContext} משתלבים יחד חוזקות ותחומי פיתוח`,
    `התמונה ${dimensionContext} מציגה מגוון של יכולות`,
    `${dimensionContext} ניתן לזהות הן הישגים והן הזדמנויות`,
    `${dimensionContext} קיימת תמונה מעורבת הדורשת הבנה מעמיקה`
  ];
  return balancedOpeners[Math.floor(Math.random() * balancedOpeners.length)];
};

// בחירת מחברים טבעיים לפי הקשר
const selectContextualConnector = (
  prevTone: 'positive' | 'constructive' | 'neutral',
  currTone: 'positive' | 'constructive' | 'neutral',
  position: number
): string => {
  if (prevTone === 'positive' && currTone === 'constructive') {
    return ['עם זאת', 'יחד עם זאת', 'לצד זאת', 'מנגד'][position % 4];
  }
  
  if (prevTone === 'constructive' && currTone === 'positive') {
    return ['למרות זאת', 'בצד החיובי', 'יש לציין כי', 'כנקודה מחזקת'][position % 4];
  }
  
  if (prevTone === currTone && prevTone === 'positive') {
    return ['בנוסף', 'יתרה מכך', 'כמו כן', ''][position % 4];
  }
  
  if (prevTone === currTone && prevTone === 'constructive') {
    return ['כמו כן', 'בהקשר דומה', 'באופן דומה', ''][position % 4];
  }

  return ['', 'ניכר גם כי', 'מתברר שגם', 'יש לציין כי'][position % 4];
};

// יצירת סיום מתאים לטון הכללי
const createClosingStatement = (
  overallTone: 'positive' | 'balanced' | 'constructive',
  insights: InsightClassification[]
): string => {
  if (overallTone === 'positive') {
    const positiveClosings = [
      "המשך לטפח חוזקות אלו ולהוביל בביטחון.",
      "יכולות אלו מהוות בסיס חזק להובלה יעילה.",
      "חוזקות אלו תורמות למעמדך כמנהיג מוערך.",
      ""
    ];
    return positiveClosings[Math.floor(Math.random() * positiveClosings.length)];
  }
  
  if (overallTone === 'constructive') {
    const constructiveClosings = [
      "השקעה בתחומים אלו תחזק משמעותית את יעילותך המנהיגותית.",
      "מומלץ להתמקד בפיתוח נקודות אלו לצורך צמיחה מקצועית.",
      "טיפוח מיומנויות אלו יוביל לשיפור ניכר בהובלה.",
      "התמודדות עם אתגרים אלו תפתח הזדמנויות חדשות."
    ];
    return constructiveClosings[Math.floor(Math.random() * constructiveClosings.length)];
  }

  // balanced
  const balancedClosings = [
    "איזון בין החוזקות לתחומי הפיתוח יוביל לצמיחה מתמדת.",
    "המשך פיתוח תוך שמירה על החוזקות הקיימים יניב תוצאות משמעותיות.",
    "גישה מאוזנת זו מאפשרת התפתחות הדרגתית ויציבה.",
    ""
  ];
  return balancedClosings[Math.floor(Math.random() * balancedClosings.length)];
};

// פונקציה מרכזית ליצירת פסקה חכמה ומגוונת
export const generateIntelligentParagraph = (
  dimension: string,
  answers: Answer[],
  userIdentifier?: string
): string => {
  const relevantAnswers = filterAnswersForDimension(dimension, answers);
  
  if (relevantAnswers.length === 0) {
    return "לא נמצאו תשובות רלוונטיות לממד זה.";
  }

  // איסוף והכנת התובנות
  const allInsights: string[] = [];
  relevantAnswers.forEach(answer => {
    const insightText = getInsightText(answer.questionId, answer.value);
    if (insightText && insightText.trim() && insightText !== "nan") {
      allInsights.push(insightText);
    }
  });

  if (allInsights.length === 0) {
    return "לא נמצאו תובנות מתאימות לממד זה.";
  }

  // סיווג התובנות
  const classifiedInsights = allInsights.map(insight => classifyInsight(insight));
  
  // קביעת הטון הכללי
  const positiveCount = classifiedInsights.filter(i => i.tone === 'positive').length;
  const constructiveCount = classifiedInsights.filter(i => i.tone === 'constructive').length;
  
  let overallTone: 'positive' | 'balanced' | 'constructive';
  if (positiveCount > constructiveCount * 1.5) overallTone = 'positive';
  else if (constructiveCount > positiveCount * 1.5) overallTone = 'constructive';
  else overallTone = 'balanced';

  // בחירת 2-4 תובנות מגוונות
  const selectedInsights = selectDiverseInsights(classifiedInsights, userIdentifier);
  
  // בניית הפסקה
  let paragraph = getOpeningByOverallTone(overallTone, dimension);
  
  // הוספת התובנות עם מחברים טבעיים
  selectedInsights.forEach((insight, index) => {
    if (index === 0) {
      paragraph += `. ${adaptInsightForFlow(insight.text, true)}`;
    } else {
      const connector = selectContextualConnector(
        selectedInsights[index - 1].tone,
        insight.tone,
        index
      );
      
      if (connector) {
        paragraph += `. ${connector}, ${adaptInsightForFlow(insight.text, false)}`;
      } else {
        paragraph += `. ${adaptInsightForFlow(insight.text, false)}`;
      }
    }
  });

  // הוספת סיום מתאים
  const closing = createClosingStatement(overallTone, selectedInsights);
  if (closing) {
    paragraph += ` ${closing}`;
  }

  return cleanParagraph(paragraph);
};

// בחירת תובנות מגוונות לפי טון ונושא
const selectDiverseInsights = (
  insights: InsightClassification[],
  userIdentifier?: string
): InsightClassification[] => {
  // יצירת זרע לשונות
  const seed = userIdentifier ? 
    userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
    Date.now();

  // מעדיפים גיוון בטון ובנושא
  const selected: InsightClassification[] = [];
  const usedThemes = new Set<string>();
  const maxInsights = Math.min(4, insights.length);
  
  // תחילה - בחירת תובנה אחת מכל טון אם קיים
  const positiveInsights = insights.filter(i => i.tone === 'positive');
  const constructiveInsights = insights.filter(i => i.tone === 'constructive');
  const neutralInsights = insights.filter(i => i.tone === 'neutral');

  if (positiveInsights.length > 0) {
    const idx = (seed + 1) % positiveInsights.length;
    selected.push(positiveInsights[idx]);
    usedThemes.add(positiveInsights[idx].theme);
  }

  if (constructiveInsights.length > 0 && selected.length < maxInsights) {
    const idx = (seed + 2) % constructiveInsights.length;
    selected.push(constructiveInsights[idx]);
    usedThemes.add(constructiveInsights[idx].theme);
  }

  // השלמה עד למקסימום עם העדפה לגיוון נושאים
  const remainingInsights = insights.filter(insight => 
    !selected.includes(insight) && !usedThemes.has(insight.theme)
  );

  remainingInsights.slice(0, maxInsights - selected.length).forEach(insight => {
    selected.push(insight);
    usedThemes.add(insight.theme);
  });

  // אם עדיין לא מספיק - השלמה ללא הגבלת נושא
  if (selected.length < maxInsights) {
    const stillRemaining = insights.filter(insight => !selected.includes(insight));
    stillRemaining.slice(0, maxInsights - selected.length).forEach(insight => {
      selected.push(insight);
    });
  }

  return selected.slice(0, maxInsights);
};

// התאמת תובנה לזרימה טבעית
const adaptInsightForFlow = (insight: string, isFirst: boolean): string => {
  let adapted = insight;
  
  if (isFirst) {
    // התובנה הראשונה - התאמה לזרימה מהפתיחה
    adapted = adapted.replace(/^את\/ה /g, "אתה ")
                   .replace(/^ייתכן שאת\/ה /g, "נראה שאתה ")
                   .replace(/^נראה כי את\/ה /g, "אתה ");
  } else {
    // תובנות המשך - התאמה לזרימה מהמשפט הקודם
    adapted = adapted.replace(/^את\/ה /g, "כמו כן אתה ")
                   .replace(/^ייתכן שאת\/ה /g, "")
                   .replace(/^נראה כי את\/ה /g, "");
  }
  
  return adapted;
};

// ניקוי וחידוד הפסקה
const cleanParagraph = (text: string): string => {
  return text
    .replace(/\.{2,}/g, ".") // הסרת נקודות כפולות
    .replace(/\s+/g, " ") // רווחים מיותרים
    .replace(/\.(\S)/g, ". $1") // רווח אחרי נקודה
    .replace(/\s*[-–]\s*/g, " – ") // תיקון מקפים
    .replace(/\s*,\s*,/g, ",") // פסיקים כפולים
    .trim();
};
