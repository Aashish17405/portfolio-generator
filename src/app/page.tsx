"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Check, Palette, Layout, Sparkles, ChevronLeft, UserCircle2 } from "lucide-react"
import PortfolioPreview from "@/components/portfolio-preview"
import { motion } from "@/components/motion"
import ColorSchemeCard from "@/components/color-scheme-card"
import UserDetailsForm, { type UserDetails } from "@/components/user-details-form"

// Add toast notifications for better user feedback
// Import the toast components at the top of the file
import { useToast, ToastContainer } from "@/components/ui-improvements"

// Portfolio style templates
const portfolioStyles = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design with focus on content",
    features: ["Clean typography", "Whitespace-focused", "Content-first approach"],
    preview: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and artistic design for creative professionals",
    features: ["Dynamic layouts", "Visual emphasis", "Artistic elements"],
    preview: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and polished look for business portfolios",
    features: ["Structured layout", "Business-focused", "Professional tone"],
    preview: "/placeholder.svg?height=150&width=250",
  },
]

// Predefined color combinations
const colorCombinations = [
  {
    id: "professional",
    name: "Professional Blue",
    description: "Trustworthy and reliable",
    primaryColor: "#1a365d",
    secondaryColor: "#3182ce",
    preview: "linear-gradient(to right, #1a365d, #3182ce)",
  },
  {
    id: "creative",
    name: "Creative Purple",
    description: "Imaginative and innovative",
    primaryColor: "#553c9a",
    secondaryColor: "#d53f8c",
    preview: "linear-gradient(to right, #553c9a, #d53f8c)",
  },
  {
    id: "minimal",
    name: "Minimal Black",
    description: "Elegant and sophisticated",
    primaryColor: "#1a202c",
    secondaryColor: "#4299e1",
    preview: "linear-gradient(to right, #1a202c, #4299e1)",
  },
  {
    id: "warm",
    name: "Warm Orange",
    description: "Friendly and approachable",
    primaryColor: "#744210",
    secondaryColor: "#ed8936",
    preview: "linear-gradient(to right, #744210, #ed8936)",
  },
  {
    id: "nature",
    name: "Nature Green",
    description: "Growth and harmony",
    primaryColor: "#22543d",
    secondaryColor: "#48bb78",
    preview: "linear-gradient(to right, #22543d, #48bb78)",
  },
  {
    id: "bold",
    name: "Bold Red",
    description: "Passionate and energetic",
    primaryColor: "#742a2a",
    secondaryColor: "#f56565",
    preview: "linear-gradient(to right, #742a2a, #f56565)",
  },
]

// Default user details
const defaultUserDetails: UserDetails = {
  name: "John Doe",
  title: "Web Developer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "I'm a passionate web developer with over 5 years of experience creating beautiful and functional websites. I specialize in front-end development with a focus on creating intuitive user experiences.",
  skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  experience: [
    {
      position: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2020 - Present",
      description:
        "Leading frontend development for enterprise applications, mentoring junior developers, and implementing best practices.",
    },
    {
      position: "Web Developer",
      company: "Digital Agency",
      period: "2018 - 2020",
      description:
        "Developed responsive websites for various clients across different industries. Collaborated with designers to implement pixel-perfect interfaces.",
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      tags: ["Next.js", "Tailwind CSS", "Supabase"],
    },
  ],
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
}

// Add a helper function to safely load images from localStorage
// Add this function near the top of the component:

const safelyLoadUserDetails = () => {
  try {
    const savedUserDetails = localStorage.getItem("userDetails")
    if (savedUserDetails) {
      const parsedDetails = JSON.parse(savedUserDetails)

      // Validate image fields to ensure they're valid base64 strings
      if (parsedDetails.profileImage && !parsedDetails.profileImage.startsWith("data:image/")) {
        parsedDetails.profileImage = ""
      }

      if (parsedDetails.backgroundImage && !parsedDetails.backgroundImage.startsWith("data:image/")) {
        parsedDetails.backgroundImage = ""
      }

      // Validate project images
      if (parsedDetails.projects) {
        parsedDetails.projects = parsedDetails.projects.map((project: any) => {
          if (project.image && !project.image.startsWith("data:image/")) {
            return { ...project, image: "" }
          }
          return project
        })
      }

      return parsedDetails
    }
  } catch (e) {
    console.error("Error parsing saved user details:", e)
  }
  return defaultUserDetails
}

