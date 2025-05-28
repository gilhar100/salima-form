import { DimensionResult } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dimensionColors } from "./ResultsRadar";
import SubDimensionAnalysis from "./SubDimensionAnalysis";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { questions } from "@/data/questions";
import { getAdjustedValue } from "@/lib/calculations";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers?: { questionId: number; value: number }[];
}

// פונקציה לקבלת עוצמת צבע בהתאם לציון
const getColorIntensity = (score: number, baseColors: any) => {
  const normalizedScore = Math.max(0, Math.min(5, score)) / 5; // נרמול לטווח 0-1
  
  if (normalizedScore >= 0.9) return baseColors.strongest;
  if (normalizedScore >= 0.75) return baseColors.strong;
  if (normalizedScore >= 0.55) return baseColors.medium;
  if (normalizedScore >= 0.35) return baseColors.weak;
  return baseColors.weakest;
};

// פונקציה להערכת רמת הביצוע עם תיאורים מפורטים
const evaluateDimensionLevel = (score: number) => {
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

// פונקציה מחודשת לקבלת המלצות מפורטות בהתבסס על תשובות ספציפיות
const getPersonalizedRecommendations = (dimension: string, answers: { questionId: number; value: number }[]) => {
  // מציאת השאלות עם הציונים הנמוכים ביותר (1 או 2)
  const lowScoreQuestions = answers
    .filter(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return false;
      
      const adjustedValue = getAdjustedValue(answer.value, question.isReversed);
      return adjustedValue <= 2;
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

  if (lowScoreQuestions.length === 0) {
    return "הביצועים בממד זה טובים יחסית. המשך לפתח ולחזק את היכולות הקיימות.";
  }

  let recommendations = "בהתבסס על התשובות שלך, אלו התחומים הספציפיים שדורשים תשומת לב:\n\n";
  
  lowScoreQuestions.forEach((item, index) => {
    recommendations += `${index + 1}. **${getSpecificRecommendation(item.text, dimension)}**\n`;
  });

  recommendations += `\n**תכנית פעולה מומלצת:**\n${getActionPlan(dimension, lowScoreQuestions)}`;
  
  return recommendations;
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

// פונקציה לקבלת תכנית פעולה
const getActionPlan = (dimension: string, lowScoreQuestions: any[]): string => {
  const actionPlans = {
    'S': 'התחל בבניית תכנית אסטרטגית רבעונית, קיים פגישות חזון חודשיות, והתרגל ניתוח סביבה עסקית.',
    'L': 'הקדש 30 דקות יומיות ללמידה, הצטרף לקהילה מקצועית, ובקש משוב שוטף מעמיתים.',
    'I': 'פתח סיפור אישי, תרגל נאומים קצרים, וחפש הזדמנויות להנחות אחרים.',
    'M': 'הגדר את הערכים האישיים, קשר משימות למטרות גדולות, וארגן דיונים על משמעות העבודה.',
    'A': 'תרגל חשיבה יצירתית, חפש הזדמנויות לשיתוף פעולה, ופתח סובלנות לאי-ודאות.',
    'A2': 'עבוד על מודעות עצמית, תרגל שיתוף אישי מבוקר, ובנה אמון דרך עקביות.'
  };
  
  return actionPlans[dimension as keyof typeof actionPlans] || 'פתח תכנית פעולה אישית עם יעדים ברורים ומדידים.';
};

// פונקציה לקביעת צבע הספקטרום
const getSpectrumColor = (score: number, colors: any) => {
  if (score >= 4.5) return colors.primary;
  if (score >= 3.7) return colors.medium;
  if (score >= 2.7) return "#fbbf24";
  if (score >= 1.7) return "#fb923c";
  return "#ef4444";
};

const ResultsDetailCard: React.FC<ResultsDetailCardProps> = ({ dimension, answers = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const levelInfo = evaluateDimensionLevel(dimension.score);
  
  // סינון התשובות הרלוונטיות לממד זה
  const dimensionAnswers = answers.filter(answer => 
    dimension.questions.includes(answer.questionId)
  );
  
  const recommendations = getPersonalizedRecommendations(dimension.dimension, dimensionAnswers);
  const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
  const intensityColor = getColorIntensity(dimension.score, baseColors);

  return (
    <Card className="mb-4 overflow-hidden border-2" style={{ borderColor: intensityColor }}>
      <CardHeader 
        className="pb-4"
        style={{ backgroundColor: baseColors.light }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle 
              className="text-xl mb-2"
              style={{ color: intensityColor }}
            >
              {dimension.title}
            </CardTitle>
            <CardDescription className="text-gray-700">
              {dimension.description}
            </CardDescription>
          </div>
          <div className="text-center ml-4">
            <div 
              className="text-3xl font-bold rounded-full w-16 h-16 flex items-center justify-center text-white shadow-lg border-2"
              style={{ 
                backgroundColor: intensityColor,
                borderColor: baseColors.strongest
              }}
            >
              {dimension.score}
            </div>
            <p 
              className="text-sm font-semibold mt-1"
              style={{ color: intensityColor }}
            >
              {levelInfo.level}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* ספקטרום ויזואלי */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>1.0</span>
              <span>2.5</span>
              <span>5.0</span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              {/* רקע הספקטרום */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${baseColors.weakest} 0%, ${baseColors.weak} 25%, ${baseColors.medium} 50%, ${baseColors.strong} 75%, ${baseColors.strongest} 100%)`
                }}
              />
              {/* מחוון המיקום הנוכחי */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white border-2 rounded-full shadow-lg"
                style={{ 
                  left: `${(dimension.score / 5) * 100}%`,
                  borderColor: intensityColor,
                  marginLeft: '-2px'
                }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {levelInfo.description}
            </p>
          </div>
          
          {/* המלצות מפורטות */}
          <div 
            className="p-4 rounded-lg border-2"
            style={{ 
              backgroundColor: baseColors.light,
              borderColor: intensityColor + '40'
            }}
          >
            <h4 
              className="font-semibold mb-3"
              style={{ color: intensityColor }}
            >
              המלצות מותאמות אישית לפיתוח:
            </h4>
            <div className="text-sm leading-relaxed whitespace-pre-line">{recommendations}</div>
          </div>

          {/* נתונים נוספים */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div 
              className="p-3 rounded border-2"
              style={{ 
                backgroundColor: baseColors.light,
                borderColor: intensityColor + '60'
              }}
            >
              <p className="text-xs text-gray-600">מספר שאלות</p>
              <p 
                className="font-bold text-lg"
                style={{ color: intensityColor }}
              >
                15
              </p>
            </div>
            <div 
              className="p-3 rounded border-2"
              style={{ 
                backgroundColor: baseColors.light,
                borderColor: intensityColor + '60'
              }}
            >
              <p className="text-xs text-gray-600">אחוזון</p>
              <p 
                className="font-bold text-lg"
                style={{ color: intensityColor }}
              >
                {Math.round((dimension.score / 5) * 100)}%
              </p>
            </div>
          </div>

          {/* כפתור להצגת ניתוח מפורט */}
          {answers.length > 0 && (
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <div 
                  className="flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2"
                  style={{ 
                    backgroundColor: intensityColor,
                    borderColor: baseColors.strongest
                  }}
                >
                  <span className="text-sm font-semibold text-white">
                    ניתוח מפורט לתתי-תחומים
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SubDimensionAnalysis dimension={dimension} answers={answers} />
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDetailCard;
