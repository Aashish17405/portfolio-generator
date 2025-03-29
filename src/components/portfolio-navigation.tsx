"use client"

import { useState, useEffect } from "react"
import type { PageConfig } from "@/utils/types"
import { Home, User, Briefcase, Folder, Award, Mail, Menu, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// NOTE: This component is no longer used as navigation is now handled directly in each template
// It's kept for reference purposes only

interface PortfolioNavigationProps {
  pages: PageConfig[]
  primaryColor: string
  secondaryColor: string
  logoText?: string
}

export function PortfolioNavigation({
  pages,
  primaryColor,
  secondaryColor,
  logoText = "Portfolio",
}: PortfolioNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    // Extract the current page from the pathname
    const currentPath = pathname.split("/").pop() || "home"
    setActiveSection(currentPath)
  }, [pathname])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home size={18} />
      case "user":
        return <User size={18} />
      case "briefcase":
        return <Briefcase size={18} />
      case "folder":
        return <Folder size={18} />
      case "award":
        return <Award size={18} />
      case "mail":
        return <Mail size={18} />
      default:
        return <Home size={18} />
    }
  }

  // Only show enabled pages
  const enabledPages = pages.filter((page) => page.enabled).sort((a, b) => a.order - b.order)

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold" style={{ color: primaryColor }}>
            {logoText}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            {enabledPages.map((page) => (
              <Link
                key={page.id}
                href={`/portfolio/${page.id}`}
                className={`py-2 px-1 relative transition-colors flex items-center gap-1.5 ${
                  activeSection === page.id ? "font-medium" : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ color: activeSection === page.id ? primaryColor : undefined }}
              >
                {getIconComponent(page.icon)}
                {page.name}
                {activeSection === page.id && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                    style={{ backgroundColor: secondaryColor }}
                  ></span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-col space-y-3">
            {enabledPages.map((page) => (
              <Link
                key={page.id}
                href={`/portfolio/${page.id}`}
                className={`py-2 flex items-center justify-between ${
                  activeSection === page.id ? "font-medium" : "text-gray-600"
                }`}
                style={{ color: activeSection === page.id ? primaryColor : undefined }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  {getIconComponent(page.icon)}
                  {page.name}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

