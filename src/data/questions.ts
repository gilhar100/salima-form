import { Question, Dimension } from "@/lib/types";
import { archetypeQuestions } from "./archetypeQuestions";

// שאלות השאלון החדש - 90 שאלות
export const coreQuestions: Question[] = [
  {
    id: 1,
    text: "אני פונה לבקש עזרה כשאני זקוק לה",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא פונה לבקש עזרה כשהוא זקוק לה"
  },
  {
    id: 2,
    text: "אני פועל למימוש החזון על יצירת אפשרויות חדשות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא פועל למימוש החזון על יצירת אפשרויות חדשות"
  },
  {
    id: 3,
    text: "אני יוזם רפורמות כשהמציאות משתנה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא יוזם רפורמות כשהמציאות משתנה"
  },
  {
    id: 4,
    text: "אני מתלהב מהאפשרות ללמוד משהו חדש",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא מתלהב מהאפשרות ללמוד משהו חדש"
  },
  {
    id: 5,
    text: "לדעתי אנשים הם שונים ומכל אחד יש מה ללמוד",
    dimension: "L",
    isReversed: false,
    colleagueText: "לדעתו אנשים הם שונים ומכל אחד יש מה ללמוד"
  },
  {
    id: 6,
    text: "אני משתדל להתמקד בפתרונות ולא בתירוצים",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא משתדל להתמקד בפתרונות ולא בתירוצים"
  },
  {
    id: 7,
    text: "אני רואה הזדמנות במצבים של חוסר ודאות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא רואה הזדמנות במצבים של חוסר ודאות"
  },
  {
    id: 8,
    text: "אני ממקד אחרים לתוכניות העתיד גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא ממקד אחרים לתוכניות העתיד גם בעת משבר"
  },
  {
    id: 9,
    text: "אני מבסס תהליכים ארגוניים על עקרונות ערכיים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מבסס תהליכים ארגוניים על עקרונות ערכיים"
  },
  {
    id: 10,
    text: "אני מקשר כל תהליך לתמונה הגדולה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא מקשר כל תהליך לתמונה הגדולה"
  },
  {
    id: 11,
    text: "אני מייחס חשיבות לקשר אישי עם עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא מייחס חשיבות לקשר אישי עם עובדים"
  },
  {
    id: 12,
    text: "אני נוהג לציין הצלחות קטנות בדרך ליעד",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא נוהג לציין הצלחות קטנות בדרך ליעד"
  },
  {
    id: 13,
    text: "אני מוודא שכל משימה תורמת לחזון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא מוודא שכל משימה תורמת לחזון"
  },
  {
    id: 14,
    text: "אני נותן תחושת שייכות דרך הקשבה",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא נותן תחושת שייכות דרך הקשבה"
  },
  {
    id: 15,
    text: "אני מראה אחריות אישית על כישלונות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא מראה אחריות אישית על כישלונות"
  },
  {
    id: 16,
    text: "אני משדר נחישות גם בעת אי ודאות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא משדר נחישות גם בעת אי ודאות"
  },
  {
    id: 17,
    text: "אני מתמקד במשימות גם אם הן מחוץ לתחום הגדרתי",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא מתמקד במשימות גם אם הן מחוץ לתחום הגדרתו"
  },
  {
    id: 18,
    text: "אני מעודד את הסובבים לחפש משמעות בעבודתם",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מעודד את הסובבים לחפש משמעות בעבודתם"
  },
  {
    id: 19,
    text: "אני מאמין שהמחויבות שלי לעובד חשובה באותה המידה כמו המחויבות שלי לארגון",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא מאמין שהמחויבות שלו לעובד חשובה באותה המידה כמו המחויבות שלו לארגון"
  },
  {
    id: 20,
    text: "אני רואה בכל שינוי הזדמנות לצמיחה",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא רואה בכל שינוי הזדמנות לצמיחה"
  },
  {
    id: 21,
    text: "אני נותן מקום לרגשות של אחרים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא נותן מקום לרגשות של אחרים"
  },
  {
    id: 22,
    text: "אני מאמין שכל אדם מסוגל להוביל שינוי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מאמין שכל אדם מסוגל להוביל שינוי"
  },
  {
    id: 23,
    text: "אני מרבה להחמיא כאשר מגיע",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא מרבה להחמיא כאשר מגיע"
  },
  {
    id: 24,
    text: "אני משתמש בשפה שמעוררת השראה בצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא משתמש בשפה שמעוררת השראה בצוות"
  },
  {
    id: 25,
    text: "אני מתנתק כשהאווירה קשה",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא מתנתק כשהאווירה קשה"
  },
  {
    id: 26,
    text: "אני מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות"
  },
  {
    id: 27,
    text: "במצבי משבר אני מעדיף לעבוד עם אנשים שחושבים אחרת ממני",
    dimension: "A",
    isReversed: false,
    colleagueText: "במצבי משבר הוא מעדיף לעבוד עם אנשים שחושבים אחרת ממנו"
  },
  {
    id: 28,
    text: "אני מחפש גיוון רעיוני בכל דיון",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא מחפש גיוון רעיוני בכל דיון"
  },
  {
    id: 29,
    text: "אני מעודד מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מעודד מצוינות מתוך משמעות"
  },
  {
    id: 30,
    text: "צריך לחיות מתוך האפשר ולהפיק ממנו את המירב",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא חושב שצריך לחיות מתוך האפשר ולהפיק ממנו את המירב"
  },
  {
    id: 31,
    text: "אני משתמש בדוגמאות אישיות לחיבור רגשי",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא משתמש בדוגמאות אישיות לחיבור רגשי"
  },
  {
    id: 32,
    text: "אני בונה תכנית פעולה עם גמישות מובנית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא בונה תכנית פעולה עם גמישות מובנית"
  },
  {
    id: 33,
    text: "אני מקשיב לעמיתיי גם כשהם טועים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא מקשיב לעמיתיו גם כשהם טועים"
  },
  {
    id: 34,
    text: "אני מלהיב את העובדים סביב חזון משותף",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מלהיב את העובדים סביב חזון משותף"
  },
  {
    id: 35,
    text: "אני עוזר לאחרים למצוא כוחות ברגעי קושי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא עוזר לאחרים למצוא כוחות ברגעי קושי"
  },
  {
    id: 36,
    text: "אני מתחשב בהקשרים פוליטיים וכלכליים בתכנון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא מתחשב בהקשרים פוליטיים וכלכליים בתכנון"
  },
  {
    id: 37,
    text: "אני מפתח אסטרטגיות חלופיות לשם גמישות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא מפתח אסטרטגיות חלופיות לשם גמישות"
  },
  {
    id: 38,
    text: "אני מקדם שיתוף פעולה בין יחידות שונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא מקדם שיתוף פעולה בין יחידות שונות"
  },
  {
    id: 39,
    text: "אני פועל תמיד מתוך שקיפות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא פועל תמיד מתוך שקיפות"
  },
  {
    id: 40,
    text: "אני מחשיב את עצמי כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא מחשיב את עצמו כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך"
  },
  {
    id: 41,
    text: "אני מאמין שהמעשים הם מה שקובע ולא הדיבורים",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מאמין שהמעשים הם מה שקובע ולא הדיבורים"
  },
  {
    id: 42,
    text: "אני מקפיד על עדכון הידע האישי דרך קריאה ומפגשים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא מקפיד על עדכון הידע האישי דרך קריאה ומפגשים"
  },
  {
    id: 43,
    text: "אני רואה משברים ארגוניים כהזדמנות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא רואה משברים ארגוניים כהזדמנות"
  },
  {
    id: 44,
    text: "קל לי לשקול חלופות שאחרים מציעים לי",
    dimension: "S",
    isReversed: false,
    colleagueText: "קל לו לשקול חלופות שאחרים מציעים לו"
  },
  {
    id: 45,
    text: "אני פועל תמיד למען טוב משותף",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא פועל תמיד למען טוב משותף"
  },
  {
    id: 46,
    text: "אני אוהב שיש הרבה דעות שונות בצוות שלי",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא אוהב שיש הרבה דעות שונות בצוות שלו"
  },
  {
    id: 47,
    text: "אני בודק נתונים לפני קבלת החלטה אסטרטגית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא בודק נתונים לפני קבלת החלטה אסטרטגית"
  },
  {
    id: 48,
    text: "אני בוחן הצעות גם אם הן מאיימות על מעמדי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא בוחן הצעות גם אם הן מאיימות על מעמדו"
  },
  {
    id: 49,
    text: "אני מדגיש את ערך התרומה החברתית של הפעילות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מדגיש את ערך התרומה החברתית של הפעילות"
  },
  {
    id: 50,
    text: "אני שואף שכל עובד ירגיש חלק ממסע אישי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא שואף שכל עובד ירגיש חלק ממסע אישי"
  },
  {
    id: 51,
    text: "אני מאמין שבעת משבר צריך להישען על אחרים",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא מאמין שבעת משבר צריך להישען על אחרים"
  },
  {
    id: 52,
    text: "כשיש משבר אני שואף לפתור אותו מהר",
    dimension: "A",
    isReversed: false,
    colleagueText: "כשיש משבר הוא שואף לפתור אותו מהר"
  },
  {
    id: 53,
    text: "אני אוהב לעבוד עם צוותים אחרים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא אוהב לעבוד עם צוותים אחרים"
  },
  {
    id: 54,
    text: "אני משדר נחישות גם בעת אי ודאות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא משדר נחישות גם בעת אי ודאות"
  },
  {
    id: 55,
    text: "אני עומד על הערכים שלי מול התנגדות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא עומד על הערכים שלו מול התנגדות"
  },
  {
    id: 56,
    text: "אני מעורר השראה דרך הדוגמה האישית",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מעורר השראה דרך הדוגמה האישית"
  },
  {
    id: 57,
    text: "אני מקדם הבנה הדדית בין עובדים מרקעים שונים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא מקדם הבנה הדדית בין עובדים מרקעים שונים"
  },
  {
    id: 58,
    text: "אני מרבה לשאול שאלות ליצירת שיח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא מרבה לשאול שאלות ליצירת שיח"
  },
  {
    id: 59,
    text: "אני מזמין שאלות קשות מהעובדים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא מזמין שאלות קשות מהעובדים"
  },
  {
    id: 60,
    text: "אני מבליט את החשיבות האישית של כל עובד",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מבליט את החשיבות האישית של כל עובד"
  },
  {
    id: 61,
    text: "אני שואל שאלות גם כשזה לא מצופה ממני",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא שואל שאלות גם כשזה לא מצופה ממנו"
  },
  {
    id: 62,
    text: "אני משתמש בידע חדש לשיפור הדרך",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא משתמש בידע חדש לשיפור הדרך"
  },
  {
    id: 63,
    text: "אני מוודא שכל אחד רואה את חלקו במשימה",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מוודא שכל אחד רואה את חלקו במשימה"
  },
  {
    id: 64,
    text: "אני סומך על יצירתיות של אחרים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא סומך על יצירתיות של אחרים"
  },
  {
    id: 65,
    text: "אני משתף את החזון שלי גם כאשר יש חשש מביקורת",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא משתף את החזון שלו גם כאשר יש חשש מביקורת"
  },
  {
    id: 66,
    text: "אני חושב שלכל אחד יש ערך",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא חושב שלכל אחד יש ערך"
  },
  {
    id: 67,
    text: "אני שואף שכל עשייה תחולל שינוי אמיתי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא שואף שכל עשייה תחולל שינוי אמיתי"
  },
  {
    id: 68,
    text: "אני מעניק יחס למשברים אישיים של עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא מעניק יחס למשברים אישיים של עובדים"
  },
  {
    id: 69,
    text: "לדעתי ערכים, יושרה וכנות הם החשובים ביותר ביצירת קשר עם עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "לדעתו ערכים, יושרה וכנות הם החשובים ביותר ביצירת קשר עם עובדים"
  },
  {
    id: 70,
    text: "אני מאמין ביכולת של הארגון להצליח",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מאמין ביכולת של הארגון להצליח"
  },
  {
    id: 71,
    text: "אני מעודד פרשנות אישית של חזון הארגון",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מעודד פרשנות אישית של חזון הארגון"
  },
  {
    id: 72,
    text: "אני נותן תחושה של ביטחון ביכולת לעמוד באתגרים",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא נותן תחושה של ביטחון ביכולת לעמוד באתגרים"
  },
  {
    id: 73,
    text: "אני מעודד מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מעודד מצוינות מתוך משמעות"
  },
  {
    id: 74,
    text: "אני מדגיש שוב ושוב את הערכים המובילים של הארגון",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא מדגיש שוב ושוב את הערכים המובילים של הארגון"
  },
  {
    id: 75,
    text: "אני מדבר על העתיד בצורה מעוררת השראה",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מדבר על העתיד בצורה מעוררת השראה"
  },
  {
    id: 76,
    text: "אני מחבר בין ערכים אישיים לחזון הארגוני",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מחבר בין ערכים אישיים לחזון הארגוני"
  },
  {
    id: 77,
    text: "אני תמיד מחפש את מה שבכל זאת אפשרי, גם כשיש משבר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא תמיד מחפש את מה שבכל זאת אפשרי, גם כשיש משבר"
  },
  {
    id: 78,
    text: "אני פועל ליצירת תחושת שליחות בצוות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא פועל ליצירת תחושת שליחות בצוות"
  },
  {
    id: 79,
    text: "אני מספר סיפור שמעורר מוטיבציה אצל הצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מספר סיפור שמעורר מוטיבציה אצל הצוות"
  },
  {
    id: 80,
    text: "אני מתייחס ברצינות לרעיונות של העובדים שלי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא מתייחס ברצינות לרעיונות של העובדים שלו"
  },
  {
    id: 81,
    text: "אני אוהב ללמוד מהשראה",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא אוהב ללמוד מהשראה"
  },
  {
    id: 82,
    text: "אני יוזם תהליכי למידה שיתופיים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא יוזם תהליכי למידה שיתופיים"
  },
  {
    id: 83,
    text: "לעיתים אני מקבל החלטות קשות, גם אם יש בהן סיכון",
    dimension: "A",
    isReversed: false,
    colleagueText: "לעיתים הוא מקבל החלטות קשות, גם אם יש בהן סיכון"
  },
  {
    id: 84,
    text: "אני רואה בעימותים ומשברים כדבר חיובי",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא רואה בעימותים ומשברים כדבר חיובי"
  },
  {
    id: 85,
    text: "אני רואה בהצלחת הארגון שליחות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא רואה בהצלחת הארגון שליחות"
  },
  {
    id: 86,
    text: "אני רואה ערך בהתפתחות האישית של העובדים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא רואה ערך בהתפתחות האישית של העובדים"
  },
  {
    id: 87,
    text: "אני יודע להוביל תכנון ארוך טווח גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא יודע להוביל תכנון ארוך טווח גם בעת משבר"
  },
  {
    id: 88,
    text: "אני משלב ידע חדש בפעילות היומיומית",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא משלב ידע חדש בפעילות היומיומית"
  },
  {
    id: 89,
    text: "אני משתף את הצוות במידע קריטי",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא משתף את הצוות במידע קריטי"
  },
  {
    id: 90,
    text: "אני שם דגש על תקווה ואפשרות במצבי חוסר ודאות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא שם דגש על תקווה ואפשרות במצבי חוסר ודאות"
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
