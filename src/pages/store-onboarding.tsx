import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  StoreOnboardingSchema,
  type StoreOnboardingFormValues
} from 'components/pages/store-onboarding/validators/store-onboarding-schema'
import StoreOnboardingForm from 'components/pages/store-onboarding/store-onboarding-form'
import {
  useLookupBusinessNumber,
  useSubmitStoreOnboarding,
  useUploadBusinessLicense
} from 'queries/store-onboarding'
import { stripHyphens } from 'utils/format'
import { getErrorMessage } from 'utils/error'
import type { StoreApplyRequest } from 'types/store-onboarding'

export default function StoreOnboardingPage() {
  const form = useForm<StoreOnboardingFormValues>({
    resolver: zodResolver(StoreOnboardingSchema),
    defaultValues: { agree: false }
  })

  // 사업자등록번호 조회
  const {
    mutate: lookupBusinessNumber,
    data: lookupData,
    isPending: lookupLoading,
    reset: resetLookup,
    error: lookupError
  } = useLookupBusinessNumber()

  const handleLookup = () => {
    resetLookup()
    lookupBusinessNumber(form.watch('businessNumber'))
  }

  // 사업자등록증 업로드
  const {
    mutate: uploadBusinessLicense,
    data: uploadedLicense,
    isPending: uploading,
    isSuccess: uploadSuccess,
    error: uploadError,
    reset: resetUpload
  } = useUploadBusinessLicense()

  const handleFileChange = (file?: File) => {
    resetUpload()
    if (!file) return
    uploadBusinessLicense(file)
  }

  // 최종 신청
  const {
    mutate: submitStoreOnboarding,
    data: submitData,
    error: submitError,
    reset: resetSubmit
  } = useSubmitStoreOnboarding()

  const onSubmit = (values: StoreOnboardingFormValues) => {
    resetSubmit()
    const fileKey =
      typeof uploadedLicense?.data === 'string'
        ? uploadedLicense.data
        : undefined

    const payload: StoreApplyRequest = {
      businessNumber: stripHyphens(values.businessNumber),
      representativeName: values.ceoName,
      phone: stripHyphens(values.ceoPhone),
      shopName: values.storeName,
      fileKey,
      agreeToPrivacy: values.agree
    }
    submitStoreOnboarding(payload)
  }

  const lookupResult = useMemo(
    () =>
      lookupError
        ? getErrorMessage(lookupError, '조회에 실패했습니다.')
        : lookupData?.message || null,
    [lookupError, lookupData]
  )

  const licenseUrl = useMemo(
    () =>
      uploadSuccess && typeof uploadedLicense?.data === 'string'
        ? uploadedLicense.data
        : null,
    [uploadSuccess, uploadedLicense]
  )

  const submitResult = useMemo(
    () =>
      submitError
        ? getErrorMessage(submitError, '신청에 실패했습니다.')
        : submitData
          ? '신청이 정상적으로 접수되었습니다.'
          : null,
    [submitError, submitData]
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#171714] py-10">
      <StoreOnboardingForm
        form={form}
        lookupLoading={lookupLoading}
        lookupResult={lookupResult}
        uploading={uploading}
        uploadError={uploadError}
        licenseUrl={licenseUrl}
        submitResult={submitResult}
        onLookup={handleLookup}
        onFileChange={handleFileChange}
        onSubmit={onSubmit}
      />
    </main>
  )
}
