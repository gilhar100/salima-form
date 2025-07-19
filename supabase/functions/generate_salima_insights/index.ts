import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuestionLogic {
  order: number;
  dimension: string;
  isReversed: boolean;
  high_text: string;
  low_text: string;
}

interface SurveyRecord {
  id: string;
  q1?: number;
  q2?: number;
  q3?: number;
  q4?: number;
  q5?: number;
  q6?: number;
  q7?: number;
  q8?: number;
  q9?: number;
  q10?: number;
  q11?: number;
  q12?: number;
  q13?: number;
  q14?: number;
  q15?: number;
  q16?: number;
  q17?: number;
  q18?: number;
  q19?: number;
  q20?: number;
  q21?: number;
  q22?: number;
  q23?: number;
  q24?: number;
  q25?: number;
  q26?: number;
  q27?: number;
  q28?: number;
  q29?: number;
  q30?: number;
  q31?: number;
  q32?: number;
  q33?: number;
  q34?: number;
  q35?: number;
  q36?: number;
  q37?: number;
  q38?: number;
  q39?: number;
  q40?: number;
  q41?: number;
  q42?: number;
  q43?: number;
  q44?: number;
  q45?: number;
  q46?: number;
  q47?: number;
  q48?: number;
  q49?: number;
  q50?: number;
  q51?: number;
  q52?: number;
  q53?: number;
  q54?: number;
  q55?: number;
  q56?: number;
  q57?: number;
  q58?: number;
  q59?: number;
  q60?: number;
  q61?: number;
  q62?: number;
  q63?: number;
  q64?: number;
  q65?: number;
  q66?: number;
  q67?: number;
  q68?: number;
  q69?: number;
  q70?: number;
  q71?: number;
  q72?: number;
  q73?: number;
  q74?: number;
  q75?: number;
  q76?: number;
  q77?: number;
  q78?: number;
  q79?: number;
  q80?: number;
  q81?: number;
  q82?: number;
  q83?: number;
  q84?: number;
  q85?: number;
  q86?: number;
  q87?: number;
  q88?: number;
  q89?: number;
  q90?: number;
  dimension_s?: number;
  dimension_a?: number;
  dimension_l?: number;
  dimension_i?: number;
  dimension_m?: number;
  dimension_a2?: number;
}

