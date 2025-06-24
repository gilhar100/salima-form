
import { supabase } from "@/integrations/supabase/client";
import { Answer } from "@/lib/types";

interface SalimaQuestion {
  order: number;
  dimension: string;
  isReversed: boolean;
  high_text: string;
  low_text: string;
}

interface DimensionInsights {
  dimension: string;
  insights: string[];
}

// Cache for the question logic to avoid repeated database calls
let questionLogicCache: SalimaQuestion[] | null = null;

// Fetch question logic from Supabase
const fetchQuestionLogic = async (): Promise<SalimaQuestion[]> => {
  if (questionLogicCache) {
    return questionLogicCache;
  }

  const { data, error } = await supabase
    .from('salima_q_logic')
    .select('order, dimension, isReversed, high_text, low_text')
    .order('order');

  if (error) {
    console.error('Error fetching SALIMA question logic:', error);
    throw error;
  }

  questionLogicCache = data || [];
  return questionLogicCache;
};

// Calculate effective score based on isReversed flag
const calculateEffectiveScore = (score: number, isReversed: boolean): number => {
  return isReversed ? (6 - score) : score;
};

// Convert answers array to question-score mapping
const answersToScoreMap = (answers: Answer[]): Record<number, number> => {
  const scoreMap: Record<number, number> = {};
  answers.forEach(answer => {
    scoreMap[answer.questionId] = answer.value;
  });
  return scoreMap;
};

// Generate insights for each dimension
const generateDimensionInsights = async (answers: Answer[]): Promise<DimensionInsights[]> => {
  const questionLogic = await fetchQuestionLogic();
  const scoreMap = answersToScoreMap(answers);
  
  const dimensionInsights: Record<string, string[]> = {
    'S': [],
    'A': [],
    'L': [],
    'I': [],
    'M': [],
    'A2': []
  };

  questionLogic.forEach(question => {
    const score = scoreMap[question.order];
    if (score === undefined) return;

    const effectiveScore = calculateEffectiveScore(score, question.isReversed);
    const selectedText = effectiveScore > 3 ? question.high_text : question.low_text;
    
    if (selectedText && selectedText.trim() && selectedText !== 'nan') {
      dimensionInsights[question.dimension]?.push(selectedText);
    }
  });

  return Object.entries(dimensionInsights).map(([dimension, insights]) => ({
    dimension,
    insights
  }));
};

// Synthesis functions for each dimension
const synthesizeStrategyParagraph = (insights: string[], userSeed: number): string => {
  if (insights.length === 0) return "לא נמצאו תובנות מתאימות לממד האסטרטגיה.";
  
  const selectedInsights = selectInsightsForSynthesis(insights, userSeed, 3);
  const positiveCount = selectedInsights.filter(insight => 
    insight.includes("מגלה") || insight.includes("מצליח") || insight.includes("מחזק")
  ).length;
  
  if (positiveCount > selectedInsights.length / 2) {
    return `ניכרת יכולת חשיבה אסטרטגית מפותחת ומחזקת את הביטחון בהובלה. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "עם זאת, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "יתרה מכך, " + selectedInsights[2] : ""} המשך לטפח כישורים אלו לצורך הובלה יעילה.`;
  } else {
    return `בממד החשיבה האסטרטגית ישנם תחומים הדורשים התייחסות מדוקדקת. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "בנוסף, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "כמו כן, " + selectedInsights[2] : ""} השקעה בפיתוח מיומנויות אלו תחזק את יעילותך המנהיגותית.`;
  }
};

const synthesizeAdaptiveParagraph = (insights: string[], userSeed: number): string => {
  if (insights.length === 0) return "לא נמצאו תובנות מתאימות לממד האדפטיביות.";
  
  const selectedInsights = selectInsightsForSynthesis(insights, userSeed, 3);
  const positiveCount = selectedInsights.filter(insight => 
    insight.includes("גמישות") || insight.includes("אופטימיות") || insight.includes("מתאים")
  ).length;
  
  if (positiveCount > selectedInsights.length / 2) {
    return `אתה מגלה גמישות ויכולת הסתגלות ראויה לציון במצבים משתנים. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "בנוסף לכך, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "יחד עם זאת, " + selectedInsights[2] : ""} כישורים אלו מחזקים את עמידותך מול אתגרים.`;
  } else {
    return `בתחום האדפטיביות למצבים חדשים ניכרים אתגרים הדורשים טיפול. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "מנגד, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "לצד זאת, " + selectedInsights[2] : ""} פיתוח גמישות רבה יותר יסייע בהתמודדות עם שינויים.`;
  }
};

const synthesizeLearningParagraph = (insights: string[], userSeed: number): string => {
  if (insights.length === 0) return "לא נמצאו תובנות מתאימות לממד הלמידה.";
  
  const selectedInsights = selectInsightsForSynthesis(insights, userSeed, 3);
  const positiveCount = selectedInsights.filter(insight => 
    insight.includes("סקרנות") || insight.includes("מתעניין") || insight.includes("לומד")
  ).length;
  
  if (positiveCount > selectedInsights.length / 2) {
    return `הגישה ללמידה מתאפיינת בסקרנות ובפתיחות לרעיונות חדשים. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "כמו כן, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "בהקשר זה, " + selectedInsights[2] : ""} המשך להוביל בדוגמה אישית של למידה מתמדת.`;
  } else {
    return `בתחום הלמידה וההתפתחות המקצועית קיימים תחומים לשיפור. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "לעומת זאת, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "במקביל, " + selectedInsights[2] : ""} השקעה בלמידה אקטיבית תרחיב את האופקים המקצועיים.`;
  }
};

