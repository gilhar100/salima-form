import { Question, Dimension } from "@/lib/types";
import { archetypeQuestions } from "./archetypeQuestions";

// שאלות השאלון החדש - 90 שאלות
export const coreQuestions: Question[] = [
  {
    id: 1,
    text: "אני מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות"
  },
  {
    id: 2,
    text: "אני יודע/ת להוביל תכנון ארוך טווח גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יודע/ת להוביל תכנון ארוך טווח גם בעת משבר"
  },
  {
    id: 3,
    text: "אני מתעקש/ת רק על הדרך שלי, גם כשיש חלופות",
    dimension: "S",
    isReversed: true,
    colleagueText: "הוא/היא מתעקש/ת רק על הדרך שלו/ה, גם כשיש חלופות"
  },
  {
    id: 4,
    text: "אני יוזם/ת רפורמות כשהמציאות משתנה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יוזם/ת רפורמות כשהמציאות משתנה"
  },
  {
    id: 5,
    text: "אני מוודא/ת שכל משימה תורמת לחזון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מוודא/ת שכל משימה תורמת לחזון"
  },
  {
    id: 6,
    text: "אני מפתח/ת אסטרטגיות חלופיות לשם גמישות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מפתח/ת אסטרטגיות חלופיות לשם גמישות"
  },
  {
    id: 7,
    text: "אני מתחשב/ת בהקשרים פוליטיים וכלכליים בתכנון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מתחשב/ת בהקשרים פוליטיים וכלכליים בתכנון"
  },
  {
    id: 8,
    text: "אני בודק/ת נתונים לפני קבלת החלטה אסטרטגית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בודק/ת נתונים לפני קבלת החלטה אסטרטגית"
  },
  {
    id: 9,
    text: "אני לא משתף/ת את חזוני מתוך חשש לביקורת",
    dimension: "S",
    isReversed: true,
    colleagueText: "הוא/היא לא משתף/ת את חזונו/ה מתוך חשש לביקורת"
  },
  {
    id: 10,
    text: "אני בונה תכנית פעולה עם גמישות מובנית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בונה תכנית פעולה עם גמישות מובנית"
  },
  {
    id: 11,
    text: "אני משתף/ת את הצוות במידע קריטי",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משתף/ת את הצוות במידע קריטי"
  },
  {
    id: 12,
    text: "אני מקשר/ת כל תהליך לתמונה הגדולה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מקשר/ת כל תהליך לתמונה הגדולה"
  },
  {
    id: 13,
    text: "אני משדר/ת נחישות גם בעת אי ודאות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משדר/ת נחישות גם בעת אי ודאות"
  },
  {
    id: 14,
    text: "אני שומר/ת על מיקוד גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא שומר/ת על מיקוד גם בעת משבר"
  },
  {
    id: 15,
    text: "אני פועל/ת למימוש החזון על יצירת אפשרויות חדשות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת למימוש החזון על יצירת אפשרויות חדשות"
  },
  {
    id: 16,
    text: "אני שונא/ת עימותים ומשברים, ומעדיף/ה להגיע להסכמות",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא שונא/ת עימותים ומשברים, ומעדיף/ה להגיע להסכמות"
  },
  {
    id: 17,
    text: "אני חושב/ת שמשבר מסכן את הארגון וצריך להימנע ממנו ככל האפשר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שמשבר מסכן את הארגון וצריך להימנע ממנו ככל האפשר"
  },
  {
    id: 18,
    text: "אני מסכים/ה שלפעמים צריך להתנתק רגשית כדי לקבל החלטות נכונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מסכים/ה שלפעמים צריך להתנתק רגשית כדי לקבל החלטות נכונות"
  },
  {
    id: 19,
    text: "אני מאמין/ה שבעת משבר אני צריך/ה בעיקר לסמוך על עצמי",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מאמין/ה שבעת משבר הוא/היא צריך/ה בעיקר לסמוך על עצמו/ה"
  },
  {
    id: 20,
    text: "אני תמיד מחפש/ת את מה שבכל זאת אפשרי, גם כשיש משבר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא תמיד מחפש/ת את מה שבכל זאת אפשרי, גם כשיש משבר"
  },
  {
    id: 21,
    text: "קשה מאוד לי לעבוד עם אנשים במצב של משבר שחושבים אחרת ממני",
    dimension: "A",
    isReversed: true,
    colleagueText: "קשה לו/לה מאוד לעבוד עם אנשים במצב של משבר שחושבים אחרת ממנו/ממנה"
  },
  {
    id: 22,
    text: "צריך לחיות מתוך מה שאפשר ולהפיק מזה את המירב",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שצריך לחיות מתוך מה שאפשר ולהפיק מזה את המירב"
  },
  {
    id: 23,
    text: "אני מחשיב/ה את עצמי כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מחשיב/ה את עצמו/ה כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך"
  },
  {
    id: 24,
    text: "כשיש משבר אני שואף/ת לפתור אותו מהר",
    dimension: "A",
    isReversed: false,
    colleagueText: "כשיש משבר הוא/היא שואף/ת לפתור אותו מהר"
  },
  {
    id: 25,
    text: "אני מקדם/ת שיתוף פעולה בין יחידות שונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מקדם/ת שיתוף פעולה בין יחידות שונות"
  },
  {
    id: 26,
    text: "אני רואה בכל שינוי הזדמנות לצמיחה",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא רואה בכל שינוי הזדמנות לצמיחה"
  },
  {
    id: 27,
    text: "אני נמנע/ת מהחלטות כדי לא לטעות",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא נמנע/ת מהחלטות כדי לא לטעות"
  },
  {
    id: 28,
    text: "אני משדר/ת נחישות גם בעת אי ודאות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא משדר/ת נחישות גם בעת אי ודאות"
  },
  {
    id: 29,
    text: "אני מתמקד/ת בפתרונות ולא בתירוצים",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מתמקד/ת בפתרונות ולא בתירוצים"
  },
  {
    id: 30,
    text: "אני מתעלם/ת ממשימות שמחוץ להגדרתי",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם/ת ממשימות שמחוץ להגדרתו/ה"
  },
  {
    id: 31,
    text: "אני נמנע/ת מלבחון רעיונות חדשים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא נמנע/ת מלבחון רעיונות חדשים"
  },
  {
    id: 32,
    text: "אני יודע/ת שאנשים הם שונים ומכל אחד יש מה ללמוד",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא יודע/ת שאנשים הם שונים ומכל אחד יש מה ללמוד"
  },
  {
    id: 33,
    text: "אני אוהב/ת ללמוד מהשראה",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא אוהב/ת ללמוד מהשראה"
  },
  {
    id: 34,
    text: "אני לא חושב/ת שלכל אחד יש ערך",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא לא חושב/ת שלכל אחד יש ערך"
  },
  {
    id: 35,
    text: "אני אוהב/ת ללמוד עם אנשים כמוני",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא אוהב/ת ללמוד עם אנשים כמוהו/ה"
  },
  {
    id: 36,
    text: "אני מתלהב/ת מהאפשרות ללמוד משהו חדש",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מתלהב/ת מהאפשרות ללמוד משהו חדש"
  },
  {
    id: 37,
    text: "אני חושש/ת לשתף פעולה עם צוותים אחרים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא חושש/ת לשתף פעולה עם צוותים אחרים"
  },
  {
    id: 38,
    text: "אני לא סומך/ת על יצירתיות של אחרים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא לא סומך/ת על יצירתיות של אחרים"
  },
  {
    id: 39,
    text: "אני מקפיד/ה על עדכון הידע האישי דרך קריאה ומפגשים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מקפיד/ה על עדכון הידע האישי דרך קריאה ומפגשים"
  },
  {
    id: 40,
    text: "אני מרבה לשאול שאלות ליצירת שיח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מרבה לשאול שאלות ליצירת שיח"
  },
  {
    id: 41,
    text: "אני יוזם/ת תהליכי למידה שיתופיים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא יוזם/ת תהליכי למידה שיתופיים"
  },
  {
    id: 42,
    text: "אני מזמין/ה שאלות קשות מהעובדים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מזמין/ה שאלות קשות מהעובדים"
  },
  {
    id: 43,
    text: "אני משלב/ת ידע חדש בפעילות היומיומית",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא משלב/ת ידע חדש בפעילות היומיומית"
  },
  {
    id: 44,
    text: "אני שואל/ת שאלות גם כשזה לא נוח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא שואל/ת שאלות גם כשזה לא נוח"
  },
  {
    id: 45,
    text: "אני מחפש/ת גיוון רעיוני בכל דיון",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מחפש/ת גיוון רעיוני בכל דיון"
  },
  {
    id: 46,
    text: "אני מתעלם/ת מהצעות לשיפור מצד אחרים",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם/ת מהצעות לשיפור מצד אחרים"
  },
  {
    id: 47,
    text: "אני מעורר/ת השראה דרך הדוגמה האישית",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעורר/ת השראה דרך הדוגמה האישית"
  },
  {
    id: 48,
    text: "אני מספר/ת סיפור שמעורר מוטיבציה אצל הצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מספר/ת סיפור שמעורר מוטיבציה אצל הצוות"
  },
  {
    id: 49,
    text: "אני מלהיב/ה את העובדים סביב חזון משותף",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מלהיב/ה את העובדים סביב חזון משותף"
  },
  {
    id: 50,
    text: "אני מביע/ה ספק ביכולת של הארגון להצליח",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מביע/ה ספק ביכולת של הארגון להצליח"
  },
  {
    id: 51,
    text: "אני מאמין/ה שהמעשים הם מה שקובע ולא הדיבורים",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מאמין/ה שהמעשים הם מה שקובע ולא הדיבורים"
  },
  {
    id: 52,
    text: "אני נותן/ת תחושה של ביטחון ביכולת לעמוד באתגרים",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת תחושה של ביטחון ביכולת לעמוד באתגרים"
  },
  {
    id: 53,
    text: "אני דוחה הצעות שמאיימות על מעמדי",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא דוחה הצעות שמאיימות על מעמדו/ה"
  },
  {
    id: 54,
    text: "אני מאמין/ה שכל אדם מסוגל להוביל שינוי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה שכל אדם מסוגל להוביל שינוי"
  },
  {
    id: 55,
    text: "אני נוהג/ת לציין הצלחות קטנות בדרך ליעד",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נוהג/ת לציין הצלחות קטנות בדרך ליעד"
  },
  {
    id: 56,
    text: "אני מדבר/ת על העתיד בצורה מעוררת השראה",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מדבר/ת על העתיד בצורה מעוררת השראה"
  },
  {
    id: 57,
    text: "אני מעודד/ת פרשנות אישית של חזון הארגון",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת פרשנות אישית של חזון הארגון"
  },
  {
    id: 58,
    text: "אני משתמש/ת בשפה שמעוררת השראה בצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא משתמש/ת בשפה שמעוררת השראה בצוות"
  },
  {
    id: 59,
    text: "אני שם/ה דגש על תקווה ואפשרות במצבי חוסר ודאות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא שם/ה דגש על תקווה ואפשרות במצבי חוסר ודאות"
  },
  {
    id: 60,
    text: "אני מחבר/ת בין ערכים אישיים לחזון הארגוני",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מחבר/ת בין ערכים אישיים לחזון הארגוני"
  },
  {
    id: 61,
    text: "אני מתייחס/ת לעשייה כמשהו שולי",
    dimension: "M",
    isReversed: true,
    colleagueText: "הוא/היא מתייחס/ת לעשייה כמשהו שולי"
  },
  {
    id: 62,
    text: "אני מבליט/ה את החשיבות האישית של כל עובד",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבליט/ה את החשיבות האישית של כל עובד"
  },
  {
    id: 63,
    text: "אני מדגיש/ה שוב ושוב את הערכים המובילים של הארגון",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש/ה שוב ושוב את הערכים המובילים של הארגון"
  },
  {
    id: 64,
    text: "אני שואף/ת שכל עשייה תחולל שינוי אמיתי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף/ת שכל עשייה תחולל שינוי אמיתי"
  },
  {
    id: 65,
    text: "אני מעודד/ת את הסובבים לחפש משמעות בעבודתם",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת את הסובבים לחפש משמעות בעבודתם"
  },
  {
    id: 66,
    text: "אני שואף/ת שכל עובד ירגיש חלק ממסע אישי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף/ת שכל עובד ירגיש חלק ממסע אישי"
  },
  {
    id: 67,
    text: "אני רואה בהצלחת הארגון שליחות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה בהצלחת הארגון שליחות"
  },
  {
    id: 68,
    text: "אני פועל/ת ליצירת תחושת שליחות בצוות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת ליצירת תחושת שליחות בצוות"
  },
  {
    id: 69,
    text: "אני מדגיש/ה את ערך התרומה החברתית של הפעילות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש/ה את ערך התרומה החברתית של הפעילות"
  },
  {
    id: 70,
    text: "אני מבסס/ת תהליכים ארגוניים על עקרונות ערכיים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבסס/ת תהליכים ארגוניים על עקרונות ערכיים"
  },
  {
    id: 71,
    text: "אני מעודד/ת מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת מצוינות מתוך משמעות"
  },
  {
    id: 72,
    text: "אני מוודא/ת שכל אחד רואה את חלקו במשימה",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מוודא/ת שכל אחד רואה את חלקו במשימה"
  },
  {
    id: 73,
    text: "אני רואה ערך בהתפתחות האישית של העובדים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה ערך בהתפתחות האישית של העובדים"
  },
  {
    id: 74,
    text: "אני פועל/ת תמיד למען טוב משותף",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת תמיד למען טוב משותף"
  },
  {
    id: 75,
    text: "אני מעודד/ת מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד/ת מצוינות מתוך משמעות"
  },
  {
    id: 76,
    text: "אני מייחס/ת חשיבות לקשר אישי עם עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מייחס/ת חשיבות לקשר אישי עם עובדים"
  },
  {
    id: 77,
    text: "אני מאמין/ה שהמחויבות שלי לעובד לא פחותה מהאחריות שלי לארגון",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מאמין/ה שהמחויבות שלו/ה לעובד לא פחותה מהאחריות שלו/ה לארגון"
  },
  {
    id: 78,
    text: "אני מוותר/ת בקלות על עקרונות כשיש התנגדות",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מוותר/ת בקלות על עקרונות כשיש התנגדות"
  },
  {
    id: 79,
    text: "אני פועל/ת תמיד מתוך שקיפות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא פועל/ת תמיד מתוך שקיפות"
  },
  {
    id: 80,
    text: "אני מתעלם/ת ממשברים אישיים של עובדים",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם/ת ממשברים אישיים של עובדים"
  },
  {
    id: 81,
    text: "אני מראה אחריות אישית על כישלונות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מראה אחריות אישית על כישלונות"
  },
  {
    id: 82,
    text: "אני נמנע/ת מלבקש עזרה גם כשאני זקוק/ה לה",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא נמנע/ת מלבקש עזרה גם כשזקוק/ה לה"
  },
  {
    id: 83,
    text: "אני מקשיב/ה לעמיתיי גם כשהם טועים",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מקשיב/ה לעמיתיו/ה גם כשהם טועים"
  },
  {
    id: 84,
    text: "אני משתמש/ת בדוגמאות אישיות לחיבור רגשי",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא משתמש/ת בדוגמאות אישיות לחיבור רגשי"
  },
  {
    id: 85,
    text: "אני מרבה להחמיא כאשר מגיע",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מרבה להחמיא כאשר מגיע"
  },
  {
    id: 86,
    text: "אני חושב/ת שערכים, יושרה וכנות הם הבסיס לקשר עם העובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא חושב/ת שערכים, יושרה וכנות הם הבסיס לקשר עם העובדים"
  },
  {
    id: 87,
    text: "אני מתנתק/ת כשהאווירה קשה",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מתנתק/ת כשהאווירה קשה"
  },
  {
    id: 88,
    text: "אני נותן/ת תחושת שייכות דרך הקשבה",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת תחושת שייכות דרך הקשבה"
  },
  {
    id: 89,
    text: "אני מקדם/ת הבנה הדדית בין עובדים מרקעים שונים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מקדם/ת הבנה הדדית בין עובדים מרקעים שונים"
  },
  {
    id: 90,
    text: "אני נותן/ת מקום לרגשות של אחרים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן/ת מקום לרגשות של אחרים"
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
