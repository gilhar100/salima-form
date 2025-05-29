
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
    description: "",
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
  const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
  
  if (normalizedScore >= 0.9) return baseColors.strongest;
  if (normalizedScore >= 0.75) return baseColors.strong;
  if (normalizedScore >= 0.55) return baseColors.medium;
  if (normalizedScore >= 0.35) return baseColors.weak;
  return baseColors.weakest;
};

// פונקציה לניתוח מפורט של תשובות
const analyzeSpecificAnswers = (dimension: string, answers: { questionId: number; value: number }[]): string => {
  if (answers.length === 0) {
    return "לא נמצאו תשובות לניתוח מפורט.";
  }

  // מיון התשובות לפי ציון מותאם
  const sortedAnswers = answers
    .map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        text: question?.text || "",
        originalValue: answer.value,
        adjustedValue: getAdjustedValue(answer.value, question?.isReversed || false),
        isReversed: question?.isReversed || false
      };
    })
    .sort((a, b) => b.adjustedValue - a.adjustedValue);

  let analysis = "";

  // חלוקה לקטגוריות
  const strongAreas = sortedAnswers.filter(a => a.adjustedValue >= 4);
  const moderateAreas = sortedAnswers.filter(a => a.adjustedValue >= 3 && a.adjustedValue < 4);
  const developmentAreas = sortedAnswers.filter(a => a.adjustedValue < 3);

  // ניתוח התחומים החזקים
  if (strongAreas.length > 0) {
    analysis += "**תחומי חוזקה מובהקים:**\n\n";
    strongAreas.forEach((area, index) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'strength');
      analysis += `${index + 1}. **${getQuestionSummary(area.text)}** (ציון: ${area.adjustedValue})\n   ${insight}\n\n`;
    });
  }

  // ניתוח התחומים הבינוניים
  if (moderateAreas.length > 0) {
    analysis += "**תחומים בינוניים עם פוטנציאל:**\n\n";
    moderateAreas.forEach((area, index) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'moderate');
      analysis += `${index + 1}. **${getQuestionSummary(area.text)}** (ציון: ${area.adjustedValue})\n   ${insight}\n\n`;
    });
  }

  // ניתוח תחומי פיתוח
  if (developmentAreas.length > 0) {
    analysis += "**תחומים הזקוקים לפיתוח:**\n\n";
    developmentAreas.forEach((area, index) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'development');
      analysis += `${index + 1}. **${getQuestionSummary(area.text)}** (ציון: ${area.adjustedValue})\n   ${insight}\n\n`;
    });
  }

  // ניתוח כללי
  analysis += "**ניתוח כללי:**\n";
  analysis += getDimensionOverallAnalysis(dimension, sortedAnswers);

  return analysis;
};

