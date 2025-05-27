
import { SurveyResult } from "@/lib/types";

export async function sendResultsByEmail(results: SurveyResult): Promise<void> {
  try {
    // כאן תוסיף בעתיד את הפונקציונליות לשליחת מייל
    // למשל דרך Supabase Edge Function או שירות חיצוני
    console.log('שליחת תוצאות במייל:', results);
    
    // סימולציה של שליחת מייל
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('התוצאות נשלחו בהצלחה במייל');
  } catch (error) {
    console.error('שגיאה בשליחת המייל:', error);
    throw error;
  }
}
