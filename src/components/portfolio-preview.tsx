"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "@/components/motion"
import type { UserDetails } from "@/components/user-details-form"

interface PortfolioPreviewProps {
  style: string
  primaryColor: string
  secondaryColor: string
  fullPreview?: boolean
  userDetails?: UserDetails
}

export default function PortfolioPreview({
  style,
  primaryColor,
  secondaryColor,
  fullPreview = false,
  userDetails,
}: PortfolioPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for preview
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg animate-pulse">
        <div className="text-gray-400">Loading preview...</div>
      </div>
    )
  }

  // Default user details if none provided
  const user = userDetails || {
    name: "John Doe",
    title: "Web Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "I'm a passionate web developer with over 5 years of experience creating beautiful and functional websites.",
    profileImage: "",
    backgroundImage: "",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    experience: [
      {
        position: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2020 - Present",
        description: "Leading frontend development for enterprise applications.",
      },
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product management.",
        tags: ["React", "Node.js", "MongoDB"],
        image: "",
      },
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  }

  // Minimal style preview
  if (style === "minimal") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {fullPreview ? (
          <div className="h-full overflow-auto">
            <div className="min-h-[400px] flex flex-col">
              {/* Header */}
              <div
                className="h-16 px-6 flex items-center justify-between border-b sticky top-0 bg-white z-10"
                style={{ borderColor: primaryColor + "40" }}
              >
                <div className="font-bold" style={{ color: primaryColor }}>
                  {user.name}
                </div>
                <div className="flex space-x-6">
                  <div className="text-sm font-medium">Home</div>
                  <div className="text-sm text-gray-500">About</div>
                  <div className="text-sm text-gray-500">Contact</div>
                </div>
              </div>

              {/* Hero Section */}
              <div
                className="flex-1 flex flex-col md:flex-row items-center p-8"
                style={{
                  backgroundImage: user.backgroundImage
                    ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${user.backgroundImage})`
                    : `linear-gradient(135deg, ${primaryColor}05, ${primaryColor}15)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h1
                    className={`text-3xl font-bold mb-4 ${user.backgroundImage ? "text-white" : ""}`}
                    style={{ color: user.backgroundImage ? "white" : primaryColor }}
                  >
                    Hi, I'm {user.name}
                  </h1>
                  <p className={`${user.backgroundImage ? "text-white/90" : "text-gray-700"} mb-6`}>
                    {user.title} {user.bio.substring(0, 100)}...
                  </p>
                  <div className="flex space-x-3">
                    <div
                      className="px-4 py-2 rounded-full text-white text-sm"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      View My Work
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm border ${user.backgroundImage ? "border-white text-white" : ""}`}
                      style={{
                        borderColor: user.backgroundImage ? "white" : primaryColor,
                        color: user.backgroundImage ? "white" : primaryColor,
                      }}
                    >
                      Contact Me
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full -translate-x-2 -translate-y-2"
                      style={{ backgroundColor: secondaryColor + "30" }}
                    ></div>
                    {user.profileImage ? (
                      <div className="w-32 h-32 rounded-full relative z-10 border-4 border-white overflow-hidden">
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-300 relative z-10 border-4 border-white"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* About Section Preview */}
              <div className="p-8 border-t">
                <h2 className="text-xl font-bold mb-4 text-center" style={{ color: primaryColor }}>
                  About Me
                </h2>
                <div className="w-16 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: secondaryColor }}></div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-medium mb-3" style={{ color: secondaryColor }}>
                    My Story
                  </h3>
                  <p className="text-gray-700">{user.bio}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-3" style={{ color: secondaryColor }}>
                      Skills
                    </h3>
                    <ul className="space-y-2">
                      {user.skills.slice(0, 5).map((skill: any, index: any) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: secondaryColor }}></div>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-3" style={{ color: secondaryColor }}>
                      Experience
                    </h3>
                    {user.experience.slice(0, 1).map((exp: any, index: any) => (
                      <div key={index}>
                        <div className="font-medium">{exp.position}</div>
                        <div className="text-sm text-gray-500 mb-1">
                          {exp.company} | {exp.period}
                        </div>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card className="overflow-hidden h-64 border">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div
                className="h-10 px-4 flex items-center justify-between border-b"
                style={{ borderColor: primaryColor + "40" }}
              >
                <div className="font-bold text-sm" style={{ color: primaryColor }}>
                  {user.name}
                </div>
                <div className="flex space-x-3">
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-12 h-12 rounded-full mb-2 overflow-hidden">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300"></div>
                  )}
                </div>
                <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
                  Hi, I'm {user.name}
                </h2>
                <p className="text-xs text-gray-600 mb-3">{user.title}</p>
                <div className="text-xs text-white px-3 py-1 rounded-full" style={{ backgroundColor: secondaryColor }}>
                  View My Work
                </div>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    )
  }

  // Creative style preview
  if (style === "creative") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {fullPreview ? (
          <div className="h-full overflow-auto">
            <div className="min-h-[400px] flex flex-col">
              {/* Header */}
              <div className="h-16 px-6 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="font-bold" style={{ color: primaryColor }}>
                  {user.name}
                </div>
                <div className="flex space-x-6">
                  <div className="text-sm font-medium">Home</div>
                  <div className="text-sm text-gray-500">About</div>
                  <div className="text-sm text-gray-500">Contact</div>
                </div>
              </div>

              {/* Hero Section */}
              <div
                className="flex-1 flex flex-col md:flex-row items-center p-8"
                style={{
                  backgroundImage: user.backgroundImage
                    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${user.backgroundImage})`
                    : `radial-gradient(circle at 70% 30%, ${secondaryColor}15, transparent 50%), 
                       radial-gradient(circle at 30% 70%, ${primaryColor}15, transparent 50%)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <div className="relative mb-4">
                    <div
                      className="absolute top-0 left-0 w-12 h-12 -translate-x-2 -translate-y-2 z-0"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <h1
                      className={`text-3xl font-bold relative z-10 ${user.backgroundImage ? "text-white" : ""}`}
                      style={{ color: user.backgroundImage ? "white" : primaryColor }}
                    >
                      {user.name}
                      <br />
                      {user.title}
                    </h1>
                  </div>
                  <p className={`${user.backgroundImage ? "text-white/90" : "text-gray-700"} mb-6`}>
                    {user.bio.substring(0, 100)}...
                  </p>
                  <div
                    className="px-4 py-2 rounded-full text-white text-sm inline-block"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Explore My Work
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full -translate-x-4 -translate-y-4 w-40 h-40"
                    style={{ backgroundColor: secondaryColor + "40" }}
                  ></div>
                  {user.profileImage ? (
                    <div className="w-40 h-40 rounded-full relative z-10 overflow-hidden">
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-gray-300 relative z-10"></div>
                  )}
                </div>
              </div>

              {/* Skills Preview */}
              <div className="p-8">
                <h2 className="text-xl font-bold mb-4 text-center" style={{ color: primaryColor }}>
                  About Me
                </h2>
                <div className="w-16 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: secondaryColor }}></div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg" style={{ backgroundColor: primaryColor + "08" }}>
                    <h3 className="text-lg font-medium mb-4" style={{ color: secondaryColor }}>
                      Design Skills
                    </h3>
                    <div className="space-y-4">
                      {user.skills.slice(0, 3).map((skill: any, index: any) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{skill}</span>
                            <span className="text-sm" style={{ color: secondaryColor }}>
                              {95 - index * 5}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full"
                              style={{ width: `${95 - index * 5}%`, backgroundColor: secondaryColor }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 rounded-lg" style={{ backgroundColor: primaryColor + "08" }}>
                    <h3 className="text-lg font-medium mb-4" style={{ color: secondaryColor }}>
                      Experience
                    </h3>
                    {user.experience.slice(0, 1).map((exp: any, index: any) => (
                      <div key={index} className="mb-4">
                        <div className="font-medium">{exp.position}</div>
                        <div
                          className="text-sm inline-block px-3 py-1 rounded-full mb-2"
                          style={{ backgroundColor: secondaryColor + "20", color: secondaryColor }}
                        >
                          {exp.company} | {exp.period}
                        </div>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card className="overflow-hidden h-64 border">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="h-10 px-4 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                <div className="font-bold text-sm" style={{ color: primaryColor }}>
                  {user.name}
                </div>
                <div className="flex space-x-3">
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                </div>
              </div>

              {/* Content */}
              <div
                className="flex-1 flex p-4"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${secondaryColor}15, transparent 50%), 
                            radial-gradient(circle at 30% 70%, ${primaryColor}15, transparent 50%)`,
                }}
              >
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="relative mb-2">
                    <div
                      className="absolute top-0 left-0 w-4 h-4 -translate-x-1 -translate-y-1 z-0"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <h2 className="text-sm font-bold relative z-10" style={{ color: primaryColor }}>
                      {user.name}
                      <br />
                      {user.title}
                    </h2>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Creative professional</p>
                  <div
                    className="text-xs text-white px-2 py-1 rounded-full w-fit"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Explore
                  </div>
                </div>
                <div className="w-1/2 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full -translate-x-2 -translate-y-2 z-0 w-16 h-16"
                    style={{ backgroundColor: secondaryColor + "40" }}
                  ></div>
                  {user.profileImage ? (
                    <div className="w-16 h-16 rounded-full relative z-10 overflow-hidden">
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 relative z-10"></div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    )
  }

  // Corporate style preview
  if (style === "corporate") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {fullPreview ? (
          <div className="h-full overflow-auto">
            <div className="min-h-[400px] flex flex-col">
              {/* Header */}
              <div className="h-16 px-6 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10">
                <div className="font-bold" style={{ color: primaryColor }}>
                  {user.name}
                </div>
                <div className="flex space-x-6">
                  <div className="text-sm font-medium">Home</div>
                  <div className="text-sm text-gray-500">About</div>
                  <div className="text-sm text-gray-500">Contact</div>
                </div>
              </div>

              {/* Hero Section */}
              <div
                className="py-12 px-8"
                style={{
                  backgroundColor: user.backgroundImage ? "transparent" : primaryColor,
                  backgroundImage: user.backgroundImage
                    ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${user.backgroundImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-2xl font-bold mb-3 text-white">{user.name}</h1>
                    <p className="text-white/90 mb-6">{user.title}</p>
                    <div
                      className="px-4 py-2 rounded text-white text-sm inline-block"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      Learn More About My Services
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    {user.profileImage ? (
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="p-8">
                <h2 className="text-xl font-bold mb-6 text-center" style={{ color: primaryColor }}>
                  Professional Services
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  {user.skills.slice(0, 3).map((skill: any, index: any) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: secondaryColor + "20" }}
                      >
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: secondaryColor }}></div>
                      </div>
                      <h3 className="text-sm font-medium mb-2">{skill}</h3>
                      <p className="text-xs text-gray-600">
                        Professional {skill} services tailored to your specific needs and requirements.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Section Preview */}
              <div className="p-8 bg-gray-50">
                <h2 className="text-xl font-bold mb-4 text-center" style={{ color: primaryColor }}>
                  About Me
                </h2>
                <div className="w-16 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: secondaryColor }}></div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      {user.profileImage ? (
                        <div className="rounded-lg overflow-hidden h-40 w-full">
                          <img
                            src={user.profileImage || "/placeholder.svg"}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-200 h-40 w-full rounded-lg"></div>
                      )}
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-medium mb-3" style={{ color: secondaryColor }}>
                        Professional Background
                      </h3>
                      <p className="text-gray-700">{user.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card className="overflow-hidden h-64 border">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="h-10 px-4 flex items-center justify-between bg-white shadow-sm">
                <div className="font-bold text-sm" style={{ color: primaryColor }}>
                  {user.name}
                </div>
                <div className="flex space-x-3">
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                </div>
              </div>

              {/* Content */}
              <div
                className="h-24 p-4 flex flex-col justify-center"
                style={{
                  backgroundColor: user.backgroundImage ? "transparent" : primaryColor,
                  backgroundImage: user.backgroundImage
                    ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${user.backgroundImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h2 className="text-sm font-bold text-white mb-1">{user.name}</h2>
                <p className="text-xs text-white/90 mb-2">{user.title}</p>
                <div className="text-xs text-white px-2 py-1 rounded w-fit" style={{ backgroundColor: secondaryColor }}>
                  Learn More
                </div>
              </div>

              <div className="flex-1 p-4">
                <div className="flex space-x-4">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: secondaryColor + "20" }}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: secondaryColor }}></div>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-1">{user.skills[0] || "Professional Services"}</div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    )
  }

  return null
}

