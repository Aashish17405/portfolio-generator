import { Step } from "@/utils/types";
import { Layout, Palette, Sparkles, UserCircle2 } from "lucide-react";

export const ProgressSteps = ({
  activeStep,
  navigateToStep
}: {
  activeStep: Step;
  navigateToStep: (step: Step) => void;
}) => {
  const steps = [
    { id: 1, icon: Layout, label: "Choose Style" },
    { id: 2, icon: Palette, label: "Select Colors" },
    { id: 3, icon: UserCircle2, label: "Your Details" },
    { id: 4, icon: Sparkles, label: "Generate" }
  ];

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="flex flex-wrap items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {index > 0 && (
              <div
                className={`h-1 w-10 md:w-16 ${activeStep >= step.id ? "bg-primary" : "bg-gray-200"} mx-2 md:mx-4 transition-colors duration-300`}
              />
            )}
            <button
              onClick={() => navigateToStep(step.id as Step)}
              className={`flex flex-col items-center group ${activeStep >= step.id ? "cursor-pointer" : "cursor-not-allowed"}`}
              aria-label={`Go to step ${step.id}: ${step.label}`}
            >
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-full ${
                  activeStep >= step.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                } font-medium transition-all duration-300 group-hover:shadow-md`}
              >
                <step.icon size={24} />
              </div>
              <span className={`mt-2 text-sm font-medium ${activeStep >= step.id ? "text-primary" : "text-gray-500"}`}>
                {step.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};