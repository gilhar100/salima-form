
import React from 'react';
import { SurveyResult } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PersonalColorProfileProps {
  result: SurveyResult;
}

const PersonalColorProfile: React.FC<PersonalColorProfileProps> = ({ result }) => {
  const isMobile = useIsMobile();
  const { dimensions } = result;
  
  // Updated SALIMA color palette
  const dimensionColors = {
    'S': {
      strongest: '#B30000',
      strong: '#FD0100',
      medium: '#FF4D4D',
      weak: '#FF9999',
      weakest: '#FFE6E6'
    },
    'L': {
      strongest: '#0000B3',
      strong: '#333ED4',
      medium: '#6666FF',
      weak: '#9999FF',
      weakest: '#E6E6FF'
    },
    'I': {
      strongest: '#CC4400',
      strong: '#F76915',
      medium: '#FF8533',
      weak: '#FFAA66',
      weakest: '#FFE6CC'
    },
    'M': {
      strongest: '#8A3399',
      strong: '#BF4ED6',
      medium: '#CC66E0',
      weak: '#DD99E6',
      weakest: '#F5E6FF'
    },
    'A': {
      strongest: '#1F6B1F',
      strong: '#2FA236',
      medium: '#5CB85C',
      weak: '#90EE90',
      weakest: '#E6FFE6'
    },
    'A2': {
      strongest: '#B8B800',
      strong: '#EEDE04',
      medium: '#F0E833',
      weak: '#F5F566',
      weakest: '#FFFACD'
    }
  };
  
  // פונקציה לקבלת עוצמת צבע בהתאם לציון
  function getIntensityColor(score: number, baseColors: any) {
    const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
    
    if (normalizedScore >= 0.9) return baseColors.strongest;
    if (normalizedScore >= 0.75) return baseColors.strong;
    if (normalizedScore >= 0.6) return baseColors.medium;
    if (normalizedScore >= 0.4) return baseColors.weak;
    return baseColors.weakest;
  }

  // פונקציה לסקיילה לא ליניארית
  function getExtremeNonLinearSize(score: number): number {
    const normalizedScore = Math.max(0, Math.min(5, score));
    
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
  
  // הכנת הנתונים לתצוגה בגלגל הצבעים - Remove labels from data
  const profileData = [
    { 
      name: 'אסטרטגיה', 
      value: getExtremeNonLinearSize(dimensions.S.score), 
      color: getIntensityColor(dimensions.S.score, dimensionColors.S),
      originalScore: dimensions.S.score
    },
    { 
      name: 'למידה', 
      value: getExtremeNonLinearSize(dimensions.L.score), 
      color: getIntensityColor(dimensions.L.score, dimensionColors.L),
      originalScore: dimensions.L.score
    },
    { 
      name: 'השראה', 
      value: getExtremeNonLinearSize(dimensions.I.score), 
      color: getIntensityColor(dimensions.I.score, dimensionColors.I),
      originalScore: dimensions.I.score
    },
    { 
      name: 'משמעות', 
      value: getExtremeNonLinearSize(dimensions.M.score), 
      color: getIntensityColor(dimensions.M.score, dimensionColors.M),
      originalScore: dimensions.M.score
    },
    { 
      name: 'אדפטיביות', 
      value: getExtremeNonLinearSize(dimensions.A.score), 
      color: getIntensityColor(dimensions.A.score, dimensionColors.A),
      originalScore: dimensions.A.score
    },
    { 
      name: 'אותנטיות', 
      value: getExtremeNonLinearSize(dimensions.A2.score), 
      color: getIntensityColor(dimensions.A2.score, dimensionColors.A2),
      originalScore: dimensions.A2.score
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-center text-black text-xl sm:text-2xl">
          טביעת צבע אישית
        </CardTitle>
        <p className="text-center text-black text-sm sm:text-base">
          הפרופיל הצבעוני הייחודי שלך במנהיגות SALIMA
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-4 sm:px-6">
        <div className="w-full h-64 sm:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={profileData}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? "70%" : "75%"}
                innerRadius={isMobile ? "25%" : "30%"}
                paddingAngle={2}
                dataKey="value"
                // Remove label prop to hide letters
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
                  fontSize: isMobile ? '14px' : '16px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* מקרא צבעים עם נראות משופרת */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-2xl">
          {profileData.map((dimension, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border-2 shadow-sm"
              style={{ 
                backgroundColor: 'white',
                borderColor: dimension.color
              }}
            >
              <div 
                className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shadow-md flex-shrink-0"
                style={{ backgroundColor: dimension.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-black font-medium truncate text-xs sm:text-sm">
                  {dimension.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-black text-center mt-3 sm:mt-4 max-w-lg text-sm sm:text-base px-2">
          גודל הפרק ועוצמת הצבע משקפים את חוזק הממד בפרופיל המנהיגות שלך
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;
