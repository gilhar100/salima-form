
import { questions } from "@/data/questions";
import { getAdjustedValue } from "@/lib/calculations";

// פונקציה להערכת רמת הביצוע עם תיאורים מפורטים
export const evaluateDimensionLevel = (score: number) => {
  if (score >= 4.5) return {
    level: "מצוין",
    description: "ביצוע יוצא דופן ומעולה",
    percentage: 100
  };
  if (score >= 3.7) return {
    level: "גבוה",
    description: "ביצוע טוב עם פוטנציאל להמשך פיתוח",
    percentage: 80
  };
  if (score >= 2.7) return {
    level: "בינוני",
    description: "ביצוע סביר עם מקום משמעותי לשיפור",
    percentage: 60
  };
  if (score >= 1.7) return {
    level: "נמוך",
    description: "זקוק לפיתוח וחיזוק מיידי",
    percentage: 40
  };
  return {
    level: "נמוך מאוד",
    description: "דורש התערבות מיידית ופיתוח מעמיק",
    percentage: 20
  };
};

// פונקציה לקבלת עוצמת צבע בהתאם לציון
export const getColorIntensity = (score: number, baseColors: any) => {
  const normalizedScore = Math.max(0, Math.min(5, score)) / 5; // נרמול לטווח 0-1
  
  if (normalizedScore >= 0.9) return baseColors.strongest;
  if (normalizedScore >= 0.75) return baseColors.strong;
  if (normalizedScore >= 0.55) return baseColors.medium;
  if (normalizedScore >= 0.35) return baseColors.weak;
  return baseColors.weakest;
};

// פונקציה מחודשת לקבלת המלצות מפורטות כולל הכרה בחוזקות
export const getPersonalizedAnalysis = (dimension: string, answers: { questionId: number; value: number }[]) => {
  // מציאת השאלות עם הציונים הגבוהים ביותר (4 או 5)
  const highScoreQuestions = answers
    .filter(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return false;
      
      const adjustedValue = getAdjustedValue(answer.value, question.isReversed);
      return adjustedValue >= 4;
    })
    .map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        text: question?.text || "",
        adjustedValue: getAdjustedValue(answer.value, question?.isReversed || false)
      };
    })
    .sort((a, b) => b.adjustedValue - a.adjustedValue)
    .slice(0, 3); // לקחת את 3 השאלות עם הציונים הגבוהים ביותר

  // מציאת השאלות עם הציונים הנמוכים ביותר (1, 2 או 3)
  const lowScoreQuestions = answers
    .filter(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return false;
      
      const adjustedValue = getAdjustedValue(answer.value, question.isReversed);
      return adjustedValue <= 3;
    })
    .map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        text: question?.text || "",
        adjustedValue: getAdjustedValue(answer.value, question?.isReversed || false)
      };
    })
    .sort((a, b) => a.adjustedValue - b.adjustedValue)
    .slice(0, 3); // לקחת את 3 השאלות עם הציונים הנמוכים ביותר

  let analysis = "";

  // הכרה בחוזקות
  if (highScoreQuestions.length > 0) {
    analysis += "**נקודות החוזקה שלך:**\n\n";
    highScoreQuestions.forEach((item, index) => {
      analysis += `${index + 1}. **${getStrengthRecognition(item.text, dimension)}**\n`;
    });
    analysis += "\n";
  }

  // המלצות לשיפור
  if (lowScoreQuestions.length > 0) {
    analysis += "**תחומים לפיתוח והשבחה:**\n\n";
    lowScoreQuestions.forEach((item, index) => {
      analysis += `${index + 1}. **${getSpecificRecommendation(item.text, dimension)}**\n`;
    });
  } else {
    analysis += "**תחומים לפיתוח והעמקה:**\n\n";
    analysis += "הביצועים בממד זה מצוינים! עכשיו זה הזמן להעמיק ולהנחות אחרים:\n";
    analysis += "• שתף את הידע והניסיון שלך עם חברי הצוות\n";
    analysis += "• הפוך למנטור בתחום זה עבור עמיתים\n";
    analysis += "• חפש דרכים חדשניות להוביל בתחום זה\n";
  }

  analysis += `\n**תכנית פעולה מומלצת:**\n${getActionPlan(dimension, lowScoreQuestions, highScoreQuestions)}`;
  
  return analysis;
};

