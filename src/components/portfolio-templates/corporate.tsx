"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Phone, Menu, X, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CorporatePortfolioProps {
  primaryColor: string
  secondaryColor: string
  userDetails?: any
}

export default function CorporatePortfolio({ primaryColor, secondaryColor, userDetails }: CorporatePortfolioProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const router = useRouter()

  // Refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

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

  return (
    <div style={cssVariables} className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold" style={{ color: primaryColor }}>
              {userDetails?.name || "Your Name"}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
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
            <nav className="md:hidden pt-4 pb-2 flex flex-col space-y-3">
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
      <main className="flex-grow">
        {/* Home Section */}
        <section
          ref={homeRef}
          className="py-20"
          style={{
            backgroundColor: userDetails?.backgroundImage ? "transparent" : primaryColor,
            backgroundImage: userDetails?.backgroundImage
              ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${userDetails.backgroundImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{userDetails?.name || "Your Name"}</h1>
                <p className="text-xl text-white/90 mb-8 max-w-md">{userDetails?.title || "Your Professional Title"}</p>
                <Button
                  onClick={() => scrollToSection(aboutRef, "about")}
                  className="text-white rounded-md px-6 py-3 text-lg"
                  style={{ backgroundColor: secondaryColor }}
                >
                  Learn More About Me
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={userDetails?.profileImage || `https://via.placeholder.com/400x400`}
                  alt={userDetails?.name || "Profile Image"}
                  className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/400x400`
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: primaryColor }}>
              My Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {userDetails?.skills?.slice(0, 3).map((skill: string, index: number) => (
                <div key={index} className="p-8 border rounded-lg hover:shadow-md transition-shadow">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                    style={{ backgroundColor: secondaryColor + "20" }}
                  >
                    <CheckCircle size={28} style={{ color: secondaryColor }} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{skill}</h3>
                  <p className="text-gray-600">
                    {userDetails?.bio || "I have extensive experience in this area and can deliver high-quality results."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
                About Me
              </h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
            </div>

            <div className="max-w-5xl mx-auto mb-16">
              <div className="flex flex-col md:flex-row gap-10 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="md:w-1/3">
                  <img
                    src={userDetails?.profileImage || `https://via.placeholder.com/400x300`}
                    alt={userDetails?.name || "Profile Image"}
                    className="w-full rounded-lg shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/400x300`
                    }}
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: secondaryColor }}>
                    Professional Background
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <p>{userDetails?.bio || "Add your professional bio here."}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto mb-16">
              <h3 className="text-2xl font-semibold mb-8 text-center" style={{ color: secondaryColor }}>
                Skills & Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-6" style={{ color: primaryColor }}>
                    Technical Skills
                  </h4>
                  <ul className="space-y-4">
                    {userDetails?.skills?.map((skill: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                        <div>
                          <span className="font-medium">{skill}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-6" style={{ color: primaryColor }}>
                    Professional Experience
                  </h4>
                  <ul className="space-y-4">
                    {userDetails?.experience?.map((exp: any, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                        <div>
                          <span className="font-medium">{exp.position}</span>
                          <p className="text-sm text-gray-600 mt-1">
                            {exp.company} | {exp.period}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-lg mb-6 text-center" style={{ color: primaryColor }}>
                  Featured Projects
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {userDetails?.projects?.map((project: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="p-4" style={{ backgroundColor: primaryColor }}>
                        <h4 className="text-white font-medium text-lg">{project.title}</h4>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags?.map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 rounded-full text-sm"
                              style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                          View Project <ExternalLink className="ml-2" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
                Contact Information
              </h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                {userDetails?.bio || "Ready to collaborate? Get in touch to discuss potential opportunities."}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 border rounded-lg flex items-start space-x-6 hover:shadow-md transition-all">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center mt-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Email Address</h3>
                    <p className="text-gray-500 mb-3">For inquiries and collaborations</p>
                    <a
                      href={`mailto:${userDetails?.email || "your.email@example.com"}`}
                      className="font-medium text-lg"
                      style={{ color: secondaryColor }}
                    >
                      {userDetails?.email || "your.email@example.com"}
                    </a>
                  </div>
                </div>
                <div className="p-8 border rounded-lg flex items-start space-x-6 hover:shadow-md transition-all">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center mt-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Phone Number</h3>
                    <p className="text-gray-500 mb-3">Available during business hours</p>
                    <a
                      href={`tel:${userDetails?.phone || "+1234567890"}`}
                      className="font-medium text-lg"
                      style={{ color: secondaryColor }}
                    >
                      {userDetails?.phone || "+1 (234) 567-890"}
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: secondaryColor }}>
                Professional Networks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userDetails?.socialLinks?.linkedin && (
                  <Link
                    href={userDetails.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
                  >
                    <Linkedin size={24} style={{ color: primaryColor }} />
                    <span className="font-medium">LinkedIn</span>
                  </Link>
                )}
                {userDetails?.socialLinks?.twitter && (
                  <Link
                    href={userDetails.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
                  >
                    <Twitter size={24} style={{ color: primaryColor }} />
                    <span className="font-medium">Twitter</span>
                  </Link>
                )}
                {userDetails?.socialLinks?.github && (
                  <Link
                    href={userDetails.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
                  >
                    <Github size={24} style={{ color: primaryColor }} />
                    <span className="font-medium">GitHub</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 text-white" style={{ backgroundColor: primaryColor }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-bold text-xl mb-2">{userDetails?.name || "Your Name"}</div>
              <p className="text-white/80">{userDetails?.title || "Your Professional Title"}</p>
            </div>
            <div className="flex space-x-6">
              {userDetails?.socialLinks?.linkedin && (
                <Link
                  href={userDetails.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </Link>
              )}
              {userDetails?.socialLinks?.twitter && (
                <Link
                  href={userDetails.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </Link>
              )}
              {userDetails?.socialLinks?.github && (
                <Link
                  href={userDetails.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </Link>
              )}
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} {userDetails?.name || "Your Name"}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}