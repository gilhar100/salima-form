
// מחולל פסקאות מקיף עם דגש על איכות וטבעיות
export interface ParameterSummary {
  dimension: string;
  title: string;
  paragraph: string;
  tone: 'balanced' | 'positive' | 'developmental';
  genderForm: 'masculine' | 'feminine' | 'neutral';
}

// פסקאות ייחוס מאוזנות לכל פרמטר
export const referenceParagraphs = {
  S: [
    "את/ה בוחנ/ת את הנחות הפעולה שלך באופן ביקורתי וניכר כי יש לך יכולת לזהות מתי נדרש עדכון. יחד עם זאת, ייתכן שהחזון הארגוני איננו ברור דיו או שאינו מועבר בצורה מספקת. קיימת מגמה חיובית של התנהלות גמישה מול שינויים, אך ללא שפה ארגונית משותפת, קשה להוציא את התגובה לפועל.",
    "ניכרת יכולת חשיבה אסטרטגית מפותחת, ואת/ה מתמצא/ת היטב בזיהוי הזדמנויות עסקיות. עם זאת, רצוי לחזק את הקשר בין הרמה האסטרטגית לביצוע היומיומי, כדי שהחזון יתורגם לפעולות קונקרטיות בצורה יעילה יותר.",
    "את/ה מציג/ה הבנה טובה של הסביבה העסקית ומגלה יכולת לחשיבה ארוכת טווח. יחד עם זאת, חשוב לשפר את התקשורת האסטרטגית כלפי הצוות, כדי שכולם יהיו מחוברים לכיוון הכללי ויוכלו לתרום לביצועו."
  ],
  L: [
    "לעיתים עשויה להופיע הסתייגות מרעיונות חדשים או סקרנות מוגבלת, אך ניכר כי את/ה מתאמץ/ת להקשיב לעובדים וללמוד מהם. השקעה בלמידה מתמדת וחקירה מעודכנת תורמת לך ולעובדים ומקדמת זיהוי הזדמנויות חדשניות.",
    "ניכרת פתיחות ללמידה וסקרנות טבעית, אך ייתכן שקיים פער בין הרצון ללמוד לבין היישום הפרקטי של הידע החדש. חשוב לפתח מנגנונים שיאפשרו תרגום של תובנות ללמידה ארגונית רחבה יותר.",
    "את/ה מגלה רצון ללמידה ופיתוח אישי, ומעודד/ת גם אחרים לעשות כן. עם זאת, רצוי להקפיד על למידה שיטתית ומובנית, כדי שהידע החדש יוכל להשפיע באופן מהותי על איכות העבודה והתוצאות."
  ],
  I: [
    "את/ה משדר/ת תחושת ביטחון עצמי שמחזקת את האמון של הסובבים ביכולתך להוביל שינוי. עם זאת, רצוי להשקיע יותר ביצירת תחושת שותפות והשראה אצל העובדים, דרך טיפוח יחסים בלתי פורמליים וחיזוק המחויבות לחזון המשותף.",
    "ניכרת יכולת להניע ולהוביל, ואת/ה מצליח/ה להעביר אנרגיה חיובית לסביבה. יחד עם זאת, חשוב להמשיך ולפתח כלים להשראה ארוכת טווח, כדי שהמוטיבציה תהיה עמידה גם בתקופות מאתגרות.",
    "את/ה מגלה כריזמה טבעית ויכולת להשפיע על אחרים באופן חיובי. עם זאת, רצוי לחזק את הקשר האישי עם חברי הצוות, כדי שההשראה תהיה אותנטית ומבוססת על הכרה אמיתית של הצרכים והשאיפות שלהם."
  ],
  M: [
    "ניכר כי את/ה מנחיל/ה תחושת משמעות דרך העשייה שלך ומעודד/ת פיתוח אישי וערכי בסביבתך. עבודתך אינה משרתת רק את האינטרס האישי, אלא גם תורמת לצמיחה של העובדים והארגון כולו.",
    "את/ה מדגיש/ה את החשיבות של המטרה הרחבה ומצליח/ה לחבר בין העבודה היומיומית לערכים גבוהים יותר. עם זאת, חשוב להמשיך ולחזק את הקשר בין המשמעות האישית של כל עובד לבין המטרות הארגוניות.",
    "ניכרת מחויבות עמוקה לערכים ולמטרות המשמעותיות, ואת/ה מעביר/ה זאת בצורה אותנטית לסביבה. יחד עם זאת, רצוי להקפיד על תרגום המשמעות לפעולות קונקרטיות, כדי שהערכים לא יישארו רק ברמה הרעיונית."
  ],
  A: [
    "את/ה מגלה גמישות ופתיחות לרעיונות ממקורות לא צפויים, ומשדר/ת ביטחון ביכולתך לעמוד ביעדים. עם זאת, ייתכן שקיימת לעיתים היסוס במעבר מפתיחות ליישום בפועל, מה שעשוי להאט תהליכי שינוי.",
    "ניכרת יכולת הסתגלות טובה לשינויים ופתיחות לרעיונות חדשים. עם זאת, חשוב לפתח מנגנונים לקבלת החלטות מהירה יותר, כדי שהגמישות תתורגם גם ליעילות ביישום.",
    "את/ה מתמודד/ת היטב עם אי-ודאות ומגלה יכולת להתאים את הגישה לפי הנסיבות המשתנות. יחד עם זאת, רצוי לשמור על עקביות מסוימת בערכים ובכיוונים המרכזיים, כדי שהגמישות לא תפגע ביציבות הצוות."
  ],
  A2: [
    "ניכר כי את/ה מגלה אמפתיה ויכולת בין-אישית גבוהה, המקדמות סביבת עבודה תומכת ובריאה. עם זאת, חשוב לשדר בהירות סביב מטרותיך וצרכיך — כך שהסובבים יוכלו לתמוך בך באופן מיטבי בעת משבר או שינוי.",
    "את/ה מביע/ה את עצמך באופן אותנטי ומגלה אמינות גבוהה ביחסים. עם זאת, רצוי להקפיד על שקיפות רבה יותר בתקשורת, כדי שהאמון יהיה מבוסס על הבנה בהירה של הכוונות והמטרות.",
    "ניכרת זהות מקצועית ברורה ועקביות בין הערכים לבין הפעולות. יחד עם זאת, חשוב להמשיך ולפתח את היכולת לבטא את המחשבות והרגשות בצורה ישירה יותר, כדי שהאותנטיות תהיה גלויה וברורה לכולם."
  ]
};

