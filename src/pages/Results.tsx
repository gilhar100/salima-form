import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Award, RefreshCw, Download } from "lucide-react";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";
import BellCurveVisualization from "@/components/BellCurveVisualization";
import MedianComparisonChart from "@/components/MedianComparisonChart";
import PersonalColorProfile from "@/components/PersonalColorProfile";
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
      };
      
      setInsights(fetchedInsights);
      
      // Check if any insights are available
      const hasAnyInsight = Object.values(fetchedInsights).some(insight => 
        insight && insight.trim() !== ''
      );
      
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

  const handleDownloadPDF = () => {
    // Trigger browser print dialog which can save as PDF
    window.print();
    toast({
      title: "הורדת PDF",
      description: "בחר 'שמור כ-PDF' בחלון ההדפסה",
    });
  };

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 style={{ width: '20px', height: '20px' }} className="animate-spin" />
        <span className="ml-2 text-black" style={{ fontSize: '16px' }}>טוען תוצאות...</span>
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
          <CardTitle className="font-bold text-salima-800 mb-2" style={{ fontSize: '22px' }}>
            תוצאות שאלון מנהיגות SALIMA-WOCA
          </CardTitle>
          <CardDescription style={{ fontSize: '18px' }}>
            הנה התוצאות המפורטות שלך מהשאלון - {new Date(results.date).toLocaleDateString('he-IL')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* תצוגת ציון SLQ מרכזי */}
          <div className="flex justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-salima-200 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Award style={{ width: '20px', height: '20px' }} className="text-salima-600" />
                <h3 className="font-bold text-salima-800" style={{ fontSize: '22px' }}>
                  ציון מנהיגות כללי
                </h3>
              </div>
              <div className="text-5xl font-bold text-salima-600 mb-2">
                {results.slq}/5
              </div>
              <p className="text-black" style={{ fontSize: '16px' }}>
                ציון SLQ (Strategic Leadership Quotient)
              </p>
            </div>
          </div>

          {/* תקציר כללי ללא ציונים מספריים */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold mb-2 text-green-700" style={{ fontSize: '18px' }}>הממד החזק ביותר</h3>
              <div className="font-bold text-green-600 mb-1" style={{ fontSize: '22px' }}>
                {highestDimension.title}
              </div>
              <p className="text-black" style={{ fontSize: '16px' }}>אזור של כוח וחוזק</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <h3 className="font-semibold mb-2 text-orange-700" style={{ fontSize: '18px' }}>הממד לפיתוח</h3>
              <div className="font-bold text-orange-600 mb-1" style={{ fontSize: '22px' }}>
                {lowestDimension.title}
              </div>
              <p className="text-black" style={{ fontSize: '16px' }}>אזור להשקעה ופיתוח</p>
            </div>
          </div>
          
          {/* גרף הרדאר עם גרף השוואה לחציון */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MedianComparisonChart result={results} />
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <ResultsRadar result={results} hideScores={true} />
            </div>
          </div>
          
          {/* Personal Color Profile - New visualization */}
          <div className="w-full">
            <PersonalColorProfile result={results} />
          </div>
          
          {/* כרטיסי פירוט עם תובנות מהמסד נתונים */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-salima-800" style={{ fontSize: '22px' }}>
                ניתוח מפורט לכל ממד
              </h2>
              {!isLoadingInsights && !insightsAvailable && (
                <Button 
                  onClick={handleRefreshInsights}
                  variant="outline"
                  className="flex items-center gap-2"
                  style={{ fontSize: '16px' }}
                >
                  <RefreshCw style={{ width: '20px', height: '20px' }} />
                  רענן תובנות
                </Button>
              )}
            </div>
            
            {isLoadingInsights && (
              <div className="text-center text-black mb-4 p-4 bg-blue-50 rounded-lg" style={{ fontSize: '16px' }}>
                <Loader2 style={{ width: '20px', height: '20px' }} className="animate-spin inline-block mr-2" />
                התובנות נטענות כעת... אנא המתן מספר שניות
              </div>
            )}
            
            {!isLoadingInsights && !insightsAvailable && (
              <div className="text-center text-orange-600 mb-4 p-4 bg-orange-50 rounded-lg" style={{ fontSize: '16px' }}>
                התובנות נטענות כעת... אנא המתן מספר שניות והטען מחדש
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
          
          <div className="text-center text-green-600 font-medium" style={{ fontSize: '18px' }}>
            ✓ הנתונים נשמרו בהצלחה במערכת
          </div>
        </CardContent>
      </Card>
      
      {/* Bell curve at the end of the results/analysis page */}
      <div className="mb-8">
        <BellCurveVisualization userScore={results.slq} />
      </div>
      
      <div className="flex gap-4 justify-center flex-wrap mb-6">
        <Button onClick={() => navigate('/')} className="bg-salima-600 hover:bg-salima-700 w-auto" style={{ fontSize: '16px' }}>
          חזור לעמוד הבית
        </Button>
        <Button 
          onClick={handleDownloadPDF} 
          className="bg-green-600 hover:bg-green-700 w-auto flex items-center gap-2"
          style={{ fontSize: '16px' }}
        >
          <Download style={{ width: '20px', height: '20px' }} />
          הורד דוח אישי (PDF)
        </Button>
      </div>
      
      {/* Copyright footer */}
      <div className="text-center text-black" style={{ fontSize: '16px' }}>
        כל הזכויות שמורות לד״ר יוסי שרעבי
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
  return insightKey && insights[insightKey] && insights[insightKey]!.trim() !== '' 
    ? insights[insightKey] 
    : undefined;
};

export default Results;
