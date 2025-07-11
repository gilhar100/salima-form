
import { Answer, UserInfo, ColleagueEvaluatorInfo, ColleagueSubmissionResult, SurveyResult } from "./types";
import { saveSurveyResults, saveColleagueSurveyResults } from "./survey-operations";
import { supabase } from "@/integrations/supabase/client";

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
  const surveyId = await saveColleagueSurveyResults(submission, answers, consentForResearch, isAnonymous);
  return { id: surveyId };
};

// New function for saving archetype answers
export const saveArchetypeAnswersToDatabase = async (
  archetypeAnswers: Answer[],
  userInfo: UserInfo
) => {
  console.log('Saving archetype answers:', archetypeAnswers);
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
  const { data: colleagueData, error: colleagueError } = await supabase
    .from('colleague_survey_responses')
    .select('*')
    .eq('manager_name', managerName);
  
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
