"use client"

import { Check } from "lucide-react"
import { motion } from "@/components/motion"

interface ColorSchemeCardProps {
  id: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  preview: string
  isSelected: boolean
  onSelect: (id: string) => void
}

export default function ColorSchemeCard({
  id,
  name,
  description,
  primaryColor,
  secondaryColor,
  preview,
  isSelected,
  onSelect,
}: ColorSchemeCardProps) {
  return (
    <motion.div
    initial={false} 
      whileHover={{ scale: isSelected ? 1.02 : 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={() => onSelect(id)}
      className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-full
        ${
          isSelected
            ? "ring-2 ring-primary shadow-lg scale-[1.02]"
            : "border border-gray-200 hover:border-primary/30 hover:shadow-md"
        }`}
    >
      <div className="h-28 w-full relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: preview }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
      </div>

      <div className="p-4">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500 mb-3">{description}</p>

        <div className="flex space-x-3">
          <div className="flex items-center">
            <div
              className="w-6 h-6 rounded-full mr-2 ring-2 ring-white shadow-sm"
              style={{ backgroundColor: primaryColor }}
              title="Primary color"
            ></div>
            <span className="text-xs text-gray-500">Primary</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 rounded-full mr-2 ring-2 ring-white shadow-sm"
              style={{ backgroundColor: secondaryColor }}
              title="Secondary color"
            ></div>
            <span className="text-xs text-gray-500">Secondary</span>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-3 right-3 bg-white text-primary rounded-full p-1.5 shadow-md">
          <Check size={16} />
        </div>
      )}
    </motion.div>
  )
}

