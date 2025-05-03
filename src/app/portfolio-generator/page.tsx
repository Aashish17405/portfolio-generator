"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Palette,
  Layout,
  Sparkles,
  ChevronLeft,
  UserCircle2,
  Layers,
} from "lucide-react";
import PortfolioPreview from "@/components/portfolio-preview";
import { motion } from "@/components/motion";
import ColorSchemeCard from "@/components/color-scheme-card";
import UserDetailsForm, {
  type UserDetails,
} from "@/components/user-details-form";
import { useToast, ToastContainer } from "@/components/ui-improvements";
import { PageLayoutSettings } from "@/components/page-layout-settings";
import { portfolioStylesData } from "@/utils/portfolioStylesData";
import { colorCombinationsData } from "@/utils/colorCombinationsData";
import {
  type PortfolioConfig,
  type PageConfig,
  type SectionConfig,
  DEFAULT_PAGES,
} from "@/utils/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useRouter } from "next/navigation";

const DEFAULT_SECTIONS: SectionConfig[] = [
  // Home page sections
  { id: "hero", name: "Hero Banner", enabled: true, pageId: "home" },
  { id: "intro", name: "Brief Introduction", enabled: true, pageId: "home" },
  { id: "featured", name: "Featured Projects", enabled: true, pageId: "home" },

  // About page sections
  { id: "bio", name: "Biography", enabled: true, pageId: "about" },
  {
    id: "background",
    name: "Professional Background",
    enabled: true,
    pageId: "about",
  },
  { id: "education", name: "Education", enabled: true, pageId: "about" },

  // Experience page sections
  { id: "work", name: "Work History", enabled: true, pageId: "experience" },
  {
    id: "achievements",
    name: "Key Achievements",
    enabled: true,
    pageId: "experience",
  },

  // Projects page sections
  {
    id: "projects-gallery",
    name: "Projects Gallery",
    enabled: true,
    pageId: "projects",
  },
  {
    id: "case-studies",
    name: "Case Studies",
    enabled: true,
    pageId: "projects",
  },

  // Skills page sections
  {
    id: "technical",
    name: "Technical Skills",
    enabled: true,
    pageId: "skills",
  },
  { id: "soft", name: "Soft Skills", enabled: true, pageId: "skills" },
  {
    id: "tools",
    name: "Tools & Technologies",
    enabled: true,
    pageId: "skills",
  },

  // Contact page sections
  {
    id: "contact-info",
    name: "Contact Information",
    enabled: true,
    pageId: "contact",
  },
  {
    id: "contact-form",
    name: "Contact Form",
    enabled: true,
    pageId: "contact",
  },
  { id: "social", name: "Social Links", enabled: true, pageId: "contact" },
];

