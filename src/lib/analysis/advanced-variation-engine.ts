
// מנוע וריאציות מתקדם עם רגישות דקדוקית והגנה מפני סתירות
export interface AdvancedVariationOptions {
  structuralPrefixes: string[];
  contextualSuffixes: string[];
  naturalConnectors: string[];
  balancingFramework: string[];
  genderAdaptation: {
    masculine: Record<string, string>;
    feminine: Record<string, string>;
    neutral: Record<string, string>;
  };
}

// מאגר וריאציות מתקדם עם דגש על איכות לשונית
export const advancedVariationOptions: AdvancedVariationOptions = {
  structuralPrefixes: [
    "מתברר כי",
    "עולה כי", 
    "ניכר ש",
    "נמצא כי",
    "מתרשם כי",
    "נראה ש",
    "מתגלה כי",
    "מתאפיינ/ת ב",
    "מציג/ה",
    "מגלה/ה נטייה ל"
  ],
  contextualSuffixes: [
    "",
    " - מאפיין מרכזי בעבודתך",
    " - היבט חשוב בתפקידך",
    " - תכונה זו מבחינה אותך",
    " - כישור בולט שלך"
  ],
  naturalConnectors: [
    "כמו כן",
    "יחד עם זאת", 
    "מצד אחר",
    "יתרה מכך",
    "במקביל",
    "באופן דומה",
    "בהקשר זה"
  ],
  balancingFramework: [
    "חשוב לציין כי",
    "יש לזכור ש",
    "ראוי להדגיש כי",
    "בהמשך, כדאי להתמקד ב",
    "במקביל, רצוי לחזק את"
  ],
  genderAdaptation: {
    masculine: {
      "את/ה": "אתה",
      "מתאפיינ/ת": "מתאפיין",
      "מציג/ה": "מציג",
      "פועל/ת": "פועל",
      "מחובר/ת": "מחובר",
      "משדר/ת": "משדר",
      "מקדם/ת": "מקדם",
      "מצליח/ה": "מצליח",
      "מתקשה": "מתקשה",
      "רצוי": "רצוי"
    },
    feminine: {
      "את/ה": "את",
      "מתאפיינ/ת": "מתאפיינת",
      "מציג/ה": "מציגה",
      "פועל/ת": "פועלת",
      "מחובר/ת": "מחוברת",
      "משדר/ת": "משדרת",
      "מקדם/ת": "מקדמת",
      "מצליח/ה": "מצליחה",
      "מתקשה": "מתקשה",
      "רצוי": "רצוי"
    },
    neutral: {
      "את/ה": "את/ה",
      "מתאפיינ/ת": "מתאפיינ/ת",
      "מציג/ה": "מציג/ה",
      "פועל/ת": "פועל/ת",
      "מחובר/ת": "מחובר/ת",
      "משדר/ת": "משדר/ת",
      "מקדם/ת": "מקדם/ת",
      "מצליח/ה": "מצליח/ה",
      "מתקשה": "מתקשה",
      "רצוי": "רצוי"
    }
  }
};

// פונקציה ליצירת וריאציות איכותיות עם שמירה על דקדוק
export const createAdvancedVariation = (
  baseText: string, 
  variationIndex: number,
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral',
  needsBalance: boolean = false
): string => {
  const { structuralPrefixes, contextualSuffixes, balancingFramework, genderAdaptation } = advancedVariationOptions;
  
  // ניקוי הטקסט מרמזים מספריים
  let result = cleanNumericalReferences(baseText);
  
  // בחירת וריאציה על בסיס האינדקס
  const prefixIndex = variationIndex % structuralPrefixes.length;
  const suffixIndex = Math.floor(variationIndex / structuralPrefixes.length) % contextualSuffixes.length;
  
  // החלפת פתיח רק אם מתאים דקדוקית
  result = replacePrefix(result, structuralPrefixes[prefixIndex]);
  
  // הוספת איזון לטקסטים ביקורתיים
  if (needsBalance && containsCriticalContent(result)) {
    const balancePhrase = balancingFramework[variationIndex % balancingFramework.length];
    if (shouldAddBalance(result)) {
      result = `${balancePhrase} ${result}`;
    }
  }
  
  // התאמת מגדר
  result = adaptGender(result, genderHint, genderAdaptation[genderHint]);
  
  // הוספת סיומת רק אם מתאימה
  if (shouldAddSuffix(result, contextualSuffixes[suffixIndex])) {
    result += contextualSuffixes[suffixIndex];
  }
  
  return result.trim();
};

