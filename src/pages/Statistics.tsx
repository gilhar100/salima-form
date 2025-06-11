
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSurveyStatistics } from "@/lib/survey-service";
import { SurveyResult } from "@/lib/types";
import StatisticsCharts from "@/components/StatisticsCharts";
import BellCurveVisualization from "@/components/BellCurveVisualization";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface SurveyResponse {
  id: string;
  slq_score: number;
  dimension_s: number;
  dimension_l: number;
  dimension_i: number;
  dimension_m: number;
  dimension_a: number;
  dimension_a2: number;
  created_at: string;
  consent_for_research: boolean;
  is_anonymous: boolean;
  user_email: string | null;
  user_name: string | null;
  organization: string | null;
  department: string | null;
  position: string | null;
  strategy: number;
  survey_type: string;
}

const Statistics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [statistics, setStatistics] = useState<SurveyResponse[]>([]);
  const [userResults, setUserResults] = useState<SurveyResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // טעינת התוצאות של המשתמש הנוכחי
        const savedResults = localStorage.getItem('salimaResults');
        if (savedResults) {
          setUserResults(JSON.parse(savedResults));
        }

        // טעינת הסטטיסטיקות הכלליות
        const stats = await getSurveyStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error('שגיאה בטעינת הנתונים:', error);
        toast({
          title: "שגיאה בטעינת הנתונים",
          description: "לא ניתן היה לטעון את הסטטיסטיקות",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [toast]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen px-4">
        <p className="text-lg sm:text-xl text-center">טוען סטטיסטיקות...</p>
      </div>;
  }

  if (!userResults) {
    return <div className="container max-w-4xl mx-auto py-4 px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-lg sm:text-xl">אין תוצאות זמינות</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              כדי לצפות בהשוואה סטטיסטית, עליך תחילה למלא את השאלון.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate('/survey')} className="bg-salima-600 hover:bg-salima-700 w-full sm:w-auto">
              מלא שאלון
            </Button>
          </CardContent>
        </Card>
      </div>;
  }

  const slqScores = statistics.map(s => s.slq_score);
  const avgSlq = slqScores.length > 0 ? Number((slqScores.reduce((sum, score) => sum + score, 0) / slqScores.length).toFixed(2)) : 0;

  return <div className="container max-w-6xl mx-auto py-4 px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-salima-800 mb-2">השוואה סטטיסטית</h1>
        <p className="text-sm sm:text-base text-gray-600 px-2">
          ראה איך התוצאות שלך מתייחסות ביחס לשאר המשתתפים
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="text-center">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">הציון שלך</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-3xl sm:text-4xl font-bold text-salima-600">{userResults.slq}</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">ציון SLQ</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">ממוצע כללי</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-3xl sm:text-4xl font-bold text-blue-600">{avgSlq}</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">מתוך {statistics.length} משתתפים</p>
          </CardContent>
        </Card>

        <BellCurveVisualization 
          userScore={userResults.slq}
          title="התפלגות הציונים"
        />
      </div>

      <StatisticsCharts statistics={statistics} userResults={userResults} />

      <div className="mt-6 text-center">
        <div className={`flex gap-3 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
          <Button variant="outline" onClick={() => navigate('/results')} className={isMobile ? 'w-full' : 'w-auto'}>
            חזור לתוצאות
          </Button>
        </div>
      </div>
    </div>;
};

export default Statistics;
