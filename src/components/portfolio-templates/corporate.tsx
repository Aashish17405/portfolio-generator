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
              Robert Johnson
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Robert Johnson</h1>
                <p className="text-xl text-white/90 mb-8 max-w-md">Business Consultant & Strategic Advisor</p>
                <Button
                  onClick={() => scrollToSection(aboutRef, "about")}
                  className="text-white rounded-md px-6 py-3 text-lg"
                  style={{ backgroundColor: secondaryColor }}
                >
                  Learn More About My Services
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={userDetails?.profileImage || "/placeholder.svg?height=400&width=400"}
                  alt="Robert Johnson"
                  className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=400&width=400"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: primaryColor }}>
              Professional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 border rounded-lg hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: secondaryColor + "20" }}
                >
                  <CheckCircle size={28} style={{ color: secondaryColor }} />
                </div>
                <h3 className="text-xl font-medium mb-3">Business Strategy</h3>
                <p className="text-gray-600">
                  Develop comprehensive business strategies to drive growth and achieve objectives. Tailored approaches
                  for businesses of all sizes.
                </p>
              </div>
              <div className="p-8 border rounded-lg hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: secondaryColor + "20" }}
                >
                  <CheckCircle size={28} style={{ color: secondaryColor }} />
                </div>
                <h3 className="text-xl font-medium mb-3">Financial Advisory</h3>
                <p className="text-gray-600">
                  Expert financial guidance to optimize resources and maximize profitability. Data-driven insights for
                  informed decision making.
                </p>
              </div>
              <div className="p-8 border rounded-lg hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: secondaryColor + "20" }}
                >
                  <CheckCircle size={28} style={{ color: secondaryColor }} />
                </div>
                <h3 className="text-xl font-medium mb-3">Market Analysis</h3>
                <p className="text-gray-600">
                  In-depth market research and competitive analysis to identify opportunities. Strategic positioning for
                  market advantage.
                </p>
              </div>
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
                    src="/placeholder.svg?height=400&width=300"
                    alt="Robert Johnson"
                    className="w-full rounded-lg shadow-sm"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: secondaryColor }}>
                    Professional Background
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      I'm a seasoned business consultant with over 15 years of experience helping companies optimize
                      their operations, improve profitability, and achieve sustainable growth. My approach combines
                      analytical rigor with practical business acumen to deliver tangible results.
                    </p>
                    <p>
                      Having worked with organizations ranging from startups to Fortune 500 companies across various
                      industries, I bring a wealth of knowledge and best practices to every engagement. My goal is to
                      empower businesses to overcome challenges and capitalize on opportunities in today's dynamic
                      market environment.
                    </p>
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
                    Core Competencies
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                      <div>
                        <span className="font-medium">Strategic Planning & Execution</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Developing and implementing comprehensive business strategies aligned with organizational
                          goals
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                      <div>
                        <span className="font-medium">Financial Analysis & Modeling</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Creating detailed financial models to forecast outcomes and guide decision-making
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                      <div>
                        <span className="font-medium">Market Research & Analysis</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Conducting thorough market research to identify trends, opportunities, and competitive
                          advantages
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h4 className="font-medium text-lg mb-6" style={{ color: primaryColor }}>
                    Industry Expertise
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                      <div>
                        <span className="font-medium">Financial Services</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Banking, insurance, investment management, and fintech
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                      <div>
                        <span className="font-medium">Technology & SaaS</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Software development, cloud services, and technology implementation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 flex-shrink-0 mt-1" size={18} style={{ color: secondaryColor }} />
                      <div>
                        <span className="font-medium">Healthcare & Pharmaceuticals</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Healthcare providers, medical technology, and pharmaceutical companies
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-lg mb-6 text-center" style={{ color: primaryColor }}>
                  Professional Experience
                </h4>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-lg shadow-sm">
                    <div className="font-medium text-lg mb-1">Principal Consultant</div>
                    <div
                      className="text-sm mb-3 inline-block px-3 py-1 rounded-full"
                      style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                    >
                      Johnson Consulting Group | 2015 - Present
                    </div>
                    <p className="text-gray-700">
                      Founded and lead a boutique consulting firm specializing in strategic advisory services for
                      mid-market and enterprise clients. Oversee a team of consultants and manage key client
                      relationships.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm">
                    <div className="font-medium text-lg mb-1">Senior Management Consultant</div>
                    <div
                      className="text-sm mb-3 inline-block px-3 py-1 rounded-full"
                      style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                    >
                      Global Consulting Partners | 2010 - 2015
                    </div>
                    <p className="text-gray-700">
                      Led strategic initiatives for Fortune 500 clients across multiple industries. Specialized in
                      operational efficiency, cost reduction, and growth strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold mb-8 text-center" style={{ color: secondaryColor }}>
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="p-4" style={{ backgroundColor: primaryColor }}>
                    <h4 className="text-white font-medium text-lg">
                      {userDetails?.projects?.[0]?.title || "Financial Services Transformation"}
                    </h4>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      {userDetails?.projects?.[0]?.description ||
                        "Led a comprehensive digital transformation initiative for a leading financial services firm, resulting in 30% cost reduction and improved customer satisfaction scores."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {userDetails?.projects?.[0]?.tags?.map((tag: any, index: any) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                        >
                          {tag}
                        </span>
                      )) || (
                        <>
                          <span
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                          >
                            Digital Transformation
                          </span>
                          <span
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                          >
                            Financial Services
                          </span>
                        </>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      View Case Study <ExternalLink className="ml-2" size={14} />
                    </Button>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="p-4" style={{ backgroundColor: primaryColor }}>
                    <h4 className="text-white font-medium text-lg">Healthcare Supply Chain Optimization</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Redesigned the supply chain operations for a healthcare provider network, achieving $15M in annual
                      savings and improving inventory management efficiency.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                      >
                        Supply Chain
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                      >
                        Healthcare
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      View Case Study <ExternalLink className="ml-2" size={14} />
                    </Button>
                  </div>
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
                Ready to transform your business? Get in touch to discuss how I can help you achieve your goals.
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
                    <p className="text-gray-500 mb-3">For inquiries and consultations</p>
                    <a
                      href="mailto:robert.johnson@example.com"
                      className="font-medium text-lg"
                      style={{ color: secondaryColor }}
                    >
                      robert.johnson@example.com
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
                    <a href="tel:+15551234567" className="font-medium text-lg" style={{ color: secondaryColor }}>
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: secondaryColor }}>
                Professional Networks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="#"
                  className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
                >
                  <Linkedin size={24} style={{ color: primaryColor }} />
                  <span className="font-medium">LinkedIn</span>
                </Link>
                <Link
                  href="#"
                  className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
                >
                  <Twitter size={24} style={{ color: primaryColor }} />
                  <span className="font-medium">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-md transition-all"
                >
                  <Github size={24} style={{ color: primaryColor }} />
                  <span className="font-medium">GitHub</span>
                </Link>
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
              <div className="font-bold text-xl mb-2">Robert Johnson</div>
              <p className="text-white/80">Business Consultant & Strategic Advisor</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Robert Johnson. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