const calculateEffectiveScore = (score: number, isReversed: boolean): number => {
  return isReversed ? (6 - score) : score;
};

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
  if (insights.length === 0) return "לא נמצאו תובנות מתאימות לממד ההסתגלות.";
  
  const selectedInsights = selectInsightsForSynthesis(insights, userSeed, 3);
  const positiveCount = selectedInsights.filter(insight => 
    insight.includes("גמישות") || insight.includes("אופטימיות") || insight.includes("מתאים")
  ).length;
  
  if (positiveCount > selectedInsights.length / 2) {
    return `אתה מגלה גמישות ויכולת הסתגלות ראויה לציון במצבים משתנים. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "בנוסף לכך, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "יחד עם זאת, " + selectedInsights[2] : ""} כישורים אלו מחזקים את עמידותך מול אתגרים.`;
  } else {
    return `בתחום ההסתגלות למצבים חדשים ניכרים אתגרים הדורשים טיפול. ${selectedInsights[0]} ${selectedInsights.length > 1 ? "מנגד, " + selectedInsights[1] : ""} ${selectedInsights.length > 2 ? "לצד זאת, " + selectedInsights[2] : ""} פיתוח גמישות רבה יותר יסייע בהתמודדות עם שינויים.`;
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { record }: { record: SurveyRecord } = await req.json();
    console.log('Processing SALIMA insights for record:', record.id);

    // Fetch question logic from database
    const { data: questionLogic, error: logicError } = await supabase
      .from('salima_q_logic')
      .select('order, dimension, isReversed, high_text, low_text')
      .order('order');

    if (logicError) {
      throw new Error(`Failed to fetch question logic: ${logicError.message}`);
    }

    // Convert record to answers array
    const answers: { questionId: number; value: number }[] = [];
    for (let i = 1; i <= 90; i++) {
      const questionKey = `q${i}` as keyof SurveyRecord;
      const value = record[questionKey];
      if (value !== undefined && value !== null) {
        answers.push({ questionId: i, value });
      }
    }

    console.log(`Found ${answers.length} answers to process`);

    // Group insights by dimension
    const dimensionInsights: Record<string, string[]> = {
      'S': [],
      'A': [],
      'L': [],
      'I': [],
      'M': [],
      'A2': []
    };

    questionLogic.forEach((question: QuestionLogic) => {
      const answer = answers.find(a => a.questionId === question.order);
      if (!answer) return;

      const effectiveScore = calculateEffectiveScore(answer.value, question.isReversed);
      const selectedText = effectiveScore > 3 ? question.high_text : question.low_text;
      
      if (selectedText && selectedText.trim() && selectedText !== 'nan') {
        dimensionInsights[question.dimension]?.push(selectedText);
      }
    });

    // Generate user seed for consistent results
    const userSeed = record.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Generate paragraphs for each dimension
    const paragraphs: Record<string, string> = {};

    paragraphs['אסטרטגיה'] = synthesizeStrategyParagraph(dimensionInsights['S'], userSeed);
    paragraphs['אדפטיביות'] = synthesizeAdaptiveParagraph(dimensionInsights['A'], userSeed + 1);
    paragraphs['לומד'] = synthesizeLearningParagraph(dimensionInsights['L'], userSeed + 2);
    paragraphs['השראה'] = synthesizeInspirationParagraph(dimensionInsights['I'], userSeed + 3);
    paragraphs['משמעות'] = synthesizeMeaningParagraph(dimensionInsights['M'], userSeed + 4);
    paragraphs['אותנטיות'] = synthesizeAuthentcityParagraph(dimensionInsights['A2'], userSeed + 5);

    console.log('Generated paragraphs for all dimensions');

    // Determine dominant archetype based on highest scoring dimension
    const dimensionScores = {
      S: record.dimension_s || 0,
      A: record.dimension_a || 0,
      L: record.dimension_l || 0,
      I: record.dimension_i || 0,
      M: record.dimension_m || 0,
      A2: record.dimension_a2 || 0
    };

    // Find the dimension with the highest score
    const highestDimension = Object.entries(dimensionScores).reduce((max, [key, score]) => 
      score > max.score ? { dimension: key, score } : max,
      { dimension: 'S', score: 0 }
    );

    // Map dimensions to archetype names
    const archetypeMap: Record<string, string> = {
      'S': 'מנהל ההזדמנות',
      'A': 'מנהל ההזדמנות', 
      'L': 'המנהל הסקרן',
      'I': 'המנהל הסקרן',
      'M': 'המנהל המעצים',
      'A2': 'המנהל המעצים'
    };

    const dominantArchetype = archetypeMap[highestDimension.dimension] || 'מנהל ההזדמנות';
    console.log(`Determined dominant archetype: ${dominantArchetype} based on highest dimension: ${highestDimension.dimension} (score: ${highestDimension.score})`);

    // Update the record with insights and dominant archetype
    const { error: updateError } = await supabase
      .from('survey_responses')
      .update({
        insight_strategy: paragraphs['אסטרטגיה'],
        insight_adaptive: paragraphs['אדפטיביות'], 
        insight_learning: paragraphs['לומד'],
        insight_inspiration: paragraphs['השראה'],
        insight_meaning: paragraphs['משמעות'],
        insight_authentic: paragraphs['אותנטיות'],
        dominant_archetype: dominantArchetype
      })
      .eq('id', record.id);

    if (updateError) {
      console.error('Failed to update survey record:', updateError);
      throw new Error(`Failed to update record: ${updateError.message}`);
    }

    console.log('Successfully updated survey record with insights and dominant archetype');

    return new Response(
      JSON.stringify({
        success: true,
        insights: paragraphs,
        dominant_archetype: dominantArchetype,
        record_id: record.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error generating SALIMA insights:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});