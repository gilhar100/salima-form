
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
const analyzeSpecificAnswers = (dimension: string, answersForDimension: { questionId: number; value: number }[]): string => {
  console.log(`Analyzing dimension ${dimension} with ${answersForDimension.length} answers:`, answersForDimension);
  
  if (answersForDimension.length === 0) {
    return "לא זוהו תשובות רלוונטיות לממד זה. אנא ודא שהשאלון הושלם במלואו.";
  }

  // מיון התשובות לפי ציון מותאם (לאחר התאמה לשאלות הפוכות)
  const processedAnswers = answersForDimension
    .map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      const adjustedValue = getAdjustedValue(answer.value, question?.isReversed || false);
      
      console.log(`Question ${answer.questionId}: original=${answer.value}, adjusted=${adjustedValue}, reversed=${question?.isReversed}`);
      
      return {
        questionId: answer.questionId,
        text: question?.text || `שאלה ${answer.questionId}`,
        originalValue: answer.value,
        adjustedValue,
        isReversed: question?.isReversed || false
      };
    })
    .sort((a, b) => b.adjustedValue - a.adjustedValue);

  let analysis = "";

  // חלוקה לקטגוריות על בסיס הציון המותאם
  const strongAreas = processedAnswers.filter(a => a.adjustedValue >= 4);
  const moderateAreas = processedAnswers.filter(a => a.adjustedValue >= 3 && a.adjustedValue < 4);
  const developmentAreas = processedAnswers.filter(a => a.adjustedValue < 3);

  console.log(`Strong: ${strongAreas.length}, Moderate: ${moderateAreas.length}, Development: ${developmentAreas.length}`);

  // ניתוח התחומים החזקים
  if (strongAreas.length > 0) {
    analysis += "**🌟 תחומי חוזקה:**\n";
    strongAreas.forEach((area) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'strength');
      analysis += `• ${insight}\n`;
    });
    analysis += "\n";
  }

  // ניתוח התחומים הבינוניים
  if (moderateAreas.length > 0) {
    analysis += "**⚖️ תחומים בינוניים:**\n";
    moderateAreas.forEach((area) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'moderate');
      analysis += `• ${insight}\n`;
    });
    analysis += "\n";
  }

  // ניתוח תחומי פיתוח
  if (developmentAreas.length > 0) {
    analysis += "**🎯 תחומים לשיפור:**\n";
    developmentAreas.forEach((area) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'development');
      analysis += `• ${insight}\n`;
    });
  }

  return analysis.trim();
};

