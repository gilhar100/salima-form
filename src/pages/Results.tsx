
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import BellCurveVisualization from "@/components/BellCurveVisualization";
import ManagementStyleSection from "@/components/ManagementStyleSection";
import { getSurveyWithInsights } from "@/lib/survey-service";
import ResultsHeader from "@/components/results/ResultsHeader";
import ResultsScoreDisplay from "@/components/results/ResultsScoreDisplay";
import ResultsSummaryCards from "@/components/results/ResultsSummaryCards";
import ResultsCharts from "@/components/results/ResultsCharts";
import ResultsAnalysis from "@/components/results/ResultsAnalysis";
import ResultsActions from "@/components/results/ResultsActions";

interface DatabaseInsights {
  insight_strategy?: string;
  insight_adaptive?: string;
  insight_learning?: string;
  insight_inspiration?: string;
  insight_meaning?: string;
  insight_authentic?: string;
  dominant_archetype?: string;
}

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; value: number; }[]>([]);
  const [insights, setInsights] = useState<DatabaseInsights>({});
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insightsAvailable, setInsightsAvailable] = useState(false);

  useEffect(() => {
    console.log('Results page mounted, checking localStorage...');
    const savedResults = localStorage.getItem('salimaResults');
    const savedAnswers = localStorage.getItem('salimaAnswers');
    const savedSurveyId = localStorage.getItem('salimaSurveyId');

    console.log('Loading results from localStorage:');
    console.log('- Results:', savedResults ? 'Found' : 'Not found');
    console.log('- Answers:', savedAnswers ? 'Found' : 'Not found');
    console.log('- Survey ID:', savedSurveyId);

    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setResults(parsedResults);
        console.log('Parsed results:', parsedResults);

        if (savedAnswers) {
          const parsedAnswers = JSON.parse(savedAnswers);
          setAnswers(parsedAnswers);
          console.log('Parsed answers:', parsedAnswers.length, 'answers');
        }

        if (savedSurveyId) {
          setSurveyId(savedSurveyId);
          console.log('Starting delayed insights fetch for survey ID:', savedSurveyId);
          fetchInsightsWithDelay(savedSurveyId);
        } else {
          console.log('No survey ID found, insights will not be loaded');
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
      console.log('No results found in localStorage, redirecting to home');
      toast({
        title: "לא נמצאו תוצאות",
        description: "אנא מלא/י את השאלון תחילה",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const fetchInsightsWithDelay = async (surveyId: string) => {
    setIsLoadingInsights(true);

    // Wait 2-3 seconds before fetching
    console.log('Waiting 2.5 seconds before fetching insights...');
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      console.log('Fetching insights after delay for survey ID:', surveyId);
      const data = await getSurveyWithInsights(surveyId);
      console.log('Insights data received:', data);

      const fetchedInsights = {
        insight_strategy: data.insight_strategy,
        insight_adaptive: data.insight_adaptive,
        insight_learning: data.insight_learning,
        insight_inspiration: data.insight_inspiration,
        insight_meaning: data.insight_meaning,
        insight_authentic: data.insight_authentic,
        dominant_archetype: data.dominant_archetype
      };

      setInsights(fetchedInsights);

      // Check if any insights are available
      const hasAnyInsight = Object.values(fetchedInsights).some(insight => insight && insight.trim() !== '');
      setInsightsAvailable(hasAnyInsight);
      console.log('Insights availability check:', hasAnyInsight);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsightsAvailable(false);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleRefreshInsights = () => {
    if (surveyId) {
      console.log('Manual refresh of insights requested');
      fetchInsightsWithDelay(surveyId);
    }
  };

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-black text-base">טוען תוצאות...</span>
      </div>
    );
  }

  console.log('Rendering results page with data:', results);

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
              
              <ManagementStyleSection dominantArchetype={insights.dominant_archetype || null} />
              
              <ResultsSummaryCards 
                highestDimension={highestDimension}
                lowestDimension={lowestDimension}
              />
              
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
