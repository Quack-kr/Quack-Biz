import type { UseFormReturn } from 'react-hook-form'

import { formatBusinessNumber, formatPhoneNumber } from '@/utils/format'
import { BUSINESS_NUMBER_REGEX, PHONE_NUMBER_REGEX } from '@/utils/regex'

import FileUpload from './components/file-upload'
import PrivacyCheckbox from './components/privacy-checkbox'
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

  // 폼 유효성 검사
  const watchedFields = watch()
  const isFormValid =
    watchedFields.businessNumber &&
    BUSINESS_NUMBER_REGEX.test(watchedFields.businessNumber) &&
    watchedFields.ceoName &&
    watchedFields.ceoName.trim().length > 0 &&
    watchedFields.ceoPhone &&
    PHONE_NUMBER_REGEX.test(watchedFields.ceoPhone) &&
    watchedFields.storeName &&
    watchedFields.storeName.trim().length > 0 &&
    watchedFields.agree === true

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-[400px] flex-col rounded-lg p-8"
      encType="multipart/form-data"
      aria-live="polite"
    >
      <h1 className="mb-2 text-center text-4xl font-semibold text-quack-white">
        온라인 입점신청
      </h1>
      <p className="mb-[50px] text-center text-[20px] leading-[140%] text-[#A8A7A1]">
        기본정보를 입력해주세요
        <br />
        담당자가 확인 후 등록을 도와드릴게요
      </p>

      {/* 사업자등록번호 */}
      <div className="mb-8">
        <label
          htmlFor="businessNumber"
          className="mb-3 block text-[20px] font-bold text-quack-white"
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
            className="flex h-14 flex-1 items-center rounded-lg border border-[#A8A7A1] bg-[#21211D] px-4 font-medium text-white placeholder:text-[#A8A7A1] focus:outline-none"
            aria-invalid={!!errors.businessNumber}
            aria-describedby={
              errors.businessNumber ? 'businessNumber-error' : undefined
            }
          />
          <button
            type="button"
            className="flex h-14 items-center rounded-lg border border-[#D7D5C1] bg-[#A8A7A1] px-6 font-bold text-quack-black"
            onClick={onLookup}
            disabled={lookupLoading || !watch('businessNumber')}
            aria-busy={lookupLoading}
          >
            {lookupLoading ? '조회중' : '번호조회'}
          </button>
        </div>
        {errors.businessNumber && (
          <p id="businessNumber-error" className="mt-1 text-xs text-red-500">
            {errors.businessNumber.message}
          </p>
        )}
        {lookupResult && (
          <p
            className="mt-3 text-base font-medium"
            style={{
              color: lookupResult.includes('조회') ? '#D7D5C1' : '#ef4444'
            }}
          >
            {lookupResult.includes('조회')
              ? '신청 가능한 사업자번호입니다.'
              : lookupResult}
          </p>
        )}
      </div>

      {/* 대표자명 */}
      <div className="mb-8">
        <label
          htmlFor="ceoName"
          className="mb-3 block text-[20px] font-bold text-quack-white"
        >
          대표자명
        </label>
        <input
          id="ceoName"
          type="text"
          placeholder="예) 김철수"
          {...register('ceoName')}
          className="flex h-14 w-full items-center rounded-lg border border-[#A8A7A1] bg-[#21211D] px-4 font-medium text-white placeholder:text-[#A8A7A1] focus:outline-none"
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
      <div className="mb-8">
        <label
          htmlFor="ceoPhone"
          className="mb-3 block text-[20px] font-bold text-quack-white"
        >
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
          className="flex h-14 w-full items-center rounded-lg border border-[#A8A7A1] bg-[#21211D] px-4 font-medium text-white placeholder:text-[#A8A7A1] focus:outline-none"
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
      <div className="mb-8">
        <label
          htmlFor="storeName"
          className="mb-3 block text-[20px] font-bold text-quack-white"
        >
          가게명
        </label>
        <input
          id="storeName"
          type="text"
          placeholder="예) 꽥 분식점"
          {...register('storeName')}
          className="flex h-14 w-full items-center rounded-lg border border-[#A8A7A1] bg-[#21211D] px-4 font-semibold text-quack-white placeholder:text-[#A8A7A1] focus:outline-none"
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
      <FileUpload
        setValue={setValue}
        onFileChange={onFileChange}
        uploading={uploading}
        uploadError={uploadError}
        licenseUrl={licenseUrl}
      />

      {/* 개인정보 수집 및 이용 동의 */}
      <PrivacyCheckbox register={register} errors={errors} watch={watch} />

      <button
        type="submit"
        className={`
    flex h-14 items-center justify-center rounded-lg px-6 font-bold transition-all duration-200
    ${
      isFormValid && !isSubmitting && !lookupLoading
        ? 'border border-[#EFD800] bg-[#EFD800] text-quack-black hover:brightness-95'
        : 'cursor-not-allowed border border-quack-gray bg-quack-gray text-[#A8A7A1]'
    }
  `}
        disabled={!isFormValid || isSubmitting || lookupLoading}
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
