import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Users, User } from "lucide-react";
const SurveySelection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const handleSurveySelection = (surveyType: 'manager' | 'colleague') => {
    navigate(`/survey?type=${surveyType}`);
  };
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-50 p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-salima-800">SALIMA</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 sm:mb-8 text-salima-600 px-2">ד&quot;ר יוסי שרעבי</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* שאלון מנהלים */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="px-4 sm:px-6 text-center">
              <div className="flex justify-center mb-4">
                <User className="h-12 w-12 text-salima-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">שאלון למנהלים</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                הערכה עצמית של יכולות המנהיגות שלך
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              <p className="text-sm sm:text-base leading-relaxed mb-4">
                השאלון מיועד למנהלים שרוצים להעריך את יכולות המנהיגות שלהם ולקבל תוצאות מפורטות ואישיות.
              </p>
              <ul className="text-sm list-disc list-inside space-y-1 text-right">
                <li>הערכה עצמית אישית</li>
                <li>תוצאות מפורטות וגרפים</li>
                <li>ניתוח לפי ממדי מנהיגות</li>
                <li>המלצות לשיפור</li>
              </ul>
            </CardContent>
            
            <CardFooter className="px-4 sm:px-6">
              <Button className={`bg-salima-600 hover:bg-salima-700 ${isMobile ? 'w-full' : 'w-full'}`} onClick={() => handleSurveySelection('manager')}>
                התחל שאלון מנהלים
              </Button>
            </CardFooter>
          </Card>

          {/* שאלון עמיתים */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="px-4 sm:px-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">שאלון לעמיתים</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                הערכת מנהל על ידי עמית עבודה
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              <p className="text-sm sm:text-base leading-relaxed mb-4">
                השאלון מיועד לעמיתי עבודה שרוצים להעריך את יכולות המנהיגות של המנהל שלהם.
              </p>
              <ul className="text-sm list-disc list-inside space-y-1 text-right">
                <li>הערכת מנהל על ידי עמית</li>
                <li>שאלות מותאמות לנקודת מבט חיצונית</li>
                <li>משוב אנונימי</li>
                <li>תרומה לפיתוח המנהל</li>
              </ul>
            </CardContent>
            
            <CardFooter className="px-4 sm:px-6">
              <Button className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'w-full' : 'w-full'}`} onClick={() => handleSurveySelection('colleague')}>
                התחל שאלון עמיתים
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-gray-600 text-xs sm:text-sm px-4">
          <p>מערכת SALIMA-WOCA © כל הזכויות שמורות</p>
        </div>
      </div>
    </div>;
};
export default SurveySelection;