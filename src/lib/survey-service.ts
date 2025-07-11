
import { supabase } from "@/integrations/supabase/client";
import { SurveyResult, Answer } from "./types";

export const saveSurveyResults = async (
  results: SurveyResult,
  answers: Answer[],
  userInfo: any,
  surveyType: string = 'manager'
) => {
  console.log('Saving survey results:', { results, answers, userInfo, surveyType });
  
  // Prepare the data for insertion
  const surveyData = {
    user_name: userInfo.name || null,
    user_email: userInfo.email || null,
    position: userInfo.position || null,
    department: userInfo.department || null,
    organization: userInfo.organization || null,
    consent_for_research: userInfo.consentForResearch || false,
    is_anonymous: userInfo.isAnonymous !== false, // Default to true if not specified
    survey_type: surveyType,
    
    // Dimension scores
    dimension_s: results.dimensions.S.score,
    dimension_l: results.dimensions.L.score,
    dimension_i: results.dimensions.I.score,
    dimension_m: results.dimensions.M.score,
    dimension_a: results.dimensions.A.score,
    dimension_a2: results.dimensions.A2.score,
    
    // Strategy score (same as S dimension for backward compatibility)
    strategy: results.dimensions.S.score,
    
    // Overall SLQ score
    slq_score: results.slq,
    
    // Archetype data
    dominant_archetype: results.dominantArchetype || null,
    archetype_1_score: results.archetypeScores?.[0] || null,
    archetype_2_score: results.archetypeScores?.[1] || null,
    archetype_3_score: results.archetypeScores?.[2] || null,
    archetype_question_scores: results.archetypeQuestionScores || null,
    
    // Store answers array
    answers: answers.map(a => a.value),
  };

  // Add individual question answers
  answers.forEach((answer, index) => {
    const questionKey = `q${answer.questionId}`;
    (surveyData as any)[questionKey] = answer.value;
    
    // Also add the numeric column format used by some queries
    (surveyData as any)[answer.questionId.toString()] = answer.value;
  });

  console.log('Prepared survey data for database:', surveyData);

  // Insert the survey data
  const { data, error } = await supabase
    .from('survey_responses')
    .insert(surveyData)
    .select('id')
    .single();

  if (error) {
    console.error('Error saving survey:', error);
    throw error;
  }

  console.log('Survey saved with ID:', data.id);
  return data.id;
};

export const getSurveyWithInsights = async (surveyId: string) => {
  console.log('Fetching survey insights for ID:', surveyId);
  
  const { data, error } = await supabase
    .from('survey_responses')
    .select(`
      id,
      insight_strategy,
      insight_adaptive,  
      insight_learning,
      insight_inspiration,
      insight_meaning,
      insight_authentic,
      dominant_archetype
    `)
    .eq('id', surveyId)
    .single();

  if (error) {
    console.error('Error fetching survey insights:', error);
    throw error;
  }

  console.log('Fetched survey insights:', data);
  return data;
};

export const getColleagueSurveyResults = async (surveyId: string) => {
  console.log('Fetching colleague survey results for ID:', surveyId);
  
  const { data, error } = await supabase
    .from('colleague_survey_responses')
    .select('*')
    .eq('id', surveyId)
    .single();

  if (error) {
    console.error('Error fetching colleague survey:', error);
    throw error;
  }

  console.log('Fetched colleague survey results:', data);
  return data;
};
