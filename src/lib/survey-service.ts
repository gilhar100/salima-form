
import { supabase } from "@/integrations/supabase/client";
import { SurveyResult, Answer, ColleagueSubmissionResult, UserInfo, ColleagueEvaluatorInfo } from "./types";

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

// New function for saving survey to database (used by useSurveyLogic)
export const saveSurveyToDatabase = async (
  results: SurveyResult,
  answers: Answer[],
  consentForResearch: boolean,
  isAnonymous: boolean
) => {
  const userInfo = {
    ...results.userInfo,
    consentForResearch,
    isAnonymous
  };
  
  const surveyId = await saveSurveyResults(results, answers, userInfo, 'manager');
  return { id: surveyId };
};

// New function for saving colleague survey to database
export const saveColleagueSurveyToDatabase = async (
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
    
    // Dimension scores
    dimension_s: submission.dimensions.S,
    dimension_l: submission.dimensions.L,
    dimension_i: submission.dimensions.I,
    dimension_m: submission.dimensions.M,
    dimension_a: submission.dimensions.A,
    dimension_a2: submission.dimensions.A2,
    
    // Overall SLQ score
    slq_score: submission.slq,
    
    consent_for_research: consentForResearch,
    is_anonymous: isAnonymous,
    
    // Store answers array
    answers: answers.map(a => a.value),
  };

  // Add individual question answers
  answers.forEach((answer) => {
    const questionKey = `q${answer.questionId}`;
    (colleagueData as any)[questionKey] = answer.value;
    
    // Also add the numeric column format
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

// New function for saving archetype answers
export const saveArchetypeAnswersToDatabase = async (
  archetypeAnswers: Answer[],
  userInfo: UserInfo
) => {
  console.log('Saving archetype answers:', archetypeAnswers);
  
  // For now, we'll just log this as the archetype_logic table structure
  // might need to be updated to store individual responses
  console.log('Archetype answers saved (placeholder implementation)');
  
  return true;
};

// New function for getting survey statistics
export const getSurveyStatistics = async () => {
  console.log('Fetching survey statistics...');
  
  const { data, error } = await supabase
    .from('survey_responses')
    .select(`
      id,
      slq_score,
      dimension_s,
      dimension_l,
      dimension_i,
      dimension_m,
      dimension_a,
      dimension_a2,
      created_at,
      consent_for_research,
      is_anonymous,
      user_email,
      user_name,
      organization,
      department,
      position,
      strategy,
      survey_type
    `)
    .eq('consent_for_research', true);

  if (error) {
    console.error('Error fetching survey statistics:', error);
    throw error;
  }

  console.log('Fetched survey statistics:', data.length, 'records');
  return data;
};

// New function for getting manager comparison data
export const getManagerComparisonData = async (managerName: string, managerEmail?: string) => {
  console.log('Fetching manager comparison data for:', managerName, managerEmail);
  
  // Get manager's self-assessment data
  let managerQuery = supabase
    .from('survey_responses')
    .select('*')
    .eq('user_name', managerName)
    .eq('survey_type', 'manager');
  
  if (managerEmail) {
    managerQuery = managerQuery.eq('user_email', managerEmail);
  }
  
  const { data: managerData, error: managerError } = await managerQuery;
  
  if (managerError) {
    console.error('Error fetching manager data:', managerError);
    throw managerError;
  }
  
  // Get colleague assessments for this manager
  let colleagueQuery = supabase
    .from('colleague_survey_responses')
    .select('*')
    .eq('manager_name', managerName);
  
  const { data: colleagueData, error: colleagueError } = await colleagueQuery;
  
  if (colleagueError) {
    console.error('Error fetching colleague data:', colleagueError);
    throw colleagueError;
  }
  
  console.log('Manager comparison data:', {
    managerData: managerData?.length || 0,
    colleagueData: colleagueData?.length || 0
  });
  
  return {
    managerData: managerData || [],
    colleagueData: colleagueData || []
  };
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
