'use client'

import { useState, useCallback } from 'react'
import { Upload, File, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PDFUploadProps {
  onFileSelect: (base64: string | null) => void
  error?: string
}

export function PDFUpload({ onFileSelect, error }: PDFUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback(
    (selectedFile: File) => {
      if (selectedFile.type !== 'application/pdf') {
        onFileSelect(null)
        return
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB limit
        onFileSelect(null)
        return
      }

      setFile(selectedFile)

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        const base64Data = base64.split(',')[1]
        onFileSelect(base64Data)
      }
      reader.readAsDataURL(selectedFile)
    },
    [onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) {
        handleFile(droppedFile)
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/pdf'
    input.onchange = (e) => {
      const selectedFile = (e.target as HTMLInputElement).files?.[0]
      if (selectedFile) {
        handleFile(selectedFile)
      }
    }
    input.click()
  }

  const removeFile = () => {
    setFile(null)
    onFileSelect(null)
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-slate-300 bg-slate-50',
          error && 'border-red-500'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <File className="h-8 w-8 text-primary-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900">{file.name}</p>
              <p className="text-xs text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
              className="ml-auto rounded-full p-1 hover:bg-slate-200"
            >
              <X className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-700">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-slate-500">PDF only, max 10MB</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
