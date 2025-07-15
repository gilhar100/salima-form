
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResultsHeader = () => {
  return (
    <Card className="mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-salima-50 to-blue-50">
      <CardHeader className="text-center px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        <CardTitle className="font-bold text-salima-800 mb-2 text-lg sm:text-xl lg:text-2xl">
          תוצאות שאלון מנהיגות
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ResultsHeader;
