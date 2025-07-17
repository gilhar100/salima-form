
import { DimensionResult } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dimensionColors } from "./diverging-chart/constants";
import { questions, dimensionMapping } from "@/data/questions";
import { getAdjustedValue } from "@/lib/calculations";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

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

// פונקציה לזיהוי חוזקות וחולשות בתוך הממד
const analyzeSubDimensions = (dimSubDimensions: Record<string, number[]>, answers: { questionId: number; value: number }[]) => {
  const subDimensionScores = Object.entries(dimSubDimensions).map(([name, questionIds]) => ({
    name,
    score: calculateSubDimensionScore(questionIds, answers),
    questionCount: questionIds.length
  }));

  // מיון לפי ציון
  subDimensionScores.sort((a, b) => b.score - a.score);
  
  const highest = subDimensionScores[0];
  const lowest = subDimensionScores[subDimensionScores.length - 1];
  const gap = highest.score - lowest.score;
  
  let analysis = "";
  let recommendations = "";
  let icon = null;
  let iconColor = "";

  if (gap >= 1.5) {
    analysis = `נמצא פער משמעותי בתוך הממד: בעוד שקיימת חוזקה ב${highest.name} (${highest.score}), יש מקום משמעותי לשיפור ב${lowest.name} (${lowest.score}).`;
    recommendations = `מומלץ להתמקד בחיזוק ${lowest.name} תוך ניצול החוזקה הקיימת ב${highest.name}.`;
    icon = <AlertCircle className="h-4 w-4" />;
    iconColor = "#f59e0b";
  } else if (gap >= 0.8) {
    analysis = `קיים פער בינוני בתוך הממד: ${highest.name} מהווה נקודת חוזקה יחסית, בעוד ש${lowest.name} זקוק לתשומת לב נוספת.`;
    recommendations = `כדאי להשקיע במיתוח ${lowest.name} תוך שמירה על הרמה הטובה ב${highest.name}.`;
    icon = <TrendingDown className="h-4 w-4" />;
    iconColor = "#fb923c";
  } else {
    analysis = `הממד מציג עקביות טובה: כל תתי-התחומים נמצאים ברמה דומה, כאשר ${highest.name} בולט מעט כנקודת חוזקה.`;
    recommendations = `המשך לפתח את כל תתי-התחומים באופן מאוזן תוך ניצול החוזקה ב${highest.name}.`;
    icon = <TrendingUp className="h-4 w-4" />;
    iconColor = "#10b981";
  }

  return {
    analysis,
    recommendations,
    highest,
    lowest,
    gap,
    icon,
    iconColor,
    subDimensionScores
  };
};

const SubDimensionAnalysis: React.FC<SubDimensionAnalysisProps> = ({ dimension, answers }) => {
  const colors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
  const dimSubDimensions = subDimensions[dimension.dimension as keyof typeof subDimensions];
  
  if (!dimSubDimensions) return null;

  const {
    analysis,
    recommendations,
    highest,
    lowest,
    gap,
    icon,
    iconColor,
    subDimensionScores
  } = analyzeSubDimensions(dimSubDimensions, answers);

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3" style={{ backgroundColor: colors.light }}>
        <CardTitle className="text-lg flex items-center gap-2" style={{ color: colors.primary }}>
          ניתוח מפורט - {dimension.title}
          <div style={{ color: iconColor }}>
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          
          {/* ניתוח כללי */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-gray-800">
              תובנת מפתח:
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {analysis}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-medium">המלצה:</span> {recommendations}
            </p>
          </div>

          {/* פירוט תתי-התחומים */}
          <div className="grid gap-3">
            <h4 className="font-semibold text-sm" style={{ color: colors.primary }}>
              פירוט תתי-התחומים:
            </h4>
            
            {subDimensionScores.map((subDim, index) => {
              let statusColor = "";
              let statusText = "";
              let statusIcon = null;
              
              if (subDim.name === highest.name && gap >= 0.8) {
                statusColor = "#10b981";
                statusText = "נקודת חוזקה";
                statusIcon = <TrendingUp className="h-3 w-3" />;
              } else if (subDim.name === lowest.name && gap >= 0.8) {
                statusColor = "#f59e0b";
                statusText = "לפיתוח";
                statusIcon = <TrendingDown className="h-3 w-3" />;
              } else {
                statusColor = "#6b7280";
                statusText = "ברמה סבירה";
              }
              
              return (
                <div 
                  key={subDim.name} 
                  className="flex items-center justify-between p-3 border rounded-lg"
                  style={{ backgroundColor: colors.light, borderColor: colors.medium }}
                >
                  <div className="flex-1">
                    <h5 className="font-medium text-sm" style={{ color: colors.primary }}>
                      {subDim.name}
                    </h5>
                    <p className="text-xs text-gray-600">
                      {subDim.questionCount} שאלות
                    </p>
                  </div>
                  
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: `${statusColor}20`,
                      color: statusColor 
                    }}
                  >
                    {statusIcon}
                    {statusText}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* סיכום מספרי */}
          <div 
            className="p-3 rounded-lg text-center"
            style={{ backgroundColor: colors.light }}
          >
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-gray-600">החזק ביותר</p>
                <p className="font-semibold" style={{ color: colors.primary }}>
                  {highest.name}
                </p>
              </div>
              <div>
                <p className="text-gray-600">פער</p>
                <p className="font-semibold" style={{ color: iconColor }}>
                  {gap.toFixed(1)} נקודות
                </p>
              </div>
              <div>
                <p className="text-gray-600">לפיתוח</p>
                <p className="font-semibold" style={{ color: colors.primary }}>
                  {lowest.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubDimensionAnalysis;