export default function Home() {
  const { toasts, showToast, removeToast } = useToast();
  const { userDetails, setUserDetails, isLoading } = useUserDetails();
  const [activeStep, setActiveStep] = useState(1);

  const router = useRouter();

  // Portfolio configuration state
  const [portfolioConfig, setPortfolioConfig] =
    useLocalStorage<PortfolioConfig>("portfolioConfig", {
      style: portfolioStylesData[0].id,
      colorCombo: colorCombinationsData[0].id,
      userDetails,
      pages: DEFAULT_PAGES,
    });

  // Pages and sections state
  const [pages, setPages] = useLocalStorage<PageConfig[]>(
    "portfolioPages",
    DEFAULT_PAGES
  );
  const [sections, setSections] = useLocalStorage<SectionConfig[]>(
    "portfolioSections",
    DEFAULT_SECTIONS
  );

  // Get the selected color combination
  const selectedCombo =
    colorCombinationsData.find(
      (combo) => combo.id === portfolioConfig.colorCombo
    ) || colorCombinationsData[0];
  const selectedStyleObj =
    portfolioStylesData.find((style) => style.id === portfolioConfig.style) ||
    portfolioStylesData[0];

  useEffect(() => {
    // Check if there's a previously generated portfolio
    const portfolioStyle = localStorage.getItem("portfolioStyle");
    const primaryColor = localStorage.getItem("primaryColor");
    const secondaryColor = localStorage.getItem("secondaryColor");

    if (portfolioStyle && primaryColor && secondaryColor) {
      // Find the matching color combination
      const combo = colorCombinationsData.find(
        (c) =>
          c.primaryColor === primaryColor && c.secondaryColor === secondaryColor
      );

      if (combo) {
        setPortfolioConfig((prev) => ({
          ...prev,
          style: portfolioStyle,
          colorCombo: combo.id,
        }));
      }
    }
  }, []);

  // Update portfolio config when user details change
  useEffect(() => {
    if (!isLoading) {
      setPortfolioConfig((prev) => ({
        ...prev,
        userDetails,
      }));
    }
  }, [userDetails, isLoading]);

  const handleStyleSelect = (style: string) => {
    setPortfolioConfig((prev) => ({
      ...prev,
      style,
    }));
    setActiveStep(2);
  };

  const handleColorSelect = (colorId: string) => {
    setPortfolioConfig((prev) => ({
      ...prev,
      colorCombo: colorId,
    }));

    // Only advance to step 3 if this is the first time selecting a color
    if (activeStep === 2) {
      setActiveStep(3);
    }
  };

  const handleUserDetailsSave = (details: UserDetails) => {
    setUserDetails(details);
    setActiveStep(4);
    showToast("Your details have been saved successfully!", "success");
  };

  const handlePagesChange = (updatedPages: PageConfig[]) => {
    setPages(updatedPages);
    setPortfolioConfig((prev) => ({
      ...prev,
      pages: updatedPages,
    }));
  };

  const handleSectionsChange = (updatedSections: SectionConfig[]) => {
    setSections(updatedSections);
  };

  const handleGenerate = () => {
    // Find the selected color combination
    const colorCombo = colorCombinationsData.find(
      (combo) => combo.id === portfolioConfig.colorCombo
    );

    if (!colorCombo) {
      console.error("Selected color combination not found");
      showToast("Error generating portfolio. Please try again.", "error");
      return;
    }

    // Store the selected style and colors in localStorage
    localStorage.setItem("portfolioStyle", portfolioConfig.style);
    localStorage.setItem("primaryColor", colorCombo.primaryColor);
    localStorage.setItem("secondaryColor", colorCombo.secondaryColor);
    localStorage.setItem("colorComboName", colorCombo.name);
    localStorage.setItem("portfolioPages", JSON.stringify(pages));
    localStorage.setItem("portfolioSections", JSON.stringify(sections));

    showToast("Your portfolio has been generated successfully!", "success");

    router.push("/portfolio");
  };

  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setActiveStep(step);
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
              Create your professional portfolio in minutes with our easy-to-use
              builder. Select a style, choose colors, add your details, and
              you're ready to go!
            </p>
          </motion.div>

          {/* Progress steps */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex flex-wrap items-center justify-center">
              <button
                onClick={() => navigateToStep(1)}
                className={`flex flex-col items-center group ${
                  activeStep >= 1 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${
                    activeStep >= 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  } font-medium transition-all duration-300 group-hover:shadow-md`}
                >
                  <Layout size={24} />
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    activeStep >= 1 ? "text-primary" : "text-gray-500"
                  }`}
                >
                  Choose Style
                </span>
              </button>

              <div
                className={`h-1 w-10 md:w-16 ${
                  activeStep >= 2 ? "bg-primary" : "bg-gray-200"
                } mx-2 md:mx-4 transition-colors duration-300`}
              ></div>

              <button
                onClick={() => navigateToStep(2)}
                className={`flex flex-col items-center group ${
                  activeStep >= 2 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${
                    activeStep >= 2
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  } font-medium transition-all duration-300 group-hover:shadow-md`}
                >
                  <Palette size={24} />
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    activeStep >= 2 ? "text-primary" : "text-gray-500"
                  }`}
                >
                  Select Colors
                </span>
              </button>

              <div
                className={`h-1 w-10 md:w-16 ${
                  activeStep >= 3 ? "bg-primary" : "bg-gray-200"
                } mx-2 md:mx-4 transition-colors duration-300`}
              ></div>

              <button
                onClick={() => navigateToStep(3)}
                className={`flex flex-col items-center group ${
                  activeStep >= 3 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${
                    activeStep >= 3
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  } font-medium transition-all duration-300 group-hover:shadow-md`}
                >
                  <UserCircle2 size={24} />
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    activeStep >= 3 ? "text-primary" : "text-gray-500"
                  }`}
                >
                  Your Details
                </span>
              </button>

              <div
                className={`h-1 w-10 md:w-16 ${
                  activeStep >= 4 ? "bg-primary" : "bg-gray-200"
                } mx-2 md:mx-4 transition-colors duration-300`}
              ></div>

              <button
                onClick={() => navigateToStep(4)}
                className={`flex flex-col items-center group ${
                  activeStep >= 4 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${
                    activeStep >= 4
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  } font-medium transition-all duration-300 group-hover:shadow-md`}
                >
                  <Layers size={24} />
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    activeStep >= 4 ? "text-primary" : "text-gray-500"
                  }`}
                >
                  Pages
                </span>
              </button>

              <div
                className={`h-1 w-10 md:w-16 ${
                  activeStep >= 5 ? "bg-primary" : "bg-gray-200"
                } mx-2 md:mx-4 transition-colors duration-300`}
              ></div>

              <button
                onClick={() => navigateToStep(5)}
                className={`flex flex-col items-center group ${
                  activeStep >= 5 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${
                    activeStep >= 5
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  } font-medium transition-all duration-300 group-hover:shadow-md`}
                >
                  <Sparkles size={24} />
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    activeStep >= 5 ? "text-primary" : "text-gray-500"
                  }`}
                >
                  Generate
                </span>
              </button>
            </div>
          </div>

          {/* Step 1: Choose Style */}
          <motion.div
            className={`${activeStep === 1 ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Choose Your Portfolio Style
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Step 1 of 5
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Select a style that best represents your professional identity.
                Each style is designed to showcase your work in a unique way.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portfolioStylesData.map((style) => (
                  <div key={style.id} className="relative">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      onClick={() => handleStyleSelect(style.id)}
                      className={`cursor-pointer h-full`}
                    >
                      <Card
                      suppressHydrationWarning
                        className={`
          overflow-hidden transition-all duration-300 h-full
          ${
            portfolioConfig.style === style.id
              ? "ring-2 ring-primary shadow-lg"
              : "border-gray-200 hover:border-primary/30 hover:shadow-md"
          }
        `}
                      >
                        <div className="relative">
                          <PortfolioPreview
                            style={style.id}
                            primaryColor={selectedCombo.primaryColor}
                            secondaryColor={selectedCombo.secondaryColor}
                          />
                          {/* Use client-side only rendering for the checkmark */}
                          {typeof window !== "undefined" &&
                            portfolioConfig.style === style.id && (
                              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1.5 shadow-md">
                                <Check size={16} />
                              </div>
                            )}
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-lg mb-2">
                            {style.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            {style.description}
                          </p>
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
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Choose Your Color Scheme
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Step 2 of 5
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Select a color scheme that reflects your personal brand. Colors
                play a crucial role in how visitors perceive your portfolio.
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
                  <ChevronLeft
                    className="mr-2 group-hover:-translate-x-1 transition-transform"
                    size={18}
                  />
                  Back to Styles
                </Button>
                <Button
                  onClick={() => navigateToStep(3)}
                  className="rounded-full px-6 group"
                  disabled={!portfolioConfig.colorCombo}
                >
                  Continue to Your Details
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Enter Your Details
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Step 3 of 5
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Fill in your professional information to personalize your
                portfolio. This information will be displayed on your portfolio
                website.
              </p>

              <UserDetailsForm
                onSave={handleUserDetailsSave}
                initialData={userDetails}
              />

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => navigateToStep(2)}
                  className="rounded-full px-6 group"
                >
                  <ChevronLeft
                    className="mr-2 group-hover:-translate-x-1 transition-transform"
                    size={18}
                  />
                  Back to Colors
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Page Layout */}
          <motion.div
            className={`${activeStep === 4 ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <PageLayoutSettings
                pages={pages}
                sections={sections}
                onPagesChange={handlePagesChange}
                onSectionsChange={handleSectionsChange}
              />

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => navigateToStep(3)}
                  className="rounded-full px-6 group"
                >
                  <ChevronLeft
                    className="mr-2 group-hover:-translate-x-1 transition-transform"
                    size={18}
                  />
                  Back to Your Details
                </Button>
                <Button
                  onClick={() => navigateToStep(5)}
                  className="rounded-full px-6 group"
                >
                  Continue to Preview
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Step 5: Preview and Generate */}
          <motion.div
            className={`${activeStep === 5 ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Preview Your Portfolio
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Step 5 of 5
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Here's a preview of how your portfolio will look. If you're
                happy with it, click "Generate Portfolio" to create your site.
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
                        <div className="mx-auto text-xs text-gray-500">
                          Your Portfolio Preview
                        </div>
                      </div>
                      <div className="p-4 h-[400px] overflow-hidden">
                        <PortfolioPreview
                          style={portfolioConfig.style}
                          primaryColor={selectedCombo.primaryColor}
                          secondaryColor={selectedCombo.secondaryColor}
                          fullPreview={true}
                          userDetails={userDetails}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-full">
                      <h3 className="font-semibold text-lg mb-4 pb-3 border-b border-gray-100">
                        Your Selections
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Selected Style
                          </h4>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                              <Layout size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {selectedStyleObj.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {selectedStyleObj.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Selected Colors
                          </h4>
                          <div className="flex items-center">
                            <div
                              className="w-10 h-10 rounded-md mr-3"
                              style={{ background: selectedCombo.preview }}
                            ></div>
                            <div>
                              <p className="font-medium">
                                {selectedCombo.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {selectedCombo.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Your Profile
                          </h4>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              <UserCircle2 size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{userDetails.name}</p>
                              <p className="text-xs text-gray-500">
                                {userDetails.title}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Pages
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {pages
                              .filter((p) => p.enabled)
                              .map((page) => (
                                <div
                                  key={page.id}
                                  className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                                >
                                  {page.name}
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigateToStep(4)}
                            className="w-full"
                          >
                            Edit Pages
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
                  onClick={() => navigateToStep(4)}
                  className="rounded-full px-6 group"
                >
                  <ChevronLeft
                    className="mr-2 group-hover:-translate-x-1 transition-transform"
                    size={18}
                  />
                  Back to Pages
                </Button>
                <Button
                  onClick={handleGenerate}
                  size="lg"
                  className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="mr-2">Generate Portfolio</span>
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </main>
  );
}
