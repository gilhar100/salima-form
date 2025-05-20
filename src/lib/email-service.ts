
import { SurveyResult } from "@/lib/types";
import { evaluateDimensionLevel, getDimensionRecommendations } from "@/lib/calculations";
import { dimensionInfo } from "@/data/questions";

// פונקציה ליצירת תוכן המייל בפורמט HTML
function createEmailContent(results: SurveyResult): string {
  const { userInfo, dimensions, slq, date } = results;
  
  // הכנת טבלה של ציוני הממדים
  const dimensionsTable = Object.values(dimensions)
    .map(dim => {
      const level = evaluateDimensionLevel(dim.score);
      const recommendations = getDimensionRecommendations(dim.dimension, dim.score);
      
      return `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${dim.title}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${dim.score}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${level}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${recommendations}</td>
        </tr>
      `;
    })
    .join('');
    
  // בניית התוכן המלא של המייל
  return `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <meta charset="utf-8">
      <title>תוצאות שאלון מנהיגות SALIMA-WOCA</title>
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #0369a1; }
        h2 { color: #0369a1; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #f2f2f2; padding: 12px; border: 1px solid #ddd; text-align: right; }
        td { padding: 10px; border: 1px solid #ddd; }
        .score { font-size: 24px; font-weight: bold; color: #0369a1; }
        .header-info { margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>תוצאות שאלון מנהיגות SALIMA-WOCA</h1>
        
        <div class="header-info">
          <p><strong>שם:</strong> ${userInfo.name}</p>
          <p><strong>תאריך:</strong> ${new Date(date).toLocaleDateString('he-IL')}</p>
          ${userInfo.organization ? `<p><strong>ארגון:</strong> ${userInfo.organization}</p>` : ''}
          ${userInfo.department ? `<p><strong>מחלקה:</strong> ${userInfo.department}</p>` : ''}
          ${userInfo.position ? `<p><strong>תפקיד:</strong> ${userInfo.position}</p>` : ''}
        </div>
        
        <h2>ציון SLQ כללי: <span class="score">${slq}</span></h2>
        
        <p>ציון SLQ מייצג את הממוצע של ששת ממדי המנהיגות בשאלון:</p>
        
        <h2>פירוט ציונים לפי ממדים</h2>
        
        <table>
          <thead>
            <tr>
              <th>ממד</th>
              <th>ציון</th>
              <th>רמת ביצוע</th>
              <th>המלצות</th>
            </tr>
          </thead>
          <tbody>
            ${dimensionsTable}
          </tbody>
        </table>
        
        <h2>פירוט הממדים</h2>
        
        <p><strong>S - ${dimensionInfo.S.title}:</strong> ${dimensionInfo.S.description}</p>
        <p><strong>L - ${dimensionInfo.L.title}:</strong> ${dimensionInfo.L.description}</p>
        <p><strong>I - ${dimensionInfo.I.title}:</strong> ${dimensionInfo.I.description}</p>
        <p><strong>M - ${dimensionInfo.M.title}:</strong> ${dimensionInfo.M.description}</p>
        <p><strong>A - ${dimensionInfo.A.title}:</strong> ${dimensionInfo.A.description}</p>
        <p><strong>A2 - ${dimensionInfo.A2.title}:</strong> ${dimensionInfo.A2.description}</p>
        
        <hr>
        
        <p style="font-size: 12px; color: #666;">
          זהו מייל אוטומטי שנשלח בעקבות השלמת שאלון מנהיגות SALIMA-WOCA.<br>
          כל הזכויות שמורות ליוסי שרעבי.
        </p>
      </div>
    </body>
    </html>
  `;
}

// פונקציה לשליחת התוצאות במייל
export async function sendResultsByEmail(results: SurveyResult): Promise<void> {
  const { userInfo } = results;
  
  // הכנת הגוף של המייל
  const emailContent = createEmailContent(results);
  
  // כאן היית מממש קוד לשליחת מייל אמיתי, אבל ללא שרת אמיתי נשתמש בסימולציה
  return new Promise((resolve, reject) => {
    // סימולציה של שליחת מייל - מחכה 1.5 שניות ומחזירה הצלחה
    console.log(`שולח מייל לכתובת: ${userInfo.email}`);
    console.log(`תוכן המייל:`, emailContent);
    
    setTimeout(() => {
      // בסביבת פיתוח נדמיין ששלחנו את המייל בהצלחה
      if (Math.random() > 0.1) {  // 90% סיכוי להצלחה
        resolve();
      } else {
        reject(new Error("שגיאה בשליחת המייל"));
      }
    }, 1500);
  });
}
