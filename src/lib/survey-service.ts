
import { SurveyResult, ColleagueSubmissionResult } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

// פונקציה לשמירת תוצאות שאלון מנהלים במסד הנתונים
export async function saveSurveyToDatabase(
  results: SurveyResult, 
  consentForResearch: boolean, 
  isAnonymous: boolean = true
): Promise<void> {
  try {
    const surveyData = {
      user_email: isAnonymous ? null : results.userInfo.email,
      user_name: isAnonymous ? null : results.userInfo.name,
      organization: isAnonymous ? null : results.userInfo.organization,
      department: isAnonymous ? null : results.userInfo.department,
      position: isAnonymous ? null : results.userInfo.position,
      slq_score: results.slq,
      dimension_s: results.dimensions.S.score,
      dimension_l: results.dimensions.L.score,
      dimension_i: results.dimensions.I.score,
      dimension_m: results.dimensions.M.score,
      dimension_a: results.dimensions.A.score,
      dimension_a2: results.dimensions.A2.score,
      strategy: results.slq, // נשמור את ה-SLQ גם בשדה strategy לתאימות לאחור
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous,
      survey_type: 'manager'
    };

    const { error } = await supabase
      .from('survey_responses')
      .insert([surveyData]);

    if (error) {
      console.error('שגיאה בשמירת הנתונים:', error);
      throw error;
    }

    console.log('נתוני שאלון המנהלים נשמרו בהצלחה במסד הנתונים');
  } catch (error) {
    console.error('שגיאה בשמירת תוצאות שאלון המנהלים:', error);
    throw error;
  }
}

// פונקציה לשמירת תוצאות שאלון עמיתים במסד הנתונים
export async function saveColleagueSurveyToDatabase(
  results: ColleagueSubmissionResult, 
  consentForResearch: boolean, 
  isAnonymous: boolean = true
): Promise<void> {
  try {
    const colleagueSurveyData = {
      manager_name: results.evaluatorInfo.managerName,
      manager_position: isAnonymous ? null : results.evaluatorInfo.managerPosition,
      manager_department: isAnonymous ? null : results.evaluatorInfo.managerDepartment,
      evaluator_name: isAnonymous ? null : results.evaluatorInfo.evaluatorName,
      evaluator_email: isAnonymous ? null : results.evaluatorInfo.evaluatorEmail,
      evaluator_position: isAnonymous ? null : results.evaluatorInfo.evaluatorPosition,
      evaluator_department: isAnonymous ? null : results.evaluatorInfo.evaluatorDepartment,
      organization: isAnonymous ? null : results.evaluatorInfo.organization,
      slq_score: results.slq,
      dimension_s: results.dimensions.S,
      dimension_l: results.dimensions.L,
      dimension_i: results.dimensions.I,
      dimension_m: results.dimensions.M,
      dimension_a: results.dimensions.A,
      dimension_a2: results.dimensions.A2,
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous
    };

    const { error } = await supabase
      .from('colleague_survey_responses')
      .insert([colleagueSurveyData]);

    if (error) {
      console.error('שגיאה בשמירת נתוני שאלון עמיתים:', error);
      throw error;
    }

    console.log('נתוני שאלון העמיתים נשמרו בהצלחה במסד הנתונים');
  } catch (error) {
    console.error('שגיאה בשמירת תוצאות שאלון עמיתים:', error);
    throw error;
  }
}

// פונקציה לקבלת סטטיסטיקות כלליות
export async function getSurveyStatistics() {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('is_anonymous', true);

    if (error) {
      console.error('שגיאה בטעינת הסטטיסטיקות:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('שגיאה בקבלת הסטטיסטיקות:', error);
    throw error;
  }
}
