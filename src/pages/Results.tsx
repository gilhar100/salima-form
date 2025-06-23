import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Award } from "lucide-react";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";
import BellCurveVisualization from "@/components/BellCurveVisualization";
import MedianComparisonChart from "@/components/MedianComparisonChart";
import { getSurveyWithInsights } from "@/lib/survey-service";

interface DatabaseInsights {
  insight_strategy?: string;
  insight_adaptive?: string;
  insight_learning?: string;
  insight_inspiration?: string;
  insight_meaning?: string;
  insight_authentic?: string;
}

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; value: number; }[]>([]);
  const [insights, setInsights] = useState<DatabaseInsights>({});
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

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
          console.log('Fetching insights for survey ID:', savedSurveyId);
          fetchInsights(savedSurveyId);
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

  const fetchInsights = async (surveyId: string) => {
    setIsLoadingInsights(true);
    try {
      console.log('Fetching insights for survey ID:', surveyId);
      const data = await getSurveyWithInsights(surveyId);
      console.log('Insights data received:', data);
      
      setInsights({
        insight_strategy: data.insight_strategy,
        insight_adaptive: data.insight_adaptive,
        insight_learning: data.insight_learning,
        insight_inspiration: data.insight_inspiration,
        insight_meaning: data.insight_meaning,
        insight_authentic: data.insight_authentic,
      });
      
      console.log('Insights set successfully');
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">טוען תוצאות...</span>
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
    <div className="container py-6 max-w-6xl mx-auto px-4">
      <Card className="mb-6 bg-gradient-to-r from-salima-50 to-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-salima-800 mb-2">
            תוצאות שאלון מנהיגות SALIMA-WOCA
          </CardTitle>
          <CardDescription className="text-lg">
            הנה התוצאות המפורטות שלך מהשאלון - {new Date(results.date).toLocaleDateString('he-IL')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* תצוגת ציון SLQ מרכזי */}
          <div className="flex justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-salima-200 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Award className="h-8 w-8 text-salima-600" />
                <h3 className="text-2xl font-bold text-salima-800">
                  ציון מנהיגות כללי
                </h3>
              </div>
              <div className="text-5xl font-bold text-salima-600 mb-2">
                {results.slq}/5
              </div>
              <p className="text-sm text-gray-600">
                ציון SLQ (Strategic Leadership Quotient)
              </p>
            </div>
          </div>

          {/* תקציר כללי ללא ציונים מספריים */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="text-lg font-semibold mb-2 text-green-700">הממד החזק ביותר</h3>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {highestDimension.title}
              </div>
              <p className="text-sm text-gray-600">אזור של כוח וחוזק</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <h3 className="text-lg font-semibold mb-2 text-orange-700">הממד לפיתוח</h3>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {lowestDimension.title}
              </div>
              <p className="text-sm text-gray-600">אזור להשקעה ופיתוח</p>
            </div>
          </div>
          
          {/* גרף הרדאר עם גרף השוואה לחציון */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MedianComparisonChart result={results} />
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <ResultsRadar result={results} hideScores={true} />
            </div>
          </div>
          
          {/* כרטיסי פירוט עם תובנות מהמסד נתונים */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-salima-800 mb-4">
              ניתוח מפורט לכל ממד
            </h2>
            {isLoadingInsights && (
              <div className="text-center text-gray-600 mb-4">
                <Loader2 className="h-6 w-6 animate-spin inline-block mr-2" />
                טוען ניתוח מותאם אישית...
              </div>
            )}
            <div className="grid gap-6 lg:grid-cols-2">
              {Object.values(results.dimensions).map(dimension => (
                <ResultsDetailCard 
                  key={dimension.dimension} 
                  dimension={dimension} 
                  answers={answers}
                  insight={getInsightForDimension(dimension.dimension, insights)}
                  isLoadingInsight={isLoadingInsights}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center text-green-600 font-medium text-lg">
            ✓ הנתונים נשמרו בהצלחה במערכת
          </div>
        </CardContent>
      </Card>
      
      {/* Bell curve at the end of the results/analysis page */}
      <div className="mb-8">
        <BellCurveVisualization userScore={results.slq} />
      </div>
      
      <div className="flex gap-4 justify-center flex-wrap">
        <Button onClick={() => navigate('/')} className="bg-salima-600 hover:bg-salima-700 w-auto">
          חזור לעמוד הבית
        </Button>
      </div>
    </div>
  );
};

// Helper function to get the appropriate insight for each dimension
const getInsightForDimension = (dimension: string, insights: DatabaseInsights): string | undefined => {
  const dimensionInsightMap: Record<string, keyof DatabaseInsights> = {
    'S': 'insight_strategy',
    'L': 'insight_learning',
    'I': 'insight_inspiration',
    'M': 'insight_meaning',
    'A': 'insight_adaptive',
    'A2': 'insight_authentic'
  };
  
  const insightKey = dimensionInsightMap[dimension];
  return insightKey ? insights[insightKey] : undefined;
};

export default Results;
