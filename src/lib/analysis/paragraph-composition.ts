
import { Answer } from "@/lib/types";
import { getInsightText } from "./scoring-logic";

// פונקציה לזיהוי תובנות חיוביות
export const isPositiveInsight = (insight: string): boolean => {
  const positiveKeywords = [
    "ביטוי ל", "מחזק", "מעיד על", "תודעה", "דבר שמ", "גישה שמ", 
    "יוזם", "מגלה", "פועל/ת מתוך", "מצליח", "יודע/ת", "אותנטי"
  ];
  return positiveKeywords.some(keyword => insight.includes(keyword));
};

// פונקציה לזיהוי תובנות שליליות/בונות
export const isNegativeInsight = (insight: string): boolean => {
  const negativeKeywords = [
    "ייתכן ש", "מה שעלול", "דבר שעלול", "מתקשה", "לא מזהה", 
    "מגיב/ה באיחור", "נבלע/ת", "מאבד/ת", "עסוק/ה בעיקר"
  ];
  return negativeKeywords.some(keyword => insight.includes(keyword));
};

// פונקציה לקביעת חשיבות תובנה
export const getInsightImportance = (insight: string): number => {
  let importance = 1;
  
  // תובנות חזקות יותר
  if (insight.includes("מנהיגות") || insight.includes("הובלה")) importance += 2;
  if (insight.includes("חזון") || insight.includes("אסטרטגי")) importance += 2;
  if (insight.includes("אמון") || insight.includes("שייכות")) importance += 1;
  if (insight.includes("השראה") || insight.includes("מוטיבציה")) importance += 1;
  
  return importance;
};

// פונקציה לבחירת תובנות מרכזיות
export const selectKeyInsights = (insights: string[], seed: number): string[] => {
  // מיון לפי חשיבות ואורך
  const sortedInsights = insights.sort((a, b) => {
    const aImportance = getInsightImportance(a);
    const bImportance = getInsightImportance(b);
    if (aImportance !== bImportance) return bImportance - aImportance;
    return a.length - b.length; // העדפה לתובנות קצרות יותר
  });
  
  // בחירת 2-3 תובנות בהתאם לזרע
  const maxInsights = Math.min(3, sortedInsights.length);
  const numInsights = Math.max(2, Math.min(maxInsights, 2 + (seed % 2)));
  
  return sortedInsights.slice(0, numInsights);
};

// פונקציה לקבלת מחברים לפי טון
export const getConnectorsByTone = (tone: 'positive' | 'balanced' | 'constructive', seed: number): string[] => {
  const connectorSets = {
    positive: ["יתרה מכך, ", "בנוסף, ", "כמו כן, "],
    balanced: ["עם זאת, ", "יחד עם זאת, ", "מאידך, "],
    constructive: ["כמו כן, ", "בנוסף, ", "חשוב לציין כי "]
  };
  
  const baseConnectors = connectorSets[tone];
  
  // ערבוב לפי הזרע
  const shuffled = [...baseConnectors];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed + i) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

// פונקציה ליצירת פסקה זורמת
export const createFlowingParagraph = (
  insights: string[], 
  tone: 'positive' | 'balanced' | 'constructive', 
  seed: number
): string => {
  if (insights.length === 1) return insights[0];
  
  // מחברים טבעיים לפי טון
  const connectors = getConnectorsByTone(tone, seed);
  
  let paragraph = insights[0];
  
  for (let i = 1; i < insights.length; i++) {
    const connector = connectors[(i - 1) % connectors.length];
    paragraph += ` ${connector}${insights[i]}`;
  }
  
  return paragraph;
};

// פונקציה מרכזית לשילוב תובנות לפסקה טבעית וזורמת
export const combineInsightsNaturally = (
  insights: string[], 
  dimension: string, 
  userIdentifier?: string
): string => {
  if (insights.length === 1) {
    return insights[0];
  }

  // יצירת זרע לוריאציה
  const seed = userIdentifier ? 
    userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
    Date.now();

  // זיהוי הטון הכללי של התובנות
  const positiveCount = insights.filter(insight => isPositiveInsight(insight)).length;
  const negativeCount = insights.filter(insight => isNegativeInsight(insight)).length;
  
  let overallTone: 'positive' | 'balanced' | 'constructive' = 'balanced';
  if (positiveCount > negativeCount * 1.5) overallTone = 'positive';
  else if (negativeCount > positiveCount * 1.5) overallTone = 'constructive';

  // בחירת 2-3 תובנות מרכזיות לפי החשיבות
  const selectedInsights = selectKeyInsights(insights, seed);
  
  // יצירת פסקה זורמת בהתאם לטון
  return createFlowingParagraph(selectedInsights, overallTone, seed);
};
