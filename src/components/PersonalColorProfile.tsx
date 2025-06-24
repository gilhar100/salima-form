
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
  
  // הכנת הנתונים לתצוגה בגלגל הצבעים
  const profileData = [
    { 
      name: 'אסטרטגיה', 
      label: 'S',
      value: dimensions.S.score, 
      color: getIntensityColor(dimensions.S.score, dimensionColors.S),
      angle: (dimensions.S.score / 5) * 60 // כל פרק יכול לקחת עד 60 מעלות
    },
    { 
      name: 'למידה', 
      label: 'L',
      value: dimensions.L.score, 
      color: getIntensityColor(dimensions.L.score, dimensionColors.L),
      angle: (dimensions.L.score / 5) * 60
    },
    { 
      name: 'השראה', 
      label: 'I',
      value: dimensions.I.score, 
      color: getIntensityColor(dimensions.I.score, dimensionColors.I),
      angle: (dimensions.I.score / 5) * 60
    },
    { 
      name: 'משמעות', 
      label: 'M',
      value: dimensions.M.score, 
      color: getIntensityColor(dimensions.M.score, dimensionColors.M),
      angle: (dimensions.M.score / 5) * 60
    },
    { 
      name: 'אדפטיביות', 
      label: 'A',
      value: dimensions.A.score, 
      color: getIntensityColor(dimensions.A.score, dimensionColors.A),
      angle: (dimensions.A.score / 5) * 60
    },
    { 
      name: 'אותנטיות', 
      label: 'A2',
      value: dimensions.A2.score, 
      color: getIntensityColor(dimensions.A2.score, dimensionColors.A2),
      angle: (dimensions.A2.score / 5) * 60
    }
  ];

  // פונקציה לקבלת עוצמת צבע בהתאם לציון
  function getIntensityColor(score: number, baseColors: any) {
    const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
    
    if (normalizedScore >= 0.9) return baseColors.strongest;
    if (normalizedScore >= 0.75) return baseColors.strong;
    if (normalizedScore >= 0.55) return baseColors.medium;
    if (normalizedScore >= 0.35) return baseColors.weak;
    return baseColors.weakest;
  }

  // Custom label renderer for the pie chart
  const renderLabel = (entry: any) => {
    return entry.label;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg sm:text-xl leading-tight text-salima-800">
          טביעת צבע אישית
        </CardTitle>
        <p className="text-center text-sm text-gray-600">
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
                formatter={(value, name) => [`${value}/5`, name]}
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
                <p className="text-xs font-medium text-gray-700 truncate">
                  {dimension.name}
                </p>
                <p className="text-sm font-bold" style={{ color: dimension.color }}>
                  {dimension.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-4 max-w-sm">
          גודל הפרק ועוצמת הצבע משקפים את חוזק הממד בפרופיל המנהיגות שלך
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;