export default function Home() {
  // Add the toast hook inside the component
  const { toasts, showToast, removeToast } = useToast()
  const [selectedStyle, setSelectedStyle] = useState(portfolioStyles[0].id)
  const [selectedColorCombo, setSelectedColorCombo] = useState(colorCombinations[0].id)
  const [userDetails, setUserDetails] = useState<UserDetails>(defaultUserDetails)
  const [isGenerated, setIsGenerated] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)

  // Get the selected color combination
  const selectedCombo = colorCombinations.find((combo) => combo.id === selectedColorCombo) || colorCombinations[0]
  const selectedStyleObj = portfolioStyles.find((style) => style.id === selectedStyle) || portfolioStyles[0]

  // Then update the useEffect to use this function:
  useEffect(() => {
    // Check if there's a previously generated portfolio
    const portfolioStyle = localStorage.getItem("portfolioStyle")
    const primaryColor = localStorage.getItem("primaryColor")
    const secondaryColor = localStorage.getItem("secondaryColor")

    if (portfolioStyle && primaryColor && secondaryColor) {
      // Find the matching color combination
      const combo = colorCombinations.find(
        (c) => c.primaryColor === primaryColor && c.secondaryColor === secondaryColor,
      )

      if (combo) {
        setSelectedColorCombo(combo.id)
      }

      setSelectedStyle(portfolioStyle)
      setUserDetails(safelyLoadUserDetails())
      setIsGenerated(true)
    }
  }, [])

  const handleStyleSelect = (style: string) => {
    console.log("Style selected:", style)
    setSelectedStyle(style)
    setActiveStep(2)
  }

  const handleColorSelect = (colorId: string) => {
    console.log("Color selected:", colorId)
    setSelectedColorCombo(colorId)

    // Only advance to step 3 if this is the first time selecting a color
    if (activeStep === 2) {
      setActiveStep(3)
    }
  }

  // Update the handleUserDetailsSave function to show a success toast
  const handleUserDetailsSave = (details: UserDetails) => {
    setUserDetails(details)
    setActiveStep(4)
    setShowPreview(true)
    showToast("Your details have been saved successfully!", "success")
  }

  // Also update the handleGenerate function to ensure we're storing valid data:
  const handleGenerate = () => {
    // Find the selected color combination
    const colorCombo = colorCombinations.find((combo) => combo.id === selectedColorCombo)

    if (!colorCombo) {
      console.error("Selected color combination not found")
      showToast("Error generating portfolio. Please try again.", "error")
      return
    }

    // Validate image data before storing
    const validatedUserDetails = { ...userDetails }

    // Store the selected style and colors in localStorage
    localStorage.setItem("portfolioStyle", selectedStyle)
    localStorage.setItem("primaryColor", colorCombo.primaryColor)
    localStorage.setItem("secondaryColor", colorCombo.secondaryColor)
    localStorage.setItem("colorComboName", colorCombo.name) // Store the name for reference
    localStorage.setItem("userDetails", JSON.stringify(validatedUserDetails))

    setIsGenerated(true)
    showToast("Your portfolio has been generated successfully!", "success")
  }

  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setActiveStep(step)
    }
  }

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
              Create your professional portfolio in minutes with our easy-to-use builder. Select a style, choose colors,
              add your details, and you're ready to go!
            </p>
          </motion.div>

          {/* Progress steps */}
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
                  <Sparkles size={24} />
                </div>
                <span className={`mt-2 text-sm font-medium ${activeStep >= 4 ? "text-primary" : "text-gray-500"}`}>
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
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Portfolio Style</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step 1 of 4</div>
              </div>

              <p className="text-gray-600 mb-8">
                Select a style that best represents your professional identity. Each style is designed to showcase your
                work in a unique way.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portfolioStyles.map((style) => (
                  <div key={style.id} className="relative">
                    <motion.div
                      whileHover={{ scale: selectedStyle === style.id ? 1.02 : 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={() => handleStyleSelect(style.id)}
                      className={`cursor-pointer h-full`}
                    >
                      <Card
                        className={`overflow-hidden transition-all duration-300 h-full
                        ${
                          selectedStyle === style.id
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
                          {selectedStyle === style.id && (
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
                <Button onClick={() => navigateToStep(2)} className="rounded-full px-6 group" disabled={!selectedStyle}>
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
                Select a color scheme that reflects your personal brand. Colors play a crucial role in how visitors
                perceive your portfolio.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {colorCombinations.map((combo) => (
                  <div key={combo.id} className="relative">
                    <ColorSchemeCard
                      id={combo.id}
                      name={combo.name}
                      description={combo.description}
                      primaryColor={combo.primaryColor}
                      secondaryColor={combo.secondaryColor}
                      preview={combo.preview}
                      isSelected={selectedColorCombo === combo.id}
                      onSelect={handleColorSelect}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => navigateToStep(1)} className="rounded-full px-6 group">
                  <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
                  Back to Styles
                </Button>
                <Button
                  onClick={() => navigateToStep(3)}
                  className="rounded-full px-6 group"
                  disabled={!selectedColorCombo}
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
                Fill in your professional information to personalize your portfolio. This information will be displayed
                on your portfolio website.
              </p>

              <UserDetailsForm onSave={handleUserDetailsSave} initialData={userDetails} />

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => navigateToStep(2)} className="rounded-full px-6 group">
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
                Here's a preview of how your portfolio will look. If you're happy with it, click "Generate Portfolio" to
                create your site.
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
                          style={selectedStyle}
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
                              <p className="font-medium">{userDetails.name}</p>
                              <p className="text-xs text-gray-500">{userDetails.title}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <Button variant="outline" size="sm" onClick={() => navigateToStep(3)} className="w-full">
                            Edit Your Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigateToStep(3)} className="rounded-full px-6 group">
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

          {/* Success Message */}
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 p-8 rounded-xl text-center shadow-md"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-green-800">Your portfolio is ready!</h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Your portfolio has been generated with the{" "}
                <span className="font-semibold">{selectedStyleObj.name}</span> style and{" "}
                <span className="font-semibold">{selectedCombo.name}</span> color scheme. Click below to view your new
                portfolio.
              </p>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="mr-2">View Your Portfolio</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Testimonials */}
          <div className="mt-16 px-4">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "UX Designer",
                  quote:
                    "This portfolio builder helped me create a professional-looking site in minutes. The color schemes are beautiful!",
                },
                {
                  name: "Sarah Williams",
                  role: "Photographer",
                  quote:
                    "I needed a portfolio quickly for a client meeting. This tool was a lifesaver - simple, fast, and the results look great.",
                },
                {
                  name: "Michael Chen",
                  role: "Web Developer",
                  quote:
                    "As a developer, I appreciate the clean code and responsive design. Perfect for showcasing my projects!",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Add the ToastContainer at the end of the return statement, just before the closing </main> tag */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </main>
  )
}

