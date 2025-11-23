import Image from 'next/image'
import { useState } from 'react'

interface PhotoDisplayProps {
  src: string
  alt: string
  className?: string
  fallbackText?: string
  width?: number
  height?: number
}

export default function PhotoDisplay({
  src,
  alt,
  className = "w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center",
  fallbackText,
  width = 128,
  height = 128
}: PhotoDisplayProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={className}>
        <div className="text-gray-500 text-sm text-center">
          {fallbackText || alt}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  )
}