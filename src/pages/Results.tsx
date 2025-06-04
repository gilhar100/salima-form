import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BarChart3, Award } from "lucide-react";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";
import ParameterBars from "@/components/ParameterBars";
const Results = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [answers, setAnswers] = useState<{
    questionId: number;
    value: number;
  }[]>([]);
  useEffect(() => {
    const savedResults = localStorage.getItem('salimaResults');
    const savedAnswers = localStorage.getItem('salimaAnswers');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);

      // טעינת התשובות לניתוח מפורט
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
      }
      toast({
        title: "תוצאות השאלון",
        description: "הנתונים כבר נשמרו במערכת בהצלחה"
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
    return <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>;
  }

  // חישוב סטטיסטיקות נוספות ללא חשיפת ציונים מספריים
  const highestDimension = Object.values(results.dimensions).reduce((prev, current) => prev.score > current.score ? prev : current);
  const lowestDimension = Object.values(results.dimensions).reduce((prev, current) => prev.score < current.score ? prev : current);
  return <div className="container py-6 max-w-6xl mx-auto px-4">
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
                {results.slq}
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
          
          {/* גרף הרדאר עם ציון SLQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <ResultsRadar result={results} hideScores={true} />
            </div>
            
            {/* פרמטרים צבעוניים */}
            
          </div>
          
          {/* כרטיסי פירוט */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-salima-800 mb-4">
              ניתוח מפורט לכל ממד
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {Object.values(results.dimensions).map(dimension => <ResultsDetailCard key={dimension.dimension} dimension={dimension} answers={answers} />)}
            </div>
          </div>
          
          <div className="text-center text-green-600 font-medium text-lg">
            ✓ הנתונים נשמרו בהצלחה במערכת
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-4 justify-center flex-wrap">
        <Button onClick={() => navigate('/statistics')} variant="outline" className="w-auto bg-blue-50 hover:bg-blue-100 border-blue-200">
          <BarChart3 className="mr-2 h-4 w-4" />
          השוואה סטטיסטית
        </Button>
        
        <Button onClick={() => navigate('/')} className="bg-salima-600 hover:bg-salima-700 w-auto">
          חזור לעמוד הבית
        </Button>
      </div>
    </div>;
};
export default Results;