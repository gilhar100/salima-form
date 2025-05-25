
import { SurveyResult } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

// פונקציה לשמירת התוצאות במסד הנתונים
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
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous
    };

    const { error } = await supabase
      .from('survey_responses')
      .insert([surveyData]);

    if (error) {
      console.error('שגיאה בשמירת הנתונים:', error);
      throw error;
    }

    console.log('הנתונים נשמרו בהצלחה במסד הנתונים');
  } catch (error) {
    console.error('שגיאה בשמירת התוצאות:', error);
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
