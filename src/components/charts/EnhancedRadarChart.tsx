import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionColors, archetypeGroups } from "@/components/ResultsRadar";

interface EnhancedRadarChartProps {
  data: any[];
  outerRadius?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  fontSize?: number;
  showArchetypeBorders?: boolean;
  children?: React.ReactNode;
}

const EnhancedRadarChart: React.FC<EnhancedRadarChartProps> = ({
  data,
  outerRadius = "70%",
  margin = { top: 30, right: 30, bottom: 30, left: 30 },
  fontSize = 12,
  showArchetypeBorders = true,
  children
}) => {
  // Custom component to render archetype group borders as overlays
  const renderArchetypeBorders = () => {
    if (!showArchetypeBorders) return null;

    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {Object.entries(archetypeGroups).map(([key, group]) => {
            const dimensionIndices = group.dimensions.map(dim => 
              data.findIndex(item => item.dimKey === dim)
            ).filter(index => index !== -1);
            
            if (dimensionIndices.length !== 2) return null;
            
            const centerX = 50;
            const centerY = 50;
            const radius = 32; // Adjusted for better visibility
            const borderRadius = radius + 6;
            
            const angleStep = 360 / data.length;
            const startAngle = (dimensionIndices[0] * angleStep - 90) * (Math.PI / 180);
            const endAngle = (dimensionIndices[1] * angleStep - 90) * (Math.PI / 180);
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const bx1 = centerX + borderRadius * Math.cos(startAngle);
            const by1 = centerY + borderRadius * Math.sin(startAngle);
            const bx2 = centerX + borderRadius * Math.cos(endAngle);
            const by2 = centerY + borderRadius * Math.sin(endAngle);
            
            // Create a path that encloses the archetype pair
            const pathData = `
              M ${x1} ${y1}
              L ${bx1} ${by1}
              A ${borderRadius} ${borderRadius} 0 0 1 ${bx2} ${by2}
              L ${x2} ${y2}
              A ${radius} ${radius} 0 0 0 ${x1} ${y1}
              Z
            `;
            
            return (
              <g key={key}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={group.borderColor}
                  strokeWidth="2"
                  strokeOpacity="0.7"
                  strokeDasharray="5,3"
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart 
          outerRadius={outerRadius}
          data={data}
          margin={margin}
        >
          <defs>
            {/* Gradient definitions for dimension colors */}
            {Object.entries(dimensionColors).map(([key, colors]) => (
              <linearGradient key={key} id={`gradient-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.primary} stopOpacity="0.3" />
              </linearGradient>
            ))}
          </defs>
          
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis 
            dataKey="dimension" 
            fontSize={fontSize}
            tick={{ 
              fontSize: fontSize,
              fontWeight: 'bold',
              fill: '#374151'
            }} 
          />
          
          {children}
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Render archetype borders as overlay */}
      {renderArchetypeBorders()}
    </div>
  );
};

export default EnhancedRadarChart;