import api from 'lib/axios'
import type {
  LookupBusinessNumberResponse,
  UploadBusinessLicenseResponse,
  StoreApplyRequest,
  StoreApplyResponse
} from 'types/store-onnboarding'

export async function lookupBusinessNumber(
  businessNumber: string
): Promise<LookupBusinessNumberResponse> {
  const cleanNumber = businessNumber.replace(/-/g, '')
  const { data } = await api.get<LookupBusinessNumberResponse>(
    `/v1/landing/business/lookup/${cleanNumber}`
  )
  return data
}

export async function uploadBusinessLicense(
  file: File
): Promise<UploadBusinessLicenseResponse> {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post<UploadBusinessLicenseResponse>(
    '/v1/landing/business/license/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return data
}

export async function submitStoreOnboarding(
  body: StoreApplyRequest
): Promise<StoreApplyResponse> {
  const { data } = await api.post<StoreApplyResponse>(
    '/v1/landing/business/apply',
    body
  )
  return data
}
