"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Phone, Menu, X, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CreativePortfolioProps {
  primaryColor: string
  secondaryColor: string
  userDetails?: any
}

export default function CreativePortfolio({ primaryColor, secondaryColor, userDetails }: CreativePortfolioProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [localUserDetails, setLocalUserDetails] = useState<any>(userDetails)

  const router = useRouter()

  // Refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Load user details from localStorage if not passed as props
  useEffect(() => {
    if (!userDetails) {
      const savedUserDetails = localStorage.getItem("userDetails")
      if (savedUserDetails) {
        try {
          const parsedDetails = JSON.parse(savedUserDetails)
          setLocalUserDetails(parsedDetails)
        } catch (e) {
          console.error("Error parsing user details:", e)
        }
      }
    }
  }, [userDetails])

  // Function to scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, section: string) => {
    setMobileMenuOpen(false)
    setActiveSection(section)
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
        setActiveSection("home")
      } else if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setActiveSection("about")
      } else if (contactRef.current) {
        setActiveSection("contact")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Create CSS variables for the selected colors
  const cssVariables = {
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
  } as React.CSSProperties

  // Helper function to get placeholder image URL
  const getPlaceholderImage = (width: number, height: number, text?: string) => {
    const initials = localUserDetails?.name 
      ? localUserDetails.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
      : 'ME'
    return `https://via.placeholder.com/${width}x${height}/${primaryColor.substring(1)}/ffffff?text=${text || initials}`
  }

  return (
    <div style={cssVariables} className="min-h-screen font-sans">
      {/* Navigation */}
      <header className="fixed w-full z-10 backdrop-blur-md bg-white/90 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold" style={{ color: primaryColor }}>
              {localUserDetails?.name || "Your Name"}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: primaryColor }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                className={`py-2 px-1 relative transition-colors ${
                  activeSection === "home" ? "font-medium" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => scrollToSection(homeRef, "home")}
                style={{ color: activeSection === "home" ? primaryColor : undefined }}
              >
                Home
                {activeSection === "home" && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                    style={{ backgroundColor: secondaryColor }}
                  ></span>
                )}
              </button>
              <button
                className={`py-2 px-1 relative transition-colors ${
                  activeSection === "about" ? "font-medium" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => scrollToSection(aboutRef, "about")}
                style={{ color: activeSection === "about" ? primaryColor : undefined }}
              >
                About
                {activeSection === "about" && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                    style={{ backgroundColor: secondaryColor }}
                  ></span>
                )}
              </button>
              <button
                className={`py-2 px-1 relative transition-colors ${
                  activeSection === "contact" ? "font-medium" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => scrollToSection(contactRef, "contact")}
                style={{ color: activeSection === "contact" ? primaryColor : undefined }}
              >
                Contact
                {activeSection === "contact" && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                    style={{ backgroundColor: secondaryColor }}
                  ></span>
                )}
              </button>
            </nav>
            <div className="hidden md:block">
              <Button variant="outline" size="sm" onClick={() => router.push("/")} className="ml-4">
                Back to Builder
              </Button>
            </div>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 flex flex-col space-y-4">
              <button
                className={`py-2 ${activeSection === "home" ? "font-medium" : "text-gray-600"}`}
                onClick={() => scrollToSection(homeRef, "home")}
                style={{ color: activeSection === "home" ? primaryColor : undefined }}
              >
                Home
              </button>
              <button
                className={`py-2 ${activeSection === "about" ? "font-medium" : "text-gray-600"}`}
                onClick={() => scrollToSection(aboutRef, "about")}
                style={{ color: activeSection === "about" ? primaryColor : undefined }}
              >
                About
              </button>
              <button
                className={`py-2 ${activeSection === "contact" ? "font-medium" : "text-gray-600"}`}
                onClick={() => scrollToSection(contactRef, "contact")}
                style={{ color: activeSection === "contact" ? primaryColor : undefined }}
              >
                Contact
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Content */}
      <main>
        {/* Home Section */}
        <section
          ref={homeRef}
          className="pt-32 pb-20 min-h-screen flex items-center"
          style={{
            backgroundImage: localUserDetails?.backgroundImage
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${localUserDetails.backgroundImage})`
              : `radial-gradient(circle at 70% 30%, ${secondaryColor}15, transparent 50%), 
                 radial-gradient(circle at 30% 70%, ${primaryColor}15, transparent 50%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <div className="relative mb-6">
                  <div
                    className="absolute top-0 left-0 w-16 h-16 -translate-x-4 -translate-y-4 z-0 rounded-lg"
                    style={{ backgroundColor: secondaryColor }}
                  ></div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 relative z-10" style={{ color: primaryColor }}>
                    {localUserDetails?.title?.split(' ')[0] || "Creative"}
                    <br />
                    {localUserDetails?.title?.split(' ').slice(1).join(' ') || "Designer"}
                  </h1>
                </div>
                <p className="text-xl md:text-2xl mb-8 max-w-md text-gray-700">
                  {localUserDetails?.bio || "Turning ideas into visually stunning digital experiences that captivate and engage"}
                </p>
                <Button
                  onClick={() => scrollToSection(aboutRef, "about")}
                  className="text-white rounded-full px-8 py-6 text-lg"
                  style={{ backgroundColor: secondaryColor }}
                >
                  Explore My Work <ChevronRight className="ml-2" size={18} />
                </Button>
              </div>
              <div className="md:w-1/2 relative">
                <div
                  className="absolute inset-0 rounded-full -translate-x-8 -translate-y-8 z-0"
                  style={{ backgroundColor: secondaryColor + "40" }}
                ></div>
                <img
                  src={localUserDetails?.profileImage || getPlaceholderImage(500, 500)}
                  alt={localUserDetails?.name || "Profile Image"}
                  className="rounded-full relative z-10 w-64 h-64 md:w-96 md:h-96 object-cover shadow-xl"
                  onError={(e) => {
                    e.currentTarget.src = getPlaceholderImage(500, 500)
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: primaryColor }}>
                About Me
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
            </div>

            <div className="max-w-5xl mx-auto mb-20">
              <div
                className="p-10 rounded-2xl relative mb-16"
                style={{
                  backgroundColor: primaryColor + "08",
                  boxShadow: `0 10px 30px -15px ${primaryColor}30`,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-20 h-20 -translate-x-6 -translate-y-6 z-0"
                  style={{ backgroundColor: secondaryColor }}
                ></div>
                <h3 className="text-2xl font-semibold mb-6 relative z-10" style={{ color: secondaryColor }}>
                  My Creative Journey
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {localUserDetails?.bio || "I'm a creative designer with a passion for crafting visually stunning and user-friendly digital experiences. With a background in both graphic design and UX/UI, I bring a holistic approach to every project."}
                  </p>
                  <p>
                    {localUserDetails?.bioSecondary || "My design philosophy centers around the perfect balance of aesthetics and functionality, ensuring that every element serves a purpose while contributing to a cohesive and engaging user experience."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="p-8 rounded-2xl" style={{ backgroundColor: primaryColor + "08" }}>
                  <h3 className="text-xl font-semibold mb-6" style={{ color: secondaryColor }}>
                    Design Skills
                  </h3>
                  <div className="space-y-6">
                    {localUserDetails?.skills?.slice(0, 4).map((skill: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name || skill}</span>
                          <span style={{ color: secondaryColor }}>{skill.level || "90%"}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full"
                            style={{ 
                              width: `${skill.level || "90"}%`, 
                              backgroundColor: secondaryColor 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 rounded-2xl" style={{ backgroundColor: primaryColor + "08" }}>
                  <h3 className="text-xl font-semibold mb-6" style={{ color: secondaryColor }}>
                    Technical Skills
                  </h3>
                  <div className="space-y-6">
                    {localUserDetails?.skills?.slice(4, 8).map((skill: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name || skill}</span>
                          <span style={{ color: secondaryColor }}>{skill.level || "85%"}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full"
                            style={{ 
                              width: `${skill.level || "85"}%`, 
                              backgroundColor: secondaryColor 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-8 text-center" style={{ color: secondaryColor }}>
                  Work Experience
                </h3>
                <div className="space-y-10">
                  {localUserDetails?.experience?.map((exp: any, index: number) => (
                    <div key={index} className="flex">
                      <div
                        className="w-4 h-4 mt-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                      <div className="ml-6">
                        <div className="font-medium text-xl mb-1">{exp.position}</div>
                        <div
                          className="text-sm inline-block px-3 py-1 rounded-full mb-3"
                          style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                        >
                          {exp.company} | {exp.period}
                        </div>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold mb-8 text-center" style={{ color: secondaryColor }}>
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {localUserDetails?.projects?.map((project: any, index: number) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl shadow-sm">
                    <img
                      src={project.image || getPlaceholderImage(500, 300, project.title?.substring(0, 2))}
                      alt={project.title || "Project"}
                      className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = getPlaceholderImage(500, 300, project.title?.substring(0, 2))
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-white font-medium text-2xl mb-2">
                        {project.title || "Project Title"}
                      </h4>
                      <p className="text-white/80 mb-4">
                        {project.description || "Project description"}
                      </p>
                      <Button variant="outline" className="w-fit text-white border-white hover:bg-white/20">
                        View Project <ExternalLink className="ml-2" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          className="py-20"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${secondaryColor}15, transparent 50%), 
                         radial-gradient(circle at 30% 70%, ${primaryColor}15, transparent 50%)`,
          }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: primaryColor }}>
                Get In Touch
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                {localUserDetails?.contactMessage || "Let's collaborate on your next project. Feel free to reach out through any of the channels below."}
              </p>
            </div>

            <div
              className="max-w-4xl mx-auto p-10 rounded-2xl shadow-sm"
              style={{
                backgroundColor: "white",
                boxShadow: `0 10px 30px -15px ${primaryColor}20`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div
                  className="p-6 rounded-xl flex items-center space-x-6 transition-all hover:shadow-md"
                  style={{ backgroundColor: primaryColor + "05" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: secondaryColor + "20" }}
                  >
                    <Mail size={24} style={{ color: secondaryColor }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <a
                      href={`mailto:${localUserDetails?.email || "your.email@example.com"}`}
                      className="font-medium text-lg hover:underline"
                      style={{ color: primaryColor }}
                    >
                      {localUserDetails?.email || "your.email@example.com"}
                    </a>
                  </div>
                </div>
                <div
                  className="p-6 rounded-xl flex items-center space-x-6 transition-all hover:shadow-md"
                  style={{ backgroundColor: primaryColor + "05" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: secondaryColor + "20" }}
                  >
                    <Phone size={24} style={{ color: secondaryColor }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <a
                      href={`tel:${localUserDetails?.phone || "+1234567890"}`}
                      className="font-medium text-lg hover:underline"
                      style={{ color: primaryColor }}
                    >
                      {localUserDetails?.phone || "+1 (234) 567-890"}
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-6" style={{ color: secondaryColor }}>
                Social Profiles
              </h3>
              <div className="flex flex-wrap gap-4">
                {localUserDetails?.socialLinks?.github && (
                  <Link
                    href={localUserDetails.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl transition-all hover:shadow-md"
                    style={{ backgroundColor: primaryColor + "05" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      <Github className="text-white" size={20} />
                    </div>
                    <span className="font-medium">GitHub</span>
                  </Link>
                )}
                {localUserDetails?.socialLinks?.linkedin && (
                  <Link
                    href={localUserDetails.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl transition-all hover:shadow-md"
                    style={{ backgroundColor: primaryColor + "05" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      <Linkedin className="text-white" size={20} />
                    </div>
                    <span className="font-medium">LinkedIn</span>
                  </Link>
                )}
                {localUserDetails?.socialLinks?.twitter && (
                  <Link
                    href={localUserDetails.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl transition-all hover:shadow-md"
                    style={{ backgroundColor: primaryColor + "05" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      <Twitter className="text-white" size={20} />
                    </div>
                    <span className="font-medium">Twitter</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} {localUserDetails?.name || "Your Name"}. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            {localUserDetails?.socialLinks?.github && (
              <Link 
                href={localUserDetails.socialLinks.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Github size={18} />
              </Link>
            )}
            {localUserDetails?.socialLinks?.linkedin && (
              <Link 
                href={localUserDetails.socialLinks.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Linkedin size={18} />
              </Link>
            )}
            {localUserDetails?.socialLinks?.twitter && (
              <Link 
                href={localUserDetails.socialLinks.twitter} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Twitter size={18} />
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}