// פונקציה חדשה להכרה בחוזקות
const getStrengthRecognition = (questionText: string, dimension: string): string => {
  const strengthKeywords = {
    'אסטרטג': [
      { keyword: 'הנחות פעולה', recognition: 'אתה מצוין בבחינת הנחות יסוד - זוהי יכולת חשובה שמבדילה מנהיגים אסטרטגיים' },
      { keyword: 'חזון', recognition: 'יש לך יכולת מעולה לפתח ולתקשר חזון - כישור מפתח של מנהיגות אסטרטגית' },
      { keyword: 'תכנון ארוך טווח', recognition: 'החשיבה הארוכת טווח שלך מצוינת - זה מאפיין מנהיגים אסטרטגיים מוצלחים' },
      { keyword: 'משבר', recognition: 'יש לך יכולת חזקה לקבל החלטות במצבי לחץ - כישור קריטי למנהיגות' },
      { keyword: 'רפורמות', recognition: 'אתה מוכן ומסוגל לנהל שינויים - זוהי חוזקה אסטרטגית חשובה' }
    ],
    'לומד': [
      { keyword: 'רעיונות חדשים', recognition: 'הפתיחות שלך לרעיונות חדשים מעולה - זה מאפיין מנהיגים לומדים' },
      { keyword: 'למידה', recognition: 'המחויבות שלך ללמידה רצינית מרשימה - זה הבסיס למנהיגות מתפתחת' },
      { keyword: 'שאלות', recognition: 'היכולת שלך לשאול שאלות חשובות מצוינת - זה מניע צמיחה וחדשנות' },
      { keyword: 'שיתוף פעולה', recognition: 'אתה יוצר סביבה של למידה משותפת - כישור מפתח למנהיגות' },
      { keyword: 'כישלונות', recognition: 'הגישה שלך ללמידה מכישלונות מעוררת השראה - זה מבדיל מנהיגים אמיתיים' }
    ],
    'השראה': [
      { keyword: 'השראה', recognition: 'יש לך יכולת טבעית להעניק השראה - זוהי חוזקה מרכזית במנהיגות' },
      { keyword: 'דוגמה', recognition: 'אתה מהווה דוגמה אישית מעוררת השראה - זה הבסיס למנהיגות אותנטית' },
      { keyword: 'מוטיבציה', recognition: 'היכולת שלך להניע אנשים מרשימה - כישור מפתח במנהיגות' },
      { keyword: 'מלהיב', recognition: 'יש לך כריזמה וכושר להלהיב - זה מאפיין מנהיגים מעוררי השראה' },
      { keyword: 'ביטחון', recognition: 'אתה מצליח לבנות ביטחון באנשים - זוהי יכולת יקרת ערך במנהיגות' }
    ],
    'משמעות': [
      { keyword: 'משמעות', recognition: 'אתה מצוין ביצירת תחושת משמעות - זה מניע מוטיבציה עמוקה' },
      { keyword: 'ערכים', recognition: 'המחויבות שלך לערכים ברורה וחזקה - זה יוצר אמינות ואמון' },
      { keyword: 'שליחות', recognition: 'יש לך תחושת שליחות חזקה - זה מדבק ומניע את הסביבה' },
      { keyword: 'פיתוח', recognition: 'ההשקעה שלך בפיתוח אנשים מרשימה - זוהי חוזקה מנהיגותית חשובה' },
      { keyword: 'שינוי אמיתי', recognition: 'אתה מחובר למטרות גדולות - זה מאפיין מנהיגות משמעותית' }
    ],
    'אדפטיבי': [
      { keyword: 'שינויים', recognition: 'הגמישות שלך מול שינויים מעולה - זה מאפיין מנהיגות מתקדמת' },
      { keyword: 'שיתוף', recognition: 'אתה מעורב אחרים בקבלת החלטות - זה יוצר מחויבות וחדשנות' },
      { keyword: 'הקשבה', recognition: 'כישורי ההקשבה שלך מצוינים - זה בסיס למנהיגות רגישה' },
      { keyword: 'שיתוף פעולה', recognition: 'אתה מעולה ביצירת שיתופי פעולה - כישור קריטי במנהיגות מודרנית' },
      { keyword: 'גמישות', recognition: 'הגמישות המחשבתית שלך מרשימה - זה מאפשר חדשנות והסתגלות' }
    ],
    'אותנטיות': [
      { keyword: 'שקיפות', recognition: 'השקיפות שלך יוצרת אמון - זוהי חוזקה מנהיגותית יסודית' },
      { keyword: 'אחריות', recognition: 'נטילת האחריות שלך מעוררת כבוד - זה מאפיין מנהיגות אמינה' },
      { keyword: 'עקרונות', recognition: 'העמידה שלך על עקרונות יוצרת יציבות - זוהי חוזקה אותנטית' },
      { keyword: 'סיפור אישי', recognition: 'הנכונות שלך להיות אישי יוצרת קשר - זה מאפיין מנהיגות אנושית' },
      { keyword: 'רגשות', recognition: 'הרגישות הרגשית שלך מעוררת הערכה - זוהי יכולת מנהיגותית חשובה' }
    ]
  };

  const dimensionKeywords = strengthKeywords[dimension as keyof typeof strengthKeywords] || [];
  
  for (const item of dimensionKeywords) {
    if (questionText.includes(item.keyword)) {
      return item.recognition;
    }
  }
  
  return 'הציון הגבוה בהיבט זה מצביע על חוזקה מנהיגותית חשובה - המשך לפתח אותה';
};

