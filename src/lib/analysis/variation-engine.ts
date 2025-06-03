
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
    " - תכונה המאפיינת אותך",
    " - היבט חשוב בעבודתך",
    " - מאפיין בולט שלך"
  ],
  connectors: [
    "בנוסף,",
    "כמו כן,", 
    "יחד עם זאת,",
    "מאידך,",
    "יתרה מכך,",
    "עם זאת,",
    "לכן,",
    "במקביל,",
    "באופן דומה,"
  ],
  pronouns: {
    masculine: ["אתה", "הנך"],
    feminine: ["את", "הנך"], 
    neutral: ["אתה", "הנך"]
  }
};

// פונקציה ליצירת וריאציה בניסוח עם רגישות דקדוקית
export const createVariation = (
  baseText: string, 
  variationIndex: number,
  isFirstSentence: boolean = false
): string => {
  const { prefixes, suffixes } = variationOptions;
  
  // בחירת אלמנטים על בסיס האינדקס
  const prefixIndex = variationIndex % prefixes.length;
  const suffixIndex = Math.floor(variationIndex / prefixes.length) % suffixes.length;
  
  let result = baseText;
  
  // החלפת הפתיח רק אם קיים ומתאים
  const startsWithCommonPrefix = result.startsWith("ניכר כי") || 
                                  result.startsWith("עולה כי") || 
                                  result.startsWith("נראה כי");
  
  if (startsWithCommonPrefix) {
    const words = result.split(" ");
    const newPrefix = prefixes[prefixIndex];
    
    // התאמת המילה השנייה לפתיח החדש
    if (newPrefix.endsWith("ש")) {
      words[0] = newPrefix;
      words.splice(1, 1); // הסרת "כי"
    } else {
      words[0] = newPrefix;
      words[1] = "כי";
    }
    
    result = words.join(" ");
  }
  
  // הוספת סיומת רק אם מתאימה לקונטקסט
  if (suffixes[suffixIndex] && !result.includes("רצוי") && !result.includes("חשוב")) {
    result += suffixes[suffixIndex];
  }
  
  return result;
};

// פונקציה להתאמת כינויים עם שמירה על דקדוק
export const adaptPronouns = (text: string, genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'): string => {
  const pronouns = variationOptions.pronouns[genderHint];
  let result = text;
  
  // החלפות זהירות לכינויים
  if (result.includes("את/ה")) {
    const replacement = pronouns[Math.floor(Math.random() * pronouns.length)];
    result = result.replace(/את\/ה/g, replacement);
  }
  
  // התאמת צורות הפועל לכינוי
  if (result.includes("מתאפיינ/ת")) {
    const ending = genderHint === 'feminine' ? "מתאפיינת" : "מתאפיין";
    result = result.replace(/מתאפיינ\/ת/g, ending);
  }
  
  return result;
};

// פונקציה ליצירת מספר וריאציות לאותו טקסט
export const generateVariations = (baseText: string, count: number = 5): string[] => {
  const variations: string[] = [baseText]; // כולל את הטקסט המקורי
  
  for (let i = 1; i < count; i++) {
    const variation = createVariation(baseText, i);
    const adaptedVariation = adaptPronouns(variation);
    
    // ודוא שהווריאציה שונה מהקיימות
    if (!variations.includes(adaptedVariation)) {
      variations.push(adaptedVariation);
    }
  }
  
  return variations;
};

// פונקציה לבחירת וריאציה מבוססת זרע (לעקביות)
export const selectRandomVariation = (variations: string[], seed: number = 0): string => {
  const index = seed % variations.length;
  return variations[index];
};
