
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { saveSurveyToDatabase } from "@/lib/survey-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    const savedResults = localStorage.getItem('salimaResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
      
      // שמירת הנתונים במסד הנתונים אוטומטית
      handleSaveData(parsedResults);
    } else {
      toast({
        title: "לא נמצאו תוצאות",
        description: "אנא מלא/י את השאלון תחילה",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const handleSaveData = async (surveyResults: SurveyResult) => {
    if (dataSaved) return;
    
    setLoading(true);
    try {
      await saveSurveyToDatabase(surveyResults, true, false);
      setDataSaved(true);
      
      toast({
        title: "הנתונים נשמרו בהצלחה",
        description: "תוצאות השאלון נשמרו במערכת",
      });
    } catch (error) {
      console.error('שגיאה בשמירת הנתונים:', error);
      toast({
        title: "שגיאה בשמירת הנתונים",
        description: "אירעה שגיאה בשמירת התוצאות",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-4xl mx-auto px-4">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-salima-800">
            תוצאות שאלון מנהיגות SALIMA-WOCA
          </CardTitle>
          <CardDescription>
            הנה התוצאות שלך מהשאלון - {results.date}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">ציון SLQ כולל</h3>
            <div className="text-3xl font-bold text-salima-600">
              {results.slq.toFixed(1)}
            </div>
          </div>
          
          <ResultsRadar result={results} />
          
          <div className="grid gap-4 md:grid-cols-2">
            {Object.values(results.dimensions).map((dimension) => (
              <ResultsDetailCard key={dimension.dimension} dimension={dimension} />
            ))}
          </div>
          
          {loading && (
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>שומר נתונים...</span>
            </div>
          )}
          
          {dataSaved && (
            <div className="text-center text-green-600 font-medium">
              ✓ הנתונים נשמרו בהצלחה במערכת
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => navigate('/survey')}
          variant="outline"
          className="w-auto"
        >
          מלא/י שאלון חדש
        </Button>
        
        <Button
          onClick={() => navigate('/')}
          className="bg-salima-600 hover:bg-salima-700 w-auto"
        >
          חזור לעמוד הבית
        </Button>
      </div>
    </div>
  );
};

export default Results;
