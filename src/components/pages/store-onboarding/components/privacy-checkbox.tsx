import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch
} from 'react-hook-form'

import type { StoreOnboardingFormValues } from '../validators/store-onboarding-schema'

interface PrivacyCheckboxProps {
  register: UseFormRegister<StoreOnboardingFormValues>
  errors: FieldErrors<StoreOnboardingFormValues>
  watch: UseFormWatch<StoreOnboardingFormValues>
}

export default function PrivacyCheckbox({
  register,
  errors,
  watch
}: PrivacyCheckboxProps) {
  const isChecked = watch('agree')

  return (
    <>
      {/* 개인정보 수집 및 이용 동의 */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="checkbox"
            id="agree"
            {...register('agree')}
            className="peer sr-only"
            aria-invalid={!!errors.agree}
          />
          <label
            htmlFor="agree"
            className={`
              flex h-14 cursor-pointer select-none items-center gap-4 rounded-lg border px-4 transition-all duration-200
              ${
                isChecked
                  ? 'border-[#EFD800] bg-[#21211D]'
                  : 'border-[#A8A7A1] bg-[#21211D] hover:border-[#EFEEDF]'
              }
            `}
          >
            {/* 체크박스 아이콘 */}
            <div
              className={`
                flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200
                ${
                  isChecked
                    ? 'border-[#EFD800] bg-[#EFD800]'
                    : 'border-[#A8A7A1] bg-transparent'
                }
              `}
            >
              {isChecked && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#21211D]"
                  aria-hidden="true"
                >
                  <path
                    d="M4 9L8 13L14 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* 텍스트 */}
            <span
              className={`flex-1 text-base font-medium ${
                isChecked ? 'text-[#EFD800]' : 'text-[#A8A7A1]'
              }`}
            >
              개인정보 수집 및 이용 동의 (필수)
            </span>
          </label>
        </div>

        {errors.agree && (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {errors.agree.message}
          </p>
        )}
      </div>
    </>
  )
}
