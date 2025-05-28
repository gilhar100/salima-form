
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BarChart3 } from "lucide-react";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('salimaResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
      
      toast({
        title: "תוצאות השאלון",
        description: "הנתונים כבר נשמרו במערכת בהצלחה",
      });
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
          
          <div className="text-center text-green-600 font-medium">
            ✓ הנתונים נשמרו בהצלחה במערכת
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-4 justify-center flex-wrap">
        <Button
          onClick={() => navigate('/statistics')}
          variant="outline"
          className="w-auto bg-blue-50 hover:bg-blue-100 border-blue-200"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          השוואה סטטיסטית
        </Button>
        
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
