
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

// פונקציה לבחירת מחבר מתאים בין שתי תובנות
export const selectAppropriateConnector = (
  firstInsight: string, 
  secondInsight: string,
  overallTone: 'positive' | 'balanced' | 'constructive'
): string => {
  const firstTone = classifyInsightTone(firstInsight);
  const secondTone = classifyInsightTone(secondInsight);
  
  // אם יש סתירה בין הטונים - השתמש במחבר ניגודי
  if ((firstTone === 'positive' && secondTone === 'constructive') || 
      (firstTone === 'constructive' && secondTone === 'positive')) {
    const contrastiveConnectors = ["יחד עם זאת", "מצד שני", "אולם"];
    return contrastiveConnectors[Math.floor(Math.random() * contrastiveConnectors.length)];
  }
  
  // אם שני הטונים דומים - השתמש במחבר הוספה או השאר ללא מחבר
  if (firstTone === secondTone) {
    const additiveConnectors = ["כמו כן", "בנוסף", ""];
    return additiveConnectors[Math.floor(Math.random() * additiveConnectors.length)];
  }
  
  // במצבים אחרים - העדף להשאיר ללא מחבר
  return "";
};

// פונקציה ליצירת פסקה ייחודית ומותאמת אישית
export const createPersonalizedParagraph = (
  insights: string[],
  userIdentifier?: string
): string => {
  if (insights.length === 0) return "";
  if (insights.length === 1) return insights[0];
  
  // סינון תובנות ריקות או לא תקינות
  const validInsights = insights.filter(insight => 
    insight && insight.trim().length > 10 && !insight.includes("nan")
  );
  
  if (validInsights.length === 0) return "";
  if (validInsights.length === 1) return validInsights[0];
  
  // קביעת הטון הכללי
  const overallTone = determineOverallTone(validInsights);
  
  // יצירת זרע לוריאציה אם יש מזהה משתמש
  const seed = userIdentifier ? 
    userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % validInsights.length : 
    0;
  
  // בחירת 2-3 תובנות מרכזיות (לא יותר כדי לשמור על קריאות)
  const maxInsights = Math.min(3, validInsights.length);
  const selectedInsights = selectKeyInsights(validInsights, seed, maxInsights);
  
  if (selectedInsights.length === 1) return selectedInsights[0];
  
  // בניית הפסקה עם מחברים מתאימים
  return buildFlowingNarrative(selectedInsights, overallTone);
};

// פונקציה לבחירת תובנות מרכזיות
const selectKeyInsights = (insights: string[], seed: number, maxCount: number): string[] => {
  // מיון לפי עדיפות (אורך וחשיבות תוכנית)
  const prioritizedInsights = insights
    .map(insight => ({
      text: insight,
      priority: calculateInsightPriority(insight),
      length: insight.length
    }))
    .sort((a, b) => {
      // העדפה לתובנות בעלות עדיפות גבוהה
      if (a.priority !== b.priority) return b.priority - a.priority;
      // בין תובנות באותה עדיפות, העדפה לקצרות יותר (קריאות)
      return a.length - b.length;
    });
  
  // בחירה על בסיס הזרע והעדיפות
  const numToSelect = Math.min(maxCount, Math.max(2, prioritizedInsights.length));
  return prioritizedInsights.slice(0, numToSelect).map(item => item.text);
};

// פונקציה לחישוב עדיפות תובנה
const calculateInsightPriority = (insight: string): number => {
  let priority = 1;
  
  // תובנות הנוגעות למנהיגות וחזון - עדיפות גבוהה
  if (insight.includes("מנהיגות") || insight.includes("הובלה") || insight.includes("חזון")) {
    priority += 3;
  }
  
  // תובנות על קשרים אישיים ואמון - עדיפות בינונית-גבוהה  
  if (insight.includes("אמון") || insight.includes("שייכות") || insight.includes("קשר")) {
    priority += 2;
  }
  
  // תובנות על למידה והתפתחות - עדיפות בינונית
  if (insight.includes("למידה") || insight.includes("התפתחות") || insight.includes("סקרנות")) {
    priority += 1;
  }
  
  return priority;
};

// פונקציה לבניית נרטיב זורם
const buildFlowingNarrative = (
  insights: string[], 
  overallTone: 'positive' | 'balanced' | 'constructive'
): string => {
  if (insights.length < 2) return insights[0] || "";
  
  let narrative = insights[0];
  
  for (let i = 1; i < insights.length; i++) {
    const connector = selectAppropriateConnector(insights[i-1], insights[i], overallTone);
    
    if (connector.trim()) {
      narrative += `. ${connector}, ${insights[i]}`;
    } else {
      // חיבור ישיר ללא מחבר
      narrative += `. ${insights[i]}`;
    }
  }
  
  return narrative;
};

// פונקציה מרכזית לשילוב תובנות לפסקה טבעית וייחודית
export const combineInsightsNaturally = (
  insights: string[], 
  dimension: string, 
  userIdentifier?: string
): string => {
  return createPersonalizedParagraph(insights, userIdentifier);
};
