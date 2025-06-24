
import React from 'react';
import { SurveyResult } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dimensionColors } from "./ResultsRadar";
import { useIsMobile } from "@/hooks/use-mobile";

interface PersonalColorProfileProps {
  result: SurveyResult;
}

const PersonalColorProfile: React.FC<PersonalColorProfileProps> = ({ result }) => {
  const isMobile = useIsMobile();
  const { dimensions } = result;
  
  // פונקציה לקבלת עוצמת צבע בהתאם לציון - משופרת עם ניגודיות חזקה יותר
  function getIntensityColor(score: number, baseColors: any) {
    const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
    
    // Much more aggressive intensity differences with extreme contrast
    if (normalizedScore >= 0.9) return baseColors.strongest;
    if (normalizedScore >= 0.75) return baseColors.strong;
    if (normalizedScore >= 0.6) return baseColors.medium;
    if (normalizedScore >= 0.4) return baseColors.weak;
    return baseColors.weakest;
  }

  // פונקציה לסקיילה לא ליניארית עם הגברה דרמטית של ההבדלים הוויזואליים
  function getExtremeNonLinearSize(score: number): number {
    const normalizedScore = Math.max(0, Math.min(5, score));
    
    // Extremely aggressive scaling to maximize visual differences
    if (normalizedScore >= 4.8) return 100;
    if (normalizedScore >= 4.5) return 85;
    if (normalizedScore >= 4.2) return 72;
    if (normalizedScore >= 3.9) return 60;
    if (normalizedScore >= 3.6) return 48;
    if (normalizedScore >= 3.3) return 36;
    if (normalizedScore >= 3.0) return 25;
    if (normalizedScore >= 2.7) return 16;
    if (normalizedScore >= 2.4) return 10;
    if (normalizedScore >= 2.1) return 6;
    return 3;
  }
  
  // הכנת הנתונים לתצוגה בגלגל הצבעים
  const profileData = [
    { 
      name: 'אסטרטגיה', 
      label: 'S',
      value: getExtremeNonLinearSize(dimensions.S.score), 
      color: getIntensityColor(dimensions.S.score, dimensionColors.S),
      originalScore: dimensions.S.score
    },
    { 
      name: 'למידה', 
      label: 'L',
      value: getExtremeNonLinearSize(dimensions.L.score), 
      color: getIntensityColor(dimensions.L.score, dimensionColors.L),
      originalScore: dimensions.L.score
    },
    { 
      name: 'השראה', 
      label: 'I',
      value: getExtremeNonLinearSize(dimensions.I.score), 
      color: getIntensityColor(dimensions.I.score, dimensionColors.I),
      originalScore: dimensions.I.score
    },
    { 
      name: 'משמעות', 
      label: 'M',
      value: getExtremeNonLinearSize(dimensions.M.score), 
      color: getIntensityColor(dimensions.M.score, dimensionColors.M),
      originalScore: dimensions.M.score
    },
    { 
      name: 'אדפטיביות', 
      label: 'A',
      value: getExtremeNonLinearSize(dimensions.A.score), 
      color: getIntensityColor(dimensions.A.score, dimensionColors.A),
      originalScore: dimensions.A.score
    },
    { 
      name: 'אותנטיות', 
      label: 'A2',
      value: getExtremeNonLinearSize(dimensions.A2.score), 
      color: getIntensityColor(dimensions.A2.score, dimensionColors.A2),
      originalScore: dimensions.A2.score
    }
  ];

  // Custom label renderer for the pie chart
  const renderLabel = (entry: any) => {
    return entry.label;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-black" style={{ fontSize: '22px' }}>
          טביעת צבע אישית
        </CardTitle>
        <p className="text-center text-black" style={{ fontSize: '16px' }}>
          הפרופיל הצבעוני הייחודי שלך במנהיגות SALIMA
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className={`w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={profileData}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 120 : 150}
                innerRadius={isMobile ? 40 : 50}
                paddingAngle={2}
                dataKey="value"
                label={renderLabel}
                labelLine={false}
              >
                {profileData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [name, '']}
                labelFormatter={() => ''}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* מקרא צבעים - ללא ציונים מספריים */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 w-full max-w-md">
          {profileData.map((dimension) => (
            <div 
              key={dimension.label} 
              className="flex items-center gap-2 p-2 rounded-lg border"
              style={{ backgroundColor: `${dimension.color}20` }}
            >
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: dimension.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-black font-medium truncate" style={{ fontSize: '16px' }}>
                  {dimension.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-black text-center mt-4 max-w-sm" style={{ fontSize: '16px' }}>
          גודל הפרק ועוצמת הצבע משקפים את חוזק הממד בפרופיל המנהיגות שלך
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;
