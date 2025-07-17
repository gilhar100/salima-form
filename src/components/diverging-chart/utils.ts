
import { dimensionColors, DIMENSION_ORDER } from './constants';

export const getIntensityColor = (score: number, baseColors: any) => {
  // Always return the fixed strong color, ignoring score
  return baseColors.strong;
};

export const getBarWidth = (score: number, personalAverage: number, maxDifference: number) => {
  const difference = Math.abs(score - personalAverage);
  return Math.max(20, (difference / Math.max(maxDifference, 0.5)) * 120); // Min 20px, max 120px
};

export const sortDimensions = (dimensions: any[], personalAverage: number) => {
  // Use fixed archetype order instead of sorting by score
  const orderedDimensions = DIMENSION_ORDER.map(dimKey => 
    dimensions.find(d => d.dimension === dimKey)
  ).filter(Boolean);
  
  const aboveAverage = orderedDimensions.filter(d => d.score > personalAverage);
  const belowAverage = orderedDimensions.filter(d => d.score < personalAverage);
  
  return { aboveAverage, belowAverage };
};
