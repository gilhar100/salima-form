
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
  const transformQuestionForColleague = (text: string): string => {
    // רשימה מקיפה של המרות מגוף ראשון לגוף שלישי
    const transformations = [
      // כינויי גוף ראשון בסיסיים
      [/\bאני\b/g, 'המנהל/ת'],
      [/\bאנו\b/g, 'המנהל/ת והצוות'],
      [/\bאותי\b/g, 'אותו/אותה'],
      [/\bאלי\b/g, 'אליו/אליה'],
      [/\bשלי\b/g, 'שלו/שלה'],
      [/\bלי\b/g, 'לו/לה'],
      [/\bבי\b/g, 'בו/בה'],
      [/\bממני\b/g, 'ממנו/ממנה'],
      [/\bעלי\b/g, 'עליו/עליה'],
      [/\bעמי\b/g, 'עמו/עמה'],
      [/\bאצלי\b/g, 'אצלו/אצלה'],
      
      // פעלים נפוצים בגוף ראשון יחיד
      [/\bאשתף\b/g, 'משתף/ת'],
      [/\bאשמח\b/g, 'שמח/ה'],
      [/\bאעזור\b/g, 'עוזר/ת'],
      [/\bאקשיב\b/g, 'מקשיב/ה'],
      [/\bאתמודד\b/g, 'מתמודד/ת'],
      [/\bאפעל\b/g, 'פועל/ת'],
      [/\bאעמוד\b/g, 'עומד/ת'],
      [/\bאציע\b/g, 'מציע/ה'],
      [/\bאבצע\b/g, 'מבצע/ת'],
      [/\bאחזק\b/g, 'מחזיק/ה'],
      [/\bאקבל\b/g, 'מקבל/ת'],
      [/\bאמצא\b/g, 'מוצא/ת'],
      [/\bאבין\b/g, 'מבין/ה'],
      [/\bאזהה\b/g, 'מזהה'],
      [/\bאכיר\b/g, 'מכיר/ה'],
      [/\bאחשוב\b/g, 'חושב/ת'],
      [/\bאדע\b/g, 'יודע/ת'],
      [/\bאוכל\b/g, 'יכול/ה'],
      [/\bאבקש\b/g, 'מבקש/ת'],
      [/\bאתן\b/g, 'נותן/ת'],
      [/\bאקח\b/g, 'לוקח/ת'],
      [/\bארגיש\b/g, 'מרגיש/ה'],
      [/\bאחסוך\b/g, 'חוסך/ת'],
      [/\bאשלוט\b/g, 'שולט/ת'],
      [/\bאראה\b/g, 'רואה'],
      [/\bאמליץ\b/g, 'ממליץ/ה'],
      [/\bאכבד\b/g, 'מכבד/ת'],
      [/\bאעניק\b/g, 'מעניק/ה'],
      [/\bאקדם\b/g, 'מקדם/ת'],
      [/\bאזמין\b/g, 'מזמין/ה'],
      [/\bאביא\b/g, 'מביא/ה'],
      [/\bאמנע\b/g, 'נמנע/ת'],
      [/\bאטפל\b/g, 'מטפל/ת'],
      [/\bאמשוך\b/g, 'מושך/ת'],
      [/\bאדרוש\b/g, 'דורש/ת'],
      [/\bאעודד\b/g, 'מעודד/ת'],
      [/\bאחייב\b/g, 'מחייב/ת'],
      [/\bאבטיח\b/g, 'מבטיח/ה'],
      [/\bאפתח\b/g, 'מפתח/ת'],
      [/\bאחפש\b/g, 'מחפש/ת'],
      [/\bאזכיר\b/g, 'מזכיר/ה'],
      [/\bאתעסק\b/g, 'מתעסק/ת'],
      [/\bאגיב\b/g, 'מגיב/ה'],
      [/\bאבחן\b/g, 'מבחין/ה'],
      [/\bאספק\b/g, 'מספק/ת'],
      [/\bאיזם\b/g, 'יוזם/ת'],
      [/\bאציג\b/g, 'מציג/ה'],
      [/\bאמסור\b/g, 'מוסר/ת'],
      [/\bאגדיר\b/g, 'מגדיר/ה'],
      [/\bאווסת\b/g, 'מווסת/ת'],
      [/\bאנהל\b/g, 'מנהל/ת'],
      [/\bאשגיח\b/g, 'משגיח/ה'],
      [/\bאתכנן\b/g, 'מתכנן/ת'],
      [/\bאארגן\b/g, 'מארגן/ת'],
      [/\bאבקר\b/g, 'מבקר/ת'],
      [/\bאבדוק\b/g, 'בודק/ת'],
      [/\bאפקח\b/g, 'מפקח/ת'],
      [/\bאמדוד\b/g, 'מודד/ת'],
      [/\bאאבחן\b/g, 'מאבחן/ת'],
      [/\bאתחיל\b/g, 'מתחיל/ה'],
      [/\bאסיים\b/g, 'מסיים/ה'],
      [/\bאזהיר\b/g, 'מזהיר/ה'],
      [/\bאתריע\b/g, 'מתריע/ה'],
      [/\bאחדש\b/g, 'מחדש/ת'],
      [/\bאעדכן\b/g, 'מעדכן/ת'],
      [/\bאשפר\b/g, 'משפר/ת'],
      [/\bאתקן\b/g, 'מתקן/ת'],
      [/\bאחזור\b/g, 'חוזר/ת'],
      [/\bאבטל\b/g, 'מבטל/ת'],
      [/\bאשנה\b/g, 'משנה'],
      [/\bאחליף\b/g, 'מחליף/ה'],
      [/\bאסרב\b/g, 'מסרב/ת'],
      [/\bאסכים\b/g, 'מסכים/ה'],
      [/\bאאמץ\b/g, 'מאמץ/ת'],
      [/\bאדחה\b/g, 'דוחה'],
      [/\bאקבע\b/g, 'קובע/ת'],
      [/\bאשקול\b/g, 'שוקל/ת'],
      [/\bאבחר\b/g, 'בוחר/ת'],
      [/\bאחליט\b/g, 'מחליט/ה'],
      [/\bאכשיר\b/g, 'מכשיר/ה'],
      [/\bאלמד\b/g, 'לומד/ת'],
      [/\bאתרגל\b/g, 'מתרגל/ת'],
      [/\bאחקור\b/g, 'חוקר/ת'],
      [/\bאנתח\b/g, 'מנתח/ת'],
      [/\bאסביר\b/g, 'מסביר/ה'],
      [/\bאתאמן\b/g, 'מתאמן/ת'],
      [/\bאפעיל\b/g, 'מפעיל/ה'],
      [/\bאדריך\b/g, 'מדריך/ה'],
      [/\bאחנך\b/g, 'מחנך/ת'],
      [/\bאייעץ\b/g, 'מייעץ/ת'],
      [/\bאנחה\b/g, 'מנחה'],
      [/\bאתמוך\b/g, 'תומך/ת'],
      [/\bאחזק\b/g, 'מחזק/ת'],
      [/\bאעצים\b/g, 'מעצים/ה'],
      [/\bאשרת\b/g, 'משרת/ת'],
      [/\bאסייע\b/g, 'מסייע/ת'],
      [/\bאתנדב\b/g, 'מתנדב/ת'],
      [/\bאתרום\b/g, 'תורם/ת'],
      [/\bאשתתף\b/g, 'משתתף/ת'],
      [/\bאשלב\b/g, 'משלב/ת'],
      [/\bאיחד\b/g, 'מיחד/ת'],
      [/\bאחבר\b/g, 'מחבר/ת'],
      [/\bאקשר\b/g, 'מקשר/ת'],
      [/\bאתאם\b/g, 'מתאם/ת'],
      [/\bאתחבר\b/g, 'מתחבר/ת'],
      [/\bאבנה\b/g, 'בונה'],
      [/\bאיצור\b/g, 'יוצר/ת'],
      [/\bאעצב\b/g, 'מעצב/ת'],
      [/\bאהנדס\b/g, 'מהנדס/ת'],
      [/\bאיישם\b/g, 'מיישם/ת'],
      [/\bאנגיש\b/g, 'מנגיש/ה'],
      [/\bאפיץ\b/g, 'מפיץ/ה'],
      [/\bאשדר\b/g, 'משדר/ת'],
      [/\bאפרסם\b/g, 'מפרסם/ת'],
      [/\bאחשוף\b/g, 'חושף/ת'],
      [/\bאגלה\b/g, 'מגלה'],
      [/\bאהדגים\b/g, 'מדגים/ה'],
      [/\bאוכיח\b/g, 'מוכיח/ה'],
      [/\bאמחיש\b/g, 'מחיש/ה'],
      [/\bאצייר\b/g, 'מצייר/ת'],
      [/\bאתאר\b/g, 'מתאר/ת'],
      
      // ביטויים מורכבים ונפוצים
      [/\bאמרבה לבחון\b/g, 'מרבה לבחון'],
      [/\bאמרבה לשתף\b/g, 'מרבה לשתף'],
      [/\bאמרבה לשאול\b/g, 'מרבה לשאול'],
      [/\bאלא סומך\b/g, 'לא סומך/ת'],
      [/\bאלא משתף\b/g, 'לא משתף/ת'],
      [/\bאלא מאמין\b/g, 'לא מאמין/ה'],
      [/\bאלא פועל\b/g, 'לא פועל/ת'],
      [/\bאלא מתעמק\b/g, 'לא מתעמק/ת'],
      [/\bאלא נותן מקום\b/g, 'לא נותן/ת מקום'],
      [/\bאפועל תמיד\b/g, 'פועל/ת תמיד'],
      [/\bאנותן מקום\b/g, 'נותן/ת מקום'],
      [/\bארואה בעובד\b/g, 'רואה בעובד'],
      [/\bארואה ערך\b/g, 'רואה ערך'],
      [/\bאמדבר בפתיחות\b/g, 'מדבר/ת בפתיחות'],
      [/\bאמשתף בכישלונותיי\b/g, 'משתף/ת בכישלונותיו/יה'],
      [/\bאמעודד פרשנות\b/g, 'מעודד/ת פרשנות'],
      [/\bאמראה אכפתיות\b/g, 'מראה אכפתיות'],
      
      // המרות נוספות לפעלים שעלולים להחמיץ
      [/\bאמתעלם\b/g, 'מתעלם/ת'],
      [/\bאמעורר\b/g, 'מעורר/ת'],
      [/\bאמתנהל\b/g, 'מתנהל/ת'],
      [/\bאמתייחס\b/g, 'מתייחס/ת'],
      [/\bאמתרגש\b/g, 'מתרגש/ת'],
      [/\bאמתנגד\b/g, 'מתנגד/ת'],
      [/\bאמספר\b/g, 'מספר/ת'],
      [/\bאמתעקש\b/g, 'מתעקש/ת'],
      [/\bאמבליט\b/g, 'מבליט/ה'],
      [/\bאמוותר\b/g, 'מוותר/ת'],
      [/\bאמתלהב\b/g, 'מתלהב/ת'],
      [/\bאמדגיש\b/g, 'מדגיש/ה'],
      [/\bאמתייעץ\b/g, 'מתייעץ/ת'],
      [/\bאחושש\b/g, 'חושש/ת'],
      [/\bאנצמד\b/g, 'נצמד/ת'],
      [/\bאמלהיב\b/g, 'מלהיב/ה'],
      [/\bאשואף\b/g, 'שואף/ת'],
      [/\bאמביע\b/g, 'מביע/ה'],
      [/\bאמקפיד\b/g, 'מקפיד/ה'],
      [/\bאמאמין\b/g, 'מאמין/ה'],
      [/\bאמפתח\b/g, 'מפתח/ת'],
      [/\bאמראה\b/g, 'מראה'],
      [/\bאמתחשב\b/g, 'מתחשב/ת'],
      [/\bאמקדם\b/g, 'מקדם/ת'],
      [/\bאיוזם\b/g, 'יוזם/ת'],
      [/\bאדוחה\b/g, 'דוחה'],
      [/\bארואה\b/g, 'רואה'],
      [/\bאמשדר\b/g, 'משדר/ת'],
      [/\bאנוהג\b/g, 'נוהג/ת'],
      [/\bאמבסס\b/g, 'מבסס/ת'],
      [/\bאמתמקד\b/g, 'מתמקד/ת'],
      [/\bאמשתף\b/g, 'משתף/ת'],
      [/\bאמתנתק\b/g, 'מתנתק/ת'],
      [/\bאמדבר\b/g, 'מדבר/ת'],
      [/\bאמשלב\b/g, 'משלב/ת'],
      [/\bאנותן\b/g, 'נותן/ת'],
      [/\bאמקשר\b/g, 'מקשר/ת'],
      [/\bאשואל\b/g, 'שואל/ת'],
      [/\bאמוודא\b/g, 'מוודא/ת'],
      [/\bאמתמודד\b/g, 'מתמודד/ת'],
      [/\bאמחפש\b/g, 'מחפש/ת'],
      [/\bאשומר\b/g, 'שומר/ת']
    ];
    
    let transformedText = text;
    
    // החלת כל ההמרות
    transformations.forEach(([pattern, replacement]) => {
      transformedText = transformedText.replace(pattern, replacement as string);
    });
    
    return transformedText;
  };

  // קבלת הטקסט המתאים לסוג השאלון
  const questionText = surveyType === 'colleague' 
    ? transformQuestionForColleague(question.text)
    : question.text;

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
