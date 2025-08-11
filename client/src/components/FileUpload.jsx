import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CloudUpload, File, X, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FileUpload({
  onFileSelect,
  accept = "*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  disabled = false,
  "data-testid": testId
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB`
    }

    if (accept !== "*") {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const fileType = file.type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()

      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return type === fileExtension
        }
        if (type.includes('/*')) {
          return fileType.startsWith(type.split('/*')[0])
        }
        return type === fileType
      })

      if (!isValidType) {
        return `File type not supported. Accepted types: ${accept}`
      }
    }

    return null
  }

  const handleFile = (file) => {
    setError("")
    const validationError = validateFile(file)

    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (disabled) return

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (disabled) return

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleClick = () => {
    if (disabled) return
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setSelectedFile(null)
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className={cn("w-full", className)} data-testid={testId}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
        data-testid={`${testId}-input`}
      />

      {selectedFile ? (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium text-green-900" data-testid={`${testId}-filename`}>
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-green-700" data-testid={`${testId}-filesize`}>
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-green-700 hover:text-green-900"
                data-testid={`${testId}-remove`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer",
            dragActive ? "border-orange-500 bg-orange-50" : "border-gray-300",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-300 bg-red-50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <CardContent className="p-6 text-center">
            <CloudUpload
              className={cn(
                "mx-auto h-12 w-12 mb-4",
                dragActive ? "text-orange-500" : "text-gray-400",
                error && "text-red-400"
              )}
            />
            <p className={cn(
              "text-sm font-medium mb-1",
              dragActive ? "text-orange-600" : "text-gray-600",
              error && "text-red-600"
            )}>
              {dragActive ? "Drop file here" : "Click to upload or drag and drop"}
            </p>
            <p className={cn(
              "text-xs",
              error ? "text-red-500" : "text-gray-500"
            )}>
              {error || `Accepted formats: ${accept === "*" ? "All files" : accept} • Max size: ${(maxSize / (1024 * 1024)).toFixed(1)}MB`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
