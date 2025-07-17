// ✅ Full fixed version combining dynamic borders + interactive elements
// All sections (chart, arcs, tooltips, clickable boxes) are intact

import React, { useState } from 'react';
import { SurveyResult } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { dimensionColors, DIMENSION_ORDER } from './diverging-chart/constants';

interface PersonalColorProfileProps {
  result: SurveyResult;
}

const PersonalColorProfile: React.FC<PersonalColorProfileProps> = ({ result }) => {
  const isMobile = useIsMobile();
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const { dimensions } = result;

  const dimensionDescriptions = {
    'S': 'היכולת לראות את התמונה הגדולה...',
    'A': 'גמישות מחשבתית והתנהגותית...',
    'L': 'גישה של צמיחה מתמשכת...',
    'I': 'היכולת להניע אחרים...',
    'M': 'קשר עמוק לערכים פנימיים...',
    'A2': 'שקיפות, יושרה ויכולת להביא את עצמך...'
  };

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

  const profileData = DIMENSION_ORDER.map(dimKey => {
    const dimension = dimensions[dimKey];
    const hebrewNames = {
      'S': 'אסטרטגיה', 'A': 'אדפטיביות', 'L': 'למידה',
      'I': 'השראה', 'A2': 'אותנטיות', 'M': 'משמעות'
    };
    return {
      name: hebrewNames[dimKey],
      dimension: dimKey,
      value: getExtremeNonLinearSize(dimension.score),
      color: dimensionColors[dimKey].strong,
      originalScore: dimension.score
    };
  });

  const handlePieClick = (data: any) => {
    if (data && data.dimension) {
      setSelectedDimension(selectedDimension === data.dimension ? null : data.dimension);
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedDimension(null);
  };

  const totalValue = profileData.reduce((sum, item) => sum + item.value, 0);
  let cumulativeAngle = 0;
  const effectiveChartDegrees = 360 - (profileData.length * 2);
  const segmentAngles = profileData.map(item => {
    const startAngle = cumulativeAngle;
    const segmentSize = (item.value / totalValue) * effectiveChartDegrees;
    cumulativeAngle += segmentSize;
    return {
      dimension: item.dimension,
      startAngle,
      endAngle: cumulativeAngle
    };
  });

  const createArchetypeBorder = (startAngle: number, endAngle: number, outerRadius: number, strokeColor: string) => {
    const centerX = 50;
    const centerY = 50;
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = centerX + outerRadius * Math.cos(startRad);
    const y1 = centerY + outerRadius * Math.sin(startRad);
    const x2 = centerX + outerRadius * Math.cos(endRad);
    const y2 = centerY + outerRadius * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return (
      <path
        key={`border-${startAngle}-${endAngle}`}
        d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  };

  const archetypeBorders = [
    {
      startAngle: segmentAngles.find(s => s.dimension === 'S')?.startAngle || 0,
      endAngle: segmentAngles.find(s => s.dimension === 'A')?.endAngle || 0,
      color: '#9C27B0'
    },
    {
      startAngle: segmentAngles.find(s => s.dimension === 'L')?.startAngle || 0,
      endAngle: segmentAngles.find(s => s.dimension === 'I')?.endAngle || 0,
      color: '#FF9800'
    },
    {
      startAngle: segmentAngles.find(s => s.dimension === 'A2')?.startAngle || 0,
      endAngle: segmentAngles.find(s => s.dimension === 'M')?.endAngle || 0,
      color: '#4CAF50'
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-center text-black text-xl sm:text-2xl">טביעת צבע אישית</CardTitle>
        <p className="text-center text-black text-sm sm:text-base">הפרופיל הצבעוני הייחודי שלך במנהיגות</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-4 sm:px-6" onClick={handleClickOutside}>
        <div className="w-full h-64 sm:h-80 lg:h-96 relative">
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
                onClick={handlePieClick}
                style={{ cursor: 'pointer' }}
              >
                {profileData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={selectedDimension === entry.dimension ? '#333' : 'none'}
                    strokeWidth={selectedDimension === entry.dimension ? 3 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [name, '']}
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
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {archetypeBorders.map((border, index) =>
              createArchetypeBorder(border.startAngle, border.endAngle, isMobile ? 37 : 39, border.color)
            )}
          </svg>
        </div>

        {selectedDimension && (
          <div className="mt-4 p-4 bg-white border-2 rounded-lg shadow-lg max-w-2xl w-full" style={{ borderColor: profileData.find(d => d.dimension === selectedDimension)?.color }}>
            <h3 className="font-bold text-lg mb-3 text-center text-black">
              {profileData.find(d => d.dimension === selectedDimension)?.name}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-black text-right" dir="rtl">
              {dimensionDescriptions[selectedDimension as keyof typeof dimensionDescriptions]}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-2xl">
          {profileData.map((dimension, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              style={{ backgroundColor: 'white', borderColor: dimension.color }}
              onClick={() => handlePieClick(dimension)}
            >
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shadow-md flex-shrink-0" style={{ backgroundColor: dimension.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-black font-medium truncate text-xs sm:text-sm">
                  {dimension.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-black text-center mt-3 sm:mt-4 max-w-lg text-sm sm:text-base px-2">
          גודל הפרק משקף את חוזק הממד בפרופיל המנהיגות שלך
          <br />
          <span className="text-xs text-gray-600 mt-1 block">לחץ על פרק או על שם הממד למידע נוסף</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;