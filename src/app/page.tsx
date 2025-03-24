"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check, Layout, ChevronLeft, UserCircle2 } from "lucide-react"
import PortfolioPreview from "@/components/portfolio-preview"
import { motion } from "@/components/motion"
import ColorSchemeCard from "@/components/color-scheme-card"
import UserDetailsForm, { type UserDetails } from "@/components/user-details-form"
import { useToast, ToastContainer } from "@/components/ui-improvements"
import { useRouter } from "next/navigation"
import { portfolioStylesData } from "@/utils/portfolioStylesData"
import { colorCombinationsData } from "@/utils/colorCombinationsData"
import { PortfolioConfig, Step } from "@/utils/types"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ProgressSteps } from "@/components/progress-steps"
import { useUserDetails } from "@/hooks/useUserDetails"


const PortfolioBuilder = () => {
  const { toasts, showToast, removeToast } = useToast();
  const router = useRouter();
  const { userDetails } = useUserDetails();
  
  const [portfolioConfig, setPortfolioConfig] = useLocalStorage<PortfolioConfig>(
    'portfolioConfig',
    {
      style: portfolioStylesData[0].id,
      colorCombo: colorCombinationsData[0].id,
      userDetails
    }
  );
  
  const [activeStep, setActiveStep] = useState<Step>(1);

  // Derived values
  const selectedCombo = colorCombinationsData.find(c => c.id === portfolioConfig.colorCombo) ?? colorCombinationsData[0];
  const selectedStyleObj = portfolioStylesData.find(s => s.id === portfolioConfig.style) ?? portfolioStylesData[0];

  const navigateToStep = (step: Step) => {
    if (step < 1 || step > 4) return;
    
    // Validate before allowing navigation forward
    if (step > activeStep) {
      if (activeStep === 1 && !portfolioConfig.style) {
        showToast("Please select a portfolio style first", "info");
        return;
      }
      if (activeStep === 2 && !portfolioConfig.colorCombo) {
        showToast("Please select a color scheme first", "info");
        return;
      }
      if (activeStep === 3 && !portfolioConfig.userDetails.name) {
        showToast("Please fill in your details first", "info");
        return;
      }
    }
    
    setActiveStep(step);
  };

  const handleStyleSelect = (styleId: string) => {
    setPortfolioConfig(prev => ({ ...prev, style: styleId }));
    navigateToStep(2);
  };

  const handleColorSelect = (colorId: string) => {
    setPortfolioConfig(prev => ({ ...prev, colorCombo: colorId }));
    navigateToStep(3);
  };

  const handleUserDetailsSave = (details: UserDetails) => {
    setPortfolioConfig(prev => ({ ...prev, userDetails: details }));
    navigateToStep(4);
    showToast("Your details have been saved successfully!", "success");
  };

  const handleGenerate = () => {
    const { style, colorCombo, userDetails } = portfolioConfig;
    
    try {
      localStorage.setItem("portfolioStyle", style);
      localStorage.setItem("primaryColor", selectedCombo.primaryColor);
      localStorage.setItem("secondaryColor", selectedCombo.secondaryColor);
      localStorage.setItem("colorComboName", selectedCombo.name);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      router.push("/portfolio");
      showToast("Your portfolio has been generated successfully!", "success");
    } catch (error) {
      console.error("Failed to save portfolio:", error);
      showToast("Error generating portfolio. Please try again.", "error");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Portfolio Website Builder
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your professional portfolio in minutes with our easy-to-use builder.
            </p>
          </motion.div>

          <ProgressSteps activeStep={activeStep} navigateToStep={navigateToStep} />

          {/* Step 1: Choose Style */}
          <motion.div
            className={`${activeStep === 1 ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Portfolio Style</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 1 of 4</div>
              </div>

              <p className="text-gray-600 mb-8">
                Select a style that best represents your professional identity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portfolioStylesData.map((style) => (
                  <div key={style.id} className="relative">
                    <motion.div
                      whileHover={{ scale: portfolioConfig.style === style.id ? 1.02 : 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={() => handleStyleSelect(style.id)}
                      className="cursor-pointer h-full"
                    >
                      <Card
                        className={`overflow-hidden transition-all duration-300 h-full ${
                          portfolioConfig.style === style.id
                            ? "ring-2 ring-primary shadow-lg scale-[1.02]"
                            : "border-gray-200 hover:border-primary/30 hover:shadow-md"
                        }`}
                      >
                        <div className="relative">
                          <PortfolioPreview
                            style={style.id}
                            primaryColor={selectedCombo.primaryColor}
                            secondaryColor={selectedCombo.secondaryColor}
                          />
                          {portfolioConfig.style === style.id && (
                            <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1.5 shadow-md">
                              <Check size={16} />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-lg mb-2">{style.name}</h3>
                          <p className="text-sm text-gray-500 mb-3">{style.description}</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {style.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  onClick={() => navigateToStep(2)} 
                  className="rounded-full px-6 group" 
                  disabled={!portfolioConfig.style}
                >
                  Continue to Colors
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Step 2: Choose Colors */}
          <motion.div
            className={`${activeStep === 2 ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Color Scheme</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 2 of 4</div>
              </div>

              <p className="text-gray-600 mb-8">
                Select a color scheme that reflects your personal brand.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {colorCombinationsData.map((combo) => (
                  <div key={combo.id} className="relative">
                    <ColorSchemeCard
                      id={combo.id}
                      name={combo.name}
                      description={combo.description}
                      primaryColor={combo.primaryColor}
                      secondaryColor={combo.secondaryColor}
                      preview={combo.preview}
                      isSelected={portfolioConfig.colorCombo === combo.id}
                      onSelect={handleColorSelect}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => navigateToStep(1)} 
                  className="rounded-full px-6 group"
                >
                  <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
                  Back to Styles
                </Button>
                <Button
                  onClick={() => navigateToStep(3)}
                  className="rounded-full px-6 group"
                  disabled={!portfolioConfig.colorCombo}
                >
                  Continue to Your Details
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Step 3: User Details */}
          <motion.div
            className={`${activeStep === 3 ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Enter Your Details</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 3 of 4</div>
              </div>

              <p className="text-gray-600 mb-8">
                Fill in your professional information to personalize your portfolio.
              </p>

              <UserDetailsForm 
                onSave={handleUserDetailsSave} 
                initialData={portfolioConfig.userDetails} 
              />

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => navigateToStep(2)} 
                  className="rounded-full px-6 group"
                >
                  <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
                  Back to Colors
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Preview and Generate */}
          <motion.div
            className={`${activeStep === 4 ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Preview Your Portfolio</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 4 of 4</div>
              </div>

              <p className="text-gray-600 mb-8">
                Here's a preview of how your portfolio will look.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                      <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="mx-auto text-xs text-gray-500">Your Portfolio Preview</div>
                      </div>
                      <div className="p-4 h-[400px] overflow-hidden">
                        <PortfolioPreview
                          style={portfolioConfig.style}
                          primaryColor={selectedCombo.primaryColor}
                          secondaryColor={selectedCombo.secondaryColor}
                          fullPreview={true}
                          userDetails={portfolioConfig.userDetails}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-full">
                      <h3 className="font-semibold text-lg mb-4 pb-3 border-b border-gray-100">Your Selections</h3>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Selected Style</h4>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                              <Layout size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{selectedStyleObj.name}</p>
                              <p className="text-xs text-gray-500">{selectedStyleObj.description}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Selected Colors</h4>
                          <div className="flex items-center">
                            <div
                              className="w-10 h-10 rounded-md mr-3"
                              style={{ background: selectedCombo.preview }}
                            ></div>
                            <div>
                              <p className="font-medium">{selectedCombo.name}</p>
                              <p className="text-xs text-gray-500">{selectedCombo.description}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Your Profile</h4>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              <UserCircle2 size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{portfolioConfig.userDetails.name}</p>
                              <p className="text-xs text-gray-500">{portfolioConfig.userDetails.title}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigateToStep(3)} 
                            className="w-full"
                          >
                            Edit Your Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigateToStep(3)} 
                  className="rounded-full px-6 group"
                >
                  <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
                  Back to Your Details
                </Button>
                <Button
                  onClick={handleGenerate}
                  size="lg"
                  className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="mr-2">Generate Portfolio</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </main>
  );
};

export default PortfolioBuilder;