// פונקציה לקבלת המלצה ספציפית לכל שאלה
const getSpecificRecommendation = (questionText: string, dimension: string): string => {
  const keywords = {
    'אסטרטג': [
      { keyword: 'הנחות פעולה', recommendation: 'קבע זמן שבועי לבחינת הנחות יסוד ובדוק אם הן עדיין רלוונטיות' },
      { keyword: 'חזון', recommendation: 'פתח חזון ברור ותקשר אותו באופן עקבי לכל הצוות' },
      { keyword: 'תכנון ארוך טווח', recommendation: 'השקע בכלים לתכנון אסטרטגי והגדר יעדים ארוכי טווח' },
      { keyword: 'משבר', recommendation: 'פתח תכניות חירום ותרגל קבלת החלטות בלחץ' },
      { keyword: 'רפורמות', recommendation: 'למד לזהות שינויים בסביבה ויזום התאמות מהירות' }
    ],
    'לומד': [
      { keyword: 'רעיונות חדשים', recommendation: 'הקדש זמן יומי לחקר רעיונות חדשים ופתח סקרנות אינטלקטואלית' },
      { keyword: 'למידה', recommendation: 'בנה תכנית למידה אישית והצטרף לקהילות מקצועיות' },
      { keyword: 'שאלות', recommendation: 'פתח תרבות של שאלות ועודד דיאלוג פתוח עם הצוות' },
      { keyword: 'שיתוף פעולה', recommendation: 'יזום פרויקטים בין-מחלקתיים וחפש הזדמנויות ללמידה משותפת' },
      { keyword: 'כישלונות', recommendation: 'למד לראות בכישלונות הזדמנויות למידה ושתף לקחים עם הצוות' }
    ],
    'השראה': [
      { keyword: 'השראה', recommendation: 'פתח סיפור אישי משכנע ושתף אותו באופן קבוע עם הצוות' },
      { keyword: 'דוגמה', recommendation: 'היה מודל לחיקוי ופעל בהתאם לערכים שאתה מטיף להם' },
      { keyword: 'מוטיבציה', recommendation: 'למד טכניקות להנעת אנשים וחבר אותם לחזון משותף' },
      { keyword: 'מלהיב', recommendation: 'פתח כישורי תקשורת מעוררי השראה ושתף חזון חיובי על העתיד' },
      { keyword: 'ביטחון', recommendation: 'בנה ביטחון דרך הצלחות קטנות והדגש את היכולות של הצוות' }
    ],
    'משמעות': [
      { keyword: 'משמעות', recommendation: 'חבר כל משימה למטרה גדולה יותר והסבר את הערך החברתי של העבודה' },
      { keyword: 'ערכים', recommendation: 'הגדר ערכים ברורים ופעל בהתאם להם באופן עקבי' },
      { keyword: 'שליחות', recommendation: 'פתח תחושת שליחות משותפת ושתף סיפורי השפעה חיוביים' },
      { keyword: 'ETYPE', recommendation: 'השקע בפיתוח אישי של העובדים וקשר זאת למטרות הארגון' },
      { keyword: 'שינוי אמיתי', recommendation: 'הדגש את ההשפעה החיובית של העבודה על הקהילה והחברה' }
    ],
    'אדפטיבי': [
      { keyword: 'שינויים', recommendation: 'פתח גמישות מחשבתית ותרגל קבלת החלטות בתנאי אי-ודאות' },
      { keyword: 'שיתוף', recommendation: 'שלב את הצוות בתהליכי קבלת החלטות וערך דיונים פתוחים' },
      { keyword: 'הקשבה', recommendation: 'פתח כישורי הקשבה פעילה ותן מקום לדעות שונות' },
      { keyword: 'שיתוף פעולה', recommendation: 'בנה גשרים בין יחידות שונות ועודד עבודת צוות' },
      { keyword: 'גמישות', recommendation: 'למד לזהות מתי נדרש שינוי כיוון ופעל במהירות' }
    ],
    'אותנטיות': [
      { keyword: 'שקיפות', recommendation: 'פעל בשקיפות מלאה ושתף מידע רלוונטי עם הצוות' },
      { keyword: 'אחריות', recommendation: 'קח אחריות אישית על כישלונות ושתף לקחים שלמדת' },
      { keyword: 'עקרונות', recommendation: 'הגדר עקרונות ברורים ועמד עליהם גם בזמנים קשים' },
      { keyword: 'סיפור אישי', recommendation: 'שתף סיפורים אישיים לחיזוק הקשר עם הצוות' },
      { keyword: 'רגשות', recommendation: 'הכר ברגשות של אחרים והראה אמפתיה אמיתית' }
    ]
  };

  const dimensionKeywords = keywords[dimension as keyof typeof keywords] || [];
  
  for (const item of dimensionKeywords) {
    if (questionText.includes(item.keyword)) {
      return item.recommendation;
    }
  }
  
  return 'עבוד על פיתוח היבט זה באופן ממוקד עם מנטור או קורס מקצועי';
};

