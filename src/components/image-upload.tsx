"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ImageUploadProps {
  id: string
  value: string
  onChange: (value: string) => void
  onRemove: () => void
  aspectRatio?: "square" | "video"
  label?: string
  description?: string
  size?: "sm" | "md" | "lg"
}

export default function ImageUpload({
  id,
  value,
  onChange,
  onRemove,
  aspectRatio = "square",
  label,
  description,
  size = "md",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB")
      setIsUploading(false)
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      setIsUploading(false)
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      onChange(reader.result as string)
      setIsUploading(false)
    }

    reader.onerror = () => {
      setError("Error reading file")
      setIsUploading(false)
    }

    reader.readAsDataURL(file)

    // Reset the input value so the same file can be selected again if needed
    e.target.value = ""
  }

  const iconSize = size === "sm" ? 20 : size === "md" ? 32 : 48
  const aspectRatioClass = aspectRatio === "square" ? "aspect-square" : "aspect-video"

  return (
    <div className="space-y-2">
      {label && <Label className="block mb-1">{label}</Label>}

      <div className="relative">
        <Input
          ref={inputRef}
          type="file"
          id={id}
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={isUploading}
        />

        {value ? (
          <div className={`relative rounded-lg overflow-hidden w-full ${aspectRatioClass} bg-gray-100 shadow-sm`}>
            <img
              src={value || "/placeholder.svg"}
              alt={label || "Uploaded image"}
              className="w-full h-full object-cover"
              onError={() => {
                setError("Error loading image")
                onChange("")
              }}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mr-2 text-white border-white hover:bg-white/20"
                onClick={() => inputRef.current?.click()}
              >
                Change
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={onRemove}>
                Remove
              </Button>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-full ${aspectRatioClass} flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer`}
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon size={iconSize} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">{description || "Click to upload an image"}</p>
            <p className="text-xs text-gray-400 mt-2">Max size: 2MB</p>
          </div>
        )}
      </div>

      {!value && (
        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => inputRef.current?.click()}>
          <Upload size={14} className="mr-2" />
          Upload Image
        </Button>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {isUploading && <p className="text-gray-500 text-xs mt-1">Uploading...</p>}
    </div>
  )
}

