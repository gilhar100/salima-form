
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DimensionResult, Question } from '@/lib/types';
import { getDimensionQuestions } from '@/data/questions';
import { dimensionColors } from './ResultsRadar';
import { Loader2 } from 'lucide-react';

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers: { questionId: number; value: number; }[];
  insight?: string;
  isLoadingInsight?: boolean;
}

const ResultsDetailCard: React.FC<ResultsDetailCardProps> = ({ 
  dimension, 
  answers, 
  insight,
  isLoadingInsight = false 
}) => {
  const colors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
  
  // FIXED TERMINOLOGY - Updated dimension names
  const dimensionTitles: Record<string, string> = {
    'S': 'אסטרטגי',
    'A': 'אדפטיביות', // CORRECTED from הסתגלות
    'L': 'לומד',
    'I': 'השראה',
    'M': 'משמעות',
    'A2': 'אותנטיות'
  };

  const hebrewTitle = dimensionTitles[dimension.dimension] || dimension.title;
  
  // Get questions for this dimension
  const dimensionQuestions = getDimensionQuestions(dimension.dimension);
  
  // Find answers for this dimension's questions
  const dimensionAnswers = dimensionQuestions.map(question => {
    const answer = answers.find(a => a.questionId === question.id);
    return {
      question: question.text,
      value: answer?.value || 0
    };
  });

  // Calculate average for this dimension
  const avgScore = dimensionAnswers.length > 0 
    ? dimensionAnswers.reduce((sum, a) => sum + a.value, 0) / dimensionAnswers.length 
    : 0;

  // Get performance level
  const getPerformanceLevel = (score: number) => {
    if (score >= 4.5) return { level: 'מצוין', color: 'text-green-600' };
    if (score >= 4.0) return { level: 'טוב מאוד', color: 'text-blue-600' };
    if (score >= 3.5) return { level: 'טוב', color: 'text-orange-600' };
    if (score >= 3.0) return { level: 'בינוני', color: 'text-yellow-600' };
    return { level: 'דורש שיפור', color: 'text-red-600' };
  };

  const performance = getPerformanceLevel(avgScore);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle 
          className="flex items-center gap-2 font-bold"
          style={{ 
            color: colors?.primary || '#4F46E5',
            fontSize: '18px'
          }}
        >
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors?.primary || '#4F46E5' }}
          />
          {hebrewTitle}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Score and Performance Level */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-black font-medium" style={{ fontSize: '16px' }}>ציון ממוצע:</span>
            <span 
              className="font-bold text-lg"
              style={{ color: colors?.primary || '#4F46E5' }}
            >
              {avgScore.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black" style={{ fontSize: '16px' }}>רמת ביצוע:</span>
            <span className={`font-semibold ${performance.color}`} style={{ fontSize: '16px' }}>
              {performance.level}
            </span>
          </div>
        </div>

        {/* Database Insight */}
        {isLoadingInsight ? (
          <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-center">
            <Loader2 style={{ width: '16px', height: '16px' }} className="animate-spin mr-2" />
            <span className="text-blue-600" style={{ fontSize: '16px' }}>טוען תובנות...</span>
          </div>
        ) : insight && insight.trim() !== '' ? (
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-700 mb-2" style={{ fontSize: '16px' }}>תובנה אישית:</h4>
            <p className="text-black leading-relaxed" style={{ fontSize: '16px' }}>
              {insight}
            </p>
          </div>
        ) : null}

        {/* Questions and Answers */}
        <div className="space-y-3">
          <h4 className="font-semibold text-black" style={{ fontSize: '16px' }}>השאלות בממד זה:</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {dimensionAnswers.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded p-2 text-sm">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-black flex-1" style={{ fontSize: '14px' }}>
                    {item.question}
                  </span>
                  <span 
                    className="font-semibold min-w-fit"
                    style={{ 
                      color: colors?.primary || '#4F46E5',
                      fontSize: '14px'
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDetailCard;
