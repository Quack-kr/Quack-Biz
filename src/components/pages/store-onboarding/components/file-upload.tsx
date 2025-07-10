import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

import { getErrorMessage } from 'utils/error'
import { truncateFileName } from 'utils/file'

import type { StoreOnboardingFormValues } from '../validators/store-onboarding-schema'

interface FileUploadProps {
  setValue: UseFormSetValue<StoreOnboardingFormValues>
  onFileChange: (file?: File) => void
  uploading: boolean
  uploadError?: string | Error | null
  licenseUrl: string | null
}

export default function FileUpload({
  setValue,
  onFileChange,
  uploading,
  uploadError,
  licenseUrl
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      handleFileSelect(file)
    }
  }

  const handleFileSelect = (file: File) => {
    // 파일 타입 검증
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      alert('PDF, JPEG, PNG 파일만 업로드 가능합니다.')
      return
    }

    setSelectedFile(file)
    onFileChange(file)
    setValue('businessFile', file)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    onFileChange(undefined)
    setValue('businessFile', undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!uploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="mb-8">
      <label className="mb-3 block text-[20px] font-bold text-[#EFEEDF]">
        사업자등록증 사본
      </label>

      {/* 파일 업로드 영역 */}
      <div
        className={`
          relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200
          ${
            isDragOver
              ? 'border-[#EFD800] bg-[#EFD800]/5'
              : 'border-[#A8A7A1] hover:border-[#EFEEDF]'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-label="파일 업로드 영역"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/jpeg,image/png"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={uploading}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center justify-center px-6 py-12">
          {/* 파일 아이콘 -  svgr 적용 시 대체하기 */}
          <div className="mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#EFEEDF]"
              aria-hidden="true"
            >
              <path
                d="M8 11.3335V22.0002"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M4 7.7931V2H15.52L20 7.7931V20.6667H14"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M4 14.0002L8 11.3335L12 14.0002"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* 업로드 텍스트 */}
          <div className="text-center">
            <p className="mb-2 text-[18px] font-semibold text-[#EFEEDF]">
              파일 첨부하기
            </p>
            <p className="text-[14px] text-[#A8A7A1]">
              파일을 드래그하거나 클릭하여 업로드하세요
            </p>
            <p className="mt-1 text-[12px] text-[#A8A7A1]">
              PDF, JPEG, PNG 파일 지원
            </p>
          </div>
        </div>
      </div>

      {/* 업로드된 파일 정보 */}
      {selectedFile && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-[#A8A7A1] bg-[#2A2A26] px-4 py-3">
          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-[#EFEEDF]"
              aria-hidden="true"
            >
              <path
                d="M8 11.3335V22.0002"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M4 7.7931V2H15.52L20 7.7931V20.6667H14"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M4 14.0002L8 11.3335L12 14.0002"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span
              className="font-medium text-[#EFEEDF]"
              title={selectedFile.name}
            >
              {truncateFileName(selectedFile.name)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveFile()
            }}
            className="p-1 text-[#A8A7A1] transition-colors duration-200 hover:text-[#EFEEDF]"
            disabled={uploading}
            aria-label="파일 제거"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* 상태 메시지들 */}
      {uploading && (
        <div className="mt-3 flex items-center gap-2 text-sm text-[#EFD800]">
          <div className="size-4 animate-spin rounded-full border-2 border-[#EFD800] border-t-transparent"></div>
          업로드 중...
        </div>
      )}

      {uploadError && (
        <div className="mt-3 text-sm text-red-400">
          {getErrorMessage(uploadError, '파일 업로드에 실패했습니다.')}
        </div>
      )}

      {licenseUrl && !uploading && (
        <div className="mt-3 text-sm text-green-400">
          <span>업로드 완료: </span>
          <a
            href={licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors duration-200 hover:text-green-300"
          >
            파일 보기
          </a>
        </div>
      )}
    </div>
  )
}
