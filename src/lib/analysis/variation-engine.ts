
// מנוע הווריאציות לניסוח טבעי
export interface VariationOptions {
  prefixes: string[];
  suffixes: string[];
  connectors: string[];
  balancingPhrases: string[];
  pronouns: {
    masculine: string[];
    feminine: string[];
    neutral: string[];
  };
}

// מאגר ווריאציות לניסוח טבעי ללא ציונים מספריים
export const variationOptions: VariationOptions = {
  prefixes: [
    "ניכר כי",
    "עולה כי", 
    "נראה ש",
    "מתברר כי",
    "ניתן לראות ש",
    "המתבטא בכך ש",
    "הבא לידי ביטוי ב",
    "מתאפיין/ת ב",
    "מציג/ה",
    "מגלה/ה"
  ],
  suffixes: [
    "",
    " - תכונה המאפיינת אותך",
    " - היבט חשוב בעבודתך",
    " - מאפיין בולט שלך",
    " - כישור מרכזי בתפקידך",
    " - תכונה זו מבחינה אותך"
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
    "באופן דומה,",
    "לעומת זאת,",
    "בהקשר זה,"
  ],
  balancingPhrases: [
    "חשוב לציין כי",
    "יש לזכור ש",
    "ראוי להדגיש כי",
    "עם זאת, יש מקום לשיפור ב",
    "במקביל, רצוי לחזק את",
    "בהמשך, כדאי להתמקד ב"
  ],
  pronouns: {
    masculine: ["אתה", "הנך", "אתה מתאפיין", "אתה מציג"],
    feminine: ["את", "הנך", "את מתאפיינת", "את מציגה"], 
    neutral: ["את/ה", "הנך", "את/ה מתאפיינ/ת", "את/ה מציג/ה"]
  }
};

// פונקציה ליצירת וריאציה בניסוח עם רגישות דקדוקית - ללא חשיפת ציונים
export const createVariation = (
  baseText: string, 
  variationIndex: number,
  isFirstSentence: boolean = false,
  needsBalance: boolean = false
): string => {
  const { prefixes, suffixes, balancingPhrases } = variationOptions;
  
  // הסרת כל רמזים מספריים מהטקסט
  let result = baseText
    .replace(/\d+\s*ומעלה/g, "")
    .replace(/מתחת\s*ל[-]?\d+/g, "")
    .replace(/\d+\s*ומטה/g, "")
    .replace(/מעל\s*\d+/g, "")
    .replace(/ציון/g, "")
    .replace(/נקודות/g, "")
    .trim();

  // בחירת אלמנטים על בסיס האינדקס
  const prefixIndex = variationIndex % prefixes.length;
  const suffixIndex = Math.floor(variationIndex / prefixes.length) % suffixes.length;
  
  // החלפת הפתיח רק אם קיים ומתאים
  const startsWithCommonPrefix = result.startsWith("ניכר כי") || 
                                  result.startsWith("עולה כי") || 
                                  result.startsWith("נראה כי") ||
                                  result.startsWith("מתברר כי");
  
  if (startsWithCommonPrefix) {
    const words = result.split(" ");
    const newPrefix = prefixes[prefixIndex];
    
    // התאמת המילה השנייה לפתיח החדש
    if (newPrefix.endsWith("ש")) {
      words[0] = newPrefix;
      if (words[1] === "כי") {
        words.splice(1, 1);
      }
    } else {
      words[0] = newPrefix;
      if (!words[1] || words[1] !== "כי") {
        words.splice(1, 0, "כי");
      }
    }
    
    result = words.join(" ");
  }
  
  // הוספת איזון לטקסטים ביקורתיים
  if (needsBalance && result.includes("רצוי") || result.includes("קושי")) {
    const balancePhrase = balancingPhrases[variationIndex % balancingPhrases.length];
    if (Math.random() > 0.5) {
      result = `${balancePhrase} ${result}`;
    }
  }
  
  // הוספת סיומת רק אם מתאימה לקונטקסט
  if (suffixes[suffixIndex] && !result.includes("רצוי") && !result.includes("חשוב") && result.length < 150) {
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
    const ending = genderHint === 'feminine' ? "מתאפיינת" : 
                   genderHint === 'masculine' ? "מתאפיין" : "מתאפיינ/ת";
    result = result.replace(/מתאפיינ\/ת/g, ending);
  }

  if (result.includes("מציג/ה")) {
    const ending = genderHint === 'feminine' ? "מציגה" : 
                   genderHint === 'masculine' ? "מציג" : "מציג/ה";
    result = result.replace(/מציג\/ה/g, ending);
  }
  
  return result;
};

// פונקציה ליצירת מספר וריאציות לאותו טקסט - ללא ציונים
export const generateVariations = (baseText: string, count: number = 5): string[] => {
  // הסרת רמזים מספריים מהטקסט הבסיסי
  const cleanedText = baseText
    .replace(/\d+\s*ומעלה/g, "")
    .replace(/מתחת\s*ל[-]?\d+/g, "")
    .replace(/\d+\s*ומטה/g, "")
    .replace(/מעל\s*\d+/g, "")
    .trim();

  const variations: string[] = [cleanedText];
  
  for (let i = 1; i < count; i++) {
    const variation = createVariation(cleanedText, i, false, cleanedText.includes("רצוי") || cleanedText.includes("קושי"));
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

// פונקציה לניקוי טקסט מרמזים מספריים
export const removeNumericalReferences = (text: string): string => {
  return text
    .replace(/ציון\s*\d+/g, "")
    .replace(/\d+\s*נקודות/g, "")
    .replace(/\d+\s*ומעלה[:\s]*/g, "")
    .replace(/מתחת\s*ל[-]?\d+[:\s]*/g, "")
    .replace(/\d+\s*ומטה[:\s]*/g, "")
    .replace(/מעל\s*\d+[:\s]*/g, "")
    .replace(/בציון/g, "")
    .replace(/ציון של/g, "")
    .trim();
};
