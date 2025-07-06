import type { UseFormReturn } from 'react-hook-form'

import { getErrorMessage } from 'utils/error'
import { formatBusinessNumber, formatPhoneNumber } from 'utils/format'
import type { StoreOnboardingFormValues } from './validators/store-onboarding-schema'

interface StoreOnboardingFormProps {
  form: UseFormReturn<StoreOnboardingFormValues>
  lookupResult: string | null
  lookupLoading: boolean
  onLookup: () => void
  uploading: boolean
  uploadError?: string | Error | null
  licenseUrl: string | null
  onFileChange: (file?: File) => void
  submitResult: string | null
  onSubmit: (values: StoreOnboardingFormValues) => void
}

export default function StoreOnboardingForm({
  form,
  lookupResult,
  lookupLoading,
  onLookup,
  uploading,
  uploadError,
  licenseUrl,
  onFileChange,
  onSubmit,
  submitResult
}: StoreOnboardingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = form

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-[400px] flex-col gap-4 rounded-lg p-8"
      encType="multipart/form-data"
      aria-live="polite"
    >
      <h1 className="mb-2 text-center text-2xl font-bold text-white">
        온라인 입점신청
      </h1>
      <p className="mb-6 text-center text-base text-[#A8A7A1]">
        기본정보를 입력해주세요
        <br />
        담당자가 확인 후 등록을 도와드릴게요
      </p>

      {/* 사업자등록번호 */}
      <div>
        <label
          htmlFor="businessNumber"
          className="mb-1 block text-sm text-[#EFEEDF]"
        >
          사업자등록번호
        </label>
        <div className="flex gap-2">
          <input
            id="businessNumber"
            type="text"
            placeholder="예) 123-45-67890"
            {...register('businessNumber')}
            value={watch('businessNumber') || ''}
            onChange={(e) => {
              const formatted = formatBusinessNumber(e.target.value)
              setValue('businessNumber', formatted)
            }}
            className="flex-1 rounded border border-[#333] bg-[#171714] px-3 py-2 text-white focus:outline-none"
            aria-invalid={!!errors.businessNumber}
            aria-describedby={
              errors.businessNumber ? 'businessNumber-error' : undefined
            }
          />
          <button
            type="button"
            className="rounded bg-[#EFEEDF] px-3 py-2 font-semibold text-[#171714]"
            onClick={onLookup}
            disabled={lookupLoading || !watch('businessNumber')}
            aria-busy={lookupLoading}
          >
            {lookupLoading ? '조회중' : '조회'}
          </button>
        </div>
        {errors.businessNumber && (
          <p id="businessNumber-error" className="mt-1 text-xs text-red-500">
            {errors.businessNumber.message}
          </p>
        )}
        {lookupResult && (
          <p
            className="mt-1 text-xs"
            style={{
              color: lookupResult.includes('조회') ? '#22c55e' : '#ef4444'
            }}
          >
            {lookupResult}
          </p>
        )}
      </div>

      {/* 대표자명 */}
      <div>
        <label htmlFor="ceoName" className="mb-1 block text-sm text-[#EFEEDF]">
          대표자명
        </label>
        <input
          id="ceoName"
          type="text"
          placeholder="예) 김철수"
          {...register('ceoName')}
          className="w-full rounded border border-[#333] bg-[#171714] px-3 py-2 text-white focus:outline-none"
          aria-invalid={!!errors.ceoName}
          aria-describedby={errors.ceoName ? 'ceoName-error' : undefined}
        />
        {errors.ceoName && (
          <p id="ceoName-error" className="mt-1 text-xs text-red-500">
            {errors.ceoName.message}
          </p>
        )}
      </div>

      {/* 대표자 휴대폰 번호 */}
      <div>
        <label htmlFor="ceoPhone" className="mb-1 block text-sm text-[#EFEEDF]">
          대표자 휴대폰 번호
        </label>
        <input
          id="ceoPhone"
          type="text"
          placeholder="예) 010-1234-5678"
          {...register('ceoPhone')}
          value={watch('ceoPhone') || ''}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value)
            setValue('ceoPhone', formatted)
          }}
          className="w-full rounded border border-[#333] bg-[#171714] px-3 py-2 text-white focus:outline-none"
          aria-invalid={!!errors.ceoPhone}
          aria-describedby={errors.ceoPhone ? 'ceoPhone-error' : undefined}
        />
        {errors.ceoPhone && (
          <p id="ceoPhone-error" className="mt-1 text-xs text-red-500">
            {errors.ceoPhone.message}
          </p>
        )}
      </div>

      {/* 가게명 */}
      <div>
        <label
          htmlFor="storeName"
          className="mb-1 block text-sm text-[#EFEEDF]"
        >
          가게명
        </label>
        <input
          id="storeName"
          type="text"
          placeholder="예) 꽥 분식점"
          {...register('storeName')}
          className="w-full rounded border border-[#333] bg-[#171714] px-3 py-2 text-white focus:outline-none"
          aria-invalid={!!errors.storeName}
          aria-describedby={errors.storeName ? 'storeName-error' : undefined}
        />
        {errors.storeName && (
          <p id="storeName-error" className="mt-1 text-xs text-red-500">
            {errors.storeName.message}
          </p>
        )}
      </div>

      {/* 사업자등록증 사본 */}
      <div>
        <label
          htmlFor="businessFile"
          className="mb-1 block text-sm text-[#EFEEDF]"
        >
          사업자등록증 사본
        </label>
        <input
          id="businessFile"
          type="file"
          accept="application/pdf,image/jpeg,image/png"
          onChange={(e) => {
            const file = e.target.files?.[0]
            onFileChange(file)
            setValue('businessFile', file)
          }}
          className="w-full bg-[#171714] text-white"
          disabled={uploading}
        />
        {uploading && (
          <div className="mt-1 text-xs text-[#EFEEDF]">업로드 중...</div>
        )}
        {uploadError && (
          <div className="mt-1 text-xs text-red-500">
            {getErrorMessage(uploadError, '파일 업로드에 실패했습니다.')}
          </div>
        )}
        {licenseUrl && (
          <div className="mt-1 break-all text-xs text-green-500">
            업로드 완료:{' '}
            <a href={licenseUrl} target="_blank" rel="noopener noreferrer">
              {licenseUrl}
            </a>
          </div>
        )}
      </div>

      {/* 개인정보 수집 및 이용 동의 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          {...register('agree')}
          className="accent-[#EFD800]"
          aria-invalid={!!errors.agree}
        />
        <label htmlFor="agree" className="text-sm text-[#EFEEDF]">
          개인정보 수집 및 이용 동의 (필수)
        </label>
      </div>
      {errors.agree && (
        <p className="mt-1 text-xs text-red-500">{errors.agree.message}</p>
      )}

      <button
        type="submit"
        className="mt-2 w-full rounded bg-[#EFD800] py-3 text-lg font-bold text-[#171714] transition hover:brightness-95"
        disabled={isSubmitting || lookupLoading}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? '신청 중...' : '신청하기'}
      </button>

      {submitResult && (
        <div
          className="mt-2 text-center text-base font-semibold"
          style={{
            color: submitResult.includes('정상') ? '#22c55e' : '#ef4444'
          }}
        >
          {submitResult}
        </div>
      )}
    </form>
  )
}
