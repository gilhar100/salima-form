
import { Answer } from "@/lib/types";
import { getInsightText, calculateEffectiveScore } from "./scoring-logic";

// פונקציה לזיהוי טון של תובנה בודדת
export const classifyInsightTone = (insight: string): 'positive' | 'constructive' | 'neutral' => {
  const positiveIndicators = [
    "ביטוי ל", "מחזק", "מעיד על", "תודעה", "דבר שמ", "גישה שמ", 
    "יוזם", "מגלה", "פועל/ת מתוך", "מצליח", "יודע/ת", "אותנטי", "מתוך חזון", "כישור"
  ];
  
  const constructiveIndicators = [
    "ייתכן ש", "מה שעלול", "דבר שעלול", "מתקשה", "לא מזהה", 
    "מגיב/ה באיחור", "נבלע/ת", "מאבד/ת", "עסוק/ה בעיקר", "מתעלם", "רצוי", "כדאי"
  ];
  
  const hasPositive = positiveIndicators.some(indicator => insight.includes(indicator));
  const hasConstructive = constructiveIndicators.some(indicator => insight.includes(indicator));
  
  if (hasPositive && !hasConstructive) return 'positive';
  if (hasConstructive && !hasPositive) return 'constructive';
  return 'neutral';
};

// פונקציה לקבלת טון כללי על בסיס התובנות
export const determineOverallTone = (insights: string[]): 'positive' | 'balanced' | 'constructive' => {
  const tones = insights.map(insight => classifyInsightTone(insight));
  const positiveCount = tones.filter(tone => tone === 'positive').length;
  const constructiveCount = tones.filter(tone => tone === 'constructive').length;
  
  if (positiveCount > constructiveCount * 1.5) return 'positive';
  if (constructiveCount > positiveCount * 1.5) return 'constructive';
  return 'balanced';
};

// פונקציה מותאמת לבחירת מחבר הגיוני רק כשהוא באמת מתאים
export const selectLogicalConnector = (
  previousInsight: string, 
  currentInsight: string,
  position: number
): string => {
  const prevTone = classifyInsightTone(previousInsight);
  const currTone = classifyInsightTone(currentInsight);
  
  // רק אם יש ניגוד אמיתי וברור - השתמש במחבר ניגוד
  if ((prevTone === 'positive' && currTone === 'constructive' && 
       currentInsight.includes("רצוי")) || 
      (prevTone === 'constructive' && currTone === 'positive' && 
       previousInsight.includes("רצוי"))) {
    return position % 2 === 0 ? "יחד עם זאת" : "לצד זאת";
  }
  
  // רק אם התובנה השנייה באמת מחזקת או מרחיבה את הראשונה
  if (prevTone === 'positive' && currTone === 'positive' && 
      (currentInsight.includes("יתרה מכך") || currentInsight.includes("בנוסף") ||
       currentInsight.includes("מחזק") || currentInsight.includes("מעיד"))) {
    return position % 3 === 0 ? "בנוסף" : "";
  }
  
  // רק אם זה באמת דוגמה או פירוט ברור של הקודם
  if (currentInsight.includes("ביטוי לכך") || 
      (previousInsight.includes("מתאפיין") && currentInsight.includes("מתבטא"))) {
    return "הדבר בא לידי ביטוי";
  }
  
  // ברוב המקרים - ללא מחבר מאולץ, תן לטקסט לזרום טבעית
  return "";
};

// פונקציה לווריאציות טבעיות בניסוח
export const varyPhrasing = (insight: string, position: number): string => {
  const naturalVariations = [
    { from: "ייתכן שאת/ה", to: "נראה כי את/ה" },
    { from: "ייתכן שאת/ה", to: "לעיתים את/ה" },
    { from: "ייתכן שאת/ה", to: "יש סימנים לכך שאת/ה" },
    { from: "ייתכן שאת/ה", to: "נטייתך היא ל" },
    { from: "ייתכן שאת/ה", to: "דומה שאת/ה" }
  ];
  
  let result = insight;
  
  // החלפה טבעית רק אם יש חזרה
  if (result.startsWith("ייתכן שאת/ה") && position > 0) {
    const variation = naturalVariations[position % naturalVariations.length];
    result = result.replace(variation.from, variation.to);
  }
  
  return result;
};

