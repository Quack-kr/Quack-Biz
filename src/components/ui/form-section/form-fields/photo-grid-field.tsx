import { Camera, X } from 'lucide-react'

import { Label } from '@/components/ui/label'

interface PhotoGridFieldProps {
  photos: string[]
  maxPhotos: number
  onPhotosChange: (photos: string[]) => void
  label: string
}

export function PhotoGridField({
  photos,
  maxPhotos,
  onPhotosChange,
  label
}: PhotoGridFieldProps) {
  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    onPhotosChange(newPhotos)
  }

  return (
    <div className="space-y-4">
      <Label className="text-white">
        {label} (최대 {maxPhotos}장)
      </Label>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: maxPhotos }).map((_, index) => (
          <div
            key={index}
            className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#3A3A36] bg-[#2A2A26] hover:border-[#4A4A46]"
          >
            {photos[index] ? (
              <div className="relative size-full">
                <img
                  src={photos[index] || '/placeholder.svg'}
                  alt={`${label} ${index + 1}`}
                  className="size-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Camera className="size-8 text-[#A8A7A1]" />
                <span className="text-xs text-[#A8A7A1]">사진 추가</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
