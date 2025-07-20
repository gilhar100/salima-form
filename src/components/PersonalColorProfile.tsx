
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
    'S': 'היכולת לראות את התמונה הגדולה, לזהות הזדמנויות במצבים משתנים, ולפעול מתוך חזון ברור ולא רק מתוך תגובה למציאות הנוכחית. מנהלים עם ממד אסטרטגי גבוה מתמקדים באפקטיביות לטווח ארוך.',
    'A': 'גמישות מחשבתית והתנהגותית, היכולת להסתגל במהירות לשינויים, להתמודד עם אי-ודאות ולפעול ביצירתיות גם במצבי קצה. ממד זה קשור לחוסן ולקבלת שינוי כהזדמנות.',
    'L': 'גישה של צמיחה מתמשכת, פתיחות למשוב וללמידה מהצלחות וכישלונות. ממד הלמידה מצביע על סקרנות, עומק מקצועי ורצון להתפתח ולהשתפר כל הזמן.',
    'I': 'היכולת להניע אחרים באמצעות נרטיב, ערכים ודוגמה אישית. מנהלים עם השראה גבוהה יוצרים אמון, מעוררים מוטיבציה ומקרינים נוכחות מנהיגותית.',
    'M': 'קשר עמוק לערכים פנימיים, מחויבות לתרומה שמעבר לעצמי ולתחושת שליחות. ממד המשמעות מייצג מנהיגות קשובה שפועלת בהלימה למטרות ערכיות.',
    'A2': 'שקיפות, יושרה ויכולת להביא את עצמך באופן כן ומדויק גם במצבי לחץ. ממד זה עוסק בכנות, אמפתיה, ובחיבור בין העולם הפnימי שלך להתנהלותך המקצועית.'
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

  // Reorder dimensions so archetype pairs are adjacent for proper borders
  const archetypeOrder = ['S', 'A', 'L', 'I', 'M', 'A2'] as const;

  const profileData = archetypeOrder.map(dimKey => {
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

  // Calculate archetype border data
  const archetypeGroups = [
    { 
      name: 'מנהל ההזדמנות', 
      dimensions: ['S', 'A'], 
      color: '#8B5CF6' // purple
    },
    { 
      name: 'המנהל הסקרן', 
      dimensions: ['L', 'I'], 
      color: '#F97316' // orange
    },
    { 
      name: 'המנהל המעצים', 
      dimensions: ['M', 'A2'], 
      color: '#10B981' // green
    }
  ];

  // Calculate archetype border segments based on dimension positions and scores
  const totalValue = profileData.reduce((sum, item) => sum + item.value, 0);
  let cumulativeAngle = 0;
  
  const dimensionAngles = profileData.map(item => {
    const startAngle = cumulativeAngle;
    const segmentSize = (item.value / totalValue) * 360;
    cumulativeAngle += segmentSize;
    return {
      dimension: item.dimension,
      startAngle,
      endAngle: cumulativeAngle,
      segmentSize
    };
  });

  // Create continuous archetype border segments that cover the full circle
  const archetypeBorderData = [];
  
  for (const group of archetypeGroups) {
    const groupDimensions = group.dimensions.map(dimKey => 
      dimensionAngles.find(d => d.dimension === dimKey)
    ).filter(Boolean);
    
    if (groupDimensions.length === 2) {
      // Find the indices in the ordered array
      const indices = groupDimensions.map(gd => 
        dimensionAngles.findIndex(d => d.dimension === gd.dimension)
      ).sort((a, b) => a - b);
      
      // Check if dimensions are consecutive or wrap around
      const areConsecutive = indices[1] - indices[0] === 1 || 
                           (indices[0] === 0 && indices[1] === dimensionAngles.length - 1);
      
      if (areConsecutive) {
        const firstDim = dimensionAngles[indices[0]];
        const secondDim = dimensionAngles[indices[1]];
        
        archetypeBorderData.push({
          startAngle: firstDim.startAngle,
          endAngle: secondDim.endAngle,
          color: group.color,
          name: group.name,
          value: firstDim.segmentSize + secondDim.segmentSize
        });
      } else {
        // Dimensions are not consecutive, create two separate segments
        groupDimensions.forEach(gd => {
          archetypeBorderData.push({
            startAngle: gd.startAngle,
            endAngle: gd.endAngle,
            color: group.color,
            name: group.name,
            value: gd.segmentSize
          });
        });
      }
    }
  }

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
              {/* Archetype border segments */}
              <Pie
                data={archetypeBorderData.map(segment => ({ value: segment.endAngle - segment.startAngle }))}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? "85%" : "90%"}
                innerRadius={isMobile ? "82%" : "87%"}
                startAngle={90}
                dataKey="value"
                stroke="none"
              >
                {archetypeBorderData.map((segment, index) => (
                  <Cell
                    key={`archetype-${index}`}
                    fill={segment.color}
                  />
                ))}
              </Pie>
              
              {/* Main dimension pie */}
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

        <div className="text-black text-center mt-3 sm:mt-4 max-w-lg text-base sm:text-lg lg:text-xl px-2">
          <span className="font-bold">
            גודל הפרק משקף את חוזק הממד בפרופיל המנהיגות שלך
          </span>
          <br />
          <span className="text-sm sm:text-base text-gray-600 mt-1 block font-bold">לחץ על פרק או על שם הממד למידע נוסף</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;