// פונקציה לקבלת תובנה ספציפית לכל שאלה
const getSpecificInsight = (questionText: string, dimension: string, score: number, category: 'strength' | 'moderate' | 'development'): string => {
  const insights = {
    'S': {
      'הנחות פעולה': {
        strength: 'מראה יכולת מעולה לבחינה ביקורתית של הנחות יסוד ואתגור הסטטוס קוו - תכונה מרכזית של מנהיגות אסטרטגית.',
        moderate: 'יש מודעות להנחות פעולה אך ניתן לפתח עוד את היכולת לאתגר אותן באופן שיטתי.',
        development: 'חשוב לפתח יכולת זיהוי ובחינה של הנחות יסוד כבסיס לחשיבה אסטרטגית.'
      },
      'חזון': {
        strength: 'מציג יכולת חזקה לפיתוח וניסוח חזון אסטרטגי ברור - יכולת מפתח למנהיגות מעוררת השראה.',
        moderate: 'יש בסיס טוב לפיתוח חזון אך ניתן לחזק את הבהירות והכוח המניע של החזון.',
        development: 'נדרש פיתוח ביכולת ניסוח חזון אסטרטגי ברור ומעורר השראה.'
      },
      'תכנון ארוך טווח': {
        strength: 'מפגין יכולת מצוינת לחשיבה אסטרטגית ארוכת טווח ותכנון מתוחכם.',
        moderate: 'יש יכולת בסיסית לתכנון ארוך טווח אך ניתן לפתח עוד את העומק האסטרטגי.',
        development: 'חשוב לפתח כישורי תכנון אסטרטגי ויכולת ראייה ארוכת טווח.'
      }
    },
    'L': {
      'רעיונות חדשים': {
        strength: 'מפגין סקרנות אינטלקטואלית גבוהה ופתיחות מעולה לרעיונות חדשים - בסיס חזק למנהיגות לומדת.',
        moderate: 'יש פתיחות בסיסית לרעיונות חדשים אך ניתן לפתח עוד את הסקרנות האקטיבית.',
        development: 'נדרש פיתוח בפתיחות לרעיונות חדשים וסקרנות אינטלקטואלית.'
      },
      'למידה': {
        strength: 'מציג מחויבות חזקה ללמידה מתמשכת ופיתוח עצמי - תכונה מרכזית של מנהיגות מתפתחת.',
        moderate: 'יש מחויבות בסיסית ללמידה אך ניתן להעמיק את השיטתיות והעקביות.',
        development: 'חשוב לפתח תרבות למידה אישית ומחויבות לפיתוח מתמשך.'
      },
      'שאלות': {
        strength: 'מפגין יכולת מעולה לשאול שאלות חשובות ועמוקות - מניע למידה וחדשנות.',
        moderate: 'יש יכולת בסיסית לשאול שאלות אך ניתן לפתח עוד את העומק והמיקוד.',
        development: 'נדרש פיתוח ביכולת לשאול שאלות מהותיות ומעוררות חשיבה.'
      }
    },
    'I': {
      'השראה': {
        strength: 'מפגין יכולת טבעית וחזקה להעניק השראה לאחרים - כוח מניע מרכזי במנהיגות.',
        moderate: 'יש פוטנציאל להעניק השראה אך ניתן לפתח עוד את הכריזמה והמסר.',
        development: 'חשוב לפתח יכולת להעניק השראה ולהניע אנשים סביב חזון משותף.'
      },
      'דוגמה אישית': {
        strength: 'מהווה דוגמה אישית מעוררת השראה ופועל בהתאם לערכים שמטיף להם.',
        moderate: 'יש בסיס טוב להיות דוגמה אישית אך ניתן לחזק את העקביות.',
        development: 'נדרש פיתוח ביכולת להיות דוגמה אישית ולהוביל באמצעות מעשה.'
      },
      'מוטיבציה': {
        strength: 'מציג יכולת מעולה להניע ולהלהיב אנשים - כישור מפתח במנהיגות מעוררת השראה.',
        moderate: 'יש יכולת בסיסית להניע אך ניתן לפתח עוד את הכוח המניע.',
        development: 'חשוב לפתח כישורי הנעה ויכולת לעורר מוטיבציה באחרים.'
      }
    },
    'M': {
      'משמעות': {
        strength: 'מפגין יכולת מעולה ליצור תחושת משמעות ולחבר אנשים למטרה גדולה יותר.',
        moderate: 'יש מודעות למשמעות אך ניתן לחזק את היכולת לתרגם אותה לפעולה.',
        development: 'נדרש פיתוח ביכולת ליצור תחושת משמעות ומטרה בעבודה.'
      },
      'ערכים': {
        strength: 'מציג מחויבות חזקה לערכים ופועל בהתאם להם באופן עקבי.',
        moderate: 'יש בסיס ערכי טוב אך ניתן לחזק את הביטוי והיישום שלו.',
        development: 'חשוב לפתח בהירות ערכית ולפעול בהתאם לעקרונות ברורים.'
      },
      'פיתוח אנשים': {
        strength: 'מפגין השקעה מעוררת השראה בפיתוח אנשים ובמימוש הפוטנציאל שלהם.',
        moderate: 'יש מודעות לחשיבות פיתוח אנשים אך ניתן להעמיק את ההשקעה.',
        development: 'נדרש פיתוח ביכולת להשקיע בצמיחה ופיתוח של אחרים.'
      }
    },
    'A': {
      'גמישות': {
        strength: 'מפגין גמישות מחשבתית ויכולת הסתגלות מעולה לשינויים ולאתגרים חדשים.',
        moderate: 'יש יכולת בסיסית להסתגלות אך ניתן לפתח עוד את הגמישות.',
        development: 'חשוב לפתח גמישות מחשבתית ויכולת הסתגלות מהירה.'
      },
      'שיתוף פעולה': {
        strength: 'מציג יכולת מעולה לעבודת צוות ושיתוף פעולה - בסיס למנהיגות שיתופית.',
        moderate: 'יש יכולת טובה לשיתוף פעולה אך ניתן לפתח עוד את העומק.',
        development: 'נדרש פיתוח בכישורי שיתוף פעולה ועבודת צוות.'
      },
      'הקשבה': {
        strength: 'מפגין כישורי הקשבה מעולים ויכולת להבין נקודות מבט שונות.',
        moderate: 'יש יכולת הקשבה בסיסית אך ניתן לפתח עוד את העומק והרגישות.',
        development: 'חשוב לפתח כישורי הקשבה פעילה ורגישות לאחרים.'
      }
    },
    'A2': {
      'שקיפות': {
        strength: 'מפגין שקיפות מעוררת אמון ויכולת לחלוק מידע באופן פתוח ואמין.',
        moderate: 'יש נטייה לשקיפות אך ניתן לפתח עוד את הפתיחות.',
        development: 'נדרש פיתוח בשקיפות וביכולת לחלוק מידע באופן פתוח.'
      },
      'אחריות אישית': {
        strength: 'מציג נטילת אחריות אישית מעוררת כבוד ויכולת להתמודד עם טעויות.',
        moderate: 'יש מודעות לאחריות אישית אך ניתן לחזק את היישום.',
        development: 'חשוב לפתח יכולת נטילת אחריות אישית ולהכיר בטעויות.'
      },
      'אותנטיות': {
        strength: 'מפגין אותנטיות מעוררת השראה ויכולת להיות אמיתי ואמין.',
        moderate: 'יש בסיס של אותנטיות אך ניתן לפתח עוד את הביטוי האישי.',
        development: 'נדרש פיתוח באותנטיות ובהיותך אמיתי עם עצמך ואחרים.'
      }
    }
  };

  // חיפוש תובנה רלוונטית
  const dimensionInsights = insights[dimension as keyof typeof insights];
  if (dimensionInsights) {
    for (const [key, insight] of Object.entries(dimensionInsights)) {
      if (questionText.includes(key)) {
        return insight[category];
      }
    }
  }

  // תובנה כללית אם לא נמצאה התאמה ספציפית
  const genericInsights = {
    strength: `התוצאה המעולה (${score}) מצביעה על יכולת מפותחת בתחום זה.`,
    moderate: `התוצאה הבינונית (${score}) מצביעה על בסיס טוב עם מקום לפיתוח.`,
    development: `התוצאה (${score}) מצביעה על הזדמנות לפיתוח משמעותי בתחום זה.`
  };

  return genericInsights[category];
};

// פונקציה לקבלת סיכום השאלה
const getQuestionSummary = (questionText: string): string => {
  if (questionText.length > 80) {
    return questionText.substring(0, 80) + "...";
  }
  return questionText;
};

// פונקציה לניתוח כללי של הממד
const getDimensionOverallAnalysis = (dimension: string, sortedAnswers: any[]): string => {
  const averageScore = sortedAnswers.reduce((sum, answer) => sum + answer.adjustedValue, 0) / sortedAnswers.length;
  const variability = Math.max(...sortedAnswers.map(a => a.adjustedValue)) - Math.min(...sortedAnswers.map(a => a.adjustedValue));

  let analysis = "";

  if (averageScore >= 4) {
    analysis += "הממד מציג ביצועים גבוהים באופן עקבי. ";
  } else if (averageScore >= 3) {
    analysis += "הממד מציג ביצועים בינוניים עם פוטנציאל לשיפור. ";
  } else {
    analysis += "הממד זקוק לתשומת לב ופיתוח מעמיק. ";
  }

  if (variability <= 1) {
    analysis += "הביצועים עקביים בכל ההיבטים של הממד.";
  } else if (variability <= 2) {
    analysis += "יש שונות מתונה בין ההיבטים השונים של הממד.";
  } else {
    analysis += "יש שונות גבוהה בין ההיבטים השונים - כדאי להתמקד בתחומים החלשים תוך שימור החזקים.";
  }

  return analysis;
};

// הפונקציה המרכזית לקבלת ניתוח מותאם אישית
export const getPersonalizedAnalysis = (dimension: string, answers: { questionId: number; value: number }[]) => {
  return analyzeSpecificAnswers(dimension, answers);
};
