
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

  // קבלת הטקסט המתאים לסוג השאלון
  const questionText = surveyType === 'colleague' && question.colleagueText
    ? question.colleagueText
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
                  className="sr-only" 
                />
                <Label
                  htmlFor={`q${question.id}-${option.value}`}
                  className={`block cursor-pointer rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-white border-2 border-gray-200 hover:border-${surveyType === 'manager' ? 'salima' : 'blue'}-200 transition flex items-center justify-center text-gray-700 font-medium data-[state=checked]:border-${surveyType === 'manager' ? 'salima' : 'blue'}-600 data-[state=checked]:bg-${surveyType === 'manager' ? 'salima' : 'blue'}-50`}
                  data-state={selectedValue === option.value ? 'checked' : 'unchecked'}
                >
                  {option.value}
                </Label>
              </div>
              <span className={`text-xs ${isMobile ? 'mr-3 flex-1' : 'mt-1'} text-gray-500 ${isMobile ? 'text-right' : 'text-center'}`}>
                {option.label}
              </span>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default SurveyQuestion;
