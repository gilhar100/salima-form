import { Question, Dimension } from "@/lib/types";
import { archetypeQuestions } from "./archetypeQuestions";

// שאלות השאלון החדש - 90 שאלות
export const coreQuestions: Question[] = [
  {
    id: 82,
    text: "את/ה נמנע/ת מלבקש עזרה גם כשאת/ה זקוק/ה לה",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא נמנע/ת מלבקש עזרה גם כשזקוק/ה לה"
  },
  {
    id: 15,
    text: "את/ה פועל/ת למימוש החזון על יצירת אפשרויות חדשות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת למימוש החזון על יצירת אפשרויות חדשות"
  },
  {
    id: 4,
    text: "את/ה יוזם/ת רפורמות כשהמציאות משתנה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יוזם/ת רפורמות כשהמציאות משתנה"
  },
  {
    id: 36,
    text: "את/ה מתלהב/ת מהאפשרות ללמוד משהו חדש",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מתלהב/ת מהאפשרות ללמוד משהו חדש"
  },
  {
    id: 32,
    text: "את/ה יודע/ת שאנשים הם שונים ומכל אחד יש מה ללמוד",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא יודע/ת שאנשים הם שונים ומכל אחד יש מה ללמוד"
  },
  {
    id: 29,
    text: "את/ה מתמקד/ת בפתרונות ולא בתירוצים",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מתמקד/ת בפתרונות ולא בתירוצים"
  },
  {
    id: 18,
    text: "את/ה מסכים/ה שלפעמים צריך להתנתק רגשית כדי לקבל החלטות נכונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מסכים/ה שלפעמים צריך להתנתק רגשית כדי לקבל החלטות נכונות"
  },
  {
    id: 14,
    text: "את/ה שומר/ת על מיקוד גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא שומר/ת על מיקוד גם בעת משבר"
  },
  {
    id: 70,
    text: "את/ה מבסס/ת תהליכים ארגוניים על עקרונות ערכיים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבסס/ת תהליכים ארגוניים על עקרונות ערכיים"
  },
  {
    id: 12,
    text: "את/ה מקשר/ת כל תהליך לתמונה הגדולה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מקשר/ת כל תהליך לתמונה הגדולה"
  },
  {
    id: 76,
    text: "את/ה מייחס/ת חשיבות לקשר אישי עם עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מייחס/ת חשיבות לקשר אישי עם עובדים"
  },
  {
    id: 55,
    text: "את/ה נוהג/ת לציין הצלחות קטנות בדרך ליעד",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נוהג/ת לציין הצלחות קטנות בדרך ליעד"
  },
  {
    id: 5,
    text: "את/ה מוודא/ת שכל משימה תורמת לחזון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מוודא/ת שכל משימה תורמת לחזון"
  },
  {
    id: 88,
    text: "את/ה נותן/ת תחושת שייכות דרך הקשבה",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת תחושת שייכות דרך הקשבה"
  },
  {
    id: 81,
    text: "את/ה מראה אחריות אישית על כישלונות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מראה אחריות אישית על כישלונות"
  },
  {
    id: 28,
    text: "את/ה משדר/ת נחישות גם בעת אי ודאות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא משדר/ת נחישות גם בעת אי ודאות"
  },
  {
    id: 30,
    text: "את/ה מתעלם/ת ממשימות שמחוץ להגדרתך",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם/ת ממשימות שמחוץ להגדרתו/ה"
  },
  {
    id: 65,
    text: "את/ה מעודד/ת את הסובבים לחפש משמעות בעבודתם",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת את הסובבים לחפש משמעות בעבודתם"
  },
  {
    id: 77,
    text: "את/ה מאמין/ה שהמחויבות שלך לעובד לא פחותה מהאחריות שלך לארגון",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה שהמחויבות שלו/ה לעובד לא פחותה מהאחריות שלו/ה לארגון"
  },
  {
    id: 26,
    text: "את/ה רואה בכל שינוי הזדמנות לצמיחה",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא רואה בכל שינוי הזדמנות לצמיחה"
  },
  {
    id: 90,
    text: "את/ה נותן/ת מקום לרגשות של אחרים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת מקום לרגשות של אחרים"
  },
  {
    id: 54,
    text: "את/ה מאמין/ה שכל אדם מסוגל להוביל שינוי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה שכל אדם מסוגל להוביל שינוי"
  },
  {
    id: 85,
    text: "את/ה מרבה להחמיא כאשר מגיע",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מרבה להחמיא כאשר מגיע"
  },
  {
    id: 58,
    text: "את/ה משתמש/ת בשפה שמעוררת השראה בצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא משתמש/ת בשפה שמעוררת השראה בצוות"
  },
  {
    id: 87,
    text: "את/ה מתנתק/ת כשהאווירה קשה",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מתנתק/ת כשהאווירה קשה"
  },
  {
    id: 1,
    text: "את/ה מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות"
  },
  {
    id: 21,
    text: "קשה מאוד לך לעבוד עם אנשים במצב של משבר שחושבים אחרת ממך",
    dimension: "A",
    isReversed: true,
    colleagueText: "קשה לו/לה מאוד לעבוד עם אנשים במצב של משבר שחושבים אחרת ממנו/ממנה"
  },
  {
    id: 45,
    text: "את/ה מחפש/ת גיוון רעיוני בכל דיון",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מחפש/ת גיוון רעיוני בכל דיון"
  },
  {
    id: 75,
    text: "את/ה מעודד/ת מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת מצוינות מתוך משמעות"
  },
  {
    id: 22,
    text: "צריך לחיות מתוך מה שאפשר ולהפיק מזה את המירב",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שצריך לחיות מתוך מה שאפשר ולהפיק מזה את המירב"
  },
  {
    id: 84,
    text: "את/ה משתמש/ת בדוגמאות אישיות לחיבור רגשי",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא משתמש/ת בדוגמאות אישיות לחיבור רגשי"
  },
  {
    id: 10,
    text: "את/ה בונה תכנית פעולה עם גמישות מובנית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בונה תכנית פעולה עם גמישות מובנית"
  },
  {
    id: 83,
    text: "את/ה מקשיב/ה לעמיתיך גם כשהם טועים",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מקשיב/ה לעמיתיו/ה גם כשהם טועים"
  },
  {
    id: 49,
    text: "את/ה מלהיב/ה את העובדים סביב חזון משותף",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מלהיב/ה את העובדים סביב חזון משותף"
  },
  {
    id: 61,
    text: "את/ה מתייחס/ת לעשייה כמשהו שולי",
    dimension: "M",
    isReversed: true,
    colleagueText: "הוא/היא מתייחס/ת לעשייה כמשהו שולי"
  },
  {
    id: 7,
    text: "את/ה מתחשב/ת בהקשרים פוליטיים וכלכליים בתכנון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מתחשב/ת בהקשרים פוליטיים וכלכליים בתכנון"
  },
  {
    id: 6,
    text: "את/ה מפתח/ת אסטרטגיות חלופיות לשם גמישות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מפתח/ת אסטרטגיות חלופיות לשם גמישות"
  },
  {
    id: 25,
    text: "את/ה מקדם/ת שיתוף פעולה בין יחידות שונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מקדם/ת שיתוף פעולה בין יחידות שונות"
  },
  {
    id: 79,
    text: "את/ה פועל/ת תמיד מתוך שקיפות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת תמיד מתוך שקיפות"
  },
  {
    id: 23,
    text: "את/ה מחשיב/ה את עצמך כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מחשיב/ה את עצמו/ה כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך"
  },
  {
    id: 51,
    text: "את/ה מאמין/ה שהמעשים הם מה שקובע ולא הדיבורים",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מאמין/ה שהמעשים הם מה שקובע ולא הדיבורים"
  },
  {
    id: 39,
    text: "את/ה מקפיד/ה על עדכון הידע האישי דרך קריאה ומפגשים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מקפיד/ה על עדכון הידע האישי דרך קריאה ומפגשים"
  },
  {
    id: 17,
    text: "את/ה חושב/ת שמשבר מסכן את הארגון וצריך להימנע ממנו ככל האפשר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שמשבר מסכן את הארגון וצריך להימנע ממנו ככל האפשר"
  },
  {
    id: 3,
    text: "את/ה מתעקש/ת רק על הדרך שלך, גם כשיש חלופות",
    dimension: "S",
    isReversed: true,
    colleagueText: "הוא/היא מתעקש/ת רק על הדרך שלו/ה, גם כשיש חלופות"
  },
  {
    id: 74,
    text: "את/ה פועל/ת תמיד למען טוב משותף",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת תמיד למען טוב משותף"
  },
  {
    id: 35,
    text: "את/ה אוהב/ת ללמוד עם אנשים כמוך",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא אוהב/ת ללמוד עם אנשים כמוהו/ה"
  },
  {
    id: 8,
    text: "את/ה בודק/ת נתונים לפני קבלת החלטה אסטרטגית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בודק/ת נתונים לפני קבלת החלטה אסטרטגית"
  },
  {
    id: 53,
    text: "את/ה דוחה הצעות שמאיימות על מעמדך",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא דוחה הצעות שמאיימות על מעמדו/ה"
  },
  {
    id: 69,
    text: "את/ה מדגיש/ה את ערך התרומה החברתית של הפעילות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש/ה את ערך התרומה החברתית של הפעילות"
  },
  {
    id: 66,
    text: "את/ה שואף/ת שכל עובד ירגיש חלק ממסע אישי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף/ת שכל עובד ירגיש חלק ממסע אישי"
  },
  {
    id: 19,
    text: "את/ה מאמין/ה שבעת משבר את/ה צריך/ה בעיקר לסמוך על עצמך",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מאמין/ה שבעת משבר הוא/היא צריך/ה בעיקר לסמוך על עצמו/ה"
  },
  {
    id: 24,
    text: "כשיש משבר את/ה שואף/ת לפתור אותו מהר",
    dimension: "A",
    isReversed: false,
    colleagueText: "כשיש משבר הוא/היא שואף/ת לפתור אותו מהר"
  },
  {
    id: 37,
    text: "את/ה חושש/ת לשתף פעולה עם צוותים אחרים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא חושש/ת לשתף פעולה עם צוותים אחרים"
  },
  {
    id: 13,
    text: "את/ה משדר/ת נחישות גם בעת אי ודאות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משדר/ת נחישות גם בעת אי ודאות"
  },
  {
    id: 78,
    text: "את/ה מוותר/ת בקלות על עקרונות כשיש התנגדות",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מוותר/ת בקלות על עקרונות כשיש התנגדות"
  },
  {
    id: 47,
    text: "את/ה מעורר/ת השראה דרך הדוגמה האישית",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעורר/ת השראה דרך הדוגמה האישית"
  },
  {
    id: 89,
    text: "את/ה מקדם/ת הבנה הדדית בין עובדים מרקעים שונים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מקדם/ת הבנה הדדית בין עובדים מרקעים שונים"
  },
  {
    id: 40,
    text: "את/ה מרבה לשאול שאלות ליצירת שיח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מרבה לשאול שאלות ליצירת שיח"
  },
  {
    id: 42,
    text: "את/ה מזמין/ה שאלות קשות מהעובדים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מזמין/ה שאלות קשות מהעובדים"
  },
  {
    id: 62,
    text: "את/ה מבליט/ה את החשיבות האישית של כל עובד",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבליט/ה את החשיבות האישית של כל עובד"
  },
  {
    id: 44,
    text: "את/ה שואל/ת שאלות גם כשזה לא נוח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא שואל/ת שאלות גם כשזה לא נוח"
  },
  {
    id: 31,
    text: "את/ה נמנע/ת מלבחון רעיונות חדשים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא נמנע/ת מלבחון רעיונות חדשים"
  },
  {
    id: 72,
    text: "את/ה מוודא/ת שכל אחד רואה את חלקו במשימה",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מוודא/ת שכל אחד רואה את חלקו במשימה"
  },
  {
    id: 38,
    text: "את/ה לא סומך/ת על יצירתיות של אחרים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא לא סומך/ת על יצירתיות של אחרים"
  },
  {
    id: 9,
    text: "את/ה לא משתף/ת את חזונך מתוך חשש לביקורת",
    dimension: "S",
    isReversed: true,
    colleagueText: "הוא/היא לא משתף/ת את חזונו/ה מתוך חשש לביקורת"
  },
  {
    id: 34,
    text: "את/ה לא חושב/ת שלכל אחד יש ערך",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא לא חושב/ת שלכל אחד יש ערך"
  },
  {
    id: 64,
    text: "את/ה שואף/ת שכל עשייה תחולל שינוי אמיתי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף/ת שכל עשייה תחולל שינוי אמיתי"
  },
  {
    id: 80,
    text: "את/ה מתעלם/ת ממשברים אישיים של עובדים",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם/ת ממשברים אישיים של עובדים"
  },
  {
    id: 86,
    text: "את/ה חושב/ת שערכים, יושרה וכנות הם הבסיס לקשר עם העובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שערכים, יושרה וכנות הם הבסיס לקשר עם העובדים"
  },
  {
    id: 50,
    text: "את/ה מביע/ה ספק ביכולת של הארגון להצליח",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מביע/ה ספק ביכולת של הארגון להצליח"
  },
  {
    id: 57,
    text: "את/ה מעודד/ת פרשנות אישית של חזון הארגון",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת פרשנות אישית של חזון הארגון"
  },
  {
    id: 52,
    text: "את/ה נותן/ת תחושה של ביטחון ביכולת לעמוד באתגרים",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת תחושה של ביטחון ביכולת לעמוד באתגרים"
  },
  {
    id: 71,
    text: "את/ה מעודד/ת מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת מצוינות מתוך משמעות"
  },
  {
    id: 63,
    text: "את/ה מדגיש/ה שוב ושוב את הערכים המובילים של הארגון",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש/ה שוב ושוב את הערכים המובילים של הארגון"
  },
  {
    id: 56,
    text: "את/ה מדבר/ת על העתיד בצורה מעוררת השראה",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מדבר/ת על העתיד בצורה מעוררת השראה"
  },
  {
    id: 60,
    text: "את/ה מחבר/ת בין ערכים אישיים לחזון הארגוני",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מחבר/ת בין ערכים אישיים לחזון הארגוני"
  },
  {
    id: 20,
    text: "את/ה תמיד מחפש/ת את מה שבכל זאת אפשרי, גם כשיש משבר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא תמיד מחפש/ת את מה שבכל זאת אפשרי, גם כשיש משבר"
  },
  {
    id: 68,
    text: "את/ה פועל/ת ליצירת תחושת שליחות בצוות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת ליצירת תחושת שליחות בצוות"
  },
  {
    id: 48,
    text: "את/ה מספר/ת סיפור שמעורר מוטיבציה אצל הצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מספר/ת סיפור שמעורר מוטיבציה אצל הצוות"
  },
  {
    id: 46,
    text: "את/ה מתעלם/ת מהצעות לשיפור מצד אחרים",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם/ת מהצעות לשיפור מצד אחרים"
  },
  {
    id: 33,
    text: "את/ה אוהב/ת ללמוד מהשראה",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא אוהב/ת ללמוד מהשראה"
  },
  {
    id: 41,
    text: "את/ה יוזם/ת תהליכי למידה שיתופיים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא יוזם/ת תהליכי למידה שיתופיים"
  },
  {
    id: 27,
    text: "את/ה נמנע/ת מהחלטות כדי לא לטעות",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא נמנע/ת מהחלטות כדי לא לטעות"
  },
  {
    id: 16,
    text: "את/ה שונא/ת עימותים ומשברים, ומעדיף/ה להגיע להסכמות",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא שונא/ת עימותים ומשברים, ומעדיף/ה להגיע להסכמות"
  },
  {
    id: 67,
    text: "את/ה רואה בהצלחת הארגון שליחות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה בהצלחת הארגון שליחות"
  },
  {
    id: 73,
    text: "את/ה רואה ערך בהתפתחות האישית של העובדים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה ערך בהתפתחות האישית של העובדים"
  },
  {
    id: 2,
    text: "את/ה יודע/ת להוביל תכנון ארוך טווח גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יודע/ת להוביל תכנון ארוך טווח גם בעת משבר"
  },
  {
    id: 43,
    text: "את/ה משלב/ת ידע חדש בפעילות היומיומית",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא משלב/ת ידע חדש בפעילות היומיומית"
  },
  {
    id: 11,
    text: "את/ה משתף/ת את הצוות במידע קריטי",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משתף/ת את הצוות במידע קריטי"
  },
  {
    id: 59,
    text: "את/ה שם/ה דגש על תקווה ואפשרות במצבי חוסר ודאות",
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