// פונקציה לניקוי רמזים מספריים
const cleanNumericalReferences = (text: string): string => {
  return text
    .replace(/\d+\s*ומעלה[:\s]*/g, "")
    .replace(/מתחת\s*ל[-]?\d+[:\s]*/g, "")
    .replace(/\d+\s*ומטה[:\s]*/g, "")
    .replace(/מעל\s*\d+[:\s]*/g, "")
    .replace(/ציון\s*\d*/g, "")
    .replace(/\d+\s*נקודות/g, "")
    .replace(/בציון/g, "")
    .replace(/ציון של/g, "")
    .trim();
};

// פונקציה להחלפת פתיח בזהירות דקדוקית
const replacePrefix = (text: string, newPrefix: string): string => {
  const commonPrefixes = ["ניכר כי", "עולה כי", "נראה כי", "מתברר כי", "מתרשם כי"];
  
  for (const prefix of commonPrefixes) {
    if (text.startsWith(prefix)) {
      const remainder = text.substring(prefix.length).trim();
      
      if (newPrefix.endsWith("ש") && remainder.startsWith("כי")) {
        return `${newPrefix} ${remainder.substring(2).trim()}`;
      } else if (!newPrefix.endsWith("ש") && !remainder.startsWith("כי")) {
        return `${newPrefix} כי ${remainder}`;
      } else {
        return `${newPrefix} ${remainder}`;
      }
    }
  }
  
  return text;
};

// פונקציה לזיהוי תוכן ביקורתי
const containsCriticalContent = (text: string): boolean => {
  const criticalKeywords = ["קושי", "חסר", "בעייתי", "מתקשה", "רצוי", "חוסר", "ייתכן ו"];
  return criticalKeywords.some(keyword => text.includes(keyword));
};

// פונקציה לקבוע האם להוסיף איזון
const shouldAddBalance = (text: string): boolean => {
  return containsCriticalContent(text) && !text.includes("חשוב לציין") && !text.includes("יש לזכור");
};

// פונקציה להתאמת מגדר
const adaptGender = (text: string, genderHint: string, genderMap: Record<string, string>): string => {
  let result = text;
  
  Object.entries(genderMap).forEach(([neutral, gendered]) => {
    const regex = new RegExp(neutral.replace(/[/()]/g, '\\$&'), 'g');
    result = result.replace(regex, gendered);
  });
  
  return result;
};

// פונקציה לקבוע האם להוסיף סיומת
const shouldAddSuffix = (text: string, suffix: string): boolean => {
  return suffix !== "" && 
         !text.includes("רצוי") && 
         !text.includes("חשוב") && 
         text.length < 150 &&
         !text.endsWith(".");
};

// פונקציה ליצירת מספר וריאציות איכותיות
export const generateAdvancedVariations = (
  baseText: string, 
  count: number = 5,
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string[] => {
  const variations: string[] = [];
  const cleanedText = cleanNumericalReferences(baseText);
  const needsBalance = containsCriticalContent(cleanedText);
  
  // וריאציה בסיסית
  variations.push(adaptGender(cleanedText, genderHint, advancedVariationOptions.genderAdaptation[genderHint]));
  
  // יצירת וריאציות נוספות
  for (let i = 1; i < count; i++) {
    const variation = createAdvancedVariation(cleanedText, i, genderHint, needsBalance);
    
    // ודוא שהווריאציה שונה ואיכותית
    if (!variations.includes(variation) && isQualityVariation(variation)) {
      variations.push(variation);
    }
  }
  
  return variations;
};

// פונקציה לבדיקת איכות וריאציה
const isQualityVariation = (text: string): boolean => {
  return text.length > 10 && 
         !text.includes("undefined") && 
         !text.includes("null") &&
         text.split(" ").length >= 5;
};

// פונקציה לבחירת וריאציה מבוססת זרע
export const selectAdvancedVariation = (variations: string[], seed: number = 0): string => {
  const index = seed % variations.length;
  return variations[index];
};
