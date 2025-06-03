
// מנוע הווריאציות לניסוח טבעי
export interface VariationOptions {
  prefixes: string[];
  suffixes: string[];
  connectors: string[];
  pronouns: {
    masculine: string[];
    feminine: string[];
    neutral: string[];
  };
}

// מאגר ווריאציות לניסוח טבעי
export const variationOptions: VariationOptions = {
  prefixes: [
    "ניכר כי",
    "עולה כי",
    "נראה ש",
    "מתברר כי",
    "ניתן לראות ש",
    "המתבטא בכך ש",
    "הבא לידי ביטוי ב"
  ],
  suffixes: [
    "",
    " - דבר המעיד על יכולותיך",
    " - תכונה חשובה בעבודתך",
    " - מאפיין בולט במנהיגותך",
    " - היבט משמעותי בפיתוחך המקצועי",
    " - נקודה חשובה להמשך התפתחותך"
  ],
  connectors: [
    "בנוסף,",
    "כמו כן,",
    "יחד עם זאת,",
    "מאידך,",
    "יתרה מכך,",
    "עם זאת,",
    "כתוצאה מכך,",
    "לכן,",
    "במקביל,",
    "באופן דומה,"
  ],
  pronouns: {
    masculine: ["אתה", "הנך", "את"],
    feminine: ["את", "הנך", "אתה"],
    neutral: ["אתה", "הנך"]
  }
};

// פונקציה ליצירת וריאציה בניסוח
export const createVariation = (
  baseText: string, 
  variationIndex: number,
  isFirstSentence: boolean = false
): string => {
  const { prefixes, suffixes, connectors } = variationOptions;
  
  // בחירת אלמנטים על בסיס האינדקס
  const prefixIndex = variationIndex % prefixes.length;
  const suffixIndex = Math.floor(variationIndex / prefixes.length) % suffixes.length;
  const connectorIndex = variationIndex % connectors.length;
  
  let result = baseText;
  
  // החלפת הפתיח אם קיים
  if (result.startsWith("ניכר כי") || result.startsWith("עולה כי") || result.startsWith("נראה כי")) {
    const words = result.split(" ");
    words[0] = prefixes[prefixIndex];
    words[1] = words[1] === "כי" ? "כי" : "ש";
    result = words.join(" ");
  }
  
  // הוספת סיומת
  if (suffixes[suffixIndex]) {
    result += suffixes[suffixIndex];
  }
  
  // הוספת מחבר במקרה של משפט שאינו ראשון
  if (!isFirstSentence) {
    result = `${connectors[connectorIndex]} ${result}`;
  }
  
  return result;
};

// פונקציה להתאמת כינויים
export const adaptPronouns = (text: string, genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'): string => {
  const pronouns = variationOptions.pronouns[genderHint];
  let result = text;
  
  // החלפות בסיסיות לכינויים
  if (result.includes("את/ה")) {
    const replacement = pronouns[Math.floor(Math.random() * pronouns.length)];
    result = result.replace(/את\/ה/g, replacement);
  }
  
  if (result.includes("הנך")) {
    // שמירה על "הנך" כצורה פורמלית יותר
    result = result.replace(/הנך/g, "הנך");
  }
  
  return result;
};

// פונקציה ליצירת מספר וריאציות לאותו טקסט
export const generateVariations = (baseText: string, count: number = 5): string[] => {
  const variations: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const variation = createVariation(baseText, i);
    const adaptedVariation = adaptPronouns(variation);
    variations.push(adaptedVariation);
  }
  
  return variations;
};

// פונקציה לבחירת וריאציה רנדומלית
export const selectRandomVariation = (variations: string[]): string => {
  const randomIndex = Math.floor(Math.random() * variations.length);
  return variations[randomIndex];
};
