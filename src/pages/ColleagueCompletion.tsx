
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColleagueCompletion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissionData, setSubmissionData] = useState<any>(null);

  useEffect(() => {
    const savedSubmission = localStorage.getItem('colleagueSubmission');
    if (savedSubmission) {
      const parsedSubmission = JSON.parse(savedSubmission);
      setSubmissionData(parsedSubmission);
    } else {
      toast({
        title: "לא נמצאו נתונים",
        description: "אנא מלא/י את השאלון תחילה",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const handleBackToHome = () => {
    localStorage.removeItem('colleagueSubmission');
    navigate('/');
  };

  if (!submissionData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-salima-600"></div>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-2xl mx-auto px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            השאלון הושלם בהצלחה!
          </CardTitle>
          <CardDescription className="text-lg">
            תודה על הערכת המנהל {submissionData.evaluatorInfo?.managerName}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              הנתונים נקלטו בהצלחה במערכת
            </h3>
            <p className="text-green-700 leading-relaxed">
              ההערכה שלך על המנהל נשמרה במערכת ותסייע בפיתוח יכולות המנהיגות של הארגון.
              המידע נשמר באופן אנונימי ובטוח.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>שים/י לב:</strong> בשונה משאלון המנהלים, שאלון העמיתים אינו מציג תוצאות אישיות.
              המידע משמש למחקר ולשיפור כללי של יכולות המנהיגות בארגון.
            </p>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleBackToHome}
              className="bg-salima-600 hover:bg-salima-700 w-full sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4" />
              חזור לעמוד הבית
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColleagueCompletion;
