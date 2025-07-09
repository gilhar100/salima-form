
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
  displayNumber?: number; // Visual question number for display
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ 
  question, 
  selectedValue, 
  onChange,
  surveyType = 'manager',
  displayNumber
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

  // קביעת כיתות CSS בהתאם לסוג השאלון
  const getOptionClasses = (optionValue: number) => {
    const isSelected = selectedValue === optionValue;
    const baseClasses = `block cursor-pointer rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} border-2 transition flex items-center justify-center font-medium`;
    
    if (surveyType === 'manager') {
      return `${baseClasses} ${isSelected 
        ? 'border-salima-600 bg-salima-50 text-salima-700' 
        : 'bg-white border-gray-200 hover:border-salima-200 text-gray-700'}`;
    } else {
      return `${baseClasses} ${isSelected 
        ? 'border-blue-600 bg-blue-50 text-blue-700' 
        : 'bg-white border-gray-200 hover:border-blue-200 text-gray-700'}`;
    }
  };

  // Use displayNumber if provided, otherwise fall back to question.id
  const questionNumber = displayNumber || question.id;
  
  // בדיקה אם זו שאלת אבטיפוס (91-105)
  const isArchetypeQuestion = question.id >= 91 && question.id <= 105;

  return (
    <Card className="w-full mb-4 shadow-sm">
      <CardContent className="pt-4 px-3 sm:pt-6 sm:px-6">
        {/* הצגת כותרת אבטיפוס אם זו שאלת אבטיפוס */}
        {isArchetypeQuestion && question.archetype && (
          <div className="mb-3 text-center">
            <h3 className="text-black font-bold" style={{ fontSize: '18px' }}>
              {question.archetype}
            </h3>
          </div>
        )}
        
        <div className="mb-4 flex items-start sm:items-center">
          <span className={`ml-2 ${surveyType === 'manager' ? 'bg-salima-600' : 'bg-blue-600'} text-white w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full font-semibold flex-shrink-0 mt-0.5 sm:mt-0`}
                style={{ fontSize: '16px' }}>
            {questionNumber}
          </span>
          <p className="font-medium mr-2 leading-tight text-black" style={{ fontSize: '16px' }}>{questionText}</p>
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
                  className={getOptionClasses(option.value)}
                  style={{ fontSize: '16px' }}
                >
                  {option.value}
                </Label>
              </div>
              <span className={`${isMobile ? 'mr-3 flex-1' : 'mt-1'} text-black ${isMobile ? 'text-right' : 'text-center'}`}
                    style={{ fontSize: '16px' }}>
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
