
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserInfo } from "@/lib/types";

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    position: "",
    department: "",
    organization: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = userInfo.name.trim() !== "" && userInfo.email.trim() !== "";

  return (
    <div className="flex justify-center py-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-salima-800">שאלון מנהיגות SALIMA-WOCA</CardTitle>
          <CardDescription>אנא מלא/י את הפרטים האישיים שלך כדי להתחיל</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">שם מלא *</Label>
              <Input
                id="name"
                name="name"
                placeholder="השם המלא שלך"
                value={userInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">אימייל *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="כתובת האימייל שלך"
                value={userInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">תפקיד</Label>
              <Input
                id="position"
                name="position"
                placeholder="התפקיד שלך בארגון"
                value={userInfo.position}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">מחלקה</Label>
              <Input
                id="department"
                name="department"
                placeholder="המחלקה שלך בארגון"
                value={userInfo.department}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">ארגון</Label>
              <Input
                id="organization"
                name="organization"
                placeholder="שם הארגון"
                value={userInfo.organization}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-salima-600 hover:bg-salima-700"
              disabled={!isFormValid}
            >
              התחל את השאלון
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserInfoForm;
