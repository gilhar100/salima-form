
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import BellCurveVisualization from "@/components/BellCurveVisualization";
import ManagementStyleSection from "@/components/ManagementStyleSection";
import { useInsights } from "@/hooks/useInsights";
import ResultsHeader from "@/components/results/ResultsHeader";
import ResultsScoreDisplay from "@/components/results/ResultsScoreDisplay";
import ResultsSummaryCards from "@/components/results/ResultsSummaryCards";
import ResultsCharts from "@/components/results/ResultsCharts";
import ResultsAnalysis from "@/components/results/ResultsAnalysis";
import ResultsActions from "@/components/results/ResultsActions";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; value: number; }[]>([]);
  const [surveyId, setSurveyId] = useState<string | null>(null);

  const { insights, isLoadingInsights, insightsAvailable, handleRefreshInsights } = useInsights(surveyId);

  useEffect(() => {
    const savedResults = localStorage.getItem('salimaResults');
    const savedAnswers = localStorage.getItem('salimaAnswers');
    const savedSurveyId = localStorage.getItem('salimaSurveyId');

    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setResults(parsedResults);

        if (savedAnswers) {
          const parsedAnswers = JSON.parse(savedAnswers);
          setAnswers(parsedAnswers);
        }

        if (savedSurveyId) {
          setSurveyId(savedSurveyId);
        }

        toast({
          title: "תוצאות השאלון",
          description: "הנתונים כבר נשמרו במערכת בהצלחה"
        });
      } catch (error) {
        console.error('Error parsing saved results:', error);
        toast({
          title: "שגיאה בטעינת התוצאות",
          description: "אירעה שגיאה בטעינת התוצאות השמורות",
          variant: "destructive"
        });
        navigate('/');
      }
    } else {
      toast({
        title: "לא נמצאו תוצאות",
        description: "אנא מלא/י את השאלון תחילה",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-black text-base">טוען תוצאות...</span>
      </div>
    );
  }

  const highestDimension = Object.values(results.dimensions).reduce((prev, current) => 
    prev.score > current.score ? prev : current
  );

  const lowestDimension = Object.values(results.dimensions).reduce((prev, current) => 
    prev.score < current.score ? prev : current
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container py-4 sm:py-6 max-w-full xl:max-w-6xl mx-auto px-4 sm:px-6">
          <ResultsHeader />
          
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-salima-50 to-blue-50">
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <ResultsScoreDisplay slq={results.slq} />
              
              <ResultsSummaryCards 
                highestDimension={highestDimension}
                lowestDimension={lowestDimension}
              />
              
              <ManagementStyleSection dominantArchetype={insights.dominant_archetype || null} />
              
              <ResultsCharts result={results} />
              
              <ResultsAnalysis
                result={results}
                answers={answers}
                insights={insights}
                isLoadingInsights={isLoadingInsights}
                insightsAvailable={insightsAvailable}
                onRefreshInsights={handleRefreshInsights}
              />
              
              <div className="text-center text-green-600 font-medium print:hidden text-base sm:text-lg">
                ✓ הנתונים נשמרו בהצלחה במערכת
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-6 sm:mb-8 chart-container">
            <BellCurveVisualization userScore={results.slq} />
          </div>
          
          <ResultsActions />
        </div>
      </div>
      
      <div className="text-center text-black p-4 text-sm sm:text-base">
        ™ כל הזכויות שמורות לד״ר יוסי שרעבי
      </div>
    </div>
  );
};

export default Results;
