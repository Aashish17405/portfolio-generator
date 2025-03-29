"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PortfolioRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Get the portfolio pages from localStorage
    const savedPages = localStorage.getItem("portfolioPages")

    if (savedPages) {
      try {
        const pages = JSON.parse(savedPages)
        // Find the first enabled page
        const firstEnabledPage = pages.find((p: any) => p.enabled)
        if (firstEnabledPage) {
          router.push(`/portfolio/${firstEnabledPage.id}`)
          return
        }
      } catch (e) {
        console.error("Error parsing saved pages:", e)
      }
    }

    // Default to home page if no pages found or error
    router.push("/portfolio/home")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
    </div>
  )
}

