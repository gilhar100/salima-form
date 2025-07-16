import React, { useState } from 'react';
import { SurveyResult } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PersonalColorProfileProps {
  result: SurveyResult;
}

const PersonalColorProfile: React.FC<PersonalColorProfileProps> = ({
  result
}) => {
  const isMobile = useIsMobile();
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const { dimensions } = result;

  // Updated color palette based on the requirements
  const dimensionColors = {
    'S': {
      primary: '#E53E3E', // Red
      light: '#FED7D7',
      border: '#E53E3E'
    },
    'A': {
      primary: '#3182CE', // Blue  
      light: '#BEE3F8',
      border: '#3182CE'
    },
    'L': {
      primary: '#D69E2E', // Yellow
      light: '#FAF089',
      border: '#D69E2E'
    },
    'I': {
      primary: '#D53F8C', // Pink
      light: '#FBB6CE',
      border: '#D53F8C'
    },
    'A2': {
      primary: '#00B5D8', // Turquoise
      light: '#9DECF9',
      border: '#00B5D8'
    },
    'M': {
      primary: '#8B4513', // Brown
      light: '#D2B48C',
      border: '#8B4513'
    }
  };

  // Archetype group colors for borders
  const archetypeColors = {
    opportunity: '#805AD5', // Purple for Strategy + Adaptive
    curious: '#FF8C00',     // Orange for Learning + Inspiration  
    empowering: '#38A169'   // Green for Authentic + Meaning
  };

  // Dimension descriptions in Hebrew
  const dimensionDescriptions = {
    'S': 'היכולת לראות את התמונה הגדולה, לזהות הזדמנויות במצבים משתנים, ולפעול מתוך חזון ברור ולא רק מתוך תגובה למציאות הנוכחית. מנהלים עם ממד אסטרטגי גבוה מתמקדים באפקטיביות לטווח ארוך.',
    'A': 'גמישות מחשבתית והתנהגותית, היכולת להסתגל במהירות לשינויים, להתמודד עם אי-ודאות ולפעול ביצירתיות גם במצבי קצה. ממד זה קשור לחוסן ולקבלת שינוי כהזדמנות.',
    'L': 'גישה של צמיחה מתמשכת, פתיחות למשוב וללמידה מהצלחות וכישלונות. ממד הלמידה מצביע על סקרנות, עומק מקצועי ורצון להתפתח ולהשתפר כל הזמן.',
    'I': 'היכולת להניע אחרים באמצעות נרטיב, ערכים ודוגמה אישית. מנהלים עם השראה גבוהה יוצרים אמון, מעוררים מוטיבציה ומקרינים נוכחות מנהיגותית.',
    'M': 'קשר עמוק לערכים פנימיים, מחויבות לתרומה שמעבר לעצמי ולתחושת שליחות. ממד המשמעות מייצג מנהיגות קשובה שפועלת בהלימה למטרות ערכיות.',
    'A2': 'שקיפות, יושרה ויכולת להביא את עצמך באופן כן ומדויק גם במצבי לחץ. ממד זה עוסק בכנות, אמפתיה, ובחיבור בין העולם הפנימי שלך להתנהלותך המקצועית.'
  };

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

  // הכנת הנתונים בסדר הנדרש - עם adjacency rules
  // Strategy(S) + Adaptive(A), Learning(L) + Inspiration(I), Authentic(A2) + Meaning(M)
  const profileData = [{
    name: 'אסטרטגיה',
    dimension: 'S',
    value: getExtremeNonLinearSize(dimensions.S.score),
    color: dimensionColors.S.primary,
    originalScore: dimensions.S.score,
    archetypeGroup: 'opportunity'
  }, {
    name: 'אדפטיביות', 
    dimension: 'A',
    value: getExtremeNonLinearSize(dimensions.A.score),
    color: dimensionColors.A.primary,
    originalScore: dimensions.A.score,
    archetypeGroup: 'opportunity'
  }, {
    name: 'למידה',
    dimension: 'L',
    value: getExtremeNonLinearSize(dimensions.L.score),
    color: dimensionColors.L.primary,
    originalScore: dimensions.L.score,
    archetypeGroup: 'curious'
  }, {
    name: 'השראה',
    dimension: 'I',
    value: getExtremeNonLinearSize(dimensions.I.score),
    color: dimensionColors.I.primary,
    originalScore: dimensions.I.score,
    archetypeGroup: 'curious'
  }, {
    name: 'אותנטיות',
    dimension: 'A2',
    value: getExtremeNonLinearSize(dimensions.A2.score),
    color: dimensionColors.A2.primary,
    originalScore: dimensions.A2.score,
    archetypeGroup: 'empowering'
  }, {
    name: 'משמעות',
    dimension: 'M',
    value: getExtremeNonLinearSize(dimensions.M.score),
    color: dimensionColors.M.primary,
    originalScore: dimensions.M.score,
    archetypeGroup: 'empowering'
  }];

  const handlePieClick = (data: any) => {
    if (data && data.dimension) {
      setSelectedDimension(selectedDimension === data.dimension ? null : data.dimension);
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedDimension(null);
    }
  };

  // Custom render function for archetype group borders
  const renderArchetypeBorders = () => {
    const cx = isMobile ? 120 : 150;
    const cy = isMobile ? 120 : 150;
    const outerRadius = isMobile ? 84 : 112.5; // Match pie chart outer radius
    const borderWidth = 5;
    const borderOffset = 2; // Small offset to position just outside the pie

    // Calculate total value for percentage calculations
    const totalValue = profileData.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate angles for each segment
    let currentAngle = -Math.PI / 2; // Start from top (12 o'clock)
    const segments = profileData.map(item => {
      const percentage = item.value / totalValue;
      const sweepAngle = percentage * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sweepAngle;
      currentAngle = endAngle;
      
      return {
        ...item,
        startAngle,
        endAngle,
        sweepAngle
      };
    });

    // Function to create arc path
    const createArcPath = (startAngle: number, endAngle: number, radius: number) => {
      const x1 = cx + radius * Math.cos(startAngle);
      const y1 = cy + radius * Math.sin(startAngle);
      const x2 = cx + radius * Math.cos(endAngle);
      const y2 = cy + radius * Math.sin(endAngle);
      
      const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
      
      return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    };

    return (
      <svg 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        {/* Strategy + Adaptive border (Purple) - indices 0,1 */}
        <path
          d={createArcPath(
            segments[0].startAngle, 
            segments[1].endAngle, 
            outerRadius + borderOffset
          )}
          fill="none"
          stroke={archetypeColors.opportunity}
          strokeWidth={borderWidth}
          strokeLinecap="round"
        />
        
        {/* Learning + Inspiration border (Orange) - indices 2,3 */}
        <path
          d={createArcPath(
            segments[2].startAngle, 
            segments[3].endAngle, 
            outerRadius + borderOffset
          )}
          fill="none"
          stroke={archetypeColors.curious}
          strokeWidth={borderWidth}
          strokeLinecap="round"
        />
        
        {/* Authentic + Meaning border (Green) - indices 4,5 */}
        <path
          d={createArcPath(
            segments[4].startAngle, 
            segments[5].endAngle, 
            outerRadius + borderOffset
          )}
          fill="none"
          stroke={archetypeColors.empowering}
          strokeWidth={borderWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-center text-black text-xl sm:text-2xl">
          טביעת צבע אישית
        </CardTitle>
        <p className="text-center text-black text-sm sm:text-base">הפרופיל הצבעוני הייחודי שלך במנהיגות</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-4 sm:px-6" onClick={handleClickOutside}>
        <div className="w-full h-64 sm:h-80 lg:h-96 relative">
          {renderArchetypeBorders()}
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
                startAngle={90}
                endAngle={450}
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
        
        {/* מקרא צבעים עם נראות משופרת */}
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
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shadow-md flex-shrink-0" 
                   style={{ backgroundColor: dimension.color }} />
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
          <br />
          <span className="text-xs text-gray-600 mt-1 block">לחץ על פרק או על שם הממד למידע נוסף</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;
