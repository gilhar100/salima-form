
// Re-export all functions from the refactored modules
export { evaluateDimensionLevel } from './analysis/level-evaluation';
export { getColorIntensity } from './analysis/color-intensity';
export { getPersonalizedAnalysis } from './analysis/personalized-analysis';

// Export enhanced analysis functions
export { 
  getEnhancedConditionalAnalysis,
  generateEnhancedDimensionAnalysis,
  validateAnalysisQuality
} from './analysis/enhanced-conditional-analysis';

export { 
  createVariation,
  adaptPronouns,
  generateVariations,
  selectRandomVariation
} from './analysis/variation-engine';
