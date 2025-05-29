
import { DimensionResult } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { dimensionColors } from "./ResultsRadar";
import { 
  evaluateDimensionLevel, 
  getColorIntensity
} from "@/lib/dimension-analysis";
import DimensionHeader from "./DimensionHeader";
import DimensionSpectrum from "./DimensionSpectrum";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers?: { questionId: number; value: number }[];
}

const ResultsDetailCard: React.FC<ResultsDetailCardProps> = ({ dimension, answers = [] }) => {
  const levelInfo = evaluateDimensionLevel(dimension.score);
  
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDetailCard;
