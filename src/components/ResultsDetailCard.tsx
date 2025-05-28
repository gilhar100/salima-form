
import { DimensionResult } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { dimensionColors } from "./ResultsRadar";
import SubDimensionAnalysis from "./SubDimensionAnalysis";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { 
  evaluateDimensionLevel, 
  getColorIntensity, 
  getPersonalizedAnalysis 
} from "@/lib/dimension-analysis";
import DimensionHeader from "./DimensionHeader";
import DimensionSpectrum from "./DimensionSpectrum";
import DimensionAnalysis from "./DimensionAnalysis";
import DimensionStats from "./DimensionStats";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers?: { questionId: number; value: number }[];
}

const ResultsDetailCard: React.FC<ResultsDetailCardProps> = ({ dimension, answers = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const levelInfo = evaluateDimensionLevel(dimension.score);
  
  // סינון התשובות הרלוונטיות לממד זה
  const dimensionAnswers = answers.filter(answer => 
    dimension.questions.includes(answer.questionId)
  );
  
  const analysis = getPersonalizedAnalysis(dimension.dimension, dimensionAnswers);
  const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
  const intensityColor = getColorIntensity(dimension.score, baseColors);

  return (
    <Card className="mb-4 overflow-hidden border-2" style={{ borderColor: intensityColor }}>
      <DimensionHeader
        title={dimension.title}
        description={dimension.description}
        score={dimension.score}
        level={levelInfo.level}
        baseColors={baseColors}
        intensityColor={intensityColor}
      />
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <DimensionSpectrum
            score={dimension.score}
            baseColors={baseColors}
            intensityColor={intensityColor}
            levelDescription={levelInfo.description}
          />
          
          <DimensionAnalysis
            analysis={analysis}
            baseColors={baseColors}
            intensityColor={intensityColor}
          />

          <DimensionStats
            score={dimension.score}
            baseColors={baseColors}
            intensityColor={intensityColor}
          />

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
