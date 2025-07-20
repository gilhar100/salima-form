
import { Answer } from "./types";

// Archetype question mappings based on the database migration
const ARCHETYPE_QUESTIONS = {
  "המנהל הסקרן": [93, 96, 98, 100, 105], // Learning + Inspiration questions
  "מנהל ההזדמנות": [91, 94, 97, 101, 103], // Strategy + Adaptive questions  
  "המנהל המעצים": [92, 95, 99, 102, 104] // Authenticity + Meaning questions
};

export const calculateDominantArchetype = (answers: Answer[]): string => {
  console.log('Calculating dominant archetype from answers:', answers);
  
  // Filter answers for archetype questions (91-105)
  const archetypeAnswers = answers.filter(answer => 
    answer.questionId >= 91 && answer.questionId <= 105
  );
  
  console.log('Archetype answers (91-105):', archetypeAnswers);
  
  if (archetypeAnswers.length === 0) {
    console.log('No archetype answers found, returning default');
    return "המנהל הסקרן"; // Default fallback
  }
  
  // Calculate scores for each archetype
  const scores = {
    "המנהל הסקרן": 0,
    "מנהל ההזדמנות": 0, 
    "המנהל המעצים": 0
  };
  
  // Sum up scores for each archetype based on their question mappings
  Object.entries(ARCHETYPE_QUESTIONS).forEach(([archetype, questionIds]) => {
    const archetypeScore = questionIds.reduce((sum, questionId) => {
      const answer = archetypeAnswers.find(a => a.questionId === questionId);
      return sum + (answer ? answer.value : 0);
    }, 0);
    scores[archetype as keyof typeof scores] = archetypeScore;
    console.log(`${archetype} score:`, archetypeScore);
  });
  
  // Find the archetype with the highest score
  const dominantArchetype = Object.entries(scores).reduce((prev, current) => 
    current[1] > prev[1] ? current : prev
  )[0];
  
  console.log('Calculated dominant archetype:', dominantArchetype);
  console.log('All scores:', scores);
  
  return dominantArchetype;
};
