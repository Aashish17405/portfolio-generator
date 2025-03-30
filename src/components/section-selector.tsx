"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import type { SectionConfig, PageConfig } from "@/utils/types"
import { User, Briefcase, Award, Mail, Image, FileText, Code, Layers, BookOpen, Settings } from "lucide-react"

interface SectionSelectorProps {
  sections: SectionConfig[]
  pages: PageConfig[]
  onChange: (sections: SectionConfig[]) => void
}

const getIconForSection = (sectionId: string) => {
  switch (sectionId) {
    case "hero":
      return <Image size={18} />
    case "about":
      return <User size={18} />
    case "experience":
      return <Briefcase size={18} />
    case "skills":
      return <Award size={18} />
    case "projects":
      return <Code size={18} />
    case "education":
      return <BookOpen size={18} />
    case "testimonials":
      return <FileText size={18} />
    case "contact":
      return <Mail size={18} />
    default:
      return <Layers size={18} />
  }
}

export function SectionSelector({ sections, pages, onChange }: SectionSelectorProps) {
  const [activePageId, setActivePageId] = useState<string>("home")

  const handleToggleSection = (sectionId: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, enabled: !section.enabled } : section,
    )
    onChange(updatedSections)
  }

  const filteredSections = sections.filter((section) => section.pageId === activePageId)
  const enabledPages = pages.filter((page) => page.enabled)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Page Sections</h3>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Settings size={16} />
          Customize
        </Button>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-4 text-sm text-gray-600">
        <p>Select which sections to display on each page of your portfolio.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {enabledPages.map((page) => (
          <Button
            key={page.id}
            variant={activePageId === page.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActivePageId(page.id)}
            className="flex items-center gap-1"
          >
            {getIconForSection(page.icon)}
            {page.name}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <Card key={section.id} className="p-3 flex items-center">
              <div className="flex items-center w-full">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-primary">{getIconForSection(section.id)}</div>
                  <span className="font-medium">{section.name}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Switch
                    id={`section-${section.id}`}
                    checked={section.enabled}
                    onCheckedChange={() => handleToggleSection(section.id)}
                  />
                  <Label htmlFor={`section-${section.id}`} className="text-sm">
                    {section.enabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No sections available for this page.</p>
          </div>
        )}
      </div>
    </div>
  )
}