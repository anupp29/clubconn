"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon, FileText } from "lucide-react"

interface MediaUploadProps {
  label: string
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  onUpload: (files: File[]) => void
  preview?: boolean
}

export function MediaUpload({
  label,
  accept = "image/*",
  maxSize = 5,
  multiple = false,
  onUpload,
  preview = true,
}: MediaUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setError("")

    // Validate file sizes
    const oversizedFiles = selectedFiles.filter((file) => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the ${maxSize}MB limit`)
      return
    }

    setFiles(selectedFiles)
    onUpload(selectedFiles)

    // Generate previews for images
    if (preview && accept.includes("image")) {
      const newPreviews: string[] = []
      selectedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result as string)
          if (newPreviews.length === selectedFiles.length) {
            setPreviews(newPreviews)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setFiles(newFiles)
    setPreviews(newPreviews)
    onUpload(newFiles)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
        <p className="text-xs text-muted-foreground">
          {accept.includes("image") ? "PNG, JPG, GIF" : "PDF, DOC, DOCX"} up to {maxSize}MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              {preview && previews[index] ? (
                <img
                  src={previews[index] || "/placeholder.svg"}
                  alt={file.name}
                  className="h-12 w-12 rounded object-cover"
                />
              ) : accept.includes("image") ? (
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              ) : (
                <FileText className="h-12 w-12 text-muted-foreground" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
