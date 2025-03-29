"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import type { PageConfig } from "@/utils/types"
import { Home, User, Briefcase, Folder, Award, Mail, GripVertical, Settings } from "lucide-react"

interface PageSelectorProps {
  pages: PageConfig[]
  onChange: (pages: PageConfig[]) => void
}

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

export function PageSelector({ pages, onChange }: PageSelectorProps) {
  const [editMode, setEditMode] = useState(false)

  const handleTogglePage = (pageId: string) => {
    const updatedPages = pages.map((page) => (page.id === pageId ? { ...page, enabled: !page.enabled } : page))
    onChange(updatedPages)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(pages)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property based on new positions
    const updatedPages = items.map((page, index) => ({
      ...page,
      order: index + 1,
    }))

    onChange(updatedPages)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Portfolio Pages</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-1"
          >
            <Settings size={16} />
            {editMode ? "Done" : "Edit Order"}
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-4 text-sm text-gray-600">
        <p>Enable or disable pages in your portfolio. Drag to reorder them when in edit mode.</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pages">
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {pages
                .sort((a, b) => a.order - b.order)
                .map((page, index) => (
                  <Draggable key={page.id} draggableId={page.id} index={index} isDragDisabled={!editMode}>
                    {(provided: any) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`p-3 flex items-center justify-between ${!page.enabled ? "opacity-60" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          {editMode && (
                            <div {...provided.dragHandleProps} className="cursor-grab">
                              <GripVertical size={18} className="text-gray-400" />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <div className="text-primary">{getIconComponent(page.icon)}</div>
                            <span className="font-medium">{page.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {page.id !== "home" && (
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`page-${page.id}`}
                                checked={page.enabled}
                                onCheckedChange={() => handleTogglePage(page.id)}
                              />
                              <Label htmlFor={`page-${page.id}`} className="text-sm">
                                {page.enabled ? "Enabled" : "Disabled"}
                              </Label>
                            </div>
                          )}
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

