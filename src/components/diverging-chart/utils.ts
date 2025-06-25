
import { dimensionColors } from './constants';

export const getIntensityColor = (score: number, baseColors: any) => {
  const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
  
  if (normalizedScore >= 0.9) return baseColors.strongest;
  if (normalizedScore >= 0.75) return baseColors.strong;
  if (normalizedScore >= 0.6) return baseColors.medium;
  if (normalizedScore >= 0.4) return baseColors.weak;
  return baseColors.weakest;
};

export const getBarWidth = (score: number, personalAverage: number, maxDifference: number) => {
  const difference = Math.abs(score - personalAverage);
  return Math.max(20, (difference / Math.max(maxDifference, 0.5)) * 120); // Min 20px, max 120px
};

export const sortDimensions = (dimensions: any[], personalAverage: number) => {
  const aboveAverage = dimensions.filter(d => d.score > personalAverage);
  const belowAverage = dimensions.filter(d => d.score < personalAverage);
  
  // Sort by difference from average for better visual hierarchy
  aboveAverage.sort((a, b) => (b.score - personalAverage) - (a.score - personalAverage));
  belowAverage.sort((a, b) => (personalAverage - a.score) - (personalAverage - b.score));
  
  return { aboveAverage, belowAverage };
};
