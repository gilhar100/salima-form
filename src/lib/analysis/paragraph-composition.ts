
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

// מנגנון ליצירת מבנים מגוונים לפסקה
export const createVariedParagraphStructure = (
  insights: string[],
  structureIndex: number,
  userIdentifier?: string
): string => {
  if (insights.length === 0) return "";
  if (insights.length === 1) return varyInsightPhrasing(insights[0], 0);
  
  const validInsights = insights.filter(insight => 
    insight && insight.trim().length > 10 && !insight.includes("nan")
  );
  
  if (validInsights.length === 0) return "";
  if (validInsights.length === 1) return varyInsightPhrasing(validInsights[0], 0);
  
  const selectedInsights = validInsights.slice(0, 3);
  const overallTone = determineOverallTone(selectedInsights);
  
  // בחירת מבנה פסקה על בסיס האינדקס
  const structureType = structureIndex % 6;
  
  switch (structureType) {
    case 0: return createNarrativeStructure(selectedInsights, overallTone);
    case 1: return createReflectiveStructure(selectedInsights, overallTone);
    case 2: return createContrastiveStructure(selectedInsights, overallTone);
    case 3: return createProgressiveStructure(selectedInsights, overallTone);
    case 4: return createContextualStructure(selectedInsights, overallTone);
    case 5: return createIntegrativeStructure(selectedInsights, overallTone);
    default: return createFlowingStructure(selectedInsights, overallTone);
  }
};

// מבנה נרטיבי - מתחיל בסיפור או הקשר
const createNarrativeStructure = (insights: string[], tone: string): string => {
  const narrativeStarters = [
    "כשמסתכלים על הדרך שלך בעבודה, ",
    "בהתבוננות על הגישה שלך, ",
    "מה שבולט במיוחד הוא ש",
    "אחד הדברים המאפיינים אותך הוא ש"
  ];
  
  const starter = narrativeStarters[Math.floor(Math.random() * narrativeStarters.length)];
  let result = starter + adaptInsightToNarrative(insights[0]);
  
  if (insights.length > 1) {
    const connector = selectNaturalConnector(insights[0], insights[1], 'narrative');
    if (connector) {
      result += `. ${connector}, ${varyInsightPhrasing(insights[1], 1)}`;
    } else {
      result += `. ${varyInsightPhrasing(insights[1], 1)}`;
    }
  }
  
  return cleanAndFormat(result);
};

// מבנה רפלקטיבי - מתחיל בהערכה או מחשבה
const createReflectiveStructure = (insights: string[], tone: string): string => {
  const reflectiveStarters = [
    "נראה כי ",
    "מתברר ש",
    "ניכר כי ",
    "מה שמעיד על כך הוא ש"
  ];
  
  const starter = reflectiveStarters[Math.floor(Math.random() * reflectiveStarters.length)];
  let result = starter + adaptInsightToReflection(insights[0]);
  
  if (insights.length > 1) {
    result += `. דבר זה משתלב היטב עם ${adaptInsightToFlow(insights[1])}`;
  }
  
  return cleanAndFormat(result);
};

// מבנה קונטרסטיווי - מתחיל בחוזק ומאזן או להפך
const createContrastiveStructure = (insights: string[], tone: string): string => {
  const positiveInsights = insights.filter(insight => classifyInsightTone(insight) === 'positive');
  const constructiveInsights = insights.filter(insight => classifyInsightTone(insight) === 'constructive');
  
  let result = "";
  
  if (positiveInsights.length > 0 && constructiveInsights.length > 0) {
    result = varyInsightPhrasing(positiveInsights[0], 0);
    result += `. יחד עם זאת, ${adaptInsightToContrast(constructiveInsights[0])}`;
  } else if (insights.length >= 2) {
    result = varyInsightPhrasing(insights[0], 0);
    result += `. במקביל, ${varyInsightPhrasing(insights[1], 1)}`;
  } else {
    result = varyInsightPhrasing(insights[0], 0);
  }
  
  return cleanAndFormat(result);
};

// מבנה פרוגרסיבי - בונה מתובנה לתובנה
const createProgressiveStructure = (insights: string[], tone: string): string => {
  let result = varyInsightPhrasing(insights[0], 0);
  
  if (insights.length > 1) {
    const buildingPhrases = [
      "דבר זה מוביל ל",
      "מכאן נובע ש",
      "יתרה מכך, ",
      "בהמשך לכך, "
    ];
    
    const buildingPhrase = buildingPhrases[Math.floor(Math.random() * buildingPhrases.length)];
    result += `. ${buildingPhrase}${adaptInsightToProgression(insights[1])}`;
  }
  
  return cleanAndFormat(result);
};

// מבנה הקשרי - מתחיל בהקשר רחב
const createContextualStructure = (insights: string[], tone: string): string => {
  const contextualFrames = [
    "בעבודה מנהיגותית, ",
    "כשמדובר בהובלת צוותים, ",
    "בסביבה מקצועית, ",
    "בהקשר של פיתוח מנהיגותי, "
  ];
  
  const frame = contextualFrames[Math.floor(Math.random() * contextualFrames.length)];
  let result = frame + adaptInsightToContext(insights[0]);
  
  if (insights.length > 1) {
    result += `. זה משתקף גם ב${adaptInsightToFlow(insights[1])}`;
  }
  
  return cleanAndFormat(result);
};

