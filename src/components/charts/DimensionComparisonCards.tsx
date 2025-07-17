import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SurveyResult } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { dimensionNames } from "../diverging-chart/constants";

interface SurveyResponse {
  id: string;
  slq_score: number;
  dimension_s: number;
  dimension_l: number;
  dimension_i: number;
  dimension_m: number;
  dimension_a: number;
  dimension_a2: number;
  created_at: string;
}

interface DimensionComparisonCardsProps {
  statistics: SurveyResponse[];
  userResults: SurveyResult;
}

const dimensionDescriptions = {
  S: "ממד האסטרטגיה מתמקד ביכולת לפתח ולהוביל תוכניות ארוכות טווח, לנתח מצבים מורכבים ולקבל החלטות אסטרטגיות.",
  L: "ממד הלמידה מתייחס לסקרנות, לחיפוש ידע חדש ולפתיחות לחוויות ולרעיונות חדשים.",
  I: "ממד ההשראה מתמקד ביכולת להניע ולעורר אחרים, ליצור חזון מעורר השראה ולהנהיג שינוי.",
  M: "ממד המשמעות מתייחס ליכולת לחבר בין העבודה לערכים ולמטרות גבוהות יותר.",
  A: "ממד ההסתגלות מתמקד בגמישות, בהתמודדות עם שינויים ובניהול אי-ודאות.",
  A2: "ממד האותנטיות מתייחס להיכרות העצמית, לשקיפות ולפעילות בהתאם לערכים האישיים."
};

const DimensionComparisonCards: React.FC<DimensionComparisonCardsProps> = ({ statistics, userResults }) => {
  const isMobile = useIsMobile();
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  const colors = {
    S: "#8B5CF6", // Purple
    L: "#F97316", // Orange
    I: "#F97316", // Orange
    M: "#10B981", // Green
    A: "#8B5CF6", // Purple
    A2: "#10B981"  // Green
  };

  const createProfileData = () => {
    const dimensions = ['S', 'L', 'I', 'M', 'A', 'A2'];
    
    return dimensions.map(dim => {
      const userScore = userResults.dimensions[dim as keyof typeof userResults.dimensions]?.score || 0;
      
      return {
        dimension: dim,
        name: dimensionNames[dim],
        value: userScore,
        color: colors[dim as keyof typeof colors]
      };
    });
  };

  const profileData = createProfileData();

  // Define archetype borders with adjusted angles to match the pie segments
  const archetypeBorders = [
    {
      startAngle: 0,   // Strategy start
      endAngle: 120,   // Adaptive end (2 segments = 120 degrees)
      color: "#8B5CF6" // Purple
    },
    {
      startAngle: 120, // Learning start
      endAngle: 240,   // Inspiration end (2 segments = 120 degrees)
      color: "#F97316" // Orange
    },
    {
      startAngle: 240, // Meaning start
      endAngle: 360,   // Authentic end (2 segments = 120 degrees)
      color: "#10B981" // Green
    }
  ];

  const createArchetypeBorder = (startAngle: number, endAngle: number, radius: number, color: string) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 50 + radius * Math.cos(startRad);
    const y1 = 50 + radius * Math.sin(startRad);
    const x2 = 50 + radius * Math.cos(endRad);
    const y2 = 50 + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return (
      <path
        key={`border-${startAngle}-${endAngle}`}
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
    );
  };

  const handlePieClick = (dimension: any) => {
    setSelectedDimension(selectedDimension === dimension.dimension ? null : dimension.dimension);
  };

  const handleClickOutside = () => {
    setSelectedDimension(null);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">פרופיל ממדי המנהיגות שלך</CardTitle>
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
                dataKey="value"
                startAngle={0}
                endAngle={360}
                onClick={handlePieClick}
              >
                {profileData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [Number(value).toFixed(2), 'ציון']}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return data.name;
                  }
                  return label;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {archetypeBorders.map((border, index) =>
              createArchetypeBorder(
                border.startAngle,
                border.endAngle,
                isMobile ? 35 : 37.5,
                border.color
              )
            )}
          </svg>
        </div>

        {/* Tooltip/Description Box */}
        {selectedDimension && (
          <div className="mt-4 p-4 bg-white border-2 rounded-lg shadow-lg max-w-2xl w-full"
               style={{ borderColor: profileData.find(d => d.dimension === selectedDimension)?.color }}>
            <h3 className="font-bold text-lg mb-3 text-center text-black">
              {profileData.find(d => d.dimension === selectedDimension)?.name}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-black text-right" dir="rtl">
              {dimensionDescriptions[selectedDimension as keyof typeof dimensionDescriptions]}
            </p>
          </div>
        )}

        {/* Color Key / Interactive Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-2xl">
          {profileData.map((dimension, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              style={{
                backgroundColor: 'white',
                borderColor: dimension.color
              }}
              onClick={() => handlePieClick(dimension)}
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
          גודל הפרק משקף את חוזק הממד בפרופיל המנהיגות שלך
          <br />
          <span className="text-xs text-gray-600 mt-1 block">
            לחץ על פרק או על שם הממד למידע נוסף
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionComparisonCards;