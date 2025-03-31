"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { type PageConfig, DEFAULT_PAGES } from "@/utils/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import MinimalPortfolio from "@/components/portfolio-templates/minimal"
import CreativePortfolio from "@/components/portfolio-templates/creative"
import CorporatePortfolio from "@/components/portfolio-templates/corporate"
import { useUserDetails } from "@/hooks/useUserDetails"

export default function PortfolioPage() {
  const router = useRouter()
  const params = useParams()
  const { userDetails } = useUserDetails()

  const [style, setStyle] = useState("")
  const [primaryColor, setPrimaryColor] = useState("")
  const [secondaryColor, setSecondaryColor] = useState("")
  const [pages, setPages] = useState<PageConfig[]>(DEFAULT_PAGES)
  const [isLoading, setIsLoading] = useState(true)

  const currentPage = params.page as string

  useEffect(() => {
    const portfolioStyle = localStorage.getItem("portfolioStyle")
    const primary = localStorage.getItem("primaryColor")
    const secondary = localStorage.getItem("secondaryColor")
    const savedPages = localStorage.getItem("portfolioPages")

    if (!portfolioStyle || !primary || !secondary) {
      router.push("/")
      return
    }

    setStyle(portfolioStyle)
    setPrimaryColor(primary)
    setSecondaryColor(secondary)

    if (savedPages) {
      try {
        const parsedPages = JSON.parse(savedPages) as PageConfig[]
        setPages(parsedPages)
        
        const pageExists = parsedPages.find(p => p.id === currentPage && p.enabled)
        if (!pageExists) {
          const firstEnabled = parsedPages.find(p => p.enabled)
          router.push(firstEnabled ? `/portfolio/${firstEnabled.id}` : "/")
        }
      } catch (e) {
        console.error("Error parsing pages:", e)
        setPages(DEFAULT_PAGES)
      }
    }
    
    setIsLoading(false)
  }, [router, currentPage])

  const renderPortfolio = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
        </div>
      )
    }

    try {
      const portfolioProps = {
        primaryColor,
        secondaryColor,
        userDetails,
        currentPage,
        pages: pages.filter(p => p.enabled).sort((a, b) => a.order - b.order),
      }

      switch (style) {
        case "minimal":
          return <MinimalPortfolio {...portfolioProps} />
        case "creative":
          return <CreativePortfolio {...portfolioProps} />
        case "corporate":
          return <CorporatePortfolio {...portfolioProps} />
        default:
          return (
            <div className="min-h-screen flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-4">Template not found</h1>
              <Button onClick={() => router.push("/")} className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Builder
              </Button>
            </div>
          )
      }
    } catch (error) {
      console.error("Error rendering portfolio:", error)
      return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error loading portfolio</h1>
          <p className="text-gray-600 mb-6">There was a problem loading your portfolio template.</p>
          <Button onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Builder
          </Button>
        </div>
      )
    }
  }

  return <div className="min-h-screen">{renderPortfolio()}</div>
}