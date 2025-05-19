
import { DimensionResult } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { evaluateDimensionLevel, getDimensionRecommendations } from "@/lib/calculations";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
}

const ResultsDetailCard: React.FC<ResultsDetailCardProps> = ({ dimension }) => {
  const level = evaluateDimensionLevel(dimension.score);
  const recommendations = getDimensionRecommendations(dimension.dimension, dimension.score);
  
  // פונקציה להגדרת צבע הרקע לפי הציון
  const getScoreColorClass = (score: number) => {
    if (score >= 4.5) return "bg-green-100 text-green-800";
    if (score >= 3.7) return "bg-blue-100 text-blue-800";
    if (score >= 2.7) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{dimension.title}</CardTitle>
            <CardDescription>{dimension.description}</CardDescription>
          </div>
          <div className={`text-3xl font-bold rounded-full p-3 ${getScoreColorClass(dimension.score)}`}>
            {dimension.score}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">רמת ביצוע:</h4>
            <p>{level}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-1">נקודות לחיזוק:</h4>
            <p>{recommendations}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDetailCard;
