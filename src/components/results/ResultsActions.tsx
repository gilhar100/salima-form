
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ResultsActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    // Add print-specific styles before printing
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 1.5cm;
        }
        body {
          font-family: Arial, sans-serif !important;
          font-size: 14pt !important;
          line-height: 1.4 !important;
          color: black !important;
          background: white !important;
        }
        .container {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .print\\:hidden {
          display: none !important;
        }
        .card {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: 1.5rem !important;
          box-shadow: none !important;
          border: 1px solid #e5e7eb !important;
        }
        .grid {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        h1, h2, h3 {
          break-after: avoid;
          page-break-after: avoid;
          font-size: 18pt !important;
          margin-bottom: 12pt !important;
        }
        .recharts-wrapper {
          break-inside: avoid;
          page-break-inside: avoid;
          width: 100% !important;
          height: auto !important;
          min-height: 300px !important;
        }
        .recharts-surface {
          width: 100% !important;
          height: auto !important;
        }
        .chart-container {
          width: 100% !important;
          height: 400px !important;
          page-break-inside: avoid;
          margin-bottom: 20pt !important;
        }
        .mobile-stack {
          flex-direction: column !important;
          width: 100% !important;
        }
        .mobile-stack > * {
          width: 100% !important;
          margin-bottom: 20pt !important;
        }
      }
    `;
    document.head.appendChild(printStyles);

    // Trigger browser print dialog
    window.print();

    // Remove print styles after a delay
    setTimeout(() => {
      document.head.removeChild(printStyles);
    }, 1000);

    toast({
      title: "הורדת PDF",
      description: "בחר 'שמור כ-PDF' בחלון ההדפסה"
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6 print:hidden px-4">
      <Button onClick={() => navigate('/')} className="bg-salima-600 hover:bg-salima-700 w-full sm:w-auto text-sm sm:text-base">
        חזור לעמוד הבית
      </Button>
      <Button 
        onClick={handleDownloadPDF} 
        className="bg-green-600 hover:bg-green-700 w-full sm:w-auto flex items-center gap-2 text-sm sm:text-base"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        הורד דוח אישי (PDF)
      </Button>
    </div>
  );
};

export default ResultsActions;
