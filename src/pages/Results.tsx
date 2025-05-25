
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sendResultsByEmail, saveSurveyToDatabase } from "@/lib/survey-service";
import { useToast } from "@/hooks/use-toast";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";
import ConsentDialog from "@/components/ConsentDialog";
import { useIsMobile } from "@/hooks/use-mobile";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [sending, setSending] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const savedResults = localStorage.getItem('salimaResults');
    
    if (savedResults) {
      setResults(JSON.parse(savedResults));
      // הצגת דיאלוג ההסכמה לאחר טעינת התוצאות
      setShowConsentDialog(true);
    } else {
      navigate('/survey');
    }
  }, [navigate]);
  
  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <p className="text-lg sm:text-xl text-center">טוען תוצאות...</p>
      </div>
    );
  }
  
  const handleSendEmail = async () => {
    setSending(true);
    try {
      await sendResultsByEmail(results);
      toast({
        title: "התוצאות נשלחו",
        description: "התוצאות נשלחו בהצלחה לדוא״ל המפתח",
      });
    } catch (error) {
      console.error("שגיאה בשליחת המייל:", error);
      toast({
        title: "שגיאה בשליחה",
        description: "לא ניתן היה לשלוח את התוצאות במייל",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const handleConsentResponse = async (consent: boolean, isAnonymous: boolean = true) => {
    setSaving(true);
    try {
      await saveSurveyToDatabase(results, consent, isAnonymous);
      
      if (consent) {
        toast({
          title: "תודה על השתתפותך!",
          description: "הנתונים נשמרו ויעזרו לשיפור הכלי",
        });
      } else {
        toast({
          title: "התוצאות נשמרו",
          description: "התוצאות נשמרו ללא שיתוף נתונים למחקר",
        });
      }
    } catch (error) {
      console.error("שגיאה בשמירת הנתונים:", error);
      toast({
        title: "שגיאה בשמירה",
        description: "לא ניתן היה לשמור את הנתונים",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
      setShowConsentDialog(false);
    }
  };
  
  const handleNewSurvey = () => {
    localStorage.removeItem('salimaResults');
    navigate('/survey');
  };

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
          onClick={() => navigate('/statistics')} 
          variant="outline"
          className={`border-salima-600 text-salima-600 hover:bg-salima-50 ${isMobile ? 'w-full sm:w-auto' : ''}`}
        >
          צפה בהשוואה סטטיסטית
        </Button>
        
        <Button 
          onClick={handleSendEmail} 
          disabled={sending}
          variant="outline"
          className={isMobile ? 'w-full sm:w-auto' : ''}
        >
          {sending ? "שולח..." : "שלח במייל"}
        </Button>
        
        <Button 
          onClick={handleNewSurvey} 
          className={`bg-salima-600 hover:bg-salima-700 ${isMobile ? 'w-full sm:w-auto' : ''}`}
        >
          מילוי שאלון חדש
        </Button>
      </div>

      <ConsentDialog
        open={showConsentDialog}
        onResponse={handleConsentResponse}
        loading={saving}
      />
    </div>
  );
};

export default Results;
