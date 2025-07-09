
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResultsHeader = () => {
  return (
    <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-salima-50 to-blue-50">
      <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="font-bold text-salima-800 mb-2 text-xl sm:text-2xl">
          תוצאות שאלון מנהיגות
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ResultsHeader;
