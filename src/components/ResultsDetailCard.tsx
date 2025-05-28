import { DimensionResult } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dimensionColors } from "./ResultsRadar";
import SubDimensionAnalysis from "./SubDimensionAnalysis";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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

// המלצות מפורטות לכל ממד ורמת ציון
const getDetailedRecommendations = (dimension: string, score: number) => {
  const recommendations = {
    S: {
      high: "המשך לפתח חשיבה אסטרטגית ארוכת טווח. הנהג תהליכי תכנון מובנים ובחן תרחישים עתידיים. שלב כלים אנליטיים מתקדמים בקבלת החלטות.",
      medium: "השקע בפיתוח יכולות תכנון אסטרטגי. למד כלים לניתוח סביבה עסקית ובנה תכניות פעולה ברורות עם יעדים מדידים.",
      low: "התחל בהגדרת חזון ברור ויעדים קצרי טווח. קח קורס בחשיבה אסטרטגית ופתח הרגלי בחינה שוטפת של הנחות יסוד."
    },
    L: {
      high: "המשך להוביל תרבות למידה ארגונית. יזם פרויקטי למידה בין-מקצועיים ושתף ידע עם עמיתים. בנה מערכות לתיעוד ושיתוף תובנות.",
      medium: "הקדש זמן יומי ללמידה והתפתחות. חפש מנטורים ורעיונות מתחומים שונים. שלב למידה מכישלונות בתהליכי העבודה.",
      low: "התחל בקריאה יומית של 15 דקות בתחום המקצועי. הצטרף לקהילות מקצועיות ובקש משוב שוטף מעמיתים."
    },
    I: {
      high: "המשך להיות מקור השראה ופתח מנהיגות השראתית בדרג הבא. בנה תכניות חונכות ושתף את סיפור החזון בפלטפורמות שונות.",
      medium: "עבוד על פיתוח נרטיב אישי משכנע. התרגל לספר סיפורים מעוררי השראה ופתח יכולת חיבור רגשי עם הצוות.",
      low: "התחל בזיהוי הערכים האישיים שלך ותרגם אותם למסרים ברורים. התרגל לשתף דוגמאות אישיות ולחבר לחזון הארגוני."
    },
    M: {
      high: "המשך לחזק את תחושת השליחות בארגון. פתח תכניות לחיבור אישי של עובדים למטרות הארגון ובנה מדדי משמעות.",
      medium: "עבוד על יצירת קשר בין המשימות היומיומיות לתכלית הגדולה. ארגן דיונים על ערכים ושאף את העובדים במסע משמעותי.",
      low: "התחל בהגדרה אישית של המשמעות בעבודתך. חבר כל משימה למטרה גדולה יותר והדגש את הערך החברתי של הפעילות."
    },
    A: {
      high: "המשך להוביל שינויים ופתח יכולות אדפטיביות בצוות. בנה מערכות תגובה מהירה לשינויים ויזם פרויקטי חדשנות.",
      medium: "פתח גמישות מחשבתית ותרגל קבלת החלטות בתנאי אי-ודאות. חפש הזדמנויות ללמידה מתוך שינויים.",
      low: "התחל בשינויים קטנים ובהדרגה. פתח סובלנות לאי-ודאות ותרגל חשיבה מחוץ לקופסה בבעיות פשוטות."
    },
    A2: {
      high: "המשך להיות מודל לאותנטיות ובנה תרבות של שקיפות ואמון. הנהג דיאלוגים פתוחים ואמיתיים עם הצוות.",
      medium: "עבוד על פיתוח המודעות העצמית ושקיפות בתקשורת. תרגל משוב הדדי ואמיתי עם העובדים.",
      low: "התחל בזיהוי הערכים האישיים ופעל בהתאם להם באופן עקבי. תרגל שיתוף אישי מבוקר ובנה אמון הדרגתי."
    }
  };

  const dimRec = recommendations[dimension as keyof typeof recommendations];
  if (score >= 3.7) return dimRec.high;
  if (score >= 2.7) return dimRec.medium;
  return dimRec.low;
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
  const recommendations = getDetailedRecommendations(dimension.dimension, dimension.score);
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
              className="font-semibold mb-2"
              style={{ color: intensityColor }}
            >
              המלצות לפיתוח:
            </h4>
            <p className="text-sm leading-relaxed">{recommendations}</p>
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
                {dimension.questions.length}
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
