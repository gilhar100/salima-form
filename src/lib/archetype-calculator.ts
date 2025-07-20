
import { Answer } from "./types";

// Archetype question mappings based on the database migration
const ARCHETYPE_QUESTIONS = {
  "המנהל הסקרן": [93, 96, 98, 100, 105], // Learning + Inspiration questions
  "מנהל ההזדמנות": [91, 94, 97, 101, 103], // Strategy + Adaptive questions  
  "המנהל המעצים": [92, 95, 99, 102, 104] // Authenticity + Meaning questions
};

export const calculateDominantArchetype = (answers: Answer[]): string => {
  console.log('Calculating dominant archetype from answers:', answers);
  
  // Filter answers for archetype questions (91-105) - make sure we have valid answers
  const archetypeAnswers = answers.filter(answer => 
    answer && 
    typeof answer.questionId === 'number' && 
    typeof answer.value === 'number' &&
    answer.questionId >= 91 && 
    answer.questionId <= 105
  );
  
  console.log('Valid archetype answers (91-105):', archetypeAnswers);
  
  // If we don't have enough archetype answers, return a default
  if (archetypeAnswers.length < 5) {
    console.log('Not enough archetype answers, returning default');
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
      const answerValue = answer ? answer.value : 0;
      console.log(`Question ${questionId} for ${archetype}: ${answerValue}`);
      return sum + answerValue;
    }, 0);
    scores[archetype as keyof typeof scores] = archetypeScore;
    console.log(`${archetype} total score:`, archetypeScore);
  });
  
  // Find the archetype with the highest score
  const dominantArchetype = Object.entries(scores).reduce((prev, current) => 
    current[1] > prev[1] ? current : prev
  )[0];
  
  console.log('Final calculated dominant archetype:', dominantArchetype);
  console.log('All archetype scores:', scores);
  
  return dominantArchetype;
};
