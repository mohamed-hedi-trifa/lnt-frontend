// components/LoadingSpinner.tsx
import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-8 w-8 border-2",
    medium: "h-12 w-12 border-4",
    large: "h-16 w-16 border-4"
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]} border-[#0270A0]`}
      />
    </div>
  );
};

export default LoadingSpinner;