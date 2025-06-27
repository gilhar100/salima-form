
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = "אנחנו מעבדים את הנתונים שלך… כמה רגעים וסיימנו!" 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-xl">
        <div className="flex justify-center mb-6">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
        <p className="text-lg text-gray-700 leading-relaxed text-right">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
