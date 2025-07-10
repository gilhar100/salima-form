
import { Question, Dimension } from "@/lib/types";
import { archetypeQuestions } from "./archetypeQuestions";

// שאלות השאלון החדש - 90 שאלות
export const coreQuestions: Question[] = [
  {
    id: 1,
    text: "אני פונה/ת לבקש עזרה כשאני זקוק/ה לה",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא פונה/ת לבקש עזרה כשהוא/היא זקוק/ה לה"
  },
  {
    id: 2,
    text: "אני פועל/ת למימוש החזון על יצירת אפשרויות חדשות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת למימוש החזון על יצירת אפשרויות חדשות"
  },
  {
    id: 3,
    text: "אני יוזם/ת רפורמות כשהמציאות משתנה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יוזם/ת רפורמות כשהמציאות משתנה"
  },
  {
    id: 4,
    text: "אני מתלהב/ת מהאפשרות ללמוד משהו חדש",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מתלהב/ת מהאפשרות ללמוד משהו חדש"
  },
  {
    id: 5,
    text: "לדעתי אנשים הם שונים ומכל אחד יש מה ללמוד",
    dimension: "L",
    isReversed: false,
    colleagueText: "לדעתו/ה אנשים הם שונים ומכל אחד יש מה ללמוד"
  },
  {
    id: 6,
    text: "אני משתדל/ת להתמקד בפתרונות ולא בתירוצים",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא משתדל/ת להתמקד בפתרונות ולא בתירוצים"
  },
  {
    id: 7,
    text: "אני רואה/ת הזדמנות במצבים של חוסר ודאות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא רואה/ת הזדמנות במצבים של חוסר ודאות"
  },
  {
    id: 8,
    text: "אני ממקד/ת אחרים לתוכניות העתיד גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא ממקד/ת אחרים לתוכניות העתיד גם בעת משבר"
  },
  {
    id: 9,
    text: "אני מבסס/ת תהליכים ארגוניים על עקרונות ערכיים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבסס/ת תהליכים ארגוניים על עקרונות ערכיים"
  },
  {
    id: 10,
    text: "אני מקשר/ת כל תהליך לתמונה הגדולה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מקשר/ת כל תהליך לתמונה הגדולה"
  },
  {
    id: 11,
    text: "אני מייחס/ת חשיבות לקשר אישי עם עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מייחס/ת חשיבות לקשר אישי עם עובדים"
  },
  {
    id: 12,
    text: "אני נוהג/ת לציין הצלחות קטנות בדרך ליעד",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נוהג/ת לציין הצלחות קטנות בדרך ליעד"
  },
  {
    id: 13,
    text: "אני מוודא/ת שכל משימה תורמת לחזון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מוודא/ת שכל משימה תורמת לחזון"
  },
  {
    id: 14,
    text: "אני נותן/ת תחושת שייכות דרך הקשבה",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת תחושת שייכות דרך הקשבה"
  },
  {
    id: 15,
    text: "אני מראה/ת אחריות אישית על כישלונות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מראה/ת אחריות אישית על כישלונות"
  },
  {
    id: 16,
    text: "אני משדר/ת נחישות גם בעת אי ודאות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא משדר/ת נחישות גם בעת אי ודאות"
  },
  {
    id: 17,
    text: "אני מתמקד/ת במשימות גם אם הן מחוץ לתחום הגדרתי",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מתמקד/ת במשימות גם אם הן מחוץ לתחום הגדרתו/ה"
  },
  {
    id: 18,
    text: "אני מעודד/ת את הסובבים לחפש משמעות בעבודתם",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת את הסובבים לחפש משמעות בעבודתם"
  },
  {
    id: 19,
    text: "אני מאמין/ה שהמחויבות שלי לעובד חשובה באותה המידה כמו המחויבות שלי לארגון",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה שהמחויבות שלו/ה לעובד חשובה באותה המידה כמו המחויבות שלו/ה לארגון"
  },
  {
    id: 20,
    text: "אני רואה/ת בכל שינוי הזדמנות לצמיחה",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא רואה/ת בכל שינוי הזדמנות לצמיחה"
  },
  {
    id: 21,
    text: "אני נותן/ת מקום לרגשות של אחרים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת מקום לרגשות של אחרים"
  },
  {
    id: 22,
    text: "אני מאמין/ה שכל אדם מסוגל להוביל שינוי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה שכל אדם מסוגל להוביל שינוי"
  },
  {
    id: 23,
    text: "אני מרבה/ת להחמיא כאשר מגיע",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מרבה/ת להחמיא כאשר מגיע"
  },
  {
    id: 24,
    text: "אני משתמש/ת בשפה שמעוררת השראה בצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא משתמש/ת בשפה שמעוררת השראה בצוות"
  },
  {
    id: 25,
    text: "אני מתנתק/ת כשהאווירה קשה",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מתנתק/ת כשהאווירה קשה"
  },
  {
    id: 26,
    text: "אני מרבה/ת לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מרבה/ת לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות"
  },
  {
    id: 27,
    text: "במצבי משבר אני מעדיף/ה לעבוד עם אנשים שחושבים אחרת ממני",
    dimension: "A",
    isReversed: false,
    colleagueText: "במצבי משבר הוא/היא מעדיף/ה לעבוד עם אנשים שחושבים אחרת ממנו/ממנה"
  },
  {
    id: 28,
    text: "אני מחפש/ת גיוון רעיוני בכל דיון",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מחפש/ת גיוון רעיוני בכל דיון"
  },
  {
    id: 29,
    text: "אני מעודד/ת מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת מצוינות מתוך משמעות"
  },
  {
    id: 30,
    text: "צריך לחיות מתוך האפשר ולהפיק ממנו את המירב",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שצריך לחיות מתוך האפשר ולהפיק ממנו את המירב"
  },
  {
    id: 31,
    text: "אני משתמש/ת בדוגמאות אישיות לחיבור רגשי",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא משתמש/ת בדוגמאות אישיות לחיבור רגשי"
  },
  {
    id: 32,
    text: "אני בונה/ת תכנית פעולה עם גמישות מובנית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בונה/ת תכנית פעולה עם גמישות מובנית"
  },
  {
    id: 33,
    text: "אני מקשיב/ה לעמיתיי גם כשהם טועים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מקשיב/ה לעמיתיו/יה גם כשהם טועים"
  },
  {
    id: 34,
    text: "אני מלהיב/ה את העובדים סביב חזון משותף",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מלהיב/ה את העובדים סביב חזון משותף"
  },
  {
    id: 35,
    text: "אני עוזר/ת לאחרים למצוא כוחות ברגעי קושי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא עוזר/ת לאחרים למצוא כוחות ברגעי קושי"
  },
  {
    id: 36,
    text: "אני מתחשב/ת בהקשרים פוליטיים וכלכליים בתכנון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מתחשב/ת בהקשרים פוליטיים וכלכליים בתכנון"
  },
  {
    id: 37,
    text: "אני מפתח/ת אסטרטגיות חלופיות לשם גמישות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מפתח/ת אסטרטגיות חלופיות לשם גמישות"
  },
  {
    id: 38,
    text: "אני מקדם/ת שיתוף פעולה בין יחידות שונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מקדם/ת שיתוף פעולה בין יחידות שונות"
  },
  {
    id: 39,
    text: "אני פועל/ת תמיד מתוך שקיפות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת תמיד מתוך שקיפות"
  },
  {
    id: 40,
    text: "אני מחשיב/ה את עצמי כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מחשיב/ה את עצמו/ה כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך"
  },
  {
    id: 41,
    text: "אני מאמין/ה שהמעשים הם מה שקובע ולא הדיבורים",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מאמין/ה שהמעשים הם מה שקובע ולא הדיבורים"
  },
  {
    id: 42,
    text: "אני מקפיד/ה על עדכון הידע האישי דרך קריאה ומפגשים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מקפיד/ה על עדכון הידע האישי דרך קריאה ומפגשים"
  },
  {
    id: 43,
    text: "אני רואה/ת משברים ארגוניים כהזדמנות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא רואה/ת משברים ארגוניים כהזדמנות"
  },
  {
    id: 44,
    text: "קל לי לשקול חלופות שאחרים מציעים לי",
    dimension: "S",
    isReversed: false,
    colleagueText: "קל לו/לה לשקול חלופות שאחרים מציעים לו/לה"
  },
  {
    id: 45,
    text: "אני פועל/ת תמיד למען טוב משותף",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת תמיד למען טוב משותף"
  },
  {
    id: 46,
    text: "אני אוהב/ת שיש הרבה דעות שונות בצוות שלי",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא אוהב/ת שיש הרבה דעות שונות בצוות שלו/ה"
  },
  {
    id: 47,
    text: "אני בודק/ת נתונים לפני קבלת החלטה אסטרטגית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בודק/ת נתונים לפני קבלת החלטה אסטרטגית"
  },
  {
    id: 48,
    text: "אני בוחן/ת הצעות גם אם הן מאיימות על מעמדי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא בוחן/ת הצעות גם אם הן מאיימות על מעמדו/ה"
  },
  {
    id: 49,
    text: "אני מדגיש/ה את ערך התרומה החברתית של הפעילות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש/ה את ערך התרומה החברתית של הפעילות"
  },
  {
    id: 50,
    text: "אני שואף/ת שכל עובד ירגיש חלק ממסע אישי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף/ת שכל עובד ירגיש חלק ממסע אישי"
  },
  {
    id: 51,
    text: "אני מאמין/ה שבעת משבר צריך להישען על אחרים",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה שבעת משבר צריך להישען על אחרים"
  },
  {
    id: 52,
    text: "כשיש משבר אני שואף/ת לפתור אותו מהר",
    dimension: "A",
    isReversed: false,
    colleagueText: "כשיש משבר הוא/היא שואף/ת לפתור אותו מהר"
  },
  {
    id: 53,
    text: "אני אוהב/ת לעבוד עם צוותים אחרים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא אוהב/ת לעבוד עם צוותים אחרים"
  },
  {
    id: 54,
    text: "אני משדר/ת נחישות גם בעת אי ודאות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משדר/ת נחישות גם בעת אי ודאות"
  },
  {
    id: 55,
    text: "אני עומד/ת על הערכים שלי מול התנגדות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא עומד/ת על הערכים שלו/ה מול התנגדות"
  },
  {
    id: 56,
    text: "אני מעורר/ת השראה דרך הדוגמה האישית",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעורר/ת השראה דרך הדוגמה האישית"
  },
  {
    id: 57,
    text: "אני מקדם/ת הבנה הדדית בין עובדים מרקעים שונים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מקדם/ת הבנה הדדית בין עובדים מרקעים שונים"
  },
  {
    id: 58,
    text: "אני מרבה/ת לשאול שאלות ליצירת שיח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מרבה/ת לשאול שאלות ליצירת שיח"
  },
  {
    id: 59,
    text: "אני מזמין/ה שאלות קשות מהעובדים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מזמין/ה שאלות קשות מהעובדים"
  },
  {
    id: 60,
    text: "אני מבליט/ה את החשיבות האישית של כל עובד",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבליט/ה את החשיבות האישית של כל עובד"
  },
  {
    id: 61,
    text: "אני שואל/ת שאלות גם כשזה לא מצופה ממני",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא שואל/ת שאלות גם כשזה לא מצופה ממנו/ממנה"
  },
  {
    id: 62,
    text: "אני משתמש/ת בידע חדש לשיפור הדרך",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא משתמש/ת בידע חדש לשיפור הדרך"
  },
  {
    id: 63,
    text: "אני מוודא/ת שכל אחד רואה את חלקו במשימה",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מוודא/ת שכל אחד רואה את חלקו במשימה"
  },
  {
    id: 64,
    text: "אני סומך/ת על יצירתיות של אחרים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא סומך/ת על יצירתיות של אחרים"
  },
  {
    id: 65,
    text: "אני משתף/ת את החזון שלי גם כאשר יש חשש מביקורת",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משתף/ת את החזון שלו/ה גם כאשר יש חשש מביקורת"
  },
  {
    id: 66,
    text: "אני חושב/ת שלכל אחד יש ערך",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שלכל אחד יש ערך"
  },
  {
    id: 67,
    text: "אני שואף/ת שכל עשייה תחולל שינוי אמיתי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף/ת שכל עשייה תחולל שינוי אמיתי"
  },
  {
    id: 68,
    text: "אני מעניק/ה יחס למשברים אישיים של עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מעניק/ה יחס למשברים אישיים של עובדים"
  },
  {
    id: 69,
    text: "לדעתי ערכים, יושרה וכנות הם החשובים ביותר ביצירת קשר עם עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "לדעתו/ה ערכים, יושרה וכנות הם החשובים ביותר ביצירת קשר עם עובדים"
  },
  {
    id: 70,
    text: "אני מאמין/ה ביכולת של הארגון להצליח",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה ביכולת של הארגון להצליח"
  },
  {
    id: 71,
    text: "אני מעודד/ת פרשנות אישית של חזון הארגון",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת פרשנות אישית של חזון הארגון"
  },
  {
    id: 72,
    text: "אני נותן/ת תחושה של ביטחון ביכולת לעמוד באתגרים",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת תחושה של ביטחון ביכולת לעמוד באתגרים"
  },
  {
    id: 73,
    text: "אני מעודד/ת מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת מצוינות מתוך משמעות"
  },
  {
    id: 74,
    text: "אני מדגיש/ה שוב ושוב את הערכים המובילים של הארגון",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש/ה שוב ושוב את הערכים המובילים של הארגון"
  },
  {
    id: 75,
    text: "אני מדבר/ת על העתיד בצורה מעוררת השראה",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מדבר/ת על העתיד בצורה מעוררת השראה"
  },
  {
    id: 76,
    text: "אני מחבר/ת בין ערכים אישיים לחזון הארגוני",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מחבר/ת בין ערכים אישיים לחזון הארגוני"
  },
  {
    id: 77,
    text: "אני תמיד מחפש/ת את מה שבכל זאת אפשרי, גם כשיש משבר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא תמיד מחפש/ת את מה שבכל זאת אפשרי, גם כשיש משבר"
  },
  {
    id: 78,
    text: "אני פועל/ת ליצירת תחושת שליחות בצוות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת ליצירת תחושת שליחות בצוות"
  },
  {
    id: 79,
    text: "אני מספר/ת סיפור שמעורר מוטיבציה אצל הצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מספר/ת סיפור שמעורר מוטיבציה אצל הצוות"
  },
  {
    id: 80,
    text: "אני מתייחס/ת ברצינות לרעיונות של העובדים שלי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מתייחס/ת ברצינות לרעיונות של העובדים שלו/ה"
  },
  {
    id: 81,
    text: "אני אוהב/ת ללמוד מהשראה",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא אוהב/ת ללמוד מהשראה"
  },
  {
    id: 82,
    text: "אני יוזם/ת תהליכי למידה שיתופיים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא יוזם/ת תהליכי למידה שיתופיים"
  },
  {
    id: 83,
    text: "לעיתים אני מקבל/ת החלטות קשות, גם אם יש בהן סיכון",
    dimension: "A",
    isReversed: false,
    colleagueText: "לעיתים הוא/היא מקבל/ת החלטות קשות, גם אם יש בהן סיכון"
  },
  {
    id: 84,
    text: "אני רואה/ת בעימותים ומשברים כדבר חיובי",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא רואה/ת בעימותים ומשברים כדבר חיובי"
  },
  {
    id: 85,
    text: "אני רואה/ת בהצלחת הארגון שליחות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה/ת בהצלחת הארגון שליחות"
  },
  {
    id: 86,
    text: "אני רואה/ת ערך בהתפתחות האישית של העובדים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה/ת ערך בהתפתחות האישית של העובדים"
  },
  {
    id: 87,
    text: "אני יודע/ת להוביל תכנון ארוך טווח גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יודע/ת להוביל תכנון ארוך טווח גם בעת משבר"
  },
  {
    id: 88,
    text: "אני משלב/ת ידע חדש בפעילות היומיומית",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא משלב/ת ידע חדש בפעילות היומיומית"
  },
  {
    id: 89,
    text: "אני משתף/ת את הצוות במידע קריטי",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משתף/ת את הצוות במידע קריטי"
  },
  {
    id: 90,
    text: "אני שם/ה דגש על תקווה ואפשרות במצבי חוסר ודאות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא שם/ה דגש על תקווה ואפשרות במצבי חוסר ודאות"
  }
];