// פונקציה לקבלת תובנה ספציפית בהתבסס על תוכן השאלה ורמת הביצוע
const getSpecificInsight = (questionText: string, dimension: string, score: number, category: 'strength' | 'moderate' | 'development'): string => {
  // מיפוי מילות מפתח לתובנות ספציפיות לכל ממד
  const keywordInsights = {
    'S': {
      'חזון': {
        strength: 'יכולת מעולה לפיתוח וניסוח חזון אסטרטגי ברור ומעורר השראה',
        moderate: 'יש בסיס טוב לפיתוח חזון אך יש מקום לחיזוק הבהירות והעוצמה',
        development: 'נדרש פיתוח משמעותי ביכולת ניסוח חזון אסטרטגי ברור ומשכנע'
      },
      'תכנון': {
        strength: 'יכולת מצוינת לתכנון אסטרטגי ארוך טווח ולקבלת החלטות מבוססות נתונים',
        moderate: 'יכולת בסיסית לתכנון ארוך טווח אך ניתן לפתח את העומק האסטרטגי',
        development: 'חובה לפתח כישורי תכנון אסטרטגי ויכולת ראייה ארוכת טווח'
      },
      'שינוי': {
        strength: 'גמישות מחשבתית מעולה ויכולת מעוררת השראה להתמודד עם שינויים מורכבים',
        moderate: 'יכולת טובה להתמודד עם שינויים אך ניתן לפתח את הגמישות האסטרטגית',
        development: 'חובה לפתח יכולת להוביל שינויים ולהתמודד עם אי-ודאות'
      },
      'החלטות': {
        strength: 'יכולת מעולה לקבלת החלטות מבוססות ומחושבות במצבים מורכבים',
        moderate: 'יכולת סבירה לקבלת החלטות אך יש מקום לשיפור התהליך',
        development: 'נדרש חיזוק משמעותי בתהליכי קבלת החלטות וניתוח מצבים מורכבים'
      },
      'אסטרטגי': {
        strength: 'חשיבה אסטרטגית מפותחת ויכולת לראות התמונה הרחבה',
        moderate: 'יכולת חשיבה אסטרטגית בסיסית עם פוטנציאל לפיתוח',
        development: 'נדרש פיתוח משמעותי בחשיבה אסטרטגית וראייה כוללת'
      }
    },
    'L': {
      'למידה': {
        strength: 'מחויבות חזקה ללמידה מתמשכת ופיתוח עצמי מתמשך',
        moderate: 'מחויבות בסיסית ללמידה אך ניתן להעמיק את השיטתיות והעקביות',
        development: 'חובה לפתח תרבות למידה אישית ומחויבות לפיתוח מתמשך'
      },
      'רעיונות': {
        strength: 'סקרנות אינטלקטואלית גבוהה ופתיחות מעולה לרעיונות חדשים ולחדשנות',
        moderate: 'פתיחות בסיסית לרעיונות חדשים אך ניתן לפתח את הסקרנות האקטיבית',
        development: 'נדרש פיתוח משמעותי בפתיחות לרעיונות חדשים ובסקרנות אינטלקטואלית'
      },
      'שאלות': {
        strength: 'יכולת מעולה לשאול שאלות חשובות ועמוקות המניעות למידה וחדשנות',
        moderate: 'יכולת בסיסית לשאול שאלות אך ניתן לפתח את העומק והמיקוד',
        development: 'חובה לפתח יכולת לשאול שאלות מהותיות ומעוררות חשיבה'
      },
      'עזרה': {
        strength: 'נכונות מעולה לפנות לעזרה ולהיעזר בידע ובניסיון של אחרים',
        moderate: 'מודעות לצורך בעזרה אך לפעמים קשיים לפנות לאחרים',
        development: 'נדרש פיתוח ביכולת לזהות מתי נדרשת עזרה ולפנות לקבלתה'
      },
      'טעויות': {
        strength: 'יכולת מעולה ללמוד מטעויות ולהפוך אותן להזדמנויות צמיחה',
        moderate: 'מודעות ללמידה מטעויות אך ניתן לפתח את העמק והיישום',
        development: 'חובה לפתח יכולת ללמוד מטעויות ולראות בהן הזדמנויות לצמיחה'
      },
      'ביקורת': {
        strength: 'יכולת מעולה לקבל ביקורת ולהשתמש בה לשיפור ופיתוח',
        moderate: 'פתיחות בסיסית לביקורת אך ניתן לפתח את היכולת להשתמש בה בצורה בונה',
        development: 'נדרש פיתוח ביכולת לקבל ביקורת ולהפוך אותה לכלי לצמיחה'
      }
    },
    'I': {
      'השראה': {
        strength: 'יכולת טבעית וחזקה להעניק השראה לאחרים וליצור חזון משותף',
        moderate: 'פוטנציאל להעניק השראה אך ניתן לפתח את הכריזמה והמסר',
        development: 'חובה לפתח יכולת להעניק השראה ולהניע אנשים סביב חזון משותף'
      },
      'דוגמה': {
        strength: 'מהווה דוגמה אישית מעוררת השראה ופועל בהתאם לערכים',
        moderate: 'בסיס טוב להיות דוגמה אישית אך ניתן לחזק את העקביות',
        development: 'חובה לפתח יכולת להיות דוגמה אישית ולהוביל באמצעות מעשה'
      },
      'מוטיבציה': {
        strength: 'יכולת מעולה להניע ולהלהיב אנשים ליצירת ביצועים גבוהים',
        moderate: 'יכולת בסיסית להניע אך ניתן לפתח את הכוח המניע',
        development: 'חובה לפתח כישורי הנעה ויכולת לעורר מוטיבציה גבוהה באחרים'
      },
      'אנרגיה': {
        strength: 'מקרין אנרגיה חיובית ואנתוזיאזם מדבקים המשפיעים על כל הסביבה',
        moderate: 'אנרגיה חיובית בסיסית אך ניתן לחזק את ההשפעה על הסביבה',
        development: 'נדרש פיתוח ביכולת להקרין אנרגיה חיובית ולהדביק אחרים'
      },
      'אנתוזיאזם': {
        strength: 'אנתוזיאזם מדבק המעורר התלהבות ומעורבות באחרים',
        moderate: 'אנתוזיאזם בסיסי אך ניתן לפתח את הביטוי והעוצמה',
        development: 'חובה לפתח אנתוזיאזם ויכולת להדביק אחרים בהתלהבות'
      },
      'חזון': {
        strength: 'יכולת מעולה להעביר חזון באופן משכנע ומעורר השראה',
        moderate: 'יכולת בסיסית להעביר חזון אך ניתן לפתח את הכוח המשכנע',
        development: 'נדרש פיתוח ביכולת להעביר חזון באופן מעורר השראה ומניע'
      }
    },
    'M': {
      'משמעות': {
        strength: 'יכולת מעולה ליצור תחושת משמעות ולחבר אנשים למטרה גדולה',
        moderate: 'מודעות למשמעות אך ניתן לחזק את היכולת לתרגם אותה לפעולה',
        development: 'חובה לפתח יכולת ליצור תחושת משמעות ומטרה ברורה בעבודה'
      },
      'ערכים': {
        strength: 'מחויבות חזקה לערכים ופעולה עקבית בהתאם להם בכל המצבים',
        moderate: 'בסיס ערכי טוב אך ניתן לחזק את הביטוי והיישום המעשי',
        development: 'חובה לפתח בהירות ערכית ולפעול בעקביות לפי עקרונות ברורים'
      },
      'פיתוח': {
        strength: 'השקעה מעוררת השראה בפיתוח אנשים ובמימוש הפוטנציאל שלהם',
        moderate: 'מודעות לחשיבות פיתוח אנשים אך ניתן להעמיק את ההשקעה',
        development: 'חובה לפתח יכולת להשקיע בצמיחה ובפיתוח מתמשך של אחרים'
      },
      'מטרה': {
        strength: 'מצליח ליצור חיבור עמוק ומשמעותי בין האנשים למטרת הארגון',
        moderate: 'מודעות למטרה אך ניתן לחזק את היכולת לחבר אליה אחרים',
        development: 'חובה לפתח יכולת לחבר אנשים למטרה משותפת וברורה'
      },
      'הדרכה': {
        strength: 'יכולת מעולה להדריך ולפתח אחרים באופן מקצועי ואישי',
        moderate: 'יכולת בסיסית להדרכה אך ניתן לפתח את העומק והמקצועיות',
        development: 'נדרש פיתוח משמעותי ביכולת הדרכה ופיתוח אנשים'
      },
      'השפעה': {
        strength: 'יכולת השפעה חיובית מעולה על צמיחה ופיתוח של אחרים',
        moderate: 'השפעה חיובית בסיסית אך ניתן לפתח את העומק והיעילות',
        development: 'חובה לפתח יכולת השפעה חיובית על פיתוח וצמיחה של אחרים'
      }
    },
    'A': {
      'גמישות': {
        strength: 'גמישות מחשבתית ויכולת הסתגלות מעולה לשינויים ולאתגרים חדשים',
        moderate: 'יכולת בסיסית להסתגלות אך ניתן לפתח את הגמישות המחשבתית',
        development: 'חובה לפתח גמישות מחשבתית ויכולת הסתגלות מהירה ויעילה'
      },
      'שיתוף': {
        strength: 'יכולת מעולה לעבודת צוות ושיתוף פעולה אפקטיבי',
        moderate: 'יכולת טובה לשיתוף פעולה אך ניתן לפתח את העומק והאפקטיביות',
        development: 'חובה לפתח כישורי שיתוף פעולה ועבודת צוות ברמה גבוהה'
      },
      'הקשבה': {
        strength: 'כישורי הקשבה מעולים ויכולת להבין ולקלוט נקודות מבט מגוונות',
        moderate: 'יכולת הקשבה בסיסית אך ניתן לפתח את העומק והרגישות',
        development: 'חובה לפתח כישורי הקשבה פעילה ורגישות גבוהה לאחרים'
      },
      'קבלה': {
        strength: 'פתיחות מעולה לדעות שונות ויכולת לקבל ביקורת באופן בוגר',
        moderate: 'פתיחות בסיסית לדעות שונות אך ניתן לפתח את הקבלה והגמישות',
        development: 'חובה לפתח יכולת לקבל דעות שונות ולהתמודד עם ביקורת בצורה בונה'
      },
      'פתיחות': {
        strength: 'פתיחות מחשבתית מעולה לרעיונות ודעות חדשות ושונות',
        moderate: 'פתיחות מחשבתית בסיסית אך ניתן לפתח את הסקרנות והקבלה',
        development: 'נדרש פיתוח בפתיחות מחשבתית ויכולת לקבל נקודות מבט שונות'
      },
      'שינוי': {
        strength: 'יכולת מעולה להתמודד עם שינוי ולהסתגל למצבים חדשים',
        moderate: 'יכולת בסיסית להתמודד עם שינוי אך ניתן לפתח את הגמישות',
        development: 'חובה לפתח יכולת להתמודד עם שינוי ולהסתגל במהירות'
      }
    },
    'A2': {
      'שקיפות': {
        strength: 'שקיפות מעוררת אמון ויכולת לחלוק מידע באופן פתוח וכנה',
        moderate: 'נטייה לשקיפות אך ניתן לפתח את הפתיחות והכנות',
        development: 'חובה לפתח שקיפות ויכולת לחלוק מידע באופן פתוח ואמין'
      },
      'אחריות': {
        strength: 'נטילת אחריות אישית מעוררת כבוד ויכולת להתמודד עם טעויות בבגרות',
        moderate: 'מודעות לאחריות אישית אך ניתן לחזק את היישום המעשי',
        development: 'חובה לפתח יכולת נטילת אחריות אישית מלאה ולהכיר בטעויות'
      },
      'אותנטיות': {
        strength: 'אותנטיות מעוררת השראה ויכולת להיות אמיתי וכנה',
        moderate: 'בסיס של אותנטיות אך ניתן לפתח את הביטוי האישי הכנה',
        development: 'חובה לפתח אותנטיות ויכולת להיות אמיתי עם עצמך ועם אחרים'
      },
      'יושרה': {
        strength: 'יושרה מוחלטת ועקביות מלאה בין דיבור למעשה בכל המצבים',
        moderate: 'בסיס טוב של יושרה אך ניתן לחזק את העקביות המעשית',
        development: 'חובה לפתח יושרה ועקביות מלאה בין ערכים לפעולות'
      },
      'כנות': {
        strength: 'כנות מוחלטת ויכולת לתקשר באופן ישיר ואמין',
        moderate: 'נטייה לכנות אך ניתן לפתח את הביטוי הישיר והברור',
        development: 'נדרש פיתוח ביכולת להיות כנה וישיר בתקשורת'
      },
      'אמון': {
        strength: 'יכולת מעולה לבנות ולשמור על אמון עם אחרים',
        moderate: 'יכולת בסיסית לבניית אמון אך ניתן לפתח את העומק והעקביות',
        development: 'חובה לפתח יכולת לבנות ולשמור על אמון באופן מתמשך'
      }
    }
  };

  // חיפוש תובנה רלוונטית על בסיס מילות מפתח
  const dimensionInsights = keywordInsights[dimension as keyof typeof keywordInsights];
  if (dimensionInsights) {
    for (const [keyword, insight] of Object.entries(dimensionInsights)) {
      if (questionText.includes(keyword)) {
        return insight[category];
      }
    }
  }

  // תובנות כלליות לכל ממד אם לא נמצאה התאמה ספציפית
  const genericInsights = {
    'S': {
      strength: `יכולת אסטרטגית מפותחת - נקודת חוזקה משמעותית בחשיבה ותכנון ארוך טווח`,
      moderate: `בסיס אסטרטגי יציב עם פוטנציאל טוב לפיתוח והעמקה של החשיבה האסטרטגית`,
      development: `הזדמנות לפיתוח משמעותי ביכולות החשיבה האסטרטגית והובלת שינויים`
    },
    'L': {
      strength: `יכולת למידה מפותחת - נקודת חוזקה בפיתוח עצמי וצמיחה מתמשכת`,
      moderate: `בסיס למידה יציב עם פוטנציאל לפיתוח גישה שיטתית יותר ללמידה`,
      development: `הזדמנות לפיתוח משמעותי בתרבות למידה ופיתוח עצמי מתמשך`
    },
    'I': {
      strength: `יכולת השראה מפותחת - כוח מניע משמעותי להשפעה חיובית על אחרים`,
      moderate: `בסיס השראה יציב עם פוטנציאל לפיתוח הכריזמה והכוח המעורר השראה`,
      development: `הזדמנות לפיתוח משמעותי ביכולת להעניק השראה ולהניע אחרים`
    },
    'M': {
      strength: `יכולת ליצור משמעות מפותחת - חוזקה בחיבור אנשים למטרה גדולה`,
      moderate: `בסיס יציב ליצירת משמעות עם פוטנציאל לפיתוח העומק והעוצמה`,
      development: `הזדמנות לפיתוח משמעותי ביכולת ליצור תחושת משמעות ומטרה`
    },
    'A': {
      strength: `יכולת הסתגלות מפותחת - חוזקה בגמישות ופתיחות לשינוי`,
      moderate: `בסיס הסתגלות יציב עם פוטנציאל לפיתוח הגמישות המחשבתית`,
      development: `הזדמנות לפיתוח משמעותי בגמישות ויכולת הסתגלות למצבים חדשים`
    },
    'A2': {
      strength: `יכולת אותנטיות מפותחת - חוזקה ביושרה ובבניית אמון`,
      moderate: `בסיס אותנטיות יציב עם פוטנציאל לפיתוח השקיפות והכנות`,
      development: `הזדמנות לפיתוח משמעותי באותנטיות ויכולת בניית אמון`
    }
  };

  const dimensionGeneric = genericInsights[dimension as keyof typeof genericInsights];
  return dimensionGeneric ? dimensionGeneric[category] : `תחום זה מציג ${category === 'strength' ? 'חוזקה' : category === 'moderate' ? 'פוטנציאל' : 'הזדמנות לפיתוח'}`;
};

// הפונקציה המרכזית לקבלת ניתוח מותאם אישית
export const getPersonalizedAnalysis = (dimension: string, answersForDimension: { questionId: number; value: number }[]) => {
  console.log(`Getting personalized analysis for dimension ${dimension}:`, answersForDimension);
  return analyzeSpecificAnswers(dimension, answersForDimension);
};
