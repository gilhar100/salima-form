
import { SurveyResult, Answer, ColleagueSubmissionResult, UserInfo } from "./types";
import { supabase } from "@/integrations/supabase/client";

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
    is_anonymous: userInfo.isAnonymous !== false,
    survey_type: surveyType,
    
    // Dimension scores
    dimension_s: results.dimensions.S.score,
    dimension_l: results.dimensions.L.score,
    dimension_i: results.dimensions.I.score,
    dimension_m: results.dimensions.M.score,
    dimension_a: results.dimensions.A.score,
    dimension_a2: results.dimensions.A2.score,
    
    strategy: results.dimensions.S.score,
    slq_score: results.slq,
    
    // Archetype data
    dominant_archetype: results.dominantArchetype || null,
    archetype_1_score: results.archetypeScores?.[0] || null,
    archetype_2_score: results.archetypeScores?.[1] || null,
    archetype_3_score: results.archetypeScores?.[2] || null,
    archetype_question_scores: results.archetypeQuestionScores || null,
    
    answers: answers.map(a => a.value),
  };

  // Add individual question answers
  answers.forEach((answer) => {
    const questionKey = `q${answer.questionId}`;
    (surveyData as any)[questionKey] = answer.value;
    (surveyData as any)[answer.questionId.toString()] = answer.value;
  });

  console.log('Prepared survey data for database:', surveyData);

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

export const saveColleagueSurveyResults = async (
  submission: ColleagueSubmissionResult,
  answers: Answer[],
  consentForResearch: boolean,
  isAnonymous: boolean
) => {
  console.log('Saving colleague survey to database:', submission);
  
  const colleagueData = {
    manager_name: submission.evaluatorInfo.managerName,
    manager_position: submission.evaluatorInfo.managerPosition || null,
    manager_department: submission.evaluatorInfo.managerDepartment || null,
    evaluator_name: submission.evaluatorInfo.evaluatorName,
    evaluator_email: submission.evaluatorInfo.evaluatorEmail,
    evaluator_position: submission.evaluatorInfo.evaluatorPosition || null,
    evaluator_department: submission.evaluatorInfo.evaluatorDepartment || null,
    organization: submission.evaluatorInfo.organization || null,
    group_id: submission.evaluatorInfo.groupId ? parseInt(submission.evaluatorInfo.groupId) : null,
    
    dimension_s: submission.dimensions.S,
    dimension_l: submission.dimensions.L,
    dimension_i: submission.dimensions.I,
    dimension_m: submission.dimensions.M,
    dimension_a: submission.dimensions.A,
    dimension_a2: submission.dimensions.A2,
    
    slq_score: submission.slq,
    
    consent_for_research: consentForResearch,
    is_anonymous: isAnonymous,
    
    answers: answers.map(a => a.value),
  };

  // Add individual question answers
  answers.forEach((answer) => {
    const questionKey = `q${answer.questionId}`;
    (colleagueData as any)[questionKey] = answer.value;
    (colleagueData as any)[answer.questionId.toString()] = answer.value;
  });

  const { data, error } = await supabase
    .from('colleague_survey_responses')
    .insert(colleagueData)
    .select('id')
    .single();

  if (error) {
    console.error('Error saving colleague survey:', error);
    throw error;
  }

  console.log('Colleague survey saved with ID:', data.id);
  return data.id;
};