// Combine core questions with archetype questions for the complete survey
export const questions: Question[] = [...coreQuestions, ...archetypeQuestions];

// מיפוי השאלות לממדים - only for core questions (SLQ calculation)
export const dimensionMapping: Record<number, { dimension: Dimension; isReversed: boolean }> = {};

coreQuestions.forEach(question => {
  dimensionMapping[question.id] = {
    dimension: question.dimension,
    isReversed: question.isReversed
  };
});

// מידע על הממדים
export const dimensionInfo = {
  S: {
    title: "אסטרטגיה",
    description: "יכולת לראות תמונה גדולה, לתכנן ארוך טווח ולהוביל שינוי אסטרטגי"
  },
  L: {
    title: "למידה",
    description: "סקרנות, פתיחות לידע חדש ויכולת להתפתח ולהסתגל"
  },
  I: {
    title: "השראה",
    description: "יכולת להניע, לעורר השראה ולהוביל אחרים למימוש מטרות"
  },
  M: {
    title: "משמעות",
    description: "יצירת תחושת תכלית, ערכים וחיבור למטרה רחבה יותר"
  },
  A: {
    title: "אדפטיביות",
    description: "גמישות, יכולת התמודדות עם שינויים ופתיחות לאתגרים"
  },
  A2: {
    title: "אותנטיות",
    description: "כנות, שקיפות ויכולת להיות אמיתי ומהימן בקשרים"
  }
};
