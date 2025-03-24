"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Twitter, Mail, Phone, User, Briefcase, FileText, Image } from "lucide-react"
import { motion } from "@/components/motion"

// Import and use the new ImageUpload component for better UX
// Add the import at the top
import ImageUpload from "@/components/image-upload"

// Update the UserDetails interface to include image fields
export interface UserDetails {
  name: string
  title: string
  email: string
  phone: string
  bio: string
  profileImage?: string // base64 encoded image
  backgroundImage?: string // base64 encoded image
  skills: string[]
  experience: {
    position: string
    company: string
    period: string
    description: string
  }[]
  projects: {
    title: string
    description: string
    tags: string[]
    image?: string // base64 encoded image
  }[]
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

// Update the defaultUserDetails to include empty image fields
const defaultUserDetails: UserDetails = {
  name: "",
  title: "",
  email: "",
  phone: "",
  bio: "",
  profileImage: "",
  backgroundImage: "",
  skills: [],
  experience: [
    {
      position: "",
      company: "",
      period: "",
      description: "",
    },
  ],
  projects: [
    {
      title: "",
      description: "",
      tags: [],
      image: "",
    },
  ],
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
  },
}

interface UserDetailsFormProps {
  onSave: (details: UserDetails) => void
  initialData?: UserDetails
}