// ניקוי וחידוד של המשפטים
export const cleanAndFormat = (text: string): string => {
  return text
    .replace(/\.{2,}/g, ".") // הסרת נקודות כפולות
    .replace(/\s+/g, " ") // רווחים מיותרים
    .replace(/\.(\S)/g, ". $1") // רווח אחרי נקודה
    .replace(/\s*[-–]\s*/g, " – ") // תיקון מקפים
    .trim();
};

// קיבוץ תובנות לפי נושא לזרימה טובה יותר
export const groupInsightsByTheme = (insights: string[]): string[][] => {
  const themes: { [key: string]: string[] } = {
    leadership: [],
    relationships: [],
    learning: [],
    adaptation: [],
    general: []
  };
  
  insights.forEach(insight => {
    if (insight.includes("מנהיגות") || insight.includes("הובלה") || insight.includes("חזון") || insight.includes("אסטרטגי")) {
      themes.leadership.push(insight);
    } else if (insight.includes("קשר") || insight.includes("אמון") || insight.includes("שייכות") || insight.includes("אחרים")) {
      themes.relationships.push(insight);
    } else if (insight.includes("למידה") || insight.includes("סקרנות") || insight.includes("התפתחות") || insight.includes("חדש")) {
      themes.learning.push(insight);
    } else if (insight.includes("הסתגלות") || insight.includes("שינוי") || insight.includes("גמישות") || insight.includes("מתאים")) {
      themes.adaptation.push(insight);
    } else {
      themes.general.push(insight);
    }
  });
  
  return Object.values(themes).filter(group => group.length > 0);
};

// פונקציה מרכזית ליצירת פסקה זורמת וטבעית ללא מחברים מאולצים
export const createFlowingParagraph = (
  insights: string[],
  userIdentifier?: string
): string => {
  if (insights.length === 0) return "";
  if (insights.length === 1) return cleanAndFormat(varyPhrasing(insights[0], 0));
  
  // סינון תובנות תקינות
  const validInsights = insights.filter(insight => 
    insight && insight.trim().length > 10 && !insight.includes("nan")
  );
  
  if (validInsights.length === 0) return "";
  if (validInsights.length === 1) return cleanAndFormat(varyPhrasing(validInsights[0], 0));
  
  // קיבוץ לפי נושאים למבנה טבעי יותר
  const themeGroups = groupInsightsByTheme(validInsights);
  const selectedInsights = themeGroups.length > 0 ? 
    themeGroups.flat().slice(0, 3) : validInsights.slice(0, 3);
  
  // בניית הפסקה עם זרימה טבעית ואמיתית
  let paragraph = cleanAndFormat(varyPhrasing(selectedInsights[0], 0));
  
  for (let i = 1; i < selectedInsights.length; i++) {
    const currentInsight = varyPhrasing(selectedInsights[i], i);
    const connector = selectLogicalConnector(selectedInsights[i-1], currentInsight, i);
    
    if (connector.trim()) {
      // שימוש במחבר רק אם הוא באמת מתאים
      if (connector.startsWith("הדבר בא")) {
        paragraph += `. ${connector} בכך ש${currentInsight.replace(/^[^א-ת]*/, "").replace(/^נראה כי את\/ה|^ייתכן שאת\/ה|^דומה שאת\/ה/, "את/ה")}`;
      } else if (connector === "בנוסף") {
        paragraph += `. ${connector}, ${currentInsight}`;
      } else {
        paragraph += `. ${connector}, ${currentInsight}`;
      }
    } else {
      // חיבור טבעי ללא מחבר - פשוט המשך זורם
      paragraph += `. ${currentInsight}`;
    }
  }
  
  return cleanAndFormat(paragraph);
};

// פונקציה מרכזית לשילוב תובנות לפסקה טבעית ואנושית
export const combineInsightsNaturally = (
  insights: string[], 
  dimension: string, 
  userIdentifier?: string
): string => {
  return createFlowingParagraph(insights, userIdentifier);
};