const synthesizeInspirationParagraph = (insights: string[], userSeed: number): string => {
  if (insights.length === 0) return "לא נמצאו תובנות מתאימות לממד ההשראה.";
  
  const selectedInsights = selectInsightsForSynthesis(insights, userSeed, 3);
  const positiveCount = selectedInsights.filter(insight => 
    insight.includes("מעורר") || insight.includes("מניע") || insight.includes("משדר")
  ).length;
  
  if (positiveCount > selectedInsights.length / 2) {
    return `ביכולת ההשראה והמוטיבציה ניכרים חוזקות בולטים המחזקים את מעמדך כמנהיג. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "יתרה מכך, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "בנוסף לכך, " + selectedInsights[2] : ""} המשך לפתח את הכישורים האלה לטובת הצוות והארגון.`;
  } else {
    return `בתחום ההשראה והמוטיבציה של אחרים ישנם אספקטים הזקוקים לחיזוק. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "מאידך, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "חשוב לציין כי " + selectedInsights[2] : ""} פיתוח יכולות אלו יעמיק את השפעתך החיובית על הסביבה.`;
  }
};

const synthesizeMeaningParagraph = (insights: string[], userSeed: number): string => {
  if (insights.length === 0) return "לא נמצאו תובנות מתאימות לממד המשמעות.";
  
  const selectedInsights = selectInsightsForSynthesis(insights, userSeed, 3);
  const positiveCount = selectedInsights.filter(insight => 
    insight.includes("משמעות") || insight.includes("ערכים") || insight.includes("מטרה")
  ).length;
  
  if (positiveCount > selectedInsights.length / 2) {
    return `ביצירת משמעות ובהנחלת ערכים ניכרת מחויבות עמיקה ואותנטית. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "לצד זאת, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "באופן דומה, " + selectedInsights[2] : ""} גישה זו מעשירה את התרבות הארגונית ומחזקת את הזהות המשותפת.`;
  } else {
    return `בממד יצירת המשמעות והעברת ערכים קיימים תחומים הדורשים העמקה. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "יחד עם זאת, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "בהקשר דומה, " + selectedInsights[2] : ""} חיזוק ההקשר הערכי יעמיק את המחויבות הארגונית.`;
  }
};

const synthesizeAuthentcityParagraph = (insights: string[], userSeed: number): string => {
  if (insights.length === 0) return "לא נמצאו תובנות מתאימות לממד האותנטיות.";
  
  const selectedInsights = selectInsightsForSynthesis(insights, userSeed, 3);
  const positiveCount = selectedInsights.filter(insight => 
    insight.includes("כנות") || insight.includes("אמפתיה") || insight.includes("אמיתי")
  ).length;
  
  if (positiveCount > selectedInsights.length / 2) {
    return `באותנטיות ובכנות האישית ניכרים ביטויים חזקים המעצימים את האמינות המנהיגותית. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "כמו כן, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "בנוסף לכך, " + selectedInsights[2] : ""} תכונות אלו מבססות יחסי אמון חזקים עם הסביבה המקצועית.`;
  } else {
    return `בתחום האותנטיות והביטוי העצמי ישנם היבטים הדורשים פיתוח והעמקה. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "עם זאת, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "ראוי להדגיש כי " + selectedInsights[2] : ""} חיזוק המידות האלה יגביר את האמינות והמהימנות המנהיגותית.`;
  }
};

// Helper function to select insights for synthesis based on user seed
const selectInsightsForSynthesis = (insights: string[], userSeed: number, maxCount: number): string[] => {
  if (insights.length === 0) return [];
  
  const selected: string[] = [];
  const shuffledIndexes = [...Array(insights.length).keys()].sort(() => (userSeed % 100) - 50);
  
  for (let i = 0; i < Math.min(maxCount, insights.length); i++) {
    const index = shuffledIndexes[i] % insights.length;
    if (!selected.includes(insights[index])) {
      selected.push(insights[index]);
    }
  }
  
  return selected;
};

// Main function to generate all SALIMA paragraphs
export const generateSalimaParagraphs = async (
  answers: Answer[],
  userIdentifier?: string
): Promise<Record<string, string>> => {
  try {
    const dimensionInsights = await generateDimensionInsights(answers);
    const userSeed = userIdentifier ? 
      userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 
      Date.now();

    const paragraphs: Record<string, string> = {};

    dimensionInsights.forEach(({ dimension, insights }) => {
      switch (dimension) {
        case 'S':
          paragraphs['אסטרטגיה'] = synthesizeStrategyParagraph(insights, userSeed);
          break;
        case 'A':
          paragraphs['אדפטיביות'] = synthesizeAdaptiveParagraph(insights, userSeed + 1);
          break;
        case 'L':
          paragraphs['למידה'] = synthesizeLearningParagraph(insights, userSeed + 2);
          break;
        case 'I':
          paragraphs['השראה'] = synthesizeInspirationParagraph(insights, userSeed + 3);
          break;
        case 'M':
          paragraphs['משמעות'] = synthesizeMeaningParagraph(insights, userSeed + 4);
          break;
        case 'A2':
          paragraphs['אותנטיות'] = synthesizeAuthentcityParagraph(insights, userSeed + 5);
          break;
      }
    });

    return paragraphs;
  } catch (error) {
    console.error('Error generating SALIMA paragraphs:', error);
    return {
      'אסטרטגיה': 'שגיאה ביצירת ניתוח לממד האסטרטגיה.',
      'אדפטיביות': 'שגיאה ביצירת ניתוח לממד האדפטיביות.',
      'למידה': 'שגיאה ביצירת ניתוח לממד הלמידה.',
      'השראה': 'שגיאה ביצירת ניתוח לממד ההשראה.',
      'משמעות': 'שגיאה ביצירת ניתוח לממד המשמעות.',
      'אותנטיות': 'שגיאה ביצירת ניתוח לממד האותנטיות.'
    };
  }
};
