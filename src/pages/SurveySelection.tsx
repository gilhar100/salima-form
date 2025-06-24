
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Users, User } from "lucide-react";

const SurveySelection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleSurveySelection = (surveyType: 'manager' | 'colleague') => {
    navigate(`/survey?type=${surveyType}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-50 p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="font-bold mb-4 sm:mb-6 text-black" style={{ fontSize: '22px' }}>SALIMA</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* שאלון מנהלים */}
          <Card 
            className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105"
            onClick={() => handleSurveySelection('manager')}
          >
            <CardHeader className="px-4 sm:px-6 text-center">
              <div className="flex justify-center mb-4">
                <User className="text-salima-600" style={{ width: '20px', height: '20px' }} />
              </div>
              <CardTitle className="text-black" style={{ fontSize: '18px' }}>שאלון למנהלים</CardTitle>
              <CardDescription className="text-black" style={{ fontSize: '16px' }}>
                הערכה עצמית של יכולות המנהיגות שלך
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              <p className="leading-relaxed mb-4 text-black" style={{ fontSize: '16px' }}>
                השאלון מיועד למנהלים שרוצים להעריך את יכולות המנהיגות שלהם ולקבל תוצאות מפורטות ואישיות.
              </p>
              <ul className="list-disc list-inside space-y-1 text-right text-black" style={{ fontSize: '16px' }}>
                <li>הערכה עצמית אישית</li>
                <li>תוצאות מפורטות וגרפים</li>
                <li>ניתוח לפי ממדי מנהיגות</li>
                <li>המלצות לשיפור</li>
              </ul>
            </CardContent>
          </Card>

          {/* שאלון עמיתים */}
          <Card 
            className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105"
            onClick={() => handleSurveySelection('colleague')}
          >
            <CardHeader className="px-4 sm:px-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="text-blue-600" style={{ width: '20px', height: '20px' }} />
              </div>
              <CardTitle className="text-black" style={{ fontSize: '18px' }}>שאלון לעמיתים</CardTitle>
              <CardDescription className="text-black" style={{ fontSize: '16px' }}>
                הערכת מנהל על ידי עמית עבודה
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              <p className="leading-relaxed mb-4 text-black" style={{ fontSize: '16px' }}>
                השאלון מיועד לעמיתי עבודה שרוצים להעריך את יכולות המנהיגות של המנהל שלהם.
              </p>
              <ul className="list-disc list-inside space-y-1 text-right text-black" style={{ fontSize: '16px' }}>
                <li>הערכת מנהל על ידי עמית</li>
                <li>תוצאות מפורטות וגרפים</li>
                <li>משוב אנונימי</li>
                <li>תרומה לפיתוח המנהל</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-black px-4" style={{ fontSize: '16px' }}>
          <p>™ כל הזכויות שמורות לד״ר יוסי שרעבי</p>
        </div>
      </div>
    </div>
  );
};

export default SurveySelection;
