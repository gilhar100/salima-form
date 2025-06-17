
import { DimensionResult } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { dimensionColors } from "./ResultsRadar";
import { 
  evaluateDimensionLevel, 
  getColorIntensity,
  getPersonalizedAnalysis
} from "@/lib/dimension-analysis";
import DimensionHeader from "./DimensionHeader";
import ParameterIntensityBar from "./ParameterIntensityBar";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers?: { questionId: number; value: number }[];
}

const ResultsDetailCard: React.FC<ResultsDetailCardProps> = ({ dimension, answers = [] }) => {
  const levelInfo = evaluateDimensionLevel(dimension.score);
  
  const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
  const intensityColor = getColorIntensity(dimension.score, baseColors);

  // קבלת תשובות רלוונטיות לממד זה
  const dimensionAnswers = answers.filter(answer => 
    dimension.questions.includes(answer.questionId)
  );

  // יצירת מזהה ייחודי למשתמש (על בסיס התשובות)
  const userIdentifier = dimensionAnswers
    .map(a => `${a.questionId}-${a.value}`)
    .join('_');

  // יצירת ניתוח מותאם אישית ללא חשיפת ציונים
  const personalizedAnalysis = getPersonalizedAnalysis(
    dimension.dimension, 
    dimensionAnswers, 
    userIdentifier
  );

  // חישוב אחוז עוצמה עבור הבר הצבעוני
  const intensityPercentage = (dimension.score / 5) * 100;

  return (
    <Card className="mb-4 overflow-hidden border-2" style={{ borderColor: intensityColor }}>
      <DimensionHeader
        title={dimension.title}
        description={dimension.description}
        score={dimension.score}
        level={levelInfo.level}
        baseColors={baseColors}
        intensityColor={intensityColor}
        hideScore={true}
      />
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* בר עוצמה צבעוני */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">עוצמת הממד</h4>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div 
                className="h-full rounded-lg transition-all duration-700 ease-out"
                style={{ 
                  width: `${intensityPercentage}%`,
                  backgroundColor: intensityColor,
                  opacity: 0.8 + (dimension.score / 5) * 0.2
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {levelInfo.level}
                </span>
              </div>
            </div>
          </div>

          {/* Parameter intensity bar with parameter-specific color */}
          <ParameterIntensityBar
            score={dimension.score}
            parameterKey={dimension.dimension}
            parameterName={dimension.title}
          />
          
          {/* פסקת ניתוח מקיפה */}
          {personalizedAnalysis && (
            <div 
              className="p-5 rounded-lg border-2 text-base leading-relaxed"
              style={{ 
                backgroundColor: baseColors.light,
                borderColor: intensityColor + '40'
              }}
            >
              <h4 
                className="font-semibold mb-4 text-lg"
                style={{ color: intensityColor }}
              >
                ניתוח מותאם אישית:
              </h4>
              <div 
                className="text-right text-gray-800 leading-7"
                dir="rtl"
                style={{ lineHeight: '1.8' }}
              >
                {personalizedAnalysis}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDetailCard;
