
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
  const [formData, setFormData] = useState<UserInfo>({
    groupNumber: "",
    name: "",
    email: "",
    organization: "",
    department: "",
    position: "",
  });

  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsTouched(true);
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.groupNumber.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="flex justify-center py-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-800">
            שאלון מנהלים
          </CardTitle>
          <CardDescription className="text-lg font-semibold text-gray-600">ד"ר יוסי שרעבי</CardDescription>
          <CardDescription>אנא מלא/י את הפרטים כדי להתחיל בשאלון SALIMA</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupNumber">מספר קבוצה *</Label>
              <Input
                id="groupNumber"
                name="groupNumber"
                type="number"
                min={1}
                placeholder="הזן/י מספר קבוצה"
                value={formData.groupNumber || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">שם מלא *</Label>
              <Input
                id="name"
                name="name"
                placeholder="השם המלא שלך"
                value={formData.name || ""}
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
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">ארגון</Label>
              <Input
                id="organization"
                name="organization"
                placeholder="שם הארגון"
                value={formData.organization || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">מחלקה</Label>
              <Input
                id="department"
                name="department"
                placeholder="המחלקה בארגון"
                value={formData.department || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">תפקיד</Label>
              <Input
                id="position"
                name="position"
                placeholder="התפקיד שלך"
                value={formData.position || ""}
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
              התחל את השאלון
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserInfoForm;
