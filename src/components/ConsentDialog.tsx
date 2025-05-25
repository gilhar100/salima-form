
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ConsentDialogProps {
  open: boolean;
  onResponse: (consent: boolean, isAnonymous: boolean) => void;
  loading: boolean;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({ open, onResponse, loading }) => {
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleAccept = () => {
    onResponse(true, isAnonymous);
  };

  const handleDecline = () => {
    onResponse(false, true);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>שיתוף נתונים למחקר</DialogTitle>
          <DialogDescription className="space-y-3 text-right">
            <p>
              כדי לשפר את כלי המנהיגות ולספק תובנות סטטיסטיות טובות יותר, 
              נשמח לשתף את התוצאות שלך במחקר.
            </p>
            <p>
              הנתונים ישמרו באופן אנונימי לחלוטין ולא יכללו מידע מזהה אישי.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <label htmlFor="anonymous" className="text-sm">
                שמור באופן אנונימי (מומלץ)
              </label>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            disabled={loading}
          >
            לא, תודה
          </Button>
          <Button
            onClick={handleAccept}
            disabled={loading}
            className="bg-salima-600 hover:bg-salima-700"
          >
            {loading ? "שומר..." : "כן, אני מסכים/ה"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentDialog;
