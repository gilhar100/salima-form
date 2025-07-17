
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SurveyResult } from "@/lib/types";

interface SurveyResponse {
  id: string;
  slq_score: number;
  dimension_s: number;
  dimension_l: number;
  dimension_i: number;
  dimension_m: number;
  dimension_a: number;
  dimension_a2: number;
  created_at: string;
}

interface DimensionComparisonCardsProps {
  statistics: SurveyResponse[];
  userResults: SurveyResult;
}

const DimensionComparisonCards: React.FC<DimensionComparisonCardsProps> = ({ statistics, userResults }) => {
  const createDimensionComparison = () => {
    const dimensions = ['S', 'L', 'I', 'M', 'A', 'A2'];
    
    return dimensions.map(dim => {
      const dimKey = `dimension_${dim.toLowerCase()}` as keyof SurveyResponse;
      const scores = statistics.map(s => s[dimKey] as number).filter(s => typeof s === 'number');
      const avg = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      
      const userDimScore = userResults.dimensions[dim as keyof typeof userResults.dimensions].score;
      
      return {
        dimension: userResults.dimensions[dim as keyof typeof userResults.dimensions].title,
        average: Number(avg.toFixed(2)),
        userScore: userDimScore,
        difference: Number((userDimScore - avg).toFixed(2))
      };
    });
  };

  const dimensionData = createDimensionComparison();

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {dimensionData.map((dim, index) => (
        <Card key={index} className="shadow-sm">
          <CardHeader className="pb-2 px-4">
            <CardTitle className="text-base sm:text-lg leading-tight">{dim.dimension}</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">הציון שלך:</span>
                <span className="font-bold text-salima-600 text-sm sm:text-base">{dim.userScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">ממוצע כללי:</span>
                <span className="font-medium text-sm sm:text-base">{dim.average}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">הפרש:</span>
                <span className={`font-medium text-sm sm:text-base ${dim.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {dim.difference > 0 ? '+' : ''}{dim.difference}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DimensionComparisonCards;
