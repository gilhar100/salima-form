
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
    
    // Enhanced contrast with stronger intensity differences
    if (normalizedScore >= 0.85) return baseColors.strongest;
    if (normalizedScore >= 0.65) return baseColors.strong;
    if (normalizedScore >= 0.45) return baseColors.medium;
    if (normalizedScore >= 0.25) return baseColors.weak;
    return baseColors.weakest;
  }

  // פונקציה לסקיילה לא ליניארית משופרת להגברת ההבדלים הוויזואליים
  function getNonLinearSize(score: number): number {
    const normalizedScore = Math.max(0, Math.min(5, score));
    
    // Much more aggressive non-linear scaling to amplify visual differences
    if (normalizedScore >= 4.7) return 100;
    if (normalizedScore >= 4.3) return 85;
    if (normalizedScore >= 4.0) return 70;
    if (normalizedScore >= 3.7) return 55;
    if (normalizedScore >= 3.4) return 42;
    if (normalizedScore >= 3.1) return 30;
    if (normalizedScore >= 2.8) return 20;
    if (normalizedScore >= 2.5) return 12;
    if (normalizedScore >= 2.2) return 8;
    return 5;
  }
  
  // הכנת הנתונים לתצוגה בגלגל הצבעים
  const profileData = [
    { 
      name: 'אסטרטגיה', 
      label: 'S',
      value: getNonLinearSize(dimensions.S.score), 
      color: getIntensityColor(dimensions.S.score, dimensionColors.S),
      originalScore: dimensions.S.score
    },
    { 
      name: 'למידה', 
      label: 'L',
      value: getNonLinearSize(dimensions.L.score), 
      color: getIntensityColor(dimensions.L.score, dimensionColors.L),
      originalScore: dimensions.L.score
    },
    { 
      name: 'השראה', 
      label: 'I',
      value: getNonLinearSize(dimensions.I.score), 
      color: getIntensityColor(dimensions.I.score, dimensionColors.I),
      originalScore: dimensions.I.score
    },
    { 
      name: 'משמעות', 
      label: 'M',
      value: getNonLinearSize(dimensions.M.score), 
      color: getIntensityColor(dimensions.M.score, dimensionColors.M),
      originalScore: dimensions.M.score
    },
    { 
      name: 'אדפטיביות', 
      label: 'A',
      value: getNonLinearSize(dimensions.A.score), 
      color: getIntensityColor(dimensions.A.score, dimensionColors.A),
      originalScore: dimensions.A.score
    },
    { 
      name: 'אותנטיות', 
      label: 'A2',
      value: getNonLinearSize(dimensions.A2.score), 
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
                formatter={(value, name, props) => [`${props.payload.originalScore}/5`, name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* מקרא צבעים */}
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
                <p className="font-bold" style={{ color: dimension.color, fontSize: '16px' }}>
                  {dimension.originalScore}
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
