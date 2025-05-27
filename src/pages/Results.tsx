
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { saveSurveyToDatabase } from "@/lib/survey-service";
import { sendResultsByEmail } from "@/lib/email-service";
import { useToast } from "@/hooks/use-toast";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";
import { useIsMobile } from "@/hooks/use-mobile";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  
  useEffect(() => {
    const savedResults = localStorage.getItem('salimaResults');
    
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
      // שמירה אוטומטית במסד הנתונים (המשתמש כבר נתן הסכמה)
      handleAutoSave(parsedResults);
    } else {
      navigate('/survey');
    }
  }, [navigate]);

  const handleAutoSave = async (results: SurveyResult) => {
    setSaving(true);
    try {
      // המשתמש כבר נתן הסכמה במחקר בתחילת השאלון
      await saveSurveyToDatabase(results, true, true);
      
      toast({
        title: "התוצאות נשמרו בהצלחה",
        description: "הנתונים נשמרו למחקר באופן אנונימי",
      });
    } catch (error) {
      console.error("שגיאה בשמירת הנתונים:", error);
      toast({
        title: "שגיאה בשמירה",
        description: "לא ניתן היה לשמור את הנתונים",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSendEmail = async () => {
    if (!results) return;
    
    setEmailSending(true);
    try {
      await sendResultsByEmail(results);
      
      toast({
        title: "התוצאות נשלחו במייל",
        description: "התוצאות נשלחו בהצלחה לכתובת המייל שלך",
      });
    } catch (error) {
      console.error("שגיאה בשליחת המייל:", error);
      toast({
        title: "שגיאה בשליחת המייל",
        description: "לא ניתן היה לשלוח את התוצאות במייל",
        variant: "destructive"
      });
    } finally {
      setEmailSending(false);
    }
  };
  
  const handleNewSurvey = () => {
    localStorage.removeItem('salimaResults');
    navigate('/survey');
  };

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <p className="text-lg sm:text-xl text-center">טוען תוצאות...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-4 px-4 print:py-0 print:px-0">
      <div className="mb-6 text-center print:mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-salima-800 mb-2">תוצאות השאלון שלך</h1>
        <p className="text-sm sm:text-base text-gray-600 px-2">
          ניתוח מפורט של כישורי המנהיגות שלך
        </p>
      </div>
      
      <div className={`grid gap-4 sm:gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} mb-6 sm:mb-8`}>
        <ResultsRadar result={results} />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">סיכום התוצאות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">ציון SLQ כללי</p>
                <p className="text-3xl sm:text-4xl font-bold text-salima-600">{results.slq}</p>
              </div>
              
              <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-2'}`}>
                {Object.values(results.dimensions).map((dimension) => (
                  <div key={dimension.dimension} className="text-center p-2 sm:p-3 border rounded-lg">
                    <p className="font-medium text-xs sm:text-sm leading-tight">{dimension.title}</p>
                    <p className="text-lg sm:text-xl font-bold text-salima-600 mt-1">{dimension.score}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-salima-800 px-2">פירוט מפורט לפי ממדים</h2>
        {Object.values(results.dimensions).map((dimension) => (
          <ResultsDetailCard key={dimension.dimension} dimension={dimension} />
        ))}
      </div>
      
      <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 justify-center print:hidden">
        <Button 
          onClick={handleSendEmail}
          disabled={emailSending}
          className={`bg-green-600 hover:bg-green-700 ${isMobile ? 'w-full sm:w-auto' : ''}`}
        >
          {emailSending ? "שולח מייל..." : "שלח תוצאות במייל"}
        </Button>
        
        <Button 
          onClick={() => navigate('/statistics')} 
          variant="outline"
          className={`border-salima-600 text-salima-600 hover:bg-salima-50 ${isMobile ? 'w-full sm:w-auto' : ''}`}
        >
          צפה בהשוואה סטטיסטית
        </Button>
        
        <Button 
          onClick={handleNewSurvey} 
          className={`bg-salima-600 hover:bg-salima-700 ${isMobile ? 'w-full sm:w-auto' : ''}`}
        >
          מילוי שאלון חדש
        </Button>
      </div>
    </div>
  );
};

export default Results;
