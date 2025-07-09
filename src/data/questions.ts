import { Question, Dimension } from "@/lib/types";

// שאלות השאלון החדש - 90 שאלות + 15 שאלות אבטיפוסים
export const questions: Question[] = [
  {
    id: 82,
    text: "אני נמנע מלבקש עזרה גם כשאני זקוק לה",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא נמנע מלבקש עזרה גם כשזקוק לה"
  },
  {
    id: 15,
    text: "אני פועל למימוש החזון על יצירת אפשרויות חדשות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא פועל למימוש החזון על יצירת אפשרויות חדשות"
  },
  {
    id: 4,
    text: "אני יוזם רפורמות כשהמציאות משתנה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יוזם רפורמות כשהמציאות משתנה"
  },
  {
    id: 36,
    text: "אני מתלהב מהאפשרות ללמוד משהו חדש",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מתלהב מהאפשרות ללמוד משהו חדש"
  },
  {
    id: 32,
    text: "אני יודע שאנשים הם שונים ומכל אחד יש מה ללמוד",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא יודע שאנשים הם שונים ומכל אחד יש מה ללמוד"
  },
  {
    id: 29,
    text: "אני מתמקד בפתרונות ולא בתירוצים",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מתמקד בפתרונות ולא בתירוצים"
  },
  {
    id: 18,
    text: "אני מסכים שלפעמים צריך להתנתק רגשית כדי לקבל החלטות נכונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מסכים שלפעמים צריך להתנתק רגשית כדי לקבל החלטות נכונות"
  },
  {
    id: 14,
    text: "אני שומר על מיקוד גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא שומר על מיקוד גם בעת משבר"
  },
  {
    id: 70,
    text: "אני מבסס תהליכים ארגוניים על עקרונות ערכיים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבסס תהליכים ארגוניים על עקרונות ערכיים"
  },
  {
    id: 12,
    text: "אני מקשר כל תהליך לתמונה הגדולה",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מקשר כל תהליך לתמונה הגדולה"
  },
  {
    id: 76,
    text: "אני מייחס חשיבות לקשר אישי עם עובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מייחס חשיבות לקשר אישי עם עובדים"
  },
  {
    id: 55,
    text: "אני נוהג לציין הצלחות קטנות בדרך ליעד",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נוהג לציין הצלחות קטנות בדרך ליעד"
  },
  {
    id: 5,
    text: "אני מוודא שכל משימה תורמת לחזון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מוודא שכל משימה תורמת לחזון"
  },
  {
    id: 88,
    text: "אני נותן תחושת שייכות דרך הקשבה",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן תחושת שייכות דרך הקשבה"
  },
  {
    id: 81,
    text: "אני מראה אחריות אישית על כישלונות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מראה אחריות אישית על כישלונות"
  },
  {
    id: 28,
    text: "אני משדר נחישות גם בעת אי ודאות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא משדר נחישות גם בעת אי ודאות"
  },
  {
    id: 30,
    text: "אני מתעלם ממשימות שמחוץ להגדרתי",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם ממשימות שמחוץ להגדרתו"
  },
  {
    id: 65,
    text: "אני מעודד את הסובבים לחפש משמעות בעבודתם",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד את הסובבים לחפש משמעות בעבודתם"
  },
  {
    id: 77,
    text: "אני מאמין שהמחויבות שלי לעובד לא פחותה מהאחריות שלי לארגון",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מאמין שהמחויבות שלו לעובד לא פחותה מהאחריות שלו לארגון"
  },
  {
    id: 26,
    text: "אני רואה בכל שינוי הזדמנות לצמיחה",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא רואה בכל שינוי הזדמנות לצמיחה"
  },
  {
    id: 90,
    text: "אני נותן מקום לרגשות של אחרים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא נותן מקום לרגשות של אחרים"
  },
  {
    id: 54,
    text: "אני מאמין שכל אדם מסוגל להוביל שינוי",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מאמין שכל אדם מסוגל להוביל שינוי"
  },
  {
    id: 85,
    text: "אני מרבה להחמיא כאשר מגיע",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מרבה להחמיא כאשר מגיע"
  },
  {
    id: 58,
    text: "אני משתמש בשפה שמעוררת השראה בצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא משתמש בשפה שמעוררת השראה בצוות"
  },
  {
    id: 87,
    text: "אני מתנתק כשהאווירה קשה",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מתנתק כשהאווירה קשה"
  },
  {
    id: 1,
    text: "אני מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מרבה לבחון הנחות פעולה כדי לבדוק אם הן עדיין מתאימות"
  },
  {
    id: 21,
    text: "קשה מאוד לעבוד עם אנשים במצב של משבר שחושבים אחרת ממני",
    dimension: "A",
    isReversed: true,
    colleagueText: "קשה לו/לה מאוד לעבוד עם אנשים במצב של משבר שחושבים אחרת ממנו/ממנה"
  },
  {
    id: 45,
    text: "אני מחפש גיוון רעיוני בכל דיון",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מחפש גיוון רעיוני בכל דיון"
  },
  {
    id: 75,
    text: "אני מעודד מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד מצוינות מתוך משמעות"
  },
  {
    id: 22,
    text: "צריך לחיות מתוך מה שאפשר ולהפיק מזה את המירב",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא חושב שצריך לחיות מתוך מה שאפשר ולהפיק מזה את המירב"
  },
  {
    id: 84,
    text: "אני משתמש בדוגמאות אישיות לחיבור רגשי",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא משתמש בדוגמאות אישיות לחיבור רגשי"
  },
  {
    id: 10,
    text: "אני בונה תכנית פעולה עם גמישות מובנית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בונה תכנית פעולה עם גמישות מובנית"
  },
  {
    id: 83,
    text: "אני מקשיב לעמיתיי גם כשהם טועים",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מקשיב לעמיתיו גם כשהם טועים"
  },
  {
    id: 49,
    text: "אני מלהיב את העובדים סביב חזון משותף",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מלהיב את העובדים סביב חזון משותף"
  },
  {
    id: 61,
    text: "אני מתייחס לעשייה כמשהו שולי",
    dimension: "M",
    isReversed: true,
    colleagueText: "הוא/היא מתייחס לעשייה כמשהו שולי"
  },
  {
    id: 7,
    text: "אני מתחשב בהקשרים פוליטיים וכלכליים בתכנון",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מתחשב בהקשרים פוליטיים וכלכליים בתכנון"
  },
  {
    id: 6,
    text: "אני מפתח אסטרטגיות חלופיות לשם גמישות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא מפתח אסטרטגיות חלופיות לשם גמישות"
  },
  {
    id: 25,
    text: "אני מקדם שיתוף פעולה בין יחידות שונות",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא מקדם שיתוף פעולה בין יחידות שונות"
  },
  {
    id: 79,
    text: "אני פועל תמיד מתוך שקיפות",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא פועל תמיד מתוך שקיפות"
  },
  {
    id: 23,
    text: "אני מחשיב את עצמי כאדם אופטימי, אם כי במשבר קשה מאוד להתנהג כך",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מחשיב את עצמו כאדם אופטימי, עם כי במשבר קשה מאוד להתנהג כך"
  },
  {
    id: 51,
    text: "אני מאמין שהמעשים הם מה שקובע ולא הדיבורים",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מאמין שהמעשים הם מה שקובע ולא הדיבורים"
  },
  {
    id: 39,
    text: "אני מקפיד על עדכון הידע האישי דרך קריאה ומפגשים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מקפיד על עדכון הידע האישי דרך קריאה ומפגשים"
  },
  {
    id: 17,
    text: "אני חושב שמשבר מסכן את הארגון וצריך להימנע ממנו ככל האפשר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא חושב שמשבר מסכן את הארגון וצריך להימנע ממנו ככל האפשר"
  },
  {
    id: 3,
    text: "אני מתעקש רק על הדרך שלי, גם כשיש חלופות",
    dimension: "S",
    isReversed: true,
    colleagueText: "הוא/היא מתעקש רק על הדרך שלו, גם כשיש חלופות"
  },
  {
    id: 74,
    text: "אני פועל תמיד למען טוב משותף",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל תמיד למען טוב משותף"
  },
  {
    id: 35,
    text: "אני אוהב ללמוד עם אנשים כמוני",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא אוהב ללמוד עם אנשים כמוהו"
  },
  {
    id: 8,
    text: "אני בודק נתונים לפני קבלת החלטה אסטרטגית",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא בודק נתונים לפני קבלת החלטה אסטרטגית"
  },
  {
    id: 53,
    text: "אני דוחה הצעות שמאיימות על מעמדי",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא דוחה הצעות שמאיימות על מעמדו"
  },
  {
    id: 69,
    text: "אני מדגיש את ערך התרומה החברתית של הפעילות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש את ערך התרומה החברתית של הפעילות"
  },
  {
    id: 66,
    text: "אני שואף שכל עובד ירגיש חלק ממסע אישי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף שכל עובד ירגיש חלק ממסע אישי"
  },
  {
    id: 19,
    text: "אני מאמין שבעת משבר אני צריך בעיקר לסמוך על עצמי",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא מאמין שבעת משבר הוא צריך בעיקר לסמוך על עצמו"
  },
  {
    id: 24,
    text: "כשיש משבר אני שואף לפתור אותו מהר",
    dimension: "A",
    isReversed: false,
    colleagueText: "כשיש משבר הוא/היא שואף לפתור אותו מהר"
  },
  {
    id: 37,
    text: "אני חושש לשתף פעולה עם צוותים אחרים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא חושש לשתף פעולה עם צוותים אחרים"
  },
  {
    id: 13,
    text: "אני משדר נחישות גם בעת אי ודאות",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משדר נחישות גם בעת אי ודאות"
  },
  {
    id: 78,
    text: "אני מוותר בקלות על עקרונות כשיש התנגדות",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מוותר בקלות על עקרונות כשיש התנגדות"
  },
  {
    id: 47,
    text: "אני מעורר השראה דרך הדוגמה האישית",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעורר השראה דרך הדוגמה האישית"
  },
  {
    id: 89,
    text: "אני מקדם הבנה הדדית בין עובדים מרקעים שונים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא מקדם הבנה הדדית בין עובדים מרקעים שונים"
  },
  {
    id: 40,
    text: "אני מרבה לשאול שאלות ליצירת שיח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מרבה לשאול שאלות ליצירת שיח"
  },
  {
    id: 42,
    text: "אני מזמין שאלות קשות מהעובדים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא מזמין שאלות קשות מהעובדים"
  },
  {
    id: 62,
    text: "אני מבליט את החשיבות האישית של כל עובד",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מבליט את החשיבות האישית של כל עובד"
  },
  {
    id: 44,
    text: "אני שואל שאלות גם כשזה לא נוח",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא שואל שאלות גם כשזה לא נוח"
  },
  {
    id: 31,
    text: "אני נמנע מלבחון רעיונות חדשים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא נמנע מלבחון רעיונות חדשים"
  },
  {
    id: 72,
    text: "אני מוודא שכל אחד רואה את חלקו במשימה",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מוודא שכל אחד רואה את חלקו במשימה"
  },
  {
    id: 38,
    text: "אני לא סומך על יצירתיות של אחרים",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא לא סומך על יצירתיות של אחרים"
  },
  {
    id: 9,
    text: "אני לא משתף את חזוני מתוך חשש לביקורת",
    dimension: "S",
    isReversed: true,
    colleagueText: "הוא/היא לא משתף את חזונו מתוך חשש לביקורת"
  },
  {
    id: 34,
    text: "אני לא חושב שלכל אחד יש ערך",
    dimension: "L",
    isReversed: true,
    colleagueText: "הוא/היא לא חושב שלכל אחד יש ערך"
  },
  {
    id: 64,
    text: "אני שואף שכל עשייה תחולל שינוי אמיתי",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא שואף שכל עשייה תחולל שינוי אמיתי"
  },
  {
    id: 80,
    text: "אני מתעלם ממשברים אישיים של עובדים",
    dimension: "A2",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם ממשברים אישיים של עובדים"
  },
  {
    id: 86,
    text: "אני חושב שערכים, יושרה וכנות הם הבסיס לקשר עם העובדים",
    dimension: "A2",
    isReversed: false,
    colleagueText: "הוא/היא חושב שערכים, יושרה וכנות הם הבסיס לקשר עם העובדים"
  },
  {
    id: 50,
    text: "אני מביע ספק ביכולת של הארגון להצליח",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מביע ספק ביכולת של הארגון להצליח"
  },
  {
    id: 57,
    text: "אני מעודד פרשנות אישית של חזון הארגון",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מעודד פרשנות אישית של חזון הארגון"
  },
  {
    id: 52,
    text: "אני נותן תחושה של ביטחון ביכולת לעמוד באתגרים",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא נותן תחושה של ביטחון ביכולת לעמוד באתגרים"
  },
  {
    id: 71,
    text: "אני מעודד מצוינות מתוך משמעות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מעודד מצוינות מתוך משמעות"
  },
  {
    id: 63,
    text: "אני מדגיש שוב ושוב את הערכים המובילים של הארגון",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא מדגיש שוב ושוב את הערכים המובילים של הארגון"
  },
  {
    id: 56,
    text: "אני מדבר על העתיד בצורה מעוררת השראה",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מדבר על העתיד בצורה מעוררת השראה"
  },
  {
    id: 60,
    text: "אני מחבר בין ערכים אישיים לחזון הארגוני",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מחבר בין ערכים אישיים לחזון הארגוני"
  },
  {
    id: 20,
    text: "אני תמיד מחפש את מה שבכל זאת אפשרי, גם כשיש משבר",
    dimension: "A",
    isReversed: false,
    colleagueText: "הוא/היא תמיד מחפש את מה שבכל זאת אפשרי, גם כשיש משבר"
  },
  {
    id: 68,
    text: "אני פועל ליצירת תחושת שליחות בצוות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא פועל ליצירת תחושת שליחות בצוות"
  },
  {
    id: 48,
    text: "אני מספר סיפור שמעורר מוטיבציה אצל הצוות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא מספר סיפור שמעורר מוטיבציה אצל הצוות"
  },
  {
    id: 46,
    text: "אני מתעלם מהצעות לשיפור מצד אחרים",
    dimension: "I",
    isReversed: true,
    colleagueText: "הוא/היא מתעלם מהצעות לשיפור מצד אחרים"
  },
  {
    id: 33,
    text: "אני אוהב ללמוד מהשראה",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא אוהב ללמוד מהשראה"
  },
  {
    id: 41,
    text: "אני יוזם תהליכי למידה שיתופיים",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא יוזם תהליכי למידה שיתופיים"
  },
  {
    id: 27,
    text: "אני נמנע מהחלטות כדי לא לטעות",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא נמנע מהחלטות כדי לא לטעות"
  },
  {
    id: 16,
    text: "אני שונא עימותים ומשברים, ומעדיף להגיע להסכמות",
    dimension: "A",
    isReversed: true,
    colleagueText: "הוא/היא שונא עימותים ומשברים, ומעדיף להגיע להסכמות"
  },
  {
    id: 67,
    text: "אני רואה בהצלחת הארגון שליחות",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה בהצלחת הארגון שליחות"
  },
  {
    id: 73,
    text: "אני רואה ערך בהתפתחות האישית של העובדים",
    dimension: "M",
    isReversed: false,
    colleagueText: "הוא/היא רואה ערך בהתפתחות האישית של העובדים"
  },
  {
    id: 2,
    text: "אני יודע להוביל תכנון ארוך טווח גם בעת משבר",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא יודע להוביל תכנון ארוך טווח גם בעת משבר"
  },
  {
    id: 43,
    text: "אני משלב ידע חדש בפעילות היומיומית",
    dimension: "L",
    isReversed: false,
    colleagueText: "הוא/היא משלב ידע חדש בפעילות היומיומית"
  },
  {
    id: 11,
    text: "אני משתף את הצוות במידע קריטי",
    dimension: "S",
    isReversed: false,
    colleagueText: "הוא/היא משתף את הצוות במידע קריטי"
  },
  {
    id: 59,
    text: "אני שם דגש על תקווה ואפשרות במצבי חוסר ודאות",
    dimension: "I",
    isReversed: false,
    colleagueText: "הוא/היא שם דגש על תקווה ואפשרות במצבי חוסר ודאות"
  },
  // שאלות אבטיפוסי מנהיגות חדשות (91-105)
  {
    id: 91,
    text: "כשמתרחש שינוי פתאומי, אני משתדל לחשוב איך הוא משתלב עם הכיוון האסטרטגי שלנו.",
    dimension: "SA", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "כשמתרחש שינוי פתאומי, הוא/היא משתדל לחשוב איך הוא משתלב עם הכיוון האסטרטגי שלהם.",
    archetype: "מנהל ההזדמנות",
    meaning: "תגובה אסטרטגית לשינוי"
  },
  {
    id: 92,
    text: "אני מנסה להבין מה משמעותי לכל אדם בצוות כדי לאפשר לו לפרוח.",
    dimension: "AM", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "הוא/היא מנסה להבין מה משמעותי לכל אדם בצוות כדי לאפשר לו לפרוח.",
    archetype: "המנהל המעצים",
    meaning: "התאמה אישית למקורות משמעות"
  },
  {
    id: 93,
    text: "רעיונות חדשים מעוררים בי התלהבות גם אם הם עדיין לא פרקטיים.",
    dimension: "LI", // Learning + Inspiration
    isReversed: false,
    colleagueText: "רעיונות חדשים מעוררים בו/בה התלהבות גם אם הם עדיין לא פרקטיים.",
    archetype: "המנהל הסקרן",
    meaning: "פתיחות לרעיונות ראשוניים"
  },
  {
    id: 94,
    text: "גם כשיש לחץ מיידי, אני שואל את עצמי אם אנחנו לא מפספסים את התמונה הגדולה.",
    dimension: "SA", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "גם כשיש לחץ מיידי, הוא/היא שואל את עצמו אם הם לא מפספסים את התמונה הגדולה.",
    archetype: "מנהל ההזדמנות",
    meaning: "חשיבה אסטרטגית תחת לחץ"
  },
  {
    id: 95,
    text: "בעיניי, מנהיגות טובה נבחנת ביכולת לגעת באנשים, לא רק בתוצאות.",
    dimension: "AM", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "בעיניו/בעיניה, מנהיגות טובה נבחנת ביכולת לגעת באנשים, לא רק בתוצאות.",
    archetype: "המנהל המעצים",
    meaning: "חיבור אישי כמפתח להובלה"
  },
  {
    id: 96,
    text: "כשאני לומד משהו חדש, אני מיד מדמיין איך זה יכול להלהיב את הצוות.",
    dimension: "LI", // Learning + Inspiration
    isReversed: false,
    colleagueText: "כשהוא/היא לומד משהו חדש, הוא/היא מיד מדמיין איך זה יכול להלהיב את הצוות.",
    archetype: "המנהל הסקרן",
    meaning: "הפיכת למידה למוטיבציה קבוצתית"
  },
  {
    id: 97,
    text: "אני יודע לזהות הזדמנויות שנובעות מתוך כאוס או חוסר ודאות.",
    dimension: "SA", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "הוא/היא יודע לזהות הזדמנויות שנובעות מתוך כאוס או חוסר ודאות.",
    archetype: "מנהל ההזדמנות",
    meaning: "זיהוי תבניות בתוך אי-בהירות"
  },
  {
    id: 98,
    text: "אני משתדל להפוך חוויות למקור השראה ללמידה ולא רק למידע.",
    dimension: "LI", // Learning + Inspiration
    isReversed: false,
    colleagueText: "הוא/היא משתדל להפוך חוויות למקור השראה ללמידה ולא רק למידע.",
    archetype: "המנהל הסקרן",
    meaning: "למידה מבוססת חוויה"
  },
  {
    id: 99,
    text: "חשוב לי להוביל מתוך חיבור אישי, גם אם זה דורש להיחשף.",
    dimension: "AM", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "חשוב לו/לה להוביל מתוך חיבור אישי, גם אם זה דורש להיחשף.",
    archetype: "המנהל המעצים",
    meaning: "מנהיגות אותנטית וחשופה"
  },
  {
    id: 100,
    text: "אני מרבה לשאול שאלות גם כשאין לי תשובה ברורה.",
    dimension: "LI", // Learning + Inspiration
    isReversed: false,
    colleagueText: "הוא/היא מרבה לשאול שאלות גם כשאין לו תשובה ברורה.",
    archetype: "המנהל הסקרן",
    meaning: "סקרנות פעילה"
  },
  {
    id: 101,
    text: "אני נוהג לשנות את אופן הפעולה תוך כדי תנועה, כל עוד זה משרת את המטרה הרחבה.",
    dimension: "SA", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "הוא/היא נוהג לשנות את אופן הפעולה תוך כדי תנועה, כל עוד זה משרת את המטרה הרחבה.",
    archetype: "מנהל ההזדמנות",
    meaning: "גמישות מבוססת חזון"
  },
  {
    id: 102,
    text: "אני מתמודד עם החלטות מורכבות תוך שמירה על נאמנות לעצמי.",
    dimension: "AM", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "הוא/היא מתמודד עם החלטות מורכבות תוך שמירה על נאמנות לעצמו.",
    archetype: "המנהל המעצים",
    meaning: "נאמנות פנימית בקבלת החלטות"
  },
  {
    id: 103,
    text: "אני מוכן להשהות תגובה מהירה אם זה יאפשר לי לזהות מגמה עמוקה יותר.",
    dimension: "SA", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "הוא/היא מוכן להשהות תגובה מהירה אם זה יאפשר לו לזהות מגמה עמוקה יותר.",
    archetype: "מנהל ההזדמנות",
    meaning: "סבלנות אסטרטגית"
  },
  {
    id: 104,
    text: "אני מחפש דרכים להפוך משימות שגרתיות למשמעותיות עבור אחרים.",
    dimension: "AM", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "הוא/היא מחפש דרכים להפוך משימות שגרתיות למשמעותיות עבור אחרים.",
    archetype: "המנהל המעצים",
    meaning: "הענקת משמעות דרך עשייה יומיומית"
  },
  {
    id: 105,
    text: "אני אוהב לבחון דפוסים חוזרים ולשאול מה עוד אפשר לראות מתחת לפני השטח.",
    dimension: "LI", // Learning + Inspiration
    isReversed: false,
    colleagueText: "הוא/היא אוהב לבחון דפוסים חוזרים ולשאול מה עוד אפשר לראות מתחת לפני השטח.",
    archetype: "המנהל הסקרן",
    meaning: "חשיבה מעמיקה וביקורתית"
  }
];

