
import { Question } from "@/lib/types";

// מיפוי הממדים עם כותרות ותיאורים - למטרות חישוב בלבד, לא יוצגו למשתמשים
export const dimensionInfo = {
  S: {
    title: "אסטרטג",
    description: "היכולת לחשוב אסטרטגית, לתכנן לטווח ארוך ולהגדיר חזון וכיוון ברור."
  },
  L: {
    title: "לומד",
    description: "הנכונות ללמידה מתמדת, התפתחות אישית ומקצועית והסתגלות לשינויים."
  },
  I: {
    title: "השראה",
    description: "היכולת להניע ולהשפיע על אחרים, לעורר מוטיבציה ולהוביל דרך דוגמה אישית."
  },
  M: {
    title: "משמעות",
    description: "היכולת ליצור תחושת משמעות, מטרה וערך בעבודה ובמשימות."
  },
  A: {
    title: "אדפטיבי",
    description: "היכולת להסתגל במהירות לשינויים, להיות גמיש ולפתח פתרונות יצירתיים."
  },
  A2: {
    title: "אותנטיות",
    description: "היכולת להיות אמיתי, להביע את האני האמיתי ולפעול בהתאם לערכים אישיים."
  }
};

// מיפוי של הממדים והסימון אם השאלה הפוכה לפי השאלות המקוריות
export const dimensionMapping: Record<number, { dimension: Question["dimension"], isReversed: boolean }> = {
  // אסטרטג (S)
  1: { dimension: "S", isReversed: false },
  6: { dimension: "S", isReversed: false },
  10: { dimension: "S", isReversed: false },
  15: { dimension: "S", isReversed: true },
  23: { dimension: "S", isReversed: false },
  31: { dimension: "S", isReversed: false },
  38: { dimension: "S", isReversed: false },
  43: { dimension: "S", isReversed: false },
  51: { dimension: "S", isReversed: false },
  53: { dimension: "S", isReversed: true },
  57: { dimension: "S", isReversed: false },
  64: { dimension: "S", isReversed: false },
  73: { dimension: "S", isReversed: false },
  83: { dimension: "S", isReversed: false },
  89: { dimension: "S", isReversed: false },
  
  // לומד (L)
  2: { dimension: "L", isReversed: true },
  11: { dimension: "L", isReversed: false },
  14: { dimension: "L", isReversed: true },
  19: { dimension: "L", isReversed: false },
  22: { dimension: "L", isReversed: true },
  29: { dimension: "L", isReversed: true },
  33: { dimension: "L", isReversed: false },
  42: { dimension: "L", isReversed: false },
  45: { dimension: "L", isReversed: false },
  52: { dimension: "L", isReversed: false },
  69: { dimension: "L", isReversed: true },
  70: { dimension: "L", isReversed: false },
  72: { dimension: "L", isReversed: true },
  76: { dimension: "L", isReversed: false },
  82: { dimension: "L", isReversed: false },
  85: { dimension: "L", isReversed: true },
  88: { dimension: "L", isReversed: true },
  
  // השראה (I)
  4: { dimension: "I", isReversed: true },
  5: { dimension: "I", isReversed: false },
  13: { dimension: "I", isReversed: false },
  25: { dimension: "I", isReversed: false },
  32: { dimension: "I", isReversed: true },
  37: { dimension: "I", isReversed: false },
  41: { dimension: "I", isReversed: false },
  46: { dimension: "I", isReversed: true },
  56: { dimension: "I", isReversed: false },
  60: { dimension: "I", isReversed: false },
  68: { dimension: "I", isReversed: false },
  87: { dimension: "I", isReversed: false },
  
  // משמעות (M)
  9: { dimension: "M", isReversed: true },
  16: { dimension: "M", isReversed: false },
  20: { dimension: "M", isReversed: false },
  28: { dimension: "M", isReversed: false },
  30: { dimension: "M", isReversed: false },
  35: { dimension: "M", isReversed: false },
  40: { dimension: "M", isReversed: false },
  50: { dimension: "M", isReversed: false },
  54: { dimension: "M", isReversed: false },
  61: { dimension: "M", isReversed: false },
  67: { dimension: "M", isReversed: false },
  77: { dimension: "M", isReversed: false },
  81: { dimension: "M", isReversed: false },
  86: { dimension: "M", isReversed: false },
  
  // אדפטיבי (A)
  3: { dimension: "A", isReversed: false },
  8: { dimension: "A", isReversed: false },
  12: { dimension: "A", isReversed: true },
  21: { dimension: "A", isReversed: false },
  24: { dimension: "A", isReversed: true },
  34: { dimension: "A", isReversed: true },
  44: { dimension: "A", isReversed: false },
  47: { dimension: "A", isReversed: false },
  55: { dimension: "A", isReversed: true },
  59: { dimension: "A", isReversed: false },
  63: { dimension: "A", isReversed: false },
  66: { dimension: "A", isReversed: true },
  74: { dimension: "A", isReversed: false },
  78: { dimension: "A", isReversed: false },
  80: { dimension: "A", isReversed: true },
  
  // אותנטיות (A2)
  7: { dimension: "A2", isReversed: true },
  17: { dimension: "A2", isReversed: false },
  18: { dimension: "A2", isReversed: true },
  26: { dimension: "A2", isReversed: false },
  27: { dimension: "A2", isReversed: true },
  36: { dimension: "A2", isReversed: false },
  39: { dimension: "A2", isReversed: true },
  48: { dimension: "A2", isReversed: false },
  49: { dimension: "A2", isReversed: false },
  58: { dimension: "A2", isReversed: false },
  62: { dimension: "A2", isReversed: false },
  65: { dimension: "A2", isReversed: true },
  71: { dimension: "A2", isReversed: false },
  75: { dimension: "A2", isReversed: false },
  79: { dimension: "A2", isReversed: false },
  84: { dimension: "A2", isReversed: false },
  90: { dimension: "A2", isReversed: false },
};

