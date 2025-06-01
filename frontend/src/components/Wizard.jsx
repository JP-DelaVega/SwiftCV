import React from "react";

const Wizard = ({ activeStep }) => {
  const steps = [
    "Personal Info",
    "Professional Summary",
    "Education",
    "Certifications",
    "Templates",
  ];

  return (
    <div className="flex items-center justify-center w-full mt-[105px] px-4">
      <div className="flex items-center w-full max-w-4xl justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center w-full select-none"
            >
              <div
                className={`text-sm text-center transition-colors duration-300 ${
                  isCompleted
                    ? "text-blue-500 font-semibold"
                    : isActive
                    ? "text-blue-700 font-bold text-lg"
                    : "text-gray-400"
                }`}
              >
                {step}
              </div>

              <div className="mt-1">
                {isCompleted ? (
                  // Completed: Checkmark icon (greenish blue)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : isActive ? (
                  // Active: Pulsing circle
                  <svg
                    className="h-6 w-6 text-blue-700 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                ) : (
                  // Upcoming: Gray circle outline
                  <svg
                    className="h-6 w-6 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wizard;
