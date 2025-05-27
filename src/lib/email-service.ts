
import { SurveyResult } from "@/lib/types";

export async function sendResultsByEmail(results: SurveyResult): Promise<void> {
  try {
    // פונקציה זו כרגע לא שולחת מייל בפועל
    // היא נשמרת למקרה שבעתיד נרצה להוסיף שליחת מייל
    console.log('פונקציית שליחת מייל - כרגע לא פעילה:', results);
    
    // סימולציה של "שליחה" מוצלחת
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('המערכת לא שולחת מייל כרגע - רק שומרת את הנתונים');
  } catch (error) {
    console.error('שגיאה בפונקציית המייל:', error);
    throw error;
  }
}
