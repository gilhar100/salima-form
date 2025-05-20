
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import ResultsRadar from "@/components/ResultsRadar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sendResultsByEmail } from "@/lib/email-service";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [sending, setSending] = useState(false);
  
  useEffect(() => {
    // טעינת התוצאות מ-localStorage
    const savedResults = localStorage.getItem('salimaResults');
    
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      // אם אין תוצאות, מעבר בחזרה לשאלון
      navigate('/survey');
    }
  }, [navigate]);
  
  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">טוען תוצאות...</p>
      </div>
    );
  }
  
  // פונקציה להדפסת התוצאות
  const handlePrint = () => {
    window.print();
  };
  
  // פונקציה לשליחת התוצאות במייל
  const handleSendEmail = async () => {
    if (!results.userInfo.email) {
      toast({
        title: "שגיאה",
        description: "לא הוזנה כתובת מייל",
        variant: "destructive"
      });
      return;
    }
    
    setSending(true);
    try {
      await sendResultsByEmail(results);
      toast({
        title: "נשלח בהצלחה",
        description: `התוצאות המפורטות נשלחו לכתובת המייל: ${results.userInfo.email}`,
      });
    } catch (error) {
      console.error("שגיאה בשליחת המייל:", error);
      toast({
        title: "שגיאה בשליחה",
        description: "לא ניתן היה לשלוח את התוצאות במייל. אנא נסה שנית מאוחר יותר.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };
  
  // פונקציה להתחלת שאלון חדש
  const handleNewSurvey = () => {
    localStorage.removeItem('salimaResults');
    navigate('/survey');
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 print:py-0">
      <div className="mb-8 text-center print:mb-4">
        <h1 className="text-3xl font-bold text-salima-800 mb-2">תוצאות שאלון מנהיגות</h1>
        <p className="text-gray-600">
          שם: {results.userInfo.name} | תאריך: {new Date(results.date).toLocaleDateString('he-IL')}
        </p>
        {results.userInfo.organization && (
          <p className="text-gray-600">
            ארגון: {results.userInfo.organization}
            {results.userInfo.department && ` | מחלקה: ${results.userInfo.department}`}
            {results.userInfo.position && ` | תפקיד: ${results.userInfo.position}`}
          </p>
        )}
      </div>
      
      <div className="print:hidden">
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>סיכום תוצאות</CardTitle>
            <CardDescription>
              תודה שהשלמת את שאלון המנהיגות. תוצאות מפורטות יישלחו לכתובת המייל שהזנת.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ResultsRadar result={results} />
            
            <div className="mt-6">
              <p className="mb-4">
                ציון ה-SLQ הכללי שלך הוא <strong>{results.slq}</strong> מתוך 5, המייצג את הממוצע של ששת הממדים המרכיבים את פרופיל המנהיגות שלך.
              </p>
              
              <p className="text-center mt-8">
                התוצאות המפורטות של השאלון יישלחו לכתובת המייל: <span className="font-semibold">{results.userInfo.email}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex flex-wrap gap-3 justify-center print:hidden">
        <Button onClick={handlePrint} variant="outline">
          הדפס סיכום
        </Button>
        <Button 
          onClick={handleSendEmail} 
          variant="outline" 
          disabled={sending}
        >
          {sending ? "שולח..." : "שלח תוצאות מפורטות במייל"}
        </Button>
        <Button onClick={handleNewSurvey} className="bg-salima-600 hover:bg-salima-700">
          התחל שאלון חדש
        </Button>
      </div>
    </div>
  );
};

export default Results;
