
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
import PersonalColorProfile from "@/components/PersonalColorProfile";
import { getSurveyWithInsights } from "@/lib/survey-service";
import DivergingBarChart from "@/components/DivergingBarChart";

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
    // Add print-specific styles before printing
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 1.5cm;
        }
        body {
          font-family: Arial, sans-serif !important;
          font-size: 14pt !important;
          line-height: 1.4 !important;
          color: black !important;
          background: white !important;
        }
        .container {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .print\\:hidden {
          display: none !important;
        }
        .card {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: 1.5rem !important;
          box-shadow: none !important;
          border: 1px solid #e5e7eb !important;
        }
        .grid {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        h1, h2, h3 {
          break-after: avoid;
          page-break-after: avoid;
          font-size: 18pt !important;
          margin-bottom: 12pt !important;
        }
        .recharts-wrapper {
          break-inside: avoid;
          page-break-inside: avoid;
          width: 100% !important;
          height: auto !important;
          min-height: 300px !important;
        }
        .recharts-surface {
          width: 100% !important;
          height: auto !important;
        }
        .chart-container {
          width: 100% !important;
          height: 400px !important;
          page-break-inside: avoid;
          margin-bottom: 20pt !important;
        }
        .mobile-stack {
          flex-direction: column !important;
          width: 100% !important;
        }
        .mobile-stack > * {
          width: 100% !important;
          margin-bottom: 20pt !important;
        }
      }
    `;
    document.head.appendChild(printStyles);
    
    // Trigger browser print dialog
    window.print();
    
    // Remove print styles after a delay
    setTimeout(() => {
      document.head.removeChild(printStyles);
    }, 1000);
    
    toast({
      title: "הורדת PDF",
      description: "בחר 'שמור כ-PDF' בחלון ההדפסה",
    });
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
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-salima-50 to-blue-50">
            <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
              <CardTitle className="font-bold text-salima-800 mb-2 text-xl sm:text-2xl">
                תוצאות שאלון מנהיגות
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                הנה התוצאות המפורטות שלך מהשאלון - {new Date(results.date).toLocaleDateString('he-IL')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              {/* תצוגת ציון SLQ מרכזי */}
              <div className="flex justify-center">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-2 border-salima-200 text-center w-full max-w-sm">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-salima-600" />
                    <h3 className="font-bold text-salima-800 text-lg sm:text-xl">
                      ציון מנהיגות כללי
                    </h3>
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-salima-600 mb-2">
                    {results.slq}/5
                  </div>
                </div>
              </div>

              {/* תקציר כללי ללא ציונים מספריים */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold mb-2 text-gray-700 text-base sm:text-lg">הממד החזק ביותר</h3>
                  <div className="font-bold text-gray-600 mb-1 text-lg sm:text-xl">
                    {highestDimension.title}
                  </div>
                  <p className="text-black text-sm sm:text-base">אזור של כוח וחוזק</p>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold mb-2 text-gray-700 text-base sm:text-lg">הממד לפיתוח</h3>
                  <div className="font-bold text-gray-600 mb-1 text-lg sm:text-xl">
                    {lowestDimension.title}
                  </div>
                  <p className="text-black text-sm sm:text-base">אזור להשקעה ופיתוח</p>
                </div>
              </div>
              
              {/* גרף הדיברג'ינג עם גרף הרדאר - מחולק לעמודים נפרדים במובייל */}
              <div className="space-y-4 sm:space-y-6">
                <div className="mobile-stack flex flex-col lg:flex-row gap-4 sm:gap-6">
                  <div className="w-full lg:w-1/2">
                    <div className="chart-container">
                      <DivergingBarChart result={results} />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm chart-container">
                      <ResultsRadar result={results} hideScores={true} />
                    </div>
                  </div>
                </div>
                
                {/* Personal Color Profile - תצוגה מלאה */}
                <div className="w-full chart-container">
                  <PersonalColorProfile result={results} />
                </div>
              </div>
              
              {/* כרטיסי פירוט עם תובנות מהמסד נתונים */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="font-bold text-salima-800 text-lg sm:text-xl">
                    ניתוח מפורט לכל ממד
                  </h2>
                  {!isLoadingInsights && !insightsAvailable && (
                    <Button 
                      onClick={handleRefreshInsights}
                      variant="outline"
                      className="flex items-center gap-2 print:hidden text-sm sm:text-base w-full sm:w-auto"
                    >
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                      רענן תובנות
                    </Button>
                  )}
                </div>
                
                {isLoadingInsights && (
                  <div className="text-center text-black mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg print:hidden text-sm sm:text-base">
                    <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                    התובנות נטענות כעת... אנא המתן מספר שניות
                  </div>
                )}
                
                {!isLoadingInsights && !insightsAvailable && (
                  <div className="text-center text-orange-600 mb-4 p-3 sm:p-4 bg-orange-50 rounded-lg print:hidden text-sm sm:text-base">
                    התובנות נטענות כעת... אנא המתן מספר שניות והטען מחדש
                  </div>
                )}
                
                <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
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
              
              <div className="text-center text-green-600 font-medium print:hidden text-base sm:text-lg">
                ✓ הנתונים נשמרו בהצלחה במערכת
              </div>
            </CardContent>
          </Card>
          
          {/* Bell curve at the end of the results/analysis page */}
          <div className="mb-6 sm:mb-8 chart-container">
            <BellCurveVisualization userScore={results.slq} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6 print:hidden px-4">
            <Button 
              onClick={() => navigate('/')} 
              className="bg-salima-600 hover:bg-salima-700 w-full sm:w-auto text-sm sm:text-base"
            >
              חזור לעמוד הבית
            </Button>
            <Button 
              onClick={handleDownloadPDF} 
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto flex items-center gap-2 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              הורד דוח אישי (PDF)
            </Button>
          </div>
        </div>
      </div>
      
      {/* Copyright footer */}
      <div className="text-center text-black p-4 text-sm sm:text-base">
        ™ כל הזכויות שמורות לד״ר יוסי שרעבי
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
