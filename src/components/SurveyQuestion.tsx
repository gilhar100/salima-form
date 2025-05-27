
import React from "react";
import { Question, SurveyType } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface SurveyQuestionProps {
  question: Question;
  selectedValue: number | null;
  onChange: (value: number) => void;
  surveyType?: SurveyType;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ 
  question, 
  selectedValue, 
  onChange,
  surveyType = 'manager'
}) => {
  const isMobile = useIsMobile();

  const options = [
    { value: 1, label: "אף פעם", shortLabel: "1" },
    { value: 2, label: "לעיתים רחוקות", shortLabel: "2" },
    { value: 3, label: "לפעמים", shortLabel: "3" },
    { value: 4, label: "לעיתים קרובות", shortLabel: "4" },
    { value: 5, label: "בדרך כלל או תמיד", shortLabel: "5" }
  ];

  // פונקציה להמרת השאלה לגוף שלישי עבור שאלון עמיתים
  const getQuestionText = (text: string, isColleague: boolean) => {
    if (!isColleague) return text;
    
    // המרות בסיסיות מגוף ראשון לגוף שלישי
    let colleagueText = text
      .replace(/\bאני\b/g, 'הוא/היא')
      .replace(/\bאנו\b/g, 'הם')
      .replace(/\bאותי\b/g, 'אותו/אותה')
      .replace(/\bאלי\b/g, 'אליו/אליה')
      .replace(/\bשלי\b/g, 'שלו/שלה')
      .replace(/\bלי\b/g, 'לו/לה')
      .replace(/\bאת\/ה\b/g, 'הוא/היא')
      .replace(/\bאתה\/את\b/g, 'הוא/היא')
      .replace(/\bמעבר ל/g, 'מעבר ל')
      .replace(/\bאשתף\b/g, 'משתף/ת')
      .replace(/\bאשמח\b/g, 'שמח/ה')
      .replace(/\bאעזור\b/g, 'עוזר/ת')
      .replace(/\bאקשיב\b/g, 'מקשיב/ה')
      .replace(/\bאתמודד\b/g, 'מתמודד/ת')
      .replace(/\bאפעל\b/g, 'פועל/ת')
      .replace(/\bאעמוד\b/g, 'עומד/ת')
      .replace(/\bאציע\b/g, 'מציע/ה')
      .replace(/\bאבצע\b/g, 'מבצע/ת')
      .replace(/\bאחזק\b/g, 'מחזיק/ה')
      .replace(/\bאקבל\b/g, 'מקבל/ת')
      .replace(/\bאמצא\b/g, 'מוצא/ת')
      .replace(/\bאבין\b/g, 'מבין/ה')
      .replace(/\bאזהה\b/g, 'מזהה')
      .replace(/\bאכיר\b/g, 'מכיר/ה')
      .replace(/\bאחשוב\b/g, 'חושב/ת')
      .replace(/\bאדע\b/g, 'יודע/ת')
      .replace(/\bאוכל\b/g, 'יכול/ה')
      .replace(/\bאבקש\b/g, 'מבקש/ת')
      .replace(/\bאתן\b/g, 'נותן/ת')
      .replace(/\bאקח\b/g, 'לוקח/ת')
      .replace(/\bארגיש\b/g, 'מרגיש/ה')
      .replace(/\bאחסוך\b/g, 'חוסך/ת')
      .replace(/\bאשלוט\b/g, 'שולט/ת')
      .replace(/\bאראה\b/g, 'רואה')
      .replace(/\bאמליץ\b/g, 'ממליץ/ה')
      .replace(/\bאכבד\b/g, 'מכבד/ת')
      .replace(/\bאעניק\b/g, 'מעניק/ה')
      .replace(/\bאקדם\b/g, 'מקדם/ת')
      .replace(/\bאזמין\b/g, 'מזמין/ה')
      .replace(/\bאביא\b/g, 'מביא/ה')
      .replace(/\bאמנע\b/g, 'נמנע/ת')
      .replace(/\bאטפל\b/g, 'מטפל/ת')
      .replace(/\bאמשוך\b/g, 'מושך/ת')
      .replace(/\bאדרוש\b/g, 'דורש/ת')
      .replace(/\bאעודד\b/g, 'מעודד/ת')
      .replace(/\bאחייב\b/g, 'מחייב/ת')
      .replace(/\bאבטיח\b/g, 'מבטיח/ה')
      .replace(/\bאפתח\b/g, 'מפתח/ת')
      .replace(/\bאחפש\b/g, 'מחפש/ת')
      .replace(/\bאזכיר\b/g, 'מזכיר/ה')
      .replace(/\bאתעסק\b/g, 'מתעסק/ת')
      .replace(/\bאגיב\b/g, 'מגיב/ה')
      .replace(/\bאבחן\b/g, 'מבחין/ה')
      .replace(/\bאספק\b/g, 'מספק/ת')
      .replace(/\bאיזם\b/g, 'יוזם/ת')
      .replace(/\bאציג\b/g, 'מציג/ה')
      .replace(/\bאמסור\b/g, 'מוסר/ת')
      .replace(/\bאזהה\b/g, 'מזהה')
      .replace(/\bאגדיר\b/g, 'מגדיר/ה')
      .replace(/\bאווסת\b/g, 'מווסת/ת')
      .replace(/\bאנהל\b/g, 'מנהל/ת')
      .replace(/\bאשגיח\b/g, 'משגיח/ה')
      .replace(/\bאתכנן\b/g, 'מתכנן/ת')
      .replace(/\bאארגן\b/g, 'מארגן/ת')
      .replace(/\bאבקר\b/g, 'מבקר/ת')
      .replace(/\bאבדוק\b/g, 'בודק/ת')
      .replace(/\bאפקח\b/g, 'מפקח/ת')
      .replace(/\bאמדוד\b/g, 'מודד/ת')
      .replace(/\bאבחון\b/g, 'מאבחן/ת')
      .replace(/\bאתחיל\b/g, 'מתחיל/ה')
      .replace(/\bאסיים\b/g, 'מסיים/ה')
      .replace(/\bאזהיר\b/g, 'מזהיר/ה')
      .replace(/\bאתריע\b/g, 'מתריע/ה')
      .replace(/\bאחדש\b/g, 'מחדש/ת')
      .replace(/\bאעדכן\b/g, 'מעדכן/ת')
      .replace(/\bאשפר\b/g, 'משפר/ת')
      .replace(/\bאתקן\b/g, 'מתקן/ת')
      .replace(/\bאחזור\b/g, 'חוזר/ת')
      .replace(/\bאבטל\b/g, 'מבטל/ת')
      .replace(/\bאשנה\b/g, 'משנה')
      .replace(/\bאחליף\b/g, 'מחליף/ה')
      .replace(/\bאסרב\b/g, 'מסרב/ת')
      .replace(/\bאסכים\b/g, 'מסכים/ה')
      .replace(/\bאאמץ\b/g, 'מאמץ/ת')
      .replace(/\bאדחה\b/g, 'דוחה')
      .replace(/\bאקבע\b/g, 'קובע/ת')
      .replace(/\bאשקול\b/g, 'שוקל/ת')
      .replace(/\bאבחר\b/g, 'בוחר/ת')
      .replace(/\bאחליט\b/g, 'מחליט/ה')
      .replace(/\bאיפתח\b/g, 'מפתח/ת')
      .replace(/\bאכשיר\b/g, 'מכשיר/ה')
      .replace(/\bאלמד\b/g, 'לומד/ת')
      .replace(/\bאתרגל\b/g, 'מתרגל/ת')
      .replace(/\bאחקור\b/g, 'חוקר/ת')
      .replace(/\bאנתח\b/g, 'מנתח/ת')
      .replace(/\bאבין\b/g, 'מבין/ה')
      .replace(/\bאסביר\b/g, 'מסביר/ה')
      .replace(/\bאתאמן\b/g, 'מתאמן/ת')
      .replace(/\bאפעיל\b/g, 'מפעיל/ה')
      .replace(/\bאדריך\b/g, 'מדריך/ה')
      .replace(/\bאחנך\b/g, 'מחנך/ת')
      .replace(/\bאייעץ\b/g, 'מייעץ/ת')
      .replace(/\bאנחה\b/g, 'מנחה')
      .replace(/\bאתמוך\b/g, 'תומך/ת')
      .replace(/\bאחזק\b/g, 'מחזק/ת')
      .replace(/\bאעצים\b/g, 'מעצים/ה')
      .replace(/\bאשרת\b/g, 'משרת/ת')
      .replace(/\bאסייע\b/g, 'מסייע/ת')
      .replace(/\bאתנדב\b/g, 'מתנדב/ת')
      .replace(/\bאתרום\b/g, 'תורם/ת')
      .replace(/\bאשתתף\b/g, 'משתתף/ת')
      .replace(/\bאשתף\b/g, 'משתף/ת')
      .replace(/\bאשלב\b/g, 'משלב/ת')
      .replace(/\bאיחד\b/g, 'מיחד/ת')
      .replace(/\bאחבר\b/g, 'מחבר/ת')
      .replace(/\bאקשר\b/g, 'מקשר/ת')
      .replace(/\bאתאם\b/g, 'מתאם/ת')
      .replace(/\bאתחבר\b/g, 'מתחבר/ת')
      .replace(/\bאבנה\b/g, 'בונה')
      .replace(/\bאפתח\b/g, 'מפתח/ת')
      .replace(/\bאיצור\b/g, 'יוצר/ת')
      .replace(/\bאתכנן\b/g, 'מתכנן/ת')
      .replace(/\bאעצב\b/g, 'מעצב/ת')
      .replace(/\bאהנדס\b/g, 'מהנדס/ת')
      .replace(/\bאבצע\b/g, 'מבצע/ת')
      .replace(/\bאיישם\b/g, 'מיישם/ת')
      .replace(/\bאפעל\b/g, 'מפעיל/ה')
      .replace(/\bאנגיש\b/g, 'מנגיש/ה')
      .replace(/\bאפיץ\b/g, 'מפיץ/ה')
      .replace(/\bאשדר\b/g, 'משדר/ת')
      .replace(/\bאפרסם\b/g, 'מפרסם/ת')
      .replace(/\bאחשוף\b/g, 'חושף/ת')
      .replace(/\bאגלה\b/g, 'מגלה')
      .replace(/\bאגלה\b/g, 'מגלה')
      .replace(/\bאראה\b/g, 'מראה')
      .replace(/\bאהדגים\b/g, 'מדגים/ה')
      .replace(/\bאוכיח\b/g, 'מוכיח/ה')
      .replace(/\bאמחיש\b/g, 'מחיש/ה')
      .replace(/\bאצייר\b/g, 'מצייר/ת')
      .replace(/\bאתאר\b/g, 'מתאר/ת');
    
    return colleagueText;
  };

  const questionText = getQuestionText(question.text, surveyType === 'colleague');

  return (
    <Card className="w-full mb-4 shadow-sm">
      <CardContent className="pt-4 px-3 sm:pt-6 sm:px-6">
        <div className="mb-4 flex items-start sm:items-center">
          <span className={`ml-2 ${surveyType === 'manager' ? 'bg-salima-600' : 'bg-blue-600'} text-white w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 mt-0.5 sm:mt-0`}>
            {question.id}
          </span>
          <p className="font-medium text-sm sm:text-lg mr-2 leading-tight">{questionText}</p>
        </div>
        
        <RadioGroup
          value={selectedValue?.toString() || ""}
          onValueChange={(value) => onChange(parseInt(value))}
          className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-wrap gap-4 justify-center'}`}
        >
          {options.map((option) => (
            <div key={option.value} className={`flex ${isMobile ? 'flex-row items-center' : 'flex-col items-center'}`}>
              <div className="relative">
                <RadioGroupItem 
                  value={option.value.toString()} 
                  id={`q${question.id}-${option.value}`} 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor={`q${question.id}-${option.value}`}
                  className={`block cursor-pointer rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-white border-2 border-gray-200 hover:border-${surveyType === 'manager' ? 'salima' : 'blue'}-200 transition flex items-center justify-center text-gray-700 font-medium peer-data-[state=checked]:border-${surveyType === 'manager' ? 'salima' : 'blue'}-600 peer-data-[state=checked]:bg-${surveyType === 'manager' ? 'salima' : 'blue'}-50`}
                >
                  {option.value}
                </Label>
              </div>
              <span className={`text-xs ${isMobile ? 'mr-3 flex-1' : 'mt-1'} text-gray-500 ${isMobile ? 'text-right' : 'text-center'}`}>
                {isMobile ? option.label : option.label}
              </span>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default SurveyQuestion;