export default function UserDetailsForm({ onSave, initialData = defaultUserDetails }: UserDetailsFormProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>(initialData)
  const [skillInput, setSkillInput] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const [imageUploading, setImageUploading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  const profileImageInputRef = useRef<HTMLInputElement>(null)
  const projectImageInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string, projectIndex?: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    setImageError(null)

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setImageError("File size should be less than 2MB")
      setImageUploading(false)
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Please upload an image file")
      setImageUploading(false)
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      const base64String = reader.result as string

      if (projectIndex !== undefined) {
        // Update project image
        setUserDetails((prev) => {
          const updatedProjects = [...prev.projects]
          updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            image: base64String,
          }
          return {
            ...prev,
            projects: updatedProjects,
          }
        })
      } else {
        // Update profile or background image
        setUserDetails((prev) => ({
          ...prev,
          [field]: base64String,
        }))
      }

      setImageUploading(false)
    }

    reader.onerror = () => {
      setImageError("Error reading file")
      setImageUploading(false)
    }

    reader.readAsDataURL(file)

    // Reset the input value so the same file can be selected again if needed
    e.target.value = ""
  }

  const removeImage = (field: string, projectIndex?: number) => {
    if (projectIndex !== undefined) {
      // Remove project image
      setUserDetails((prev) => {
        const updatedProjects = [...prev.projects]
        updatedProjects[projectIndex] = {
          ...updatedProjects[projectIndex],
          image: "",
        }
        return {
          ...prev,
          projects: updatedProjects,
        }
      })
    } else {
      // Remove profile or background image
      setUserDetails((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !userDetails.skills.includes(skillInput.trim())) {
      setUserDetails((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setUserDetails((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addExperience = () => {
    setUserDetails((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          position: "",
          company: "",
          period: "",
          description: "",
        },
      ],
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setUserDetails((prev) => {
      const updatedExperience = [...prev.experience]
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      }
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  const removeExperience = (index: number) => {
    setUserDetails((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const addProject = () => {
    setUserDetails((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          tags: [],
          image: "",
        },
      ],
    }))
    // Ensure we have a ref for the new project
    projectImageInputRefs.current = [...projectImageInputRefs.current, null]
  }

  const updateProject = (index: number, field: string, value: string) => {
    setUserDetails((prev) => {
      const updatedProjects = [...prev.projects]
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      }
      return {
        ...prev,
        projects: updatedProjects,
      }
    })
  }

  const addProjectTag = (projectIndex: number, tag: string) => {
    if (tag.trim() && !userDetails.projects[projectIndex].tags.includes(tag.trim())) {
      setUserDetails((prev) => {
        const updatedProjects = [...prev.projects]
        updatedProjects[projectIndex] = {
          ...updatedProjects[projectIndex],
          tags: [...updatedProjects[projectIndex].tags, tag.trim()],
        }
        return {
          ...prev,
          projects: updatedProjects,
        }
      })
    }
  }

  const removeProjectTag = (projectIndex: number, tag: string) => {
    setUserDetails((prev) => {
      const updatedProjects = [...prev.projects]
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        tags: updatedProjects[projectIndex].tags.filter((t) => t !== tag),
      }
      return {
        ...prev,
        projects: updatedProjects,
      }
    })
  }

  const removeProject = (index: number) => {
    setUserDetails((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
    // Update refs array
    projectImageInputRefs.current = projectImageInputRefs.current.filter((_, i) => i !== index)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(userDetails)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        <button
          type="button"
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "basic" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          <User className="inline-block mr-2 h-4 w-4" />
          Basic Info
        </button>
        <button
          type="button"
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "images" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("images")}
        >
          <Image className="inline-block mr-2 h-4 w-4" />
          Images
        </button>
        <button
          type="button"
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "experience" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("experience")}
        >
          <Briefcase className="inline-block mr-2 h-4 w-4" />
          Experience
        </button>
        <button
          type="button"
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "projects" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          <FileText className="inline-block mr-2 h-4 w-4" />
          Projects
        </button>
      </div>

      {/* Basic Info Tab */}
      <div className={activeTab === "basic" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Web Developer"
              value={userDetails.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                className="pl-10"
                value={userDetails.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                className="pl-10"
                value={userDetails.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Write a short professional bio about yourself..."
            rows={4}
            value={userDetails.bio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-6 space-y-3">
          <Label>Skills</Label>
          <div className="flex">
            <Input
              placeholder="Add a skill (e.g., JavaScript)"
              value={skillInput}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) => setSkillInput(e.target.value)}
              className="rounded-r-none"
              onKeyDown={(e: { key: string; preventDefault: () => void }) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addSkill()
                }
              }}
            />
            <Button type="button" onClick={addSkill} className="rounded-l-none">
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {userDetails.skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            ))}
            {userDetails.skills.length === 0 && <p className="text-sm text-gray-500 italic">No skills added yet</p>}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Label>Social Links</Label>
          <div className="space-y-4">
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                name="github"
                placeholder="GitHub URL"
                className="pl-10"
                value={userDetails.socialLinks.github}
                onChange={handleSocialChange}
              />
            </div>

            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                name="linkedin"
                placeholder="LinkedIn URL"
                className="pl-10"
                value={userDetails.socialLinks.linkedin}
                onChange={handleSocialChange}
              />
            </div>

            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                name="twitter"
                placeholder="Twitter URL"
                className="pl-10"
                value={userDetails.socialLinks.twitter}
                onChange={handleSocialChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Images Tab */}
      <div className={activeTab === "images" ? "block" : "hidden"}>
        <div className="space-y-8">
          {/* Replace the profile image section with the new component */}
          <div>
            <Label className="block mb-3">Profile Image</Label>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3">
                <ImageUpload
                  id="profileImage"
                  value={userDetails.profileImage || ""}
                  onChange={(value: any) => setUserDetails((prev) => ({ ...prev, profileImage: value }))}
                  onRemove={() => removeImage("profileImage")}
                  aspectRatio="square"
                  description="Upload a professional profile photo"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <p className="text-sm text-gray-600">
                  Upload a professional profile photo. This will be displayed prominently on your portfolio.
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: Square image, at least 500x500 pixels. Maximum size: 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Replace the background image section with the new component */}
          <div>
            <Label className="block mb-3">Background/Hero Image (Optional)</Label>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2">
                <ImageUpload
                  id="backgroundImage"
                  value={userDetails.backgroundImage || ""}
                  onChange={(value: any) => setUserDetails((prev) => ({ ...prev, backgroundImage: value }))}
                  onRemove={() => removeImage("backgroundImage")}
                  aspectRatio="video"
                  description="Upload a background image for your hero section"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <p className="text-sm text-gray-600">
                  Upload a background image for your portfolio's hero section. This is optional but can add visual
                  appeal.
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: Wide image, at least 1600x900 pixels. Maximum size: 2MB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Tab */}
      <div className={activeTab === "experience" ? "block" : "hidden"}>
        <div className="space-y-6">
          {userDetails.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-lg relative"
            >
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    placeholder="Senior Developer"
                    value={exp.position}
                    onChange={(e: { target: { value: string } }) => updateExperience(index, "position", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    placeholder="Acme Inc."
                    value={exp.company}
                    onChange={(e: { target: { value: string } }) => updateExperience(index, "company", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor={`period-${index}`}>Period</Label>
                <Input
                  id={`period-${index}`}
                  placeholder="2020 - Present"
                  value={exp.period}
                  onChange={(e: { target: { value: string } }) => updateExperience(index, "period", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                  value={exp.description}
                  onChange={(e: { target: { value: string } }) => updateExperience(index, "description", e.target.value)}
                  required
                />
              </div>
            </motion.div>
          ))}

          <Button type="button" variant="outline" onClick={addExperience} className="w-full">
            Add Another Experience
          </Button>
        </div>
      </div>

      {/* Projects Tab */}
      <div className={activeTab === "projects" ? "block" : "hidden"}>
        <div className="space-y-6">
          {userDetails.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-lg relative"
            >
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>

              <div className="mb-4">
                <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                <Input
                  id={`project-title-${index}`}
                  placeholder="E-commerce Platform"
                  value={project.title}
                  onChange={(e: { target: { value: string } }) => updateProject(index, "title", e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor={`project-description-${index}`}>Description</Label>
                <Textarea
                  id={`project-description-${index}`}
                  placeholder="Describe the project, your role, and technologies used..."
                  rows={3}
                  value={project.description}
                  onChange={(e: { target: { value: string } }) => updateProject(index, "description", e.target.value)}
                  required
                />
              </div>

              {/* Replace the project image section with the new component */}
              <div className="mb-4">
                <Label className="block mb-2">Project Image</Label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-full sm:w-1/3">
                    <ImageUpload
                      id={`project-image-${index}`}
                      value={project.image || ""}
                      onChange={(value: any) => {
                        const updatedProjects = [...userDetails.projects]
                        updatedProjects[index] = {
                          ...updatedProjects[index],
                          image: value,
                        }
                        setUserDetails((prev) => ({
                          ...prev,
                          projects: updatedProjects,
                        }))
                      }}
                      onRemove={() => removeImage("image", index)}
                      aspectRatio="video"
                      size="sm"
                      description="Upload a project screenshot"
                    />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-sm text-gray-600">
                      Add a screenshot or image that showcases this project. This will help visitors understand your
                      work at a glance.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Recommended: 16:9 ratio image. Maximum size: 2MB.</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Technologies/Tags</Label>
                <div className="flex mt-2">
                  <Input
                    placeholder="Add a tag (e.g., React)"
                    className="rounded-r-none"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addProjectTag(index, (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    className="rounded-l-none"
                    onClick={(e) => {
                      const input = e.currentTarget.previousSibling as HTMLInputElement
                      addProjectTag(index, input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeProjectTag(index, tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {project.tags.length === 0 && <p className="text-sm text-gray-500 italic">No tags added yet</p>}
                </div>
              </div>
            </motion.div>
          ))}

          <Button type="button" variant="outline" onClick={addProject} className="w-full">
            Add Another Project
          </Button>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" className="px-6">
          Save Details
        </Button>
      </div>
    </form>
  )
}

