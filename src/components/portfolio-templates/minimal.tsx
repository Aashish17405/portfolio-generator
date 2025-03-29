"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Phone, Menu, X, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { UserDetails } from "@/components/user-details-form"
import type { PageConfig } from "@/utils/types"

interface MinimalPortfolioProps {
  primaryColor: string
  secondaryColor: string
  userDetails?: UserDetails | null
  currentPage?: string
  pages?: PageConfig[]
}

export default function MinimalPortfolio({
  primaryColor,
  secondaryColor,
  userDetails,
  currentPage = "home",
  pages = [],
}: MinimalPortfolioProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  // Create CSS variables for the selected colors
  const cssVariables = {
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
  } as React.CSSProperties

  // Helper function to get placeholder image URL
  const getPlaceholderImage = (width: number, height: number) => {
    return `/placeholder.svg?height=${height}&width=${width}`
  }

  // Default user details if none provided
  const user = userDetails || {
    name: "John Doe",
    title: "Web Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "I'm a passionate web developer with over 5 years of experience creating beautiful and functional websites. I specialize in front-end development with a focus on creating intuitive user experiences.",
    profileImage: "",
    backgroundImage: "",
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
        image: "",
      },
      {
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates and team collaboration features.",
        tags: ["Next.js", "Tailwind CSS", "Supabase"],
        image: "",
      },
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  }

  // Render the appropriate page content based on currentPage
  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return renderHomePage()
      case "about":
        return renderAboutPage()
      case "experience":
        return renderExperiencePage()
      case "projects":
        return renderProjectsPage()
      case "skills":
        return renderSkillsPage()
      case "contact":
        return renderContactPage()
      default:
        return renderHomePage()
    }
  }

  // Home page content
  const renderHomePage = () => (
    <section
      className="min-h-[90vh] flex items-center"
      style={{
        backgroundImage: user.backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${user.backgroundImage})`
          : `linear-gradient(135deg, ${primaryColor}05, ${primaryColor}15)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${user.backgroundImage ? "text-white" : ""}`}
              style={{ color: user.backgroundImage ? "white" : primaryColor }}
            >
              Hi, I'm {user.name}
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 leading-relaxed ${user.backgroundImage ? "text-white/90" : "text-gray-700"}`}
            >
              A passionate {user.title} crafting digital experiences that blend
              <span className="font-medium" style={{ color: user.backgroundImage ? "white" : secondaryColor }}>
                {" "}
                creativity
              </span>{" "}
              with
              <span className="font-medium" style={{ color: user.backgroundImage ? "white" : secondaryColor }}>
                {" "}
                functionality
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/portfolio/about">
                <Button className="rounded-full px-6 text-white" style={{ backgroundColor: secondaryColor }}>
                  View My Work
                </Button>
              </Link>
              <Link href="/portfolio/contact">
                <Button
                  variant="outline"
                  className={`rounded-full px-6 ${user.backgroundImage ? "border-white text-white hover:bg-white/10" : "border-primary text-primary hover:bg-primary/5"}`}
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full -translate-x-4 -translate-y-4"
                style={{ backgroundColor: secondaryColor + "30" }}
              ></div>
              <img
                src={user.profileImage || getPlaceholderImage(400, 400)}
                alt={user.name}
                className="relative z-10 rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = getPlaceholderImage(400, 400)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // About page content
  const renderAboutPage = () => (
    <section className="py-20 pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            About Me
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h3 className="text-xl font-semibold mb-6 inline-flex items-center" style={{ color: secondaryColor }}>
              <span
                className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: secondaryColor }}
              >
                01
              </span>
              My Story
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // Experience page content
  const renderExperiencePage = () => (
    <section className="py-20 pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Work Experience
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {user.experience.map((exp: any, index: number) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 bg-white rounded-lg shadow-sm p-6"
                style={{ borderColor: secondaryColor + "50" }}
              >
                <div
                  className="absolute left-[-8px] top-6 w-4 h-4 rounded-full"
                  style={{ backgroundColor: secondaryColor }}
                ></div>
                <div className="mb-1 font-medium text-lg">{exp.position}</div>
                <div
                  className="text-sm mb-2 inline-block px-3 py-1 rounded-full"
                  style={{ backgroundColor: secondaryColor + "15", color: secondaryColor }}
                >
                  {exp.company} | {exp.period}
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  // Projects page content
  const renderProjectsPage = () => (
    <section className="py-20 pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Featured Projects
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Here are some of my recent projects that showcase my skills and expertise
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {user.projects.map((project: any, index: number) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image || getPlaceholderImage(400, 200)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = getPlaceholderImage(400, 200)
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ backgroundColor: primaryColor + "90" }}
                  >
                    <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                      View Project <ExternalLink className="ml-2" size={14} />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-lg mb-2">{project.title}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="text-sm px-2 py-1 rounded-full"
                        style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  // Skills page content
  const renderSkillsPage = () => (
    <section className="py-20 pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Technical Skills
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 inline-flex items-center" style={{ color: secondaryColor }}>
                  <span
                    className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    01
                  </span>
                  Technical Skills
                </h3>
                <ul className="space-y-3">
                  {user.skills.slice(0, Math.ceil(user.skills.length / 2)).map((skill: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: secondaryColor }}></div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6 inline-flex items-center" style={{ color: secondaryColor }}>
                  <span
                    className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    02
                  </span>
                  Soft Skills
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: secondaryColor }}></div>
                    <span>Problem Solving</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: secondaryColor }}></div>
                    <span>Communication</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: secondaryColor }}></div>
                    <span>Time Management</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: secondaryColor }}></div>
                    <span>Teamwork</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: secondaryColor }}></div>
                    <span>Adaptability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // Contact page content
  const renderContactPage = () => (
    <section
      className="py-20 pt-32"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}05, ${primaryColor}15)`,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Get In Touch
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: secondaryColor }}></div>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-center p-4 rounded-lg transition-colors hover:bg-gray-50">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: secondaryColor + "20" }}
                >
                  <Mail style={{ color: secondaryColor }} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a href={`mailto:${user.email}`} className="text-gray-600 hover:underline">
                    {user.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg transition-colors hover:bg-gray-50">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: secondaryColor + "20" }}
                >
                  <Phone style={{ color: secondaryColor }} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <a href={`tel:${user.phone}`} className="text-gray-600 hover:underline">
                    {user.phone}
                  </a>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-6" style={{ color: secondaryColor }}>
              Social Profiles
            </h3>
            <div className="flex flex-wrap gap-4">
              {user.socialLinks.github && (
                <Link
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Github style={{ color: primaryColor }} />
                  <span>GitHub</span>
                </Link>
              )}
              {user.socialLinks.linkedin && (
                <Link
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Linkedin style={{ color: primaryColor }} />
                  <span>LinkedIn</span>
                </Link>
              )}
              {user.socialLinks.twitter && (
                <Link
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Twitter style={{ color: primaryColor }} />
                  <span>Twitter</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  return (
    <div style={cssVariables} className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold" style={{ color: primaryColor }}>
              {user.name}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
              {pages
                .filter((p) => p.enabled)
                .map((page) => (
                  <Link
                    key={page.id}
                    href={`/portfolio/${page.id}`}
                    className={`py-2 px-1 relative transition-colors ${
                      currentPage === page.id ? "font-medium" : "text-gray-600 hover:text-gray-900"
                    }`}
                    style={{ color: currentPage === page.id ? primaryColor : undefined }}
                  >
                    {page.name}
                    {currentPage === page.id && (
                      <span
                        className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                        style={{ backgroundColor: secondaryColor }}
                      ></span>
                    )}
                  </Link>
                ))}
            </nav>
            <div className="hidden md:block">
              <Button variant="outline" size="sm" onClick={() => router.push("/")} className="ml-4">
                Back to Builder
              </Button>
            </div>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 flex flex-col space-y-3 bg-white border-t mt-2">
              {pages
                .filter((p) => p.enabled)
                .map((page) => (
                  <Link
                    key={page.id}
                    href={`/portfolio/${page.id}`}
                    className={`py-2 ${currentPage === page.id ? "font-medium" : "text-gray-600"}`}
                    style={{ color: currentPage === page.id ? primaryColor : undefined }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              <Link href="/" className="py-2 text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Back to Builder
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow">{renderPageContent()}</main>

      {/* Footer */}
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} {user.name}. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            {user.socialLinks.github && (
              <Link
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Github size={18} />
              </Link>
            )}
            {user.socialLinks.linkedin && (
              <Link
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Linkedin size={18} />
              </Link>
            )}
            {user.socialLinks.twitter && (
              <Link
                href={user.socialLinks.twitter}
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

