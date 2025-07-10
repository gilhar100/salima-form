import { Question } from "@/lib/types";

// Archetype questions (91-105) - separate from core SLIMA questions
export const archetypeQuestions: Question[] = [
  {
    id: 91,
    text: "כשמתרחש שינוי פתאומי, אני משתדל/ת לחשוב איך הוא משתלב עם הכיוון האסטרטגי שלנו",
    dimension: "S", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "כשמתרחש שינוי פתאומי, הוא/היא משתדל/ת לחשוב איך הוא משתלב עם הכיוון האסטרטגי שלכם"
  },
  {
    id: 92,
    text: "אני מנסה להבין מה משמעותי לכל אדם בצוות כדי לאפשר לו לפרוח",
    dimension: "A2", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "הוא/היא מנסה להבין מה משמעותי לכל אדם בצוות כדי לאפשר לו לפרוח"
  },
  {
    id: 93,
    text: "רעיונות חדשים מעוררים בי התלהבות גם אם הם עדיין לא פרקטיים",
    dimension: "L", // Learning + Inspiration
    isReversed: false,
    colleagueText: "רעיונות חדשים מעוררים בו/בה התלהבות גם אם הם עדיין לא פרקטיים"
  },
  {
    id: 94,
    text: "גם כשיש לחץ מיידי, אני שואל/ת את עצמי אם אנחנו לא מפספסים את התמונה הגדולה",
    dimension: "S", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "גם כשיש לחץ מיידי, הוא/היא שואל/ת את עצמו/ה אם אתם לא מפספסים את התמונה הגדולה"
  },
  {
    id: 95,
    text: "בעיניי, מנהיגות טובה נבחנת ביכולת לגעת באנשים, לא רק בתוצאות",
    dimension: "A2", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "בעיניו/בעיניה, מנהיגות טובה נבחנת ביכולת לגעת באנשים, לא רק בתוצאות"
  },
  {
    id: 96,
    text: "כשאני לומד/ת משהו חדש, אני מיד מדמיין/ה איך זה יכול להלהיב את הצוות",
    dimension: "L", // Learning + Inspiration
    isReversed: false,
    colleagueText: "כשהוא/היא לומד/ת משהו חדש, הוא/היא מיד מדמיין/ה איך זה יכול להלהיב את הצוות"
  },
  {
    id: 97,
    text: "אני יודע/ת לזהות הזדמנויות שנובעות מתוך כאוס או חוסר ודאות",
    dimension: "S", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "הוא/היא יודע/ת לזהות הזדמנויות שנובעות מתוך כאוס או חוסר ודאות"
  },
  {
    id: 98,
    text: "אני משתדל/ת להפוך חוויות למקור השראה ללמידה ולא רק למידע",
    dimension: "L", // Learning + Inspiration
    isReversed: false,
    colleagueText: "הוא/היא משתדל/ת להפוך חוויות למקור השראה ללמידה ולא רק למידע"
  },
  {
    id: 99,
    text: "חשוב לי להוביל מתוך חיבור אישי, גם אם זה דורש להיחשף",
    dimension: "A2", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "חשוב לו/לה להוביל מתוך חיבור אישי, גם אם זה דורש להיחשף"
  },
  {
    id: 100,
    text: "אני מרבה לשאול שאלות גם כשאין לי תשובה ברורה",
    dimension: "L", // Learning + Inspiration
    isReversed: false,
    colleagueText: "הוא/היא מרבה לשאול שאלות גם כשאין לו/לה תשובה ברורה"
  },
  {
    id: 101,
    text: "אני נוהג/ת לשנות את אופן הפעולה תוך כדי תנועה, כל עוד זה משרת את המטרה הרחבה",
    dimension: "S", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "הוא/היא נוהג/ת לשנות את אופן הפעולה תוך כדי תנועה, כל עוד זה משרת את המטרה הרחבה"
  },
  {
    id: 102,
    text: "אני מתמודד/ת עם החלטות מורכבות תוך שמירה על נאמנות לעצמי",
    dimension: "A2", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "הוא/היא מתמודד/ת עם החלטות מורכבות תוך שמירה על נאמנות לעצמו/לעצמה"
  },
  {
    id: 103,
    text: "אני מוכן/ה להשהות תגובה מהירה אם זה יאפשר לי לזהות מגמה עמוקה יותר",
    dimension: "S", // Strategy + Adaptive
    isReversed: false,
    colleagueText: "הוא/היא מוכן/ה להשהות תגובה מהירה אם זה יאפשר לו/לה לזהות מגמה עמוקה יותר"
  },
  {
    id: 104,
    text: "אני מחפש/ת דרכים להפוך משימות שגרתיות למשמעותיות עבור אחרים",
    dimension: "A2", // Authenticity + Meaning
    isReversed: false,
    colleagueText: "הוא/היא מחפש/ת דרכים להפוך משימות שגרתיות למשמעותיות עבור אחרים"
  },
  {
    id: 105,
    text: "אני אוהב/ת לבחון דפוסים חוזרים ולשאול מה עוד אפשר לראות מתחת לפני השטח",
    dimension: "L", // Learning + Inspiration
    isReversed: false,
    colleagueText: "הוא/היא אוהב/ת לבחון דפוסים חוזרים ולשאול מה עוד אפשר לראות מתחת לפני השטח"
  }
];

// Archetype metadata for mapping questions to their archetype information
export const archetypeMetadata = {
  91: { archetype: "מנהל ההזדמנות", meaning: "תגובה אסטרטגית לשינוי", dimensions: "Strategy + Adaptive" },
  92: { archetype: "המנהל המעצים", meaning: "התאמה אישית למקורות משמעות", dimensions: "Authenticity + Meaning" },
  93: { archetype: "המנהל הסקרן", meaning: "פתיחות לרעיונות ראשוניים", dimensions: "Learning + Inspiration" },
  94: { archetype: "מנהל ההזדמנות", meaning: "חשיבה אסטרטגית תחת לחץ", dimensions: "Strategy + Adaptive" },
  95: { archetype: "המנהל המעצים", meaning: "חיבור אישי כמפתח להובלה", dimensions: "Authenticity + Meaning" },
  96: { archetype: "המנהל הסקרן", meaning: "הפיכת למידה למוטיבציה קבוצתית", dimensions: "Learning + Inspiration" },
  97: { archetype: "מנהל ההזדמנות", meaning: "זיהוי תבניות בתוך אי-בהירות", dimensions: "Strategy + Adaptive" },
  98: { archetype: "המנהל הסקרן", meaning: "למידה מבוססת חוויה", dimensions: "Learning + Inspiration" },
  99: { archetype: "המנהל המעצים", meaning: "מנהיגות אותנטית וחשופה", dimensions: "Authenticity + Meaning" },
  100: { archetype: "המנהל הסקרן", meaning: "סקרנות פעילה", dimensions: "Learning + Inspiration" },
  101: { archetype: "מנהל ההזדמנות", meaning: "גמישות מבוססת חזון", dimensions: "Strategy + Adaptive" },
  102: { archetype: "המנהל המעצים", meaning: "נאמנות פנימית בקבלת החלטות", dimensions: "Authenticity + Meaning" },
  103: { archetype: "מנהל ההזדמנות", meaning: "סבלנות אסטרטגית", dimensions: "Strategy + Adaptive" },
  104: { archetype: "המנהל המעצים", meaning: "הענקת משמעות דרך עשייה יומיומית", dimensions: "Authenticity + Meaning" },
  105: { archetype: "המנהל הסקרן", meaning: "חשיבה מעמיקה וביקורתית", dimensions: "Learning + Inspiration" }
};
