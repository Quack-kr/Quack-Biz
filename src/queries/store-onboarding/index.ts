import { useMutation } from '@tanstack/react-query'
import {
  lookupBusinessNumber,
  submitStoreOnboarding,
  uploadBusinessLicense
} from 'apis/services/store-onboarding'

export function useLookupBusinessNumber() {
  return useMutation({
    mutationFn: lookupBusinessNumber
  })
}

export function useSubmitStoreOnboarding() {
  return useMutation({
    mutationFn: submitStoreOnboarding
  })
}

export function useUploadBusinessLicense() {
  return useMutation({
    mutationFn: uploadBusinessLicense
  })
}
