
import { Answer } from "@/lib/types";
import { getInsightText, calculateEffectiveScore } from "./scoring-logic";

// פונקציה לזיהוי טון של תובנה בודדת
export const classifyInsightTone = (insight: string): 'positive' | 'constructive' | 'neutral' => {
  const positiveIndicators = [
    "ביטוי ל", "מחזק", "מעיד על", "תודעה", "דבר שמ", "גישה שמ", 
    "יוזם", "מגלה", "פועל/ת מתוך", "מצליח", "יודע/ת", "אותנטי", "מתוך חזון"
  ];
  
  const constructiveIndicators = [
    "ייתכן ש", "מה שעלול", "דבר שעלול", "מתקשה", "לא מזהה", 
    "מגיב/ה באיחור", "נבלע/ת", "מאבד/ת", "עסוק/ה בעיקר", "מתעלם"
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

// פונקציה משופרת לבחירת מחבר הגיוני
export const selectLogicalConnector = (
  previousInsight: string, 
  currentInsight: string,
  position: number
): string => {
  const prevTone = classifyInsightTone(previousInsight);
  const currTone = classifyInsightTone(currentInsight);
  
  // אם יש ניגוד אמיתי בין הטונים
  if ((prevTone === 'positive' && currTone === 'constructive') || 
      (prevTone === 'constructive' && currTone === 'positive')) {
    const contrastConnectors = ["יחד עם זאת", "לצד זאת", "אולם", "מצד שני"];
    return contrastConnectors[position % contrastConnectors.length];
  }
  
  // אם התובנה השנייה מרחיבה או מחזקת את הראשונה
  if (prevTone === currTone && currTone === 'positive') {
    const additiveConnectors = ["בנוסף", "יתרה מכך", "כמו כן"];
    return additiveConnectors[position % additiveConnectors.length];
  }
  
  // אם התובנה השנייה מפרטת או מדגימה
  if (currentInsight.includes("ביטוי") || currentInsight.includes("מתבטא")) {
    const elaborativeConnectors = ["דבר זה בא לידי ביטוי בכך ש", "למשל", "הדבר ניכר ב"];
    return elaborativeConnectors[position % elaborativeConnectors.length];
  }
  
  // במקרים אחרים - העדף חיבור טבעי ללא מחבר מפורש
  return "";
};

// פונקציה ליצירת וריאציות בניסוח
export const varyPhrasing = (insight: string, position: number): string => {
  const variations = [
    "ייתכן שאת/ה",
    "נראה כי את/ה", 
    "לעיתים את/ה",
    "יש סימנים לכך שאת/ה",
    "נטייתך היא ל",
    "דומה שאת/ה"
  ];
  
  let result = insight;
  
  // החלפת הביטוי החוזר
  if (result.startsWith("ייתכן שאת/ה") && position > 0) {
    const newPhrase = variations[position % variations.length];
    result = result.replace("ייתכן שאת/ה", newPhrase);
  }
  
  return result;
};

// פונקציה לניקוי ועיצוב משפטים
export const cleanAndFormat = (text: string): string => {
  return text
    // הסרת נקודות כפולות
    .replace(/\.{2,}/g, ".")
    // ניקוי רווחים מיותרים
    .replace(/\s+/g, " ")
    // הבטחת רווח אחרי נקודה
    .replace(/\.(\S)/g, ". $1")
    // ניקוי רווחים בתחילת וסיום
    .trim();
};

// פונקציה לקיבוץ תובנות לפי נושא
export const groupInsightsByTheme = (insights: string[]): string[][] => {
  const themes: { [key: string]: string[] } = {
    leadership: [],
    relationships: [],
    learning: [],
    adaptation: [],
    general: []
  };
  
  insights.forEach(insight => {
    if (insight.includes("מנהיגות") || insight.includes("הובלה") || insight.includes("חזון")) {
      themes.leadership.push(insight);
    } else if (insight.includes("קשר") || insight.includes("אמון") || insight.includes("שייכות")) {
      themes.relationships.push(insight);
    } else if (insight.includes("למידה") || insight.includes("סקרנות") || insight.includes("התפתחות")) {
      themes.learning.push(insight);
    } else if (insight.includes("הסתגלות") || insight.includes("שינוי") || insight.includes("גמישות")) {
      themes.adaptation.push(insight);
    } else {
      themes.general.push(insight);
    }
  });
  
  return Object.values(themes).filter(group => group.length > 0);
};

// פונקציה מרכזית ליצירת פסקה זורמת ומקושרת
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
  
  // קיבוץ לפי נושאים למבנה טוב יותר
  const themeGroups = groupInsightsByTheme(validInsights);
  const selectedInsights = themeGroups.length > 0 ? 
    themeGroups.flat().slice(0, 3) : validInsights.slice(0, 3);
  
  // בניית הפסקה עם זרימה טבעית
  let paragraph = cleanAndFormat(varyPhrasing(selectedInsights[0], 0));
  
  for (let i = 1; i < selectedInsights.length; i++) {
    const currentInsight = varyPhrasing(selectedInsights[i], i);
    const connector = selectLogicalConnector(selectedInsights[i-1], currentInsight, i);
    
    if (connector.trim()) {
      // אם יש מחבר הגיוני - השתמש בו
      if (connector.startsWith("דבר זה")) {
        paragraph += `. ${connector}${currentInsight.replace(/^[^א-ת]*/, "")}`;
      } else {
        paragraph += `. ${connector}, ${currentInsight}`;
      }
    } else {
      // חיבור טבעי ללא מחבר מפורש
      paragraph += `. ${currentInsight}`;
    }
  }
  
  return cleanAndFormat(paragraph);
};

// פונקציה מרכזית לשילוב תובנות לפסקה טבעית וזורמת
export const combineInsightsNaturally = (
  insights: string[], 
  dimension: string, 
  userIdentifier?: string
): string => {
  return createFlowingParagraph(insights, userIdentifier);
};
