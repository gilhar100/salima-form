
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ColleagueEvaluatorInfo } from "@/lib/types";

interface ColleagueInfoFormProps {
  onSubmit: (evaluatorInfo: ColleagueEvaluatorInfo) => void;
}

const ColleagueInfoForm: React.FC<ColleagueInfoFormProps> = ({ onSubmit }) => {
  const [evaluatorInfo, setEvaluatorInfo] = useState<ColleagueEvaluatorInfo>({
    evaluatorName: "",
    evaluatorEmail: "",
    evaluatorPosition: "",
    evaluatorDepartment: "",
    organization: "",
    managerName: "",
    managerPosition: "",
    managerDepartment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(evaluatorInfo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvaluatorInfo(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = evaluatorInfo.evaluatorName.trim() !== "" && 
                     evaluatorInfo.evaluatorEmail.trim() !== "" && 
                     evaluatorInfo.managerName.trim() !== "";

  return (
    <div className="flex justify-center py-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-800">שאלון הערכת מנהל</CardTitle>
          <CardDescription>אנא מלא/י את הפרטים כדי להתחיל בהערכת המנהל</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">פרטי המעריך (שלך)</h3>
              
              <div className="space-y-2">
                <Label htmlFor="evaluatorName">שם מלא *</Label>
                <Input
                  id="evaluatorName"
                  name="evaluatorName"
                  placeholder="השם המלא שלך"
                  value={evaluatorInfo.evaluatorName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="evaluatorEmail">אימייל *</Label>
                <Input
                  id="evaluatorEmail"
                  name="evaluatorEmail"
                  type="email"
                  placeholder="כתובת האימייל שלך"
                  value={evaluatorInfo.evaluatorEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="evaluatorPosition">תפקיד</Label>
                <Input
                  id="evaluatorPosition"
                  name="evaluatorPosition"
                  placeholder="התפקיד שלך בארגון"
                  value={evaluatorInfo.evaluatorPosition}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="evaluatorDepartment">מחלקה</Label>
                <Input
                  id="evaluatorDepartment"
                  name="evaluatorDepartment"
                  placeholder="המחלקה שלך בארגון"
                  value={evaluatorInfo.evaluatorDepartment}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">פרטי המנהל המוערך</h3>
              
              <div className="space-y-2">
                <Label htmlFor="managerName">שם המנהל *</Label>
                <Input
                  id="managerName"
                  name="managerName"
                  placeholder="שם המנהל שאתה מעריך"
                  value={evaluatorInfo.managerName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="managerPosition">תפקיד המנהל</Label>
                <Input
                  id="managerPosition"
                  name="managerPosition"
                  placeholder="תפקיד המנהל בארגון"
                  value={evaluatorInfo.managerPosition}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="managerDepartment">מחלקת המנהל</Label>
                <Input
                  id="managerDepartment"
                  name="managerDepartment"
                  placeholder="מחלקת המנהל בארגון"
                  value={evaluatorInfo.managerDepartment}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">ארגון</Label>
              <Input
                id="organization"
                name="organization"
                placeholder="שם הארגון"
                value={evaluatorInfo.organization}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!isFormValid}
            >
              התחל את הערכת המנהל
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ColleagueInfoForm;
