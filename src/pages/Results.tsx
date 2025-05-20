
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        description: `התוצאות נשלחו לכתובת המייל: ${results.userInfo.email}`,
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
        <h1 className="text-3xl font-bold text-salima-800 mb-2">תודה על מילוי השאלון</h1>
        <p className="text-gray-600">
          השאלון הושלם בהצלחה
        </p>
      </div>
      
      <div className="print:hidden">
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>השאלון הושלם בהצלחה</CardTitle>
            <CardDescription>
              תודה שהשלמת את השאלון. התוצאות יישלחו למערכת.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-center mt-4">
              הודעת אימייל תישלח לכתובת: <span className="font-semibold">{results.userInfo.email}</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex flex-wrap gap-3 justify-center print:hidden">
        <Button 
          onClick={handleSendEmail} 
          variant="outline" 
          disabled={sending}
          className="hidden"
        >
          {sending ? "שולח..." : "שלח תוצאות במייל"}
        </Button>
        <Button onClick={handleNewSurvey} className="bg-salima-600 hover:bg-salima-700">
          מילוי שאלון חדש
        </Button>
      </div>
    </div>
  );
};

export default Results;
