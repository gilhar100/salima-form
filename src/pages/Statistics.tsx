
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSurveyStatistics } from "@/lib/survey-service";
import { SurveyResult } from "@/lib/types";
import StatisticsCharts from "@/components/StatisticsCharts";
import { useToast } from "@/hooks/use-toast";

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
}

const Statistics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">טוען סטטיסטיקות...</p>
      </div>
    );
  }

  if (!userResults) {
    return (
      <div className="container max-w-4xl mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>אין תוצאות זמינות</CardTitle>
            <CardDescription>
              כדי לצפות בהשוואה סטטיסטית, עליך תחילה למלא את השאלון.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/survey')} className="bg-salima-600 hover:bg-salima-700">
              מלא שאלון
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculatePercentile = (userScore: number, allScores: number[]) => {
    if (allScores.length === 0) return 0;
    const lowerScores = allScores.filter(score => score < userScore).length;
    return Math.round((lowerScores / allScores.length) * 100);
  };

  const slqScores = statistics.map(s => s.slq_score);
  const userPercentile = calculatePercentile(userResults.slq, slqScores);

  const avgSlq = slqScores.length > 0 ? 
    Number((slqScores.reduce((sum, score) => sum + score, 0) / slqScores.length).toFixed(2)) : 0;

  return (
    <div className="container max-w-6xl mx-auto py-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-salima-800 mb-2">השוואה סטטיסטית</h1>
        <p className="text-gray-600">
          ראה איך התוצאות שלך מתייחסות ביחס לשאר המשתתפים
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>הציון שלך</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-salima-600">{userResults.slq}</p>
            <p className="text-sm text-gray-600">ציון SLQ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ממוצע כללי</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-blue-600">{avgSlq}</p>
            <p className="text-sm text-gray-600">מתוך {statistics.length} משתתפים</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>האחוזון שלך</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-green-600">{userPercentile}%</p>
            <p className="text-sm text-gray-600">
              {userPercentile >= 75 ? "מעולה!" : 
               userPercentile >= 50 ? "טוב!" : 
               userPercentile >= 25 ? "סביר" : "יש מקום לשיפור"}
            </p>
          </CardContent>
        </Card>
      </div>

      <StatisticsCharts 
        statistics={statistics} 
        userResults={userResults} 
      />

      <div className="mt-8 text-center">
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/results')}>
            חזור לתוצאות
          </Button>
          <Button onClick={() => navigate('/survey')} className="bg-salima-600 hover:bg-salima-700">
            מלא שאלון חדש
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
