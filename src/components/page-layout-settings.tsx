"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageSelector } from "@/components/page-selector"
import { SectionSelector } from "@/components/section-selector"
import { type PageConfig, type SectionConfig, DEFAULT_PAGES } from "@/utils/types"

interface PageLayoutSettingsProps {
  pages: PageConfig[]
  sections: SectionConfig[]
  onPagesChange: (pages: PageConfig[]) => void
  onSectionsChange: (sections: SectionConfig[]) => void
}

export function PageLayoutSettings({
  pages = DEFAULT_PAGES,
  sections = [],
  onPagesChange,
  onSectionsChange,
}: PageLayoutSettingsProps) {
  const [activeTab, setActiveTab] = useState("pages")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Portfolio Layout</h2>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Customize</div>
      </div>

      <p className="text-gray-600">Customize which pages and sections appear in your portfolio and their order.</p>

      <Tabs defaultValue="pages" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="pt-4">
          <PageSelector pages={pages} onChange={onPagesChange} />
        </TabsContent>
        <TabsContent value="sections" className="pt-4">
          <SectionSelector sections={sections} pages={pages} onChange={onSectionsChange} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