// פונקציה מעודכנת לקבלת תכנית פעולה
const getActionPlan = (dimension: string, lowScoreQuestions: any[], highScoreQuestions: any[]): string => {
  const actionPlans = {
    'S': highScoreQuestions.length > 0 
      ? 'בנה על החוזקות האסטרטגיות שלך: שתף את החזון עם צוותים נוספים, הנח פרויקטים אסטרטגיים, ופתח את היכולות התכנוניות בתחומים הזקוקים לחיזוק.'
      : 'התחל בבניית תכנית אסטרטגית רבעונית, קיים פגישות חזון חודשיות, והתרגל ניתוח סביבה עסקית.',
    'L': highScoreQuestions.length > 0
      ? 'נצל את התשוקה שלך ללמידה: הפוך למנטור למידה לעמיתים, יזום קהילות למידה בארגון, ושתף ידע בתחומים שפחות מפותחים.'
      : 'הקדש 30 דקות יומיות ללמידה, הצטרף לקהילה מקצועית, ובקש משוב שוטף מעמיתים.',
    'I': highScoreQuestions.length > 0
      ? 'בנה על הכושר המעורר השראה שלך: הנח צוותים נוספים, פתח תכניות מנטורינג, והעמק את ההשפעה בתחומים הזקוקים לחיזוק.'
      : 'פתח סיפור אישי, תרגל נאומים קצרים, וחפש הזדמנויות להנחות אחרים.',
    'M': highScoreQuestions.length > 0
      ? 'החבר את יכולתך ליצור משמעות: הובל פרויקטים משמעותיים, פתח תכניות פיתוח עובדים, והעמק את החיבור לערכים בתחומים הזקוקים לכך.'
      : 'הגדר את הערכים האישיים, קשר משימות למטרות גדולות, וארגן דיונים על משמעות העבודה.',
    'A': highScoreQuestions.length > 0
      ? 'נצל את הגמישות שלך: הוב תהליכי שינוי, בנה גשרים בין יחידות, והעמק את השיתוף בתחומים הזקוקים לפיתוח.'
      : 'תרגל חשיבה יצירתית, חפש הזדמנויות לשיתוף פעולה, ופתח סובלנות לאי-ודאות.',
    'A2': highScoreQuestions.length > 0
      ? 'בנה על האותנטיות שלך: הפוך למודל לחיקוי בתחומים נוספים, שתף סיפורים אישיים להשראה, והעמק את האמינות בכל ההיבטים.'
      : 'עבוד על מודעות עצמית, תרגל שיתוף אישי מבוקר, ובנה אמון דרך עקביות.'
  };
  
  return actionPlans[dimension as keyof typeof actionPlans] || 'פתח תכנית פעולה אישית עם יעדים ברורים ומדידים.';
};
