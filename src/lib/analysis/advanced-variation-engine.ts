
// מנוע וריאציות מתקדם עם דגש על בהירות ופשטות
export interface AdvancedVariationOptions {
  simpleStarters: string[];
  basicConnectors: string[];
  clearEndings: string[];
  genderAdaptation: {
    masculine: Record<string, string>;
    feminine: Record<string, string>;
    neutral: Record<string, string>;
  };
}

// מאגר וריאציות פשוט וברור
export const advancedVariationOptions: AdvancedVariationOptions = {
  simpleStarters: [
    "ניכר כי",
    "נמצא כי", 
    "נראה ש",
    "מתברר כי",
    "עולה כי"
  ],
  basicConnectors: [
    "כמו כן",
    "יחד עם זאת", 
    "במקביל",
    "בנוסף"
  ],
  clearEndings: [
    "",
    " - דבר חשוב בעבודה",
    " - מאפיין בולט",
    " - נקודה מרכזית"
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
      "מצליח/ה": "מצליח"
    },
    feminine: {
      "את/ה": "את",
      "מתאפיינ/ת": "מתאפיינת",
      "מציג/ה": "מציגה",
      "פועל/ת": "פועלת",
      "מחובר/ת": "מחוברת",
      "משדר/ת": "משדרת",
      "מקדם/ת": "מקדמת",
      "מצליח/ה": "מצליחה"
    },
    neutral: {
      "את/ה": "את/ה",
      "מתאפיינ/ת": "מתאפיינ/ת",
      "מציג/ה": "מציג/ה",
      "פועל/ת": "פועל/ת",
      "מחובר/ת": "מחובר/ת",
      "משדר/ת": "משדר/ת",
      "מקדם/ת": "מקדם/ת",
      "מצליח/ה": "מצליח/ה"
    }
  }
};

// פונקציה ליצירת וריאציה פשוטה וברורה
export const createAdvancedVariation = (
  baseText: string, 
  variationIndex: number,
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string => {
  const { simpleStarters, clearEndings, genderAdaptation } = advancedVariationOptions;
  
  // ניקוי הטקסט מרמזים מספריים
  let result = cleanNumericalReferences(baseText);
  
  // בחירת התחלה פשוטה
  const starterIndex = variationIndex % simpleStarters.length;
  const endingIndex = Math.floor(variationIndex / simpleStarters.length) % clearEndings.length;
  
  // החלפת התחלה בזהירות
  result = replaceSimpleStarter(result, simpleStarters[starterIndex]);
  
  // התאמת מגדר
  result = adaptGender(result, genderHint, genderAdaptation[genderHint]);
  
  // הוספת סיום אם מתאים
  if (clearEndings[endingIndex] && result.length < 120) {
    result += clearEndings[endingIndex];
  }
  
  return result.trim();
};

// ניקוי רמזים מספריים
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

// החלפת התחלה פשוטה
const replaceSimpleStarter = (text: string, newStarter: string): string => {
  const commonStarters = ["ניכר כי", "עולה כי", "נראה כי", "מתברר כי", "נמצא כי"];
  
  for (const starter of commonStarters) {
    if (text.startsWith(starter)) {
      const remainder = text.substring(starter.length).trim();
      return `${newStarter} ${remainder}`;
    }
  }
  
  return text;
};

// התאמת מגדר
const adaptGender = (text: string, genderHint: string, genderMap: Record<string, string>): string => {
  let result = text;
  
  Object.entries(genderMap).forEach(([neutral, gendered]) => {
    const regex = new RegExp(neutral.replace(/[/()]/g, '\\$&'), 'g');
    result = result.replace(regex, gendered);
  });
  
  return result;
};

// יצירת מספר וריאציות
export const generateAdvancedVariations = (
  baseText: string, 
  count: number = 5,
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string[] => {
  const variations: string[] = [];
  const cleanedText = cleanNumericalReferences(baseText);
  
  // וריאציה בסיסית
  variations.push(adaptGender(cleanedText, genderHint, advancedVariationOptions.genderAdaptation[genderHint]));
  
  // יצירת וריאציות נוספות
  for (let i = 1; i < count; i++) {
    const variation = createAdvancedVariation(cleanedText, i, genderHint);
    
    if (!variations.includes(variation) && variation.length > 10) {
      variations.push(variation);
    }
  }
  
  return variations;
};

// בחירת וריאציה על בסיס זרע
export const selectAdvancedVariation = (variations: string[], seed: number = 0): string => {
  const index = seed % variations.length;
  return variations[index];
};
