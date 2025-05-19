
import { Question } from "@/lib/types";

// מיפוי הממדים עם כותרות ותיאורים
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

// מיפוי של הממדים והסימון אם השאלה הפוכה לפי שאלות
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
    text: "מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    dimension: dimensionMapping[1].dimension,
    isReversed: dimensionMapping[1].isReversed
  },
  {
    id: 2,
    text: "נמנע מלבחון רעיונות חדשים",
    dimension: dimensionMapping[2].dimension,
    isReversed: dimensionMapping[2].isReversed
  },
  {
    id: 3,
    text: "מקשיב לעובדיו בקשב רב",
    dimension: dimensionMapping[3].dimension,
    isReversed: dimensionMapping[3].isReversed
  },
  {
    id: 4,
    text: "מתעלם מהצעות לשיפור מצד אחרים",
    dimension: dimensionMapping[4].dimension,
    isReversed: dimensionMapping[4].isReversed
  },
  {
    id: 5,
    text: "מעורר השראה דרך הדוגמה האישית",
    dimension: dimensionMapping[5].dimension,
    isReversed: dimensionMapping[5].isReversed
  },
  {
    id: 6,
    text: "מוודא שכל יוזמה מקושרת לחזון הארגוני",
    dimension: dimensionMapping[6].dimension,
    isReversed: dimensionMapping[6].isReversed
  },
  {
    id: 7,
    text: "מתנהל בקשיחות ואינו מתחשב בצרכים אישיים",
    dimension: dimensionMapping[7].dimension,
    isReversed: dimensionMapping[7].isReversed
  },
  {
    id: 8,
    text: "מרבה לשתף את העובדים בהחלטות",
    dimension: dimensionMapping[8].dimension,
    isReversed: dimensionMapping[8].isReversed
  },
  {
    id: 9,
    text: "מתייחס לעשייה כמשהו שולי",
    dimension: dimensionMapping[9].dimension,
    isReversed: dimensionMapping[9].isReversed
  },
  {
    id: 10,
    text: "יודע להוביל תכנון ארוך טווח גם בעת משבר",
    dimension: dimensionMapping[10].dimension,
    isReversed: dimensionMapping[10].isReversed
  },
  {
    id: 11,
    text: "מתרגש כאשר משתפים אותו ברעיונות מקוריים",
    dimension: dimensionMapping[11].dimension,
    isReversed: dimensionMapping[11].isReversed
  },
  {
    id: 12,
    text: "מתנגד באופן עקבי לשינויים",
    dimension: dimensionMapping[12].dimension,
    isReversed: dimensionMapping[12].isReversed
  },
  {
    id: 13,
    text: "מספר סיפור שמעורר מוטיבציה אצל הצוות",
    dimension: dimensionMapping[13].dimension,
    isReversed: dimensionMapping[13].isReversed
  },
  {
    id: 14,
    text: "מתעלם משאלות של העובדים",
    dimension: dimensionMapping[14].dimension,
    isReversed: dimensionMapping[14].isReversed
  },
  {
    id: 15,
    text: "מתעקש רק על הדרך שלו, גם כשיש חלופות",
    dimension: dimensionMapping[15].dimension,
    isReversed: dimensionMapping[15].isReversed
  },
  {
    id: 16,
    text: "מבליט את החשיבות האישית של כל עובד",
    dimension: dimensionMapping[16].dimension,
    isReversed: dimensionMapping[16].isReversed
  },
  {
    id: 17,
    text: "מרבה לשתף את סיפורו האישי לשם חיבור רגשי",
    dimension: dimensionMapping[17].dimension,
    isReversed: dimensionMapping[17].isReversed
  },
  {
    id: 18,
    text: "מוותר בקלות על עקרונות כשיש התנגדות",
    dimension: dimensionMapping[18].dimension,
    isReversed: dimensionMapping[18].isReversed
  },
  {
    id: 19,
    text: "מתלהב מהאפשרות ללמוד משהו חדש",
    dimension: dimensionMapping[19].dimension,
    isReversed: dimensionMapping[19].isReversed
  },
  {
    id: 20,
    text: "מדגיש שוב ושוב את הערכים המובילים של הארגון",
    dimension: dimensionMapping[20].dimension,
    isReversed: dimensionMapping[20].isReversed
  },
  {
    id: 21,
    text: "מתייעץ עם עובדים לפני החלטות חשובות",
    dimension: dimensionMapping[21].dimension,
    isReversed: dimensionMapping[21].isReversed
  },
  {
    id: 22,
    text: "חושש לשתף פעולה עם צוותים אחרים",
    dimension: dimensionMapping[22].dimension,
    isReversed: dimensionMapping[22].isReversed
  },
  {
    id: 23,
    text: "יוזם רפורמות כשהמציאות משתנה",
    dimension: dimensionMapping[23].dimension,
    isReversed: dimensionMapping[23].isReversed
  },
  {
    id: 24,
    text: "נצמד לנוהלים גם כשהם כבר לא רלוונטיים",
    dimension: dimensionMapping[24].dimension,
    isReversed: dimensionMapping[24].isReversed
  },
  {
    id: 25,
    text: "מלהיב את העובדים סביב חזון משותף",
    dimension: dimensionMapping[25].dimension,
    isReversed: dimensionMapping[25].isReversed
  },
  {
    id: 26,
    text: "פועל תמיד מתוך שקיפות",
    dimension: dimensionMapping[26].dimension,
    isReversed: dimensionMapping[26].isReversed
  },
  {
    id: 27,
    text: "מתעלם ממשברים אישיים של עובדים",
    dimension: dimensionMapping[27].dimension,
    isReversed: dimensionMapping[27].isReversed
  },
  {
    id: 28,
    text: "שואף שכל עשייה תחולל שינוי אמיתי",
    dimension: dimensionMapping[28].dimension,
    isReversed: dimensionMapping[28].isReversed
  },
  {
    id: 29,
    text: "לא סומך על יצירתיות של אחרים",
    dimension: dimensionMapping[29].dimension,
    isReversed: dimensionMapping[29].isReversed
  },
  {
    id: 30,
    text: "מעודד את הסובבים לחפש משמעות בעבודתם",
    dimension: dimensionMapping[30].dimension,
    isReversed: dimensionMapping[30].isReversed
  },
  {
    id: 31,
    text: "מוודא שכל משימה תורמת לחזון",
    dimension: dimensionMapping[31].dimension,
    isReversed: dimensionMapping[31].isReversed
  },
  {
    id: 32,
    text: "מביע ספק ביכולת של הארגון להצליח",
    dimension: dimensionMapping[32].dimension,
    isReversed: dimensionMapping[32].isReversed
  },
  {
    id: 33,
    text: "מקפיד על עדכון הידע האישי דרך קריאה ומפגשים",
    dimension: dimensionMapping[33].dimension,
    isReversed: dimensionMapping[33].isReversed
  },
  {
    id: 34,
    text: "מתעלם מדעות המיעוט בצוות",
    dimension: dimensionMapping[34].dimension,
    isReversed: dimensionMapping[34].isReversed
  },
  {
    id: 35,
    text: "שואף שכל עובד ירגיש חלק ממסע אישי",
    dimension: dimensionMapping[35].dimension,
    isReversed: dimensionMapping[35].isReversed
  },
  {
    id: 36,
    text: "מראה אחריות אישית על כישלונות",
    dimension: dimensionMapping[36].dimension,
    isReversed: dimensionMapping[36].isReversed
  },
  {
    id: 37,
    text: "מאמין שהשראה נובעת ממעשים ולא מדיבורים",
    dimension: dimensionMapping[37].dimension,
    isReversed: dimensionMapping[37].isReversed
  },
  {
    id: 38,
    text: "מפתח אסטרטגיות חלופיות לשם גמישות",
    dimension: dimensionMapping[38].dimension,
    isReversed: dimensionMapping[38].isReversed
  },
  {
    id: 39,
    text: "נמנע מלבקש עזרה גם כשהוא זקוק לה",
    dimension: dimensionMapping[39].dimension,
    isReversed: dimensionMapping[39].isReversed
  },
  {
    id: 40,
    text: "רואה בהצלחת הארגון שליחות",
    dimension: dimensionMapping[40].dimension,
    isReversed: dimensionMapping[40].isReversed
  },
  {
    id: 41,
    text: "נותן תחושה של ביטחון ביכולת לעמוד באתגרים",
    dimension: dimensionMapping[41].dimension,
    isReversed: dimensionMapping[41].isReversed
  },
  {
    id: 42,
    text: "מרבה לשאול שאלות ליצירת שיח",
    dimension: dimensionMapping[42].dimension,
    isReversed: dimensionMapping[42].isReversed
  },
  {
    id: 43,
    text: "מתחשב בהקשרים פוליטיים וכלכליים בתכנון",
    dimension: dimensionMapping[43].dimension,
    isReversed: dimensionMapping[43].isReversed
  },
  {
    id: 44,
    text: "מקדם שיתוף פעולה בין יחידות שונות",
    dimension: dimensionMapping[44].dimension,
    isReversed: dimensionMapping[44].isReversed
  },
  {
    id: 45,
    text: "יוזם תהליכי למידה שיתופיים",
    dimension: dimensionMapping[45].dimension,
    isReversed: dimensionMapping[45].isReversed
  },
  {
    id: 46,
    text: "דוחה הצעות שמאיימות על מעמדו",
    dimension: dimensionMapping[46].dimension,
    isReversed: dimensionMapping[46].isReversed
  },
  {
    id: 47,
    text: "רואה בכל שינוי הזדמנות לצמיחה",
    dimension: dimensionMapping[47].dimension,
    isReversed: dimensionMapping[47].isReversed
  },
  {
    id: 48,
    text: "מקשיב לעמיתיו גם כשהם טועים",
    dimension: dimensionMapping[48].dimension,
    isReversed: dimensionMapping[48].isReversed
  },
  {
    id: 49,
    text: "משתמש בדוגמאות אישיות לחיבור רגשי",
    dimension: dimensionMapping[49].dimension,
    isReversed: dimensionMapping[49].isReversed
  },
  {
    id: 50,
    text: "פועל ליצירת תחושת שליחות בצוות",
    dimension: dimensionMapping[50].dimension,
    isReversed: dimensionMapping[50].isReversed
  },
  {
    id: 51,
    text: "בודק נתונים לפני קבלת החלטה אסטרטגית",
    dimension: dimensionMapping[51].dimension,
    isReversed: dimensionMapping[51].isReversed
  },
  {
    id: 52,
    text: "מזמין שאלות קשות מהעובדים",
    dimension: dimensionMapping[52].dimension,
    isReversed: dimensionMapping[52].isReversed
  },
  {
    id: 53,
    text: "לא משתף את חזונו מתוך חשש לביקורת",
    dimension: dimensionMapping[53].dimension,
    isReversed: dimensionMapping[53].isReversed
  },
  {
    id: 54,
    text: "מדגיש את ערך התרומה החברתית של הפעילות",
    dimension: dimensionMapping[54].dimension,
    isReversed: dimensionMapping[54].isReversed
  },
  {
    id: 55,
    text: "נמנע מהחלטות כדי לא לטעות",
    dimension: dimensionMapping[55].dimension,
    isReversed: dimensionMapping[55].isReversed
  },
  {
    id: 56,
    text: "מאמין שכל אדם מסוגל להוביל שינוי",
    dimension: dimensionMapping[56].dimension,
    isReversed: dimensionMapping[56].isReversed
  },
  {
    id: 57,
    text: "בונה תכנית פעולה עם גמישות מובנית",
    dimension: dimensionMapping[57].dimension,
    isReversed: dimensionMapping[57].isReversed
  },
  {
    id: 58,
    text: "מרבה להחמיא כאשר מגיע",
    dimension: dimensionMapping[58].dimension,
    isReversed: dimensionMapping[58].isReversed
  },
  {
    id: 59,
    text: "משדר נחישות גם בעת אי ודאות",
    dimension: dimensionMapping[59].dimension,
    isReversed: dimensionMapping[59].isReversed
  },
  {
    id: 60,
    text: "נוהג לציין הצלחות קטנות בדרך ליעד",
    dimension: dimensionMapping[60].dimension,
    isReversed: dimensionMapping[60].isReversed
  },
  {
    id: 61,
    text: "מבסס תהליכים ארגוניים על עקרונות ערכיים",
    dimension: dimensionMapping[61].dimension,
    isReversed: dimensionMapping[61].isReversed
  },
  {
    id: 62,
    text: "מתחשב בצרכים תרבותיים של העובדים",
    dimension: dimensionMapping[62].dimension,
    isReversed: dimensionMapping[62].isReversed
  },
  {
    id: 63,
    text: "מתמקד בפתרונות ולא בתירוצים",
    dimension: dimensionMapping[63].dimension,
    isReversed: dimensionMapping[63].isReversed
  },
  {
    id: 64,
    text: "משתף את הצוות במידע קריטי",
    dimension: dimensionMapping[64].dimension,
    isReversed: dimensionMapping[64].isReversed
  },
  {
    id: 65,
    text: "מתנתק כשהאווירה קשה",
    dimension: dimensionMapping[65].dimension,
    isReversed: dimensionMapping[65].isReversed
  },
  {
    id: 66,
    text: "מתעלם ממשימות שמחוץ להגדרתו",
    dimension: dimensionMapping[66].dimension,
    isReversed: dimensionMapping[66].isReversed
  },
  {
    id: 67,
    text: "מעודד מצוינות מתוך משמעות",
    dimension: dimensionMapping[67].dimension,
    isReversed: dimensionMapping[67].isReversed
  },
  {
    id: 68,
    text: "מדבר על העתיד בצורה מעוררת השראה",
    dimension: dimensionMapping[68].dimension,
    isReversed: dimensionMapping[68].isReversed
  },
  {
    id: 69,
    text: "לא מאמין שהלמידה יכולה לשנות דברים",
    dimension: dimensionMapping[69].dimension,
    isReversed: dimensionMapping[69].isReversed
  },
  {
    id: 70,
    text: "משלב ידע חדש בפעילות היומיומית",
    dimension: dimensionMapping[70].dimension,
    isReversed: dimensionMapping[70].isReversed
  },
  {
    id: 71,
    text: "נותן תחושת שייכות דרך הקשבה",
    dimension: dimensionMapping[71].dimension,
    isReversed: dimensionMapping[71].isReversed
  },
  {
    id: 72,
    text: "לא פועל לשיפור אישי מתמיד",
    dimension: dimensionMapping[72].dimension,
    isReversed: dimensionMapping[72].isReversed
  },
  {
    id: 73,
    text: "מקשר כל תהליך לתמונה הגדולה",
    dimension: dimensionMapping[73].dimension,
    isReversed: dimensionMapping[73].isReversed
  },
  {
    id: 74,
    text: "רואה בעובד שותף אמיתי",
    dimension: dimensionMapping[74].dimension,
    isReversed: dimensionMapping[74].isReversed
  },
  {
    id: 75,
    text: "מקדם הבנה הדדית בין עובדים מרקעים שונים",
    dimension: dimensionMapping[75].dimension,
    isReversed: dimensionMapping[75].isReversed
  },
  {
    id: 76,
    text: "שואל שאלות גם כשזה לא נוח",
    dimension: dimensionMapping[76].dimension,
    isReversed: dimensionMapping[76].isReversed
  },
  {
    id: 77,
    text: "מוודא שכל אחד רואה את חלקו במשימה",
    dimension: dimensionMapping[77].dimension,
    isReversed: dimensionMapping[77].isReversed
  },
  {
    id: 78,
    text: "מתמודד עם התנגדות בגמישות",
    dimension: dimensionMapping[78].dimension,
    isReversed: dimensionMapping[78].isReversed
  },
  {
    id: 79,
    text: "נותן מקום לרגשות של אחרים",
    dimension: dimensionMapping[79].dimension,
    isReversed: dimensionMapping[79].isReversed
  },
  {
    id: 80,
    text: "נמנע מקונפליקטים גם כשנדרשים",
    dimension: dimensionMapping[80].dimension,
    isReversed: dimensionMapping[80].isReversed
  },
  {
    id: 81,
    text: "רואה ערך בהתפתחות האישית של העובדים",
    dimension: dimensionMapping[81].dimension,
    isReversed: dimensionMapping[81].isReversed
  },
  {
    id: 82,
    text: "מחפש גיוון רעיוני בכל דיון",
    dimension: dimensionMapping[82].dimension,
    isReversed: dimensionMapping[82].isReversed
  },
  {
    id: 83,
    text: "מדבר בפתיחות על חזון עתידי",
    dimension: dimensionMapping[83].dimension,
    isReversed: dimensionMapping[83].isReversed
  },
  {
    id: 84,
    text: "משתף בכישלונותיו כדי לעודד למידה",
    dimension: dimensionMapping[84].dimension,
    isReversed: dimensionMapping[84].isReversed
  },
  {
    id: 85,
    text: "לא מתעמק בתובנות מהעבר",
    dimension: dimensionMapping[85].dimension,
    isReversed: dimensionMapping[85].isReversed
  },
  {
    id: 86,
    text: "פועל תמיד למען טוב משותף",
    dimension: dimensionMapping[86].dimension,
    isReversed: dimensionMapping[86].isReversed
  },
  {
    id: 87,
    text: "מעודד פרשנות אישית של חזון הארגון",
    dimension: dimensionMapping[87].dimension,
    isReversed: dimensionMapping[87].isReversed
  },
  {
    id: 88,
    text: "לא נותן מקום לשאלות של ביקורת",
    dimension: dimensionMapping[88].dimension,
    isReversed: dimensionMapping[88].isReversed
  },
  {
    id: 89,
    text: "שומר על מיקוד גם בעת משבר",
    dimension: dimensionMapping[89].dimension,
    isReversed: dimensionMapping[89].isReversed
  },
  {
    id: 90,
    text: "מראה אכפתיות עמוקה בעבודה היומיומית",
    dimension: dimensionMapping[90].dimension,
    isReversed: dimensionMapping[90].isReversed
  }
];

// פונקציה לקבלת כל השאלות לפי ממד
export function getQuestionsByDimension(dimension: Question["dimension"]): Question[] {
  return questions.filter(q => q.dimension === dimension);
}
