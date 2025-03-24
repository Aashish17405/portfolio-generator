"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import MinimalPortfolio from "@/components/portfolio-templates/minimal"
import CreativePortfolio from "@/components/portfolio-templates/creative"
import CorporatePortfolio from "@/components/portfolio-templates/corporate"
import { motion } from "@/components/motion"
import type { UserDetails } from "@/components/user-details-form"

export default function PortfolioPage() {
  const router = useRouter()
  const [style, setStyle] = useState("")
  const [primaryColor, setPrimaryColor] = useState("")
  const [secondaryColor, setSecondaryColor] = useState("")
  const [colorComboName, setColorComboName] = useState("")
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get the selected style and colors from localStorage
    const portfolioStyle = localStorage.getItem("portfolioStyle")
    const primary = localStorage.getItem("primaryColor")
    const secondary = localStorage.getItem("secondaryColor")
    const comboName = localStorage.getItem("colorComboName")
    const savedUserDetails = localStorage.getItem("userDetails")

    if (!portfolioStyle || !primary || !secondary) {
      // If no style or colors are selected, redirect to the home page
      router.push("/")
      return
    }

    setStyle(portfolioStyle)
    setPrimaryColor(primary)
    setSecondaryColor(secondary)
    setColorComboName(comboName || "")

    if (savedUserDetails) {
      try {
        const parsedDetails = JSON.parse(savedUserDetails)

        // Validate image fields
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

        setUserDetails(parsedDetails)
      } catch (e) {
        console.error("Error parsing saved user details:", e)
      }
    }

    // Add a small delay to show the loading animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Loading your portfolio...</h2>
          <p className="text-gray-500">Preparing your custom design</p>
        </motion.div>
      </div>
    )
  }

  // Render the selected portfolio template
  switch (style) {
    case "minimal":
      return <MinimalPortfolio primaryColor={primaryColor} secondaryColor={secondaryColor} userDetails={userDetails} />
    case "creative":
      return <CreativePortfolio primaryColor={primaryColor} secondaryColor={secondaryColor} userDetails={userDetails} />
    case "corporate":
      return (
        <CorporatePortfolio primaryColor={primaryColor} secondaryColor={secondaryColor} userDetails={userDetails} />
      )
    default:
      return null
  }
}