// מבנה אינטגרטיבי - מקשר בין תובנות בצורה הוליסטית
const createIntegrativeStructure = (insights: string[], tone: string): string => {
  if (insights.length < 2) return varyInsightPhrasing(insights[0], 0);
  
  const integrativeConnectors = [
    "התמונה הכוללת מראה ש",
    "כשמחברים בין הנקודות, עולה ש",
    "הדרך שבה אלה משתלבים יחד מעידה על כך ש"
  ];
  
  const connector = integrativeConnectors[Math.floor(Math.random() * integrativeConnectors.length)];
  let result = `${varyInsightPhrasing(insights[0], 0)}. ${connector}${adaptInsightToIntegration(insights[1])}`;
  
  return cleanAndFormat(result);
};

// מבנה זורם - המבנה הקלאסי עם שיפורים
const createFlowingStructure = (insights: string[], tone: string): string => {
  let result = varyInsightPhrasing(insights[0], 0);
  
  for (let i = 1; i < insights.length; i++) {
    const connector = selectNaturalConnector(insights[i-1], insights[i], 'flowing');
    if (connector) {
      result += `. ${connector}, ${varyInsightPhrasing(insights[i], i)}`;
    } else {
      result += `. ${varyInsightPhrasing(insights[i], i)}`;
    }
  }
  
  return cleanAndFormat(result);
};

// פונקציות עזר להתאמת תובנות למבנים שונים
const adaptInsightToNarrative = (insight: string): string => {
  return insight.replace(/^את\/ה /g, "אתה/את ")
               .replace(/^ייתכן שאת\/ה /g, "אתה/את ")
               .replace(/^נראה כי את\/ה /g, "אתה/את ");
};

const adaptInsightToReflection = (insight: string): string => {
  return insight.replace(/^את\/ה /g, "יש לך ")
               .replace(/^ייתכן שאת\/ה /g, "יש בך ")
               .replace(/^נראה כי את\/ה /g, "יש בך ");
};

const adaptInsightToContrast = (insight: string): string => {
  return insight.replace(/^ייתכן שאת\/ה /g, "לעיתים את/ה ")
               .replace(/^את\/ה /g, "את/ה גם ");
};

const adaptInsightToProgression = (insight: string): string => {
  return insight.replace(/^את\/ה /g, "אתה/את ")
               .replace(/^ייתכן שאת\/ה /g, "");
};

const adaptInsightToContext = (insight: string): string => {
  return insight.replace(/^את\/ה /g, "אתה/את ")
               .replace(/^ייתכן שאת\/ה /g, "אתה/את ")
               .toLowerCase();
};

const adaptInsightToFlow = (insight: string): string => {
  return insight.replace(/^את\/ה /g, "היותך ")
               .replace(/^ייתכן שאת\/ה /g, "היותך ")
               .replace(/^נראה כי את\/ה /g, "היותך ");
};

const adaptInsightToIntegration = (insight: string): string => {
  return insight.replace(/^את\/ה /g, "יש בך ")
               .replace(/^ייתכן שאת\/ה /g, "קיימת בך ")
               .replace(/^נראה כי את\/ה /g, "קיימת בך ");
};

// מנגנון לווריאציות בניסוח תובנות בודדות
export const varyInsightPhrasing = (insight: string, position: number): string => {
  const phrasings = [
    { from: "ייתכן שאת/ה", variations: ["נראה כי את/ה", "לעיתים את/ה", "יש סימנים לכך שאת/ה", "נטייתך היא ל", "דומה שאת/ה"] },
    { from: "את/ה מתאפיינ/ת", variations: ["את/ה מציג/ה", "ניכר בך", "את/ה מגלה/ה", "יש בך"] },
    { from: "נראה כי", variations: ["ניכר כי", "מתברר ש", "עולה כי", "מתבטא בכך ש"] }
  ];
  
  let result = insight;
  
  phrasings.forEach(phrasing => {
    if (result.includes(phrasing.from) && position > 0) {
      const variation = phrasing.variations[position % phrasing.variations.length];
      result = result.replace(phrasing.from, variation);
    }
  });
  
  return result;
};

// בחירת מחבר טבעי בהתאם לסוג המבנה והתוכן
export const selectNaturalConnector = (
  previousInsight: string, 
  currentInsight: string,
  structureType: string
): string => {
  const prevTone = classifyInsightTone(previousInsight);
  const currTone = classifyInsightTone(currentInsight);
  
  // מחברים לפי הקשר ולא באופן מכני
  if (prevTone === 'positive' && currTone === 'constructive') {
    return Math.random() > 0.5 ? "יחד עם זאת" : "לצד זאת";
  }
  
  if (prevTone === currTone && prevTone === 'positive') {
    return Math.random() > 0.7 ? "בנוסף" : "";
  }
  
  if (currentInsight.includes("ביטוי לכך") || currentInsight.includes("מתבטא")) {
    return "הדבר בא לידי ביטוי";
  }
  
  // ברוב המקרים - ללא מחבר לזרימה טבעית
  return "";
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

// פונקציה מרכזית ליצירת פסקה מגוונת וייחודית
export const createFlowingParagraph = (
  insights: string[],
  userIdentifier?: string
): string => {
  if (insights.length === 0) return "";
  
  // יצירת זרע לשונות על בסיס מזהה המשתמש
  const seed = userIdentifier ? 
    userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
    Date.now();
  
  const structureIndex = seed % 100;
  
  return createVariedParagraphStructure(insights, structureIndex, userIdentifier);
};

// פונקציה מרכזית לשילוב תובנות לפסקה טבעית ואנושית
export const combineInsightsNaturally = (
  insights: string[], 
  dimension: string, 
  userIdentifier?: string
): string => {
  return createFlowingParagraph(insights, userIdentifier);
};