// מיפוי השאלות לממדים
export const dimensionMapping: Record<number, { dimension: Dimension; isReversed: boolean }> = {};

questions.forEach(question => {
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
  },
  SA: {
    title: "אסטרטגיה + אדפטיביות",
    description: "שילוב חשיבה אסטרטגית עם גמישות ויכולת הסתגלות"
  },
  AM: {
    title: "אותנטיות + משמעות", 
    description: "שילוב כנות אישית עם יצירת תחושת תכלית ומשמעות"
  },
  LI: {
    title: "למידה + השראה",
    description: "שילוב סקרנות ולמידה עם יכולת להוביל ולהניע אחרים"
  }
};

// מידע על האבטיפוסים
export const archetypeInfo = {
  "מנהל ההזדמנות": {
    title: "מנהל ההזדמנות",
    description: "מנהיג שיודע לזהות ולנצל הזדמנויות בתוך שינוי ואי-ודאות",
    dimensions: ["SA"] // Strategy + Adaptive
  },
  "המנהל המעצים": {
    title: "המנהל המעצים", 
    description: "מנהיג שמתמקד בהעצמת אחרים ויצירת משמעות אישית",
    dimensions: ["AM"] // Authenticity + Meaning
  },
  "המנהל הסקרן": {
    title: "המנהל הסקרן",
    description: "מנהיג שמוביל דרך למידה מתמדת והפיכתה למקור השראה",
    dimensions: ["LI"] // Learning + Inspiration
  }
};