// כותרות הפרמטרים
export const dimensionTitles = {
  S: "חשיבה אסטרטגית",
  L: "למידה מתמדת", 
  I: "השראה",
  M: "משמעות",
  A: "הסתגלות",
  A2: "אותנטיות"
};

// פונקציה ליצירת פסקה מקיפה עבור פרמטר
export const generateParameterSummary = (
  dimension: string,
  itemAnalyses: string[],
  userSeed: number = Date.now(),
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): ParameterSummary => {
  
  // בחירת פסקת ייחוס על בסיס הזרע
  const referenceOptions = referenceParagraphs[dimension as keyof typeof referenceParagraphs] || [];
  if (referenceOptions.length === 0) {
    return {
      dimension,
      title: dimensionTitles[dimension as keyof typeof dimensionTitles] || dimension,
      paragraph: "הניתוח עבור פרמטר זה זמין בקרוב.",
      tone: 'balanced',
      genderForm: genderHint
    };
  }

  // בחירת פסקה על בסיס הזרע
  const selectedIndex = userSeed % referenceOptions.length;
  let baseParagraph = referenceOptions[selectedIndex];

  // יצירת וריאציה עדינה בפסקה
  const variedParagraph = createParagraphVariation(baseParagraph, userSeed, genderHint);

  // זיהוי טון הפסקה
  const tone = identifyParagraphTone(variedParagraph);

  return {
    dimension,
    title: dimensionTitles[dimension as keyof typeof dimensionTitles] || dimension,
    paragraph: variedParagraph,
    tone,
    genderForm: genderHint
  };
};

