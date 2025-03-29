"use client"

import { Layout, Palette, UserCircle2, Layers, Sparkles } from "lucide-react"
import type { Step } from "@/utils/types"

interface ProgressStepsProps {
  activeStep: Step
  navigateToStep: (step: Step) => void
}

export function ProgressSteps({ activeStep, navigateToStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      <div className="flex flex-wrap items-center justify-center">
        <button
          onClick={() => navigateToStep(1)}
          className={`flex flex-col items-center group ${activeStep >= 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              activeStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            } font-medium transition-all duration-300 group-hover:shadow-md`}
          >
            <Layout size={24} />
          </div>
          <span className={`mt-2 text-sm font-medium ${activeStep >= 1 ? "text-primary" : "text-gray-500"}`}>
            Choose Style
          </span>
        </button>

        <div
          className={`h-1 w-10 md:w-16 ${activeStep >= 2 ? "bg-primary" : "bg-gray-200"} mx-2 md:mx-4 transition-colors duration-300`}
        ></div>

        <button
          onClick={() => navigateToStep(2)}
          className={`flex flex-col items-center group ${activeStep >= 2 ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              activeStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            } font-medium transition-all duration-300 group-hover:shadow-md`}
          >
            <Palette size={24} />
          </div>
          <span className={`mt-2 text-sm font-medium ${activeStep >= 2 ? "text-primary" : "text-gray-500"}`}>
            Select Colors
          </span>
        </button>

        <div
          className={`h-1 w-10 md:w-16 ${activeStep >= 3 ? "bg-primary" : "bg-gray-200"} mx-2 md:mx-4 transition-colors duration-300`}
        ></div>

        <button
          onClick={() => navigateToStep(3)}
          className={`flex flex-col items-center group ${activeStep >= 3 ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              activeStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            } font-medium transition-all duration-300 group-hover:shadow-md`}
          >
            <UserCircle2 size={24} />
          </div>
          <span className={`mt-2 text-sm font-medium ${activeStep >= 3 ? "text-primary" : "text-gray-500"}`}>
            Your Details
          </span>
        </button>

        <div
          className={`h-1 w-10 md:w-16 ${activeStep >= 4 ? "bg-primary" : "bg-gray-200"} mx-2 md:mx-4 transition-colors duration-300`}
        ></div>

        <button
          onClick={() => navigateToStep(4)}
          className={`flex flex-col items-center group ${activeStep >= 4 ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              activeStep >= 4 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            } font-medium transition-all duration-300 group-hover:shadow-md`}
          >
            <Layers size={24} />
          </div>
          <span className={`mt-2 text-sm font-medium ${activeStep >= 4 ? "text-primary" : "text-gray-500"}`}>
            Pages
          </span>
        </button>

        <div
          className={`h-1 w-10 md:w-16 ${activeStep >= 5 ? "bg-primary" : "bg-gray-200"} mx-2 md:mx-4 transition-colors duration-300`}
        ></div>

        <button
          onClick={() => navigateToStep(5)}
          className={`flex flex-col items-center group ${activeStep >= 5 ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              activeStep >= 5 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            } font-medium transition-all duration-300 group-hover:shadow-md`}
          >
            <Sparkles size={24} />
          </div>
          <span className={`mt-2 text-sm font-medium ${activeStep >= 5 ? "text-primary" : "text-gray-500"}`}>
            Generate
          </span>
        </button>
      </div>
    </div>
  )
}