// רשימת השאלות
export const questions: Question[] = [
  {
    id: 1,
    text: "אני מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    colleagueText: "המנהל/ת מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    dimension: dimensionMapping[1].dimension,
    isReversed: dimensionMapping[1].isReversed
  },
  {
    id: 2,
    text: "אני נמנע מלבחון רעיונות חדשים",
    colleagueText: "המנהל/ת נמנע/ת מלבחון רעיונות חדשים",
    dimension: dimensionMapping[2].dimension,
    isReversed: dimensionMapping[2].isReversed
  },
  {
    id: 3,
    text: "אני מקשיב לעובדיי בקשב רב",
    colleagueText: "המנהל/ת מקשיב/ה לעובדיו/ה בקשב רב",
    dimension: dimensionMapping[3].dimension,
    isReversed: dimensionMapping[3].isReversed
  },
  {
    id: 4,
    text: "אני מתעלם מהצעות לשיפור מצד אחרים",
    colleagueText: "המנהל/ת מתעלם/ת מהצעות לשיפור מצד אחרים",
    dimension: dimensionMapping[4].dimension,
    isReversed: dimensionMapping[4].isReversed
  },
  {
    id: 5,
    text: "אני מעורר השראה דרך הדוגמה האישית",
    colleagueText: "המנהל/ת מעורר/ת השראה דרך הדוגמה האישית",
    dimension: dimensionMapping[5].dimension,
    isReversed: dimensionMapping[5].isReversed
  },
  {
    id: 6,
    text: "אני מוודא שכל יוזמה מקושרת לחזון הארגוני",
    colleagueText: "המנהל/ת מוודא/ת שכל יוזמה מקושרת לחזון הארגוני",
    dimension: dimensionMapping[6].dimension,
    isReversed: dimensionMapping[6].isReversed
  },
  {
    id: 7,
    text: "אני מתנהל בקשיחות ואיני מתחשב בצרכים אישיים",
    colleagueText: "המנהל/ת מתנהל/ת בקשיחות ואינו/אינה מתחשב/ת בצרכים אישיים",
    dimension: dimensionMapping[7].dimension,
    isReversed: dimensionMapping[7].isReversed
  },
  {
    id: 8,
    text: "אני מרבה לשתף את העובדים בהחלטות",
    colleagueText: "המנהל/ת משתף/ת את העובדים בהחלטות",
    dimension: dimensionMapping[8].dimension,
    isReversed: dimensionMapping[8].isReversed
  },
  {
    id: 9,
    text: "אני מתייחס לעשייה כמשהו שולי",
    colleagueText: "המנהל/ת מתייחס/ת לעשייה כמשהו שולי",
    dimension: dimensionMapping[9].dimension,
    isReversed: dimensionMapping[9].isReversed
  },
  {
    id: 10,
    text: "אני יודע להוביל תכנון ארוך טווח גם בעת משבר",
    colleagueText: "המנהל/ת יודע/ת להוביל תכנון ארוך טווח גם בעת משבר",
    dimension: dimensionMapping[10].dimension,
    isReversed: dimensionMapping[10].isReversed
  },
  {
    id: 11,
    text: "אני מתרגש כאשר משתפים אותי ברעיונות מקוריים",
    colleagueText: "המנהל/ת מתרגש/ת כאשר משתפים אותו/ה ברעיונות מקוריים",
    dimension: dimensionMapping[11].dimension,
    isReversed: dimensionMapping[11].isReversed
  },
  {
    id: 12,
    text: "אני מתנגד באופן עקבי לשינויים",
    colleagueText: "המנהל/ת מתנגד/ת באופן עקבי לשינויים",
    dimension: dimensionMapping[12].dimension,
    isReversed: dimensionMapping[12].isReversed
  },
  {
    id: 13,
    text: "אני מספר סיפור שמעורר מוטיבציה אצל הצוות",
    colleagueText: "המנהל/ת מספר/ת סיפור שמעורר מוטיבציה אצל הצוות",
    dimension: dimensionMapping[13].dimension,
    isReversed: dimensionMapping[13].isReversed
  },
  {
    id: 14,
    text: "אני מתעלם משאלות של העובדים",
    colleagueText: "המנהל/ת מתעלם/ת משאלות של העובדים",
    dimension: dimensionMapping[14].dimension,
    isReversed: dimensionMapping[14].isReversed
  },
  {
    id: 15,
    text: "אני מתעקש רק על הדרך שלי, גם כשיש חלופות",
    colleagueText: "המנהל/ת מתעקש/ת רק על הדרך שלו/ה, גם כשיש חלופות",
    dimension: dimensionMapping[15].dimension,
    isReversed: dimensionMapping[15].isReversed
  },
  {
    id: 16,
    text: "אני מבליט את החשיבות האישית של כל עובד",
    colleagueText: "המנהל/ת מבליט/ה את החשיבות האישית של כל עובד",
    dimension: dimensionMapping[16].dimension,
    isReversed: dimensionMapping[16].isReversed
  },
  {
    id: 17,
    text: "אני מרבה לשתף את סיפורי האישי לשם חיבור רגשי",
    colleagueText: "המנהל/ת מרבה לשתף את סיפורו/ה האישי לשם חיבור רגשי",
    dimension: dimensionMapping[17].dimension,
    isReversed: dimensionMapping[17].isReversed
  },
  {
    id: 18,
    text: "אני מוותר בקלות על עקרונות כשיש התנגדות",
    colleagueText: "המנהל/ת מוותר/ת בקלות על עקרונות כשיש התנגדות",
    dimension: dimensionMapping[18].dimension,
    isReversed: dimensionMapping[18].isReversed
  },
  {
    id: 19,
    text: "אני מתלהב מהאפשרות ללמוד משהו חדש",
    colleagueText: "המנהל/ת מתלהב/ת מהאפשרות ללמוד משהו חדש",
    dimension: dimensionMapping[19].dimension,
    isReversed: dimensionMapping[19].isReversed
  },
  {
    id: 20,
    text: "אני מדגיש שוב ושוב את הערכים המובילים של הארגון",
    colleagueText: "המנהל/ת מדגיש/ה שוב ושוב את הערכים המובילים של הארגון",
    dimension: dimensionMapping[20].dimension,
    isReversed: dimensionMapping[20].isReversed
  },
  {
    id: 21,
    text: "אני מתייעץ עם עובדים לפני החלטות חשובות",
    colleagueText: "המנהל/ת מתייעץ/ת עם עובדים לפני החלטות חשובות",
    dimension: dimensionMapping[21].dimension,
    isReversed: dimensionMapping[21].isReversed
  },
  {
    id: 22,
    text: "אני חושש לשתף פעולה עם צוותים אחרים",
    colleagueText: "המנהל/ת חושש/ת לשתף פעולה עם צוותים אחרים",
    dimension: dimensionMapping[22].dimension,
    isReversed: dimensionMapping[22].isReversed
  },
  {
    id: 23,
    text: "אני יוזם רפורמות כשהמציאות משתנה",
    colleagueText: "המנהל/ת יוזם/ת רפורמות כשהמציאות משתנה",
    dimension: dimensionMapping[23].dimension,
    isReversed: dimensionMapping[23].isReversed
  },
  {
    id: 24,
    text: "אני נצמד לנוהלים גם כשהם כבר לא רלוונטיים",
    colleagueText: "המנהל/ת נצמד/ת לנוהלים גם כשהם כבר לא רלוונטיים",
    dimension: dimensionMapping[24].dimension,
    isReversed: dimensionMapping[24].isReversed
  },
  {
    id: 25,
    text: "אני מלהיב את העובדים סביב חזון משותף",
    colleagueText: "המנהל/ת מלהיב/ה את העובדים סביב חזון משותף",
    dimension: dimensionMapping[25].dimension,
    isReversed: dimensionMapping[25].isReversed
  },
  {
    id: 26,
    text: "אני פועל תמיד מתוך שקיפות",
    colleagueText: "המנהל/ת פועל/ת תמיד מתוך שקיפות",
    dimension: dimensionMapping[26].dimension,
    isReversed: dimensionMapping[26].isReversed
  },
  {
    id: 27,
    text: "אני מתעלם ממשברים אישיים של עובדים",
    colleagueText: "המנהל/ת מתעלם/ת ממשברים אישיים של עובדים",
    dimension: dimensionMapping[27].dimension,
    isReversed: dimensionMapping[27].isReversed
  },
  {
    id: 28,
    text: "אני שואף שכל עשייה תחולל שינוי אמיתי",
    colleagueText: "המנהל/ת שואף/ת שכל עשייה תחולל שינוי אמיתי",
    dimension: dimensionMapping[28].dimension,
    isReversed: dimensionMapping[28].isReversed
  },
  {
    id: 29,
    text: "אני לא סומך על יצירתיות של אחרים",
    colleagueText: "המנהל/ת לא סומך/ת על יצירתיות של אחרים",
    dimension: dimensionMapping[29].dimension,
    isReversed: dimensionMapping[29].isReversed
  },
  {
    id: 30,
    text: "אני מעודד את הסובבים לחפש משמעות בעבודתם",
    colleagueText: "המנהל/ת מעודד/ת את הסובבים לחפש משמעות בעבודתם",
    dimension: dimensionMapping[30].dimension,
    isReversed: dimensionMapping[30].isReversed
  },
  {
    id: 31,
    text: "אני מוודא שכל משימה תורמת לחזון",
    colleagueText: "המנהל/ת מוודא/ת שכל משימה תורמת לחזון",
    dimension: dimensionMapping[31].dimension,
    isReversed: dimensionMapping[31].isReversed
  },
  {
    id: 32,
    text: "אני מביע ספק ביכולת של הארגון להצליח",
    colleagueText: "המנהל/ת מביע/ה ספק ביכולת של הארגון להצליח",
    dimension: dimensionMapping[32].dimension,
    isReversed: dimensionMapping[32].isReversed
  },
  {
    id: 33,
    text: "אני מקפיד על עדכון הידע האישי דרך קריאה ומפגשים",
    colleagueText: "המנהל/ת מקפיד/ה על עדכון הידע האישי דרך קריאה ומפגשים",
    dimension: dimensionMapping[33].dimension,
    isReversed: dimensionMapping[33].isReversed
  },
  {
    id: 34,
    text: "אני מתעלם מדעות המיעוט בצוות",
    colleagueText: "המנהל/ת מתעלם/ת מדעות המיעוט בצוות",
    dimension: dimensionMapping[34].dimension,
    isReversed: dimensionMapping[34].isReversed
  },
  {
    id: 35,
    text: "אני שואף שכל עובד ירגיש חלק ממסע אישי",
    colleagueText: "המנהל/ת שואף/ת שכל עובד ירגיש חלק ממסע אישי",
    dimension: dimensionMapping[35].dimension,
    isReversed: dimensionMapping[35].isReversed
  },
  {
    id: 36,
    text: "אני מראה אחריות אישית על כישלונות",
    colleagueText: "המנהל/ת מראה אחריות אישית על כישלונות",
    dimension: dimensionMapping[36].dimension,
    isReversed: dimensionMapping[36].isReversed
  },
  {
    id: 37,
    text: "אני מאמין שהשראה נובעת ממעשים ולא מדיבורים",
    colleagueText: "המנהל/ת מאמין/ה שהשראה נובעת ממעשים ולא מדיבורים",
    dimension: dimensionMapping[37].dimension,
    isReversed: dimensionMapping[37].isReversed
  },
  {
    id: 38,
    text: "אני מפתח אסטרטגיות חלופיות לשם גמישות",
    colleagueText: "המנהל/ת מפתח/ת אסטרטגיות חלופיות לשם גמישות",
    dimension: dimensionMapping[38].dimension,
    isReversed: dimensionMapping[38].isReversed
  },
  {
    id: 39,
    text: "אני נמנע מלבקש עזרה גם כשאני זקוק לה",
    colleagueText: "המנהל/ת נמנע/ת מלבקש עזרה גם כשהוא/היא זקוק/ה לה",
    dimension: dimensionMapping[39].dimension,
    isReversed: dimensionMapping[39].isReversed
  },
  {
    id: 40,
    text: "אני רואה בהצלחת הארגון שליחות",
    colleagueText: "המנהל/ת רואה בהצלחת הארגון שליחות",
    dimension: dimensionMapping[40].dimension,
    isReversed: dimensionMapping[40].isReversed
  },
  {
    id: 41,
    text: "אני נותן תחושה של ביטחון ביכולת לעמוד באתגרים",
    colleagueText: "המנהל/ת נותן/ת תחושה של ביטחון ביכולת לעמוד באתגרים",
    dimension: dimensionMapping[41].dimension,
    isReversed: dimensionMapping[41].isReversed
  },
  {
    id: 42,
    text: "אני מרבה לשאול שאלות ליצירת שיח",
    colleagueText: "המנהל/ת מרבה לשאול שאלות ליצירת שיח",
    dimension: dimensionMapping[42].dimension,
    isReversed: dimensionMapping[42].isReversed
  },
  {
    id: 43,
    text: "אני מתחשב בהקשרים פוליטיים וכלכליים בתכנון",
    colleagueText: "המנהל/ת מתחשב/ת בהקשרים פוליטיים וכלכליים בתכנון",
    dimension: dimensionMapping[43].dimension,
    isReversed: dimensionMapping[43].isReversed
  },
  {
    id: 44,
    text: "אני מקדם שיתוף פעולה בין יחידות שונות",
    colleagueText: "המנהל/ת מקדם/ת שיתוף פעולה בין יחידות שונות",
    dimension: dimensionMapping[44].dimension,
    isReversed: dimensionMapping[44].isReversed
  },
  {
    id: 45,
    text: "אני יוזם תהליכי למידה שיתופיים",
    colleagueText: "המנהל/ת יוזם/ת תהליכי למידה שיתופיים",
    dimension: dimensionMapping[45].dimension,
    isReversed: dimensionMapping[45].isReversed
  },
  {
    id: 46,
    text: "אני דוחה הצעות שמאיימות על מעמדי",
    colleagueText: "המנהל/ת דוחה הצעות שמאיימות על מעמדו/ה",
    dimension: dimensionMapping[46].dimension,
    isReversed: dimensionMapping[46].isReversed
  },
  {
    id: 47,
    text: "אני רואה בכל שינוי הזדמנות לצמיחה",
    colleagueText: "המנהל/ת רואה בכל שינוי הזדמנות לצמיחה",
    dimension: dimensionMapping[47].dimension,
    isReversed: dimensionMapping[47].isReversed
  },
  {
    id: 48,
    text: "אני מקשיב לעמיתיי גם כשהם טועים",
    colleagueText: "המנהל/ת מקשיב/ה לעמיתיו/ה גם כשהם טועים",
    dimension: dimensionMapping[48].dimension,
    isReversed: dimensionMapping[48].isReversed
  },
  {
    id: 49,
    text: "אני משתמש בדוגמאות אישיות לחיבור רגשי",
    colleagueText: "המנהל/ת משתמש/ת בדוגמאות אישיות לחיבור רגשי",
    dimension: dimensionMapping[49].dimension,
    isReversed: dimensionMapping[49].isReversed
  },
  {
    id: 50,
    text: "אני פועל ליצירת תחושת שליחות בצוות",
    colleagueText: "המנהל/ת פועל/ת ליצירת תחושת שליחות בצוות",
    dimension: dimensionMapping[50].dimension,
    isReversed: dimensionMapping[50].isReversed
  },
  {
    id: 51,
    text: "אני בודק נתונים לפני קבלת החלטה אסטרטגית",
    colleagueText: "המנהל/ת בודק/ת נתונים לפני קבלת החלטה אסטרטגית",
    dimension: dimensionMapping[51].dimension,
    isReversed: dimensionMapping[51].isReversed
  },
  {
    id: 52,
    text: "אני מזמין שאלות קשות מהעובדים",
    colleagueText: "המנהל/ת מזמין/ה שאלות קשות מהעובדים",
    dimension: dimensionMapping[52].dimension,
    isReversed: dimensionMapping[52].isReversed
  },
  {
    id: 53,
    text: "אני לא משתף את חזוני מתוך חשש לביקורת",
    colleagueText: "המנהל/ת לא משתף/ת את חזונו/ה מתוך חשש לביקורת",
    dimension: dimensionMapping[53].dimension,
    isReversed: dimensionMapping[53].isReversed
  },
  {
    id: 54,
    text: "אני מדגיש את ערך התרומה החברתית של הפעילות",
    colleagueText: "המנהל/ת מדגיש/ה את ערך התרומה החברתית של הפעילות",
    dimension: dimensionMapping[54].dimension,
    isReversed: dimensionMapping[54].isReversed
  },
  {
    id: 55,
    text: "אני נמנע מהחלטות כדי לא לטעות",
    colleagueText: "המנהל/ת נמנע/ת מהחלטות כדי לא לטעות",
    dimension: dimensionMapping[55].dimension,
    isReversed: dimensionMapping[55].isReversed
  },
  {
    id: 56,
    text: "אני מאמין שכל אדם מסוגל להוביל שינוי",
    colleagueText: "המנהל/ת מאמין/ה שכל אדם מסוגל להוביל שינוי",
    dimension: dimensionMapping[56].dimension,
    isReversed: dimensionMapping[56].isReversed
  },
  {
    id: 57,
    text: "אני בונה תכנית פעולה עם גמישות מובנית",
    colleagueText: "המנהל/ת בונה תכנית פעולה עם גמישות מובנית",
    dimension: dimensionMapping[57].dimension,
    isReversed: dimensionMapping[57].isReversed
  },
  {
    id: 58,
    text: "אני מרבה להחמיא כאשר מגיע",
    colleagueText: "המנהל/ת מרבה להחמיא כאשר מגיע",
    dimension: dimensionMapping[58].dimension,
    isReversed: dimensionMapping[58].isReversed
  },
  {
    id: 59,
    text: "אני משדר נחישות גם בעת אי ודאות",
    colleagueText: "המנהל/ת משדר/ת נחישות גם בעת אי ודאות",
    dimension: dimensionMapping[59].dimension,
    isReversed: dimensionMapping[59].isReversed
  },
  {
    id: 60,
    text: "אני נוהג לציין הצלחות קטנות בדרך ליעד",
    colleagueText: "המנהל/ת נוהג/ת לציין הצלחות קטנות בדרך ליעד",
    dimension: dimensionMapping[60].dimension,
    isReversed: dimensionMapping[60].isReversed
  },
  {
    id: 61,
    text: "אני מבסס תהליכים ארגוניים על עקרונות ערכיים",
    colleagueText: "המנהל/ת מבסס/ת תהליכים ארגוניים על עקרונות ערכיים",
    dimension: dimensionMapping[61].dimension,
    isReversed: dimensionMapping[61].isReversed
  },
  {
    id: 62,
    text: "אני מתחשב בצרכים תרבותיים של העובדים",
    colleagueText: "המנהל/ת מתחשב/ת בצרכים תרבותיים של העובדים",
    dimension: dimensionMapping[62].dimension,
    isReversed: dimensionMapping[62].isReversed
  },
  {
    id: 63,
    text: "אני מתמקד בפתרונות ולא בתירוצים",
    colleagueText: "המנהל/ת מתמקד/ת בפתרונות ולא בתירוצים",
    dimension: dimensionMapping[63].dimension,
    isReversed: dimensionMapping[63].isReversed
  },
  {
    id: 64,
    text: "אני משתף את הצוות במידע קריטי",
    colleagueText: "המנהל/ת משתף/ת את הצוות במידע קריטי",
    dimension: dimensionMapping[64].dimension,
    isReversed: dimensionMapping[64].isReversed
  },
  {
    id: 65,
    text: "אני מתנתק כשהאווירה קשה",
    colleagueText: "המנהל/ת מתנתק/ת כשהאווירה קשה",
    dimension: dimensionMapping[65].dimension,
    isReversed: dimensionMapping[65].isReversed
  },
  {
    id: 66,
    text: "אני מתעלם ממשימות שמחוץ להגדרתי",
    colleagueText: "המנהל/ת מתעלם/ת ממשימות שמחוץ להגדרתו/ה",
    dimension: dimensionMapping[66].dimension,
    isReversed: dimensionMapping[66].isReversed
  },
  {
    id: 67,
    text: "אני מעודד מצוינות מתוך משמעות",
    colleagueText: "המנהל/ת מעודד/ת מצוינות מתוך משמעות",
    dimension: dimensionMapping[67].dimension,
    isReversed: dimensionMapping[67].isReversed
  },
  {
    id: 68,
    text: "אני מדבר על העתיד בצורה מעוררת השראה",
    colleagueText: "המנהל/ת מדבר/ת על העתיד בצורה מעוררת השראה",
    dimension: dimensionMapping[68].dimension,
    isReversed: dimensionMapping[68].isReversed
  },
  {
    id: 69,
    text: "אני לא מאמין שהלמידה יכולה לשנות דברים",
    colleagueText: "המנהל/ת לא מאמין/ה שהלמידה יכולה לשנות דברים",
    dimension: dimensionMapping[69].dimension,
    isReversed: dimensionMapping[69].isReversed
  },
  {
    id: 70,
    text: "אני משלב ידע חדש בפעילות היומיומית",
    colleagueText: "המנהל/ת משלב/ת ידע חדש בפעילות היומיומית",
    dimension: dimensionMapping[70].dimension,
    isReversed: dimensionMapping[70].isReversed
  },
  {
    id: 71,
    text: "אני נותן תחושת שייכות דרך הקשבה",
    colleagueText: "המנהל/ת נותן/ת תחושת שייכות דרך הקשבה",
    dimension: dimensionMapping[71].dimension,
    isReversed: dimensionMapping[71].isReversed
  },
  {
    id: 72,
    text: "אני לא פועל לשיפור אישי מתמיד",
    colleagueText: "המנהל/ת לא פועל/ת לשיפור אישי מתמיד",
    dimension: dimensionMapping[72].dimension,
    isReversed: dimensionMapping[72].isReversed
  },
  {
    id: 73,
    text: "אני מקשר כל תהליך לתמונה הגדולה",
    colleagueText: "המנהל/ת מקשר/ת כל תהליך לתמונה הגדולה",
    dimension: dimensionMapping[73].dimension,
    isReversed: dimensionMapping[73].isReversed
  },
  {
    id: 74,
    text: "אני רואה בעובד שותף אמיתי",
    colleagueText: "המנהל/ת רואה בעובד שותף אמיתי",
    dimension: dimensionMapping[74].dimension,
    isReversed: dimensionMapping[74].isReversed
  },
  {
    id: 75,
    text: "אני מקדם הבנה הדדית בין עובדים מרקעים שונים",
    colleagueText: "המנהל/ת מקדם/ת הבנה הדדית בין עובדים מרקעים שונים",
    dimension: dimensionMapping[75].dimension,
    isReversed: dimensionMapping[75].isReversed
  },
  {
    id: 76,
    text: "אני שואל שאלות גם כשזה לא נוח",
    colleagueText: "המנהל/ת שואל/ת שאלות גם כשזה לא נוח",
    dimension: dimensionMapping[76].dimension,
    isReversed: dimensionMapping[76].isReversed
  },
  {
    id: 77,
    text: "אני מוודא שכל אחד רואה את חלקו במשימה",
    colleagueText: "המנהל/ת מוודא/ת שכל אחד רואה את חלקו במשימה",
    dimension: dimensionMapping[77].dimension,
    isReversed: dimensionMapping[77].isReversed
  },
  {
    id: 78,
    text: "אני מתמודד עם התנגדות בגמישות",
    colleagueText: "המנהל/ת מתמודד/ת עם התנגדות בגמישות",
    dimension: dimensionMapping[78].dimension,
    isReversed: dimensionMapping[78].isReversed
  },
  {
    id: 79,
    text: "אני נותן מקום לרגשות של אחרים",
    colleagueText: "המנהל/ת נותן/ת מקום לרגשות של אחרים",
    dimension: dimensionMapping[79].dimension,
    isReversed: dimensionMapping[79].isReversed
  },
  {
    id: 80,
    text: "אני נמנע מקונפליקטים גם כשנדרשים",
    colleagueText: "המנהל/ת נמנע/ת מקונפליקטים גם כשנדרשים",
    dimension: dimensionMapping[80].dimension,
    isReversed: dimensionMapping[80].isReversed
  },
  {
    id: 81,
    text: "אני רואה ערך בהתפתחות האישית של העובדים",
    colleagueText: "המנהל/ת רואה ערך בהתפתחות האישית של העובדים",
    dimension: dimensionMapping[81].dimension,
    isReversed: dimensionMapping[81].isReversed
  },
  {
    id: 82,
    text: "אני מחפש גיוון רעיוני בכל דיון",
    colleagueText: "המנהל/ת מחפש/ת גיוון רעיוני בכל דיון",
    dimension: dimensionMapping[82].dimension,
    isReversed: dimensionMapping[82].isReversed
  },
  {
    id: 83,
    text: "אני מדבר בפתיחות על חזון עתידי",
    colleagueText: "המנהל/ת מדבר/ת בפתיחות על חזון עתידי",
    dimension: dimensionMapping[83].dimension,
    isReversed: dimensionMapping[83].isReversed
  },
  {
    id: 84,
    text: "אני משתף בכישלונותיי כדי לעודד למידה",
    colleagueText: "המנהל/ת משתף/ת בכישלונותיו/ה כדי לעודד למידה",
    dimension: dimensionMapping[84].dimension,
    isReversed: dimensionMapping[84].isReversed
  },
  {
    id: 85,
    text: "אני לא מתעמק בתובנות מהעבר",
    colleagueText: "המנהל/ת לא מתעמק/ת בתובנות מהעבר",
    dimension: dimensionMapping[85].dimension,
    isReversed: dimensionMapping[85].isReversed
  },
  {
    id: 86,
    text: "אני פועל תמיד למען טוב משותף",
    colleagueText: "המנהל/ת פועל/ת תמיד למען טוב משותף",
    dimension: dimensionMapping[86].dimension,
    isReversed: dimensionMapping[86].isReversed
  },
  {
    id: 87,
    text: "אני מעודד פרשנות אישית של חזון הארגון",
    colleagueText: "המנהל/ת מעודד/ת פרשנות אישית של חזון הארגון",
    dimension: dimensionMapping[87].dimension,
    isReversed: dimensionMapping[87].isReversed
  },
  {
    id: 88,
    text: "אני לא נותן מקום לשאלות של ביקורת",
    colleagueText: "המנהל/ת לא נותן/ת מקום לשאלות של ביקורת",
    dimension: dimensionMapping[88].dimension,
    isReversed: dimensionMapping[88].isReversed
  },
  {
    id: 89,
    text: "אני שומר על מיקוד גם בעת משבר",
    colleagueText: "המנהל/ת שומר/ת על מיקוד גם בעת משבר",
    dimension: dimensionMapping[89].dimension,
    isReversed: dimensionMapping[89].isReversed
  },
  {
    id: 90,
    text: "אני מראה אכפתיות עמוקה בעבודה היומיומית",
    colleagueText: "המנהל/ת מראה אכפתיות עמוקה בעבודה היומיומית",
    dimension: dimensionMapping[90].dimension,
    isReversed: dimensionMapping[90].isReversed
  }
];

// פונקציה לקבלת כל השאלות לפי ממד
export function getQuestionsByDimension(dimension: Question["dimension"]): Question[] {
  return questions.filter(q => q.dimension === dimension);
}
