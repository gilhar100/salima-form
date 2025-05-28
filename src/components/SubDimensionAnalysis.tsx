
import { DimensionResult } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dimensionColors } from "./ResultsRadar";
import { questions, dimensionMapping } from "@/data/questions";
import { getAdjustedValue } from "@/lib/calculations";

interface SubDimensionAnalysisProps {
  dimension: DimensionResult;
  answers: { questionId: number; value: number }[];
}

// הגדרת תתי-תחומים לכל ממד
const subDimensions = {
  S: {
    "חשיבה אסטרטגית": [1, 6, 10, 15, 23, 31, 38, 43, 51, 53, 57, 64, 73, 83, 89],
    "גמישות תכנונית": [15, 23, 38, 43, 51, 57, 64, 73, 83, 89],
    "ניתוח סביבתי": [1, 6, 10, 43, 51, 64]
  },
  L: {
    "למידה אישית": [2, 11, 14, 19, 22, 29, 33, 42, 45, 52, 69, 70, 72, 76, 82, 85, 88],
    "למידה ארגונית": [11, 22, 29, 42, 45, 52, 76, 82, 88],
    "פתיחות לרעיונות": [2, 11, 19, 29, 76, 82],
    "למידה מכישלונות": [14, 69, 72, 85]
  },
  I: {
    "השראה אישית": [4, 5, 13, 25, 32, 37, 41, 46, 56, 60, 68, 87],
    "מוטיבציה צוותית": [13, 25, 41, 56, 60, 68, 87],
    "מנהיגות חזונית": [5, 25, 32, 37, 68, 87],
    "דוגמה אישית": [4, 5, 37, 46]
  },
  M: {
    "יצירת משמעות": [9, 16, 20, 28, 30, 35, 40, 50, 54, 61, 67, 77, 81, 86],
    "חיבור לערכים": [20, 61, 67, 86],
    "תחושת שליחות": [28, 40, 50, 54],
    "פיתוח אישי": [16, 30, 35, 77, 81]
  },
  A: {
    "שיתוף פעולה": [3, 8, 12, 21, 24, 34, 44, 47, 55, 59, 63, 66, 74, 78, 80],
    "גמישות להשינוי": [12, 24, 47, 55, 59, 78],
    "הקשבה פעילה": [3, 21, 34, 74],
    "עבודת צוות": [8, 44, 63, 66, 80]
  },
  A2: {
    "אותנטיות אישית": [7, 17, 18, 26, 27, 36, 39, 48, 49, 58, 62, 65, 71, 75, 79, 84, 90],
    "שקיפות": [26, 36, 84],
    "קשר אישי": [17, 49, 58, 71, 79, 90],
    "אמינות": [7, 18, 27, 39, 48, 62, 65, 75]
  }
};

// פונקציה לחישוב ציון תת-תחום
const calculateSubDimensionScore = (questionIds: number[], answers: { questionId: number; value: number }[]): number => {
  const relevantAnswers = answers.filter(a => questionIds.includes(a.questionId));
  if (relevantAnswers.length === 0) return 0;
  
  const totalScore = relevantAnswers.reduce((sum, answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return sum;
    return sum + getAdjustedValue(answer.value, question.isReversed);
  }, 0);
  
  return Number((totalScore / relevantAnswers.length).toFixed(2));
};

// פונקציה לקבלת צבע לפי ציון
const getScoreColor = (score: number, colors: any) => {
  if (score >= 4.5) return colors.primary;
  if (score >= 3.7) return colors.medium;
  if (score >= 2.7) return "#fbbf24";
  if (score >= 1.7) return "#fb923c";
  return "#ef4444";
};

// פונקציה לקבלת תיאור רמה
const getScoreLevel = (score: number): string => {
  if (score >= 4.5) return "מצוין";
  if (score >= 3.7) return "גבוה";
  if (score >= 2.7) return "בינוני";
  if (score >= 1.7) return "נמוך";
  return "נמוך מאוד";
};

const SubDimensionAnalysis: React.FC<SubDimensionAnalysisProps> = ({ dimension, answers }) => {
  const colors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
  const dimSubDimensions = subDimensions[dimension.dimension as keyof typeof subDimensions];
  
  if (!dimSubDimensions) return null;

  const subDimensionScores = Object.entries(dimSubDimensions).map(([name, questionIds]) => ({
    name,
    score: calculateSubDimensionScore(questionIds, answers),
    questionCount: questionIds.length
  }));

  // מיון לפי ציון - הכי גבוה קודם
  subDimensionScores.sort((a, b) => b.score - a.score);

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3" style={{ backgroundColor: colors.light }}>
        <CardTitle className="text-lg" style={{ color: colors.primary }}>
          ניתוח מפורט - {dimension.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {subDimensionScores.map((subDim, index) => {
            const scoreColor = getScoreColor(subDim.score, colors);
            const level = getScoreLevel(subDim.score);
            
            return (
              <div key={subDim.name} className="border rounded-lg p-4" style={{ backgroundColor: colors.light }}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm" style={{ color: colors.primary }}>
                    {subDim.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">
                      ({subDim.questionCount} שאלות)
                    </span>
                    <div 
                      className="px-2 py-1 rounded text-white text-xs font-bold"
                      style={{ backgroundColor: scoreColor }}
                    >
                      {subDim.score}
                    </div>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>1.0</span>
                    <span>5.0</span>
                  </div>
                  <div className="relative">
                    <Progress value={20} className="h-2" />
                    <div 
                      className="absolute top-0 h-2 rounded-full"
                      style={{ 
                        width: `${(subDim.score / 5) * 100}%`,
                        backgroundColor: scoreColor
                      }}
                    />
                  </div>
                </div>
                
                <p className="text-xs text-gray-600">
                  רמה: <span className="font-semibold" style={{ color: scoreColor }}>{level}</span>
                  {index === 0 && subDim.score === Math.max(...subDimensionScores.map(s => s.score)) && (
                    <span className="mr-2 text-green-600">🌟 נקודת חוזק</span>
                  )}
                  {index === subDimensionScores.length - 1 && subDim.score === Math.min(...subDimensionScores.map(s => s.score)) && (
                    <span className="mr-2 text-orange-600">📈 לפיתוח</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* סיכום תובנות */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h5 className="font-semibold text-sm mb-2" style={{ color: colors.primary }}>
            תובנות מרכזיות:
          </h5>
          <div className="text-xs space-y-1">
            <p>
              <span className="font-semibold text-green-600">נקודת החוזק:</span> {subDimensionScores[0].name} ({subDimensionScores[0].score})
            </p>
            <p>
              <span className="font-semibold text-orange-600">לפיתוח:</span> {subDimensionScores[subDimensionScores.length - 1].name} ({subDimensionScores[subDimensionScores.length - 1].score})
            </p>
            <p>
              <span className="font-semibold">פער:</span> {(subDimensionScores[0].score - subDimensionScores[subDimensionScores.length - 1].score).toFixed(2)} נקודות
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubDimensionAnalysis;