// פונקציה ליצירת וריאציה עדינה בפסקה
const createParagraphVariation = (
  baseParagraph: string,
  seed: number,
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string => {
  
  let result = baseParagraph;

  // וריאציות עדינות בפתיחות
  const openingVariations = [
    { from: "את/ה בוחנ/ת", to: "ניכר כי את/ה בוחנ/ת" },
    { from: "ניכר כי את/ה", to: "את/ה" },
    { from: "לעיתים עשויה להופיע", to: "ייתכן שקיימת לעיתים" },
    { from: "ניכרת יכולת", to: "את/ה מגלה יכולת" }
  ];

  // וריאציות במחברים
  const connectorVariations = [
    { from: "יחד עם זאת,", to: "עם זאת," },
    { from: "עם זאת,", to: "יחד עם זאת," },
    { from: "אך ניכר כי", to: "ומתברר כי" },
    { from: "ייתכן ש", to: "עשוי להיות ש" }
  ];

  // החלת וריאציות על בסיס הזרע
  const variationIndex = seed % openingVariations.length;
  const connectorIndex = (seed + 1) % connectorVariations.length;

  // החלת וריאציית פתיחה
  const openingVar = openingVariations[variationIndex];
  if (result.includes(openingVar.from)) {
    result = result.replace(openingVar.from, openingVar.to);
  }

  // החלת וריאציית מחבר
  const connectorVar = connectorVariations[connectorIndex];
  if (result.includes(connectorVar.from)) {
    result = result.replace(connectorVar.from, connectorVar.to);
  }

  // התאמת מגדר
  result = adaptGenderInParagraph(result, genderHint);

  return result;
};

// פונקציה להתאמת מגדר בפסקה
const adaptGenderInParagraph = (
  text: string,
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string => {
  
  if (genderHint === 'neutral') return text;

  let result = text;

  const genderAdaptations = {
    masculine: {
      "את/ה": "אתה",
      "מתאמץ/ת": "מתאמץ",
      "בוחנ/ת": "בוחן", 
      "מגלה/ה": "מגלה",
      "מציג/ה": "מציג",
      "משדר/ת": "משדר",
      "מצליח/ה": "מצליח",
      "מעודד/ת": "מעודד",
      "מנחיל/ה": "מנחיל",
      "מדגיש/ה": "מדגיש",
      "מעביר/ה": "מעביר",
      "מתמודד/ת": "מתמודד",
      "מביע/ה": "מביע"
    },
    feminine: {
      "את/ה": "את",
      "מתאמץ/ת": "מתאמצת",
      "בוחנ/ת": "בוחנת",
      "מגלה/ה": "מגלה", 
      "מציג/ה": "מציגה",
      "משדר/ת": "משדרת",
      "מצליח/ה": "מצליחה",
      "מעודד/ת": "מעודדת",
      "מנחיל/ה": "מנחילה",
      "מדגיש/ה": "מדגישה",
      "מעביר/ה": "מעבירה",
      "מתמודד/ת": "מתמודדת",
      "מביע/ה": "מביעה"
    }
  };

  const adaptations = genderAdaptations[genderHint];
  Object.entries(adaptations).forEach(([neutral, gendered]) => {
    const regex = new RegExp(neutral.replace(/[/()]/g, '\\$&'), 'g');
    result = result.replace(regex, gendered);
  });

  return result;
};

// פונקציה לזיהוי טון הפסקה
const identifyParagraphTone = (paragraph: string): 'balanced' | 'positive' | 'developmental' => {
  const developmentalKeywords = ["רצוי", "חשוב", "כדאי", "ייתכן", "עשוי", "פער", "היסוס"];
  const positiveKeywords = ["מפותח", "טוב", "גבוהה", "חזק", "מצליח", "יעיל"];
  
  const hasDevelopmental = developmentalKeywords.some(keyword => paragraph.includes(keyword));
  const hasPositive = positiveKeywords.some(keyword => paragraph.includes(keyword));
  
  if (hasDevelopmental && hasPositive) return 'balanced';
  if (hasDevelopmental) return 'developmental';
  if (hasPositive) return 'positive';
  
  return 'balanced';
};

// פונקציה ליצירת כל הפסקאות עבור התוצאות
export const generateAllParameterSummaries = (
  dimensionAnswers: Record<string, { questionId: number; value: number }[]>,
  userSeed: number = Date.now(),
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): ParameterSummary[] => {
  
  const summaries: ParameterSummary[] = [];
  
  Object.keys(dimensionTitles).forEach((dimension, index) => {
    const answers = dimensionAnswers[dimension] || [];
    const dimensionSeed = userSeed + index * 1000; // זרע ייחודי לכל פרמטר
    
    // יצירת רשימת ניתוחים למקרה שנרצה אותם בעתיד
    const itemAnalyses: string[] = [];
    
    const summary = generateParameterSummary(
      dimension,
      itemAnalyses,
      dimensionSeed,
      genderHint
    );
    
    summaries.push(summary);
  });
  
  return summaries;
};

// פונקציה לקבלת פסקה עבור פרמטר ספציפי
export const getParameterParagraph = (
  dimension: string,
  userSeed: number = Date.now(),
  genderHint: 'masculine' | 'feminine' | 'neutral' = 'neutral'
): string => {
  
  const summary = generateParameterSummary(dimension, [], userSeed, genderHint);
  return summary.paragraph;
};
