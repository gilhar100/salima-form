
import React from "react";
import { Question } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface SurveyQuestionProps {
  question: Question;
  selectedValue: number | null;
  onChange: (value: number) => void;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ 
  question, 
  selectedValue, 
  onChange 
}) => {
  return (
    <Card className="w-full mb-4">
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center">
          <span className="ml-2 bg-salima-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold">
            {question.id}
          </span>
          <p className="font-medium text-lg">{question.text}</p>
        </div>
        
        <RadioGroup
          className="flex gap-6 justify-center"
          value={selectedValue?.toString()}
          onValueChange={(value) => onChange(parseInt(value))}
        >
          <div className="flex flex-col items-center">
            <RadioGroupItem value="1" id={`q${question.id}-1`} className="peer sr-only" />
            <Label
              htmlFor={`q${question.id}-1`}
              className="text-center block cursor-pointer rounded-full w-12 h-12 bg-white border-2 border-gray-200 peer-checked:border-salima-600 peer-checked:bg-salima-50 peer-checked:text-salima-700 hover:border-salima-200 transition flex items-center justify-center text-gray-700 font-medium"
            >
              1
            </Label>
            <span className="text-xs mt-1 text-gray-500">מאוד לא מסכים</span>
          </div>
          
          <div className="flex flex-col items-center">
            <RadioGroupItem value="2" id={`q${question.id}-2`} className="peer sr-only" />
            <Label
              htmlFor={`q${question.id}-2`}
              className="text-center block cursor-pointer rounded-full w-12 h-12 bg-white border-2 border-gray-200 peer-checked:border-salima-600 peer-checked:bg-salima-50 peer-checked:text-salima-700 hover:border-salima-200 transition flex items-center justify-center text-gray-700 font-medium"
            >
              2
            </Label>
            <span className="text-xs mt-1 text-gray-500">לא מסכים</span>
          </div>
          
          <div className="flex flex-col items-center">
            <RadioGroupItem value="3" id={`q${question.id}-3`} className="peer sr-only" />
            <Label
              htmlFor={`q${question.id}-3`}
              className="text-center block cursor-pointer rounded-full w-12 h-12 bg-white border-2 border-gray-200 peer-checked:border-salima-600 peer-checked:bg-salima-50 peer-checked:text-salima-700 hover:border-salima-200 transition flex items-center justify-center text-gray-700 font-medium"
            >
              3
            </Label>
            <span className="text-xs mt-1 text-gray-500">ניטרלי</span>
          </div>
          
          <div className="flex flex-col items-center">
            <RadioGroupItem value="4" id={`q${question.id}-4`} className="peer sr-only" />
            <Label
              htmlFor={`q${question.id}-4`}
              className="text-center block cursor-pointer rounded-full w-12 h-12 bg-white border-2 border-gray-200 peer-checked:border-salima-600 peer-checked:bg-salima-50 peer-checked:text-salima-700 hover:border-salima-200 transition flex items-center justify-center text-gray-700 font-medium"
            >
              4
            </Label>
            <span className="text-xs mt-1 text-gray-500">מסכים</span>
          </div>
          
          <div className="flex flex-col items-center">
            <RadioGroupItem value="5" id={`q${question.id}-5`} className="peer sr-only" />
            <Label
              htmlFor={`q${question.id}-5`}
              className="text-center block cursor-pointer rounded-full w-12 h-12 bg-white border-2 border-gray-200 peer-checked:border-salima-600 peer-checked:bg-salima-50 peer-checked:text-salima-700 hover:border-salima-200 transition flex items-center justify-center text-gray-700 font-medium"
            >
              5
            </Label>
            <span className="text-xs mt-1 text-gray-500">מאוד מסכים</span>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default SurveyQuestion;
