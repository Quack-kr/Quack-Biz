export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData()
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    // File 또는 Blob
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value)
    }

    // 배열
    else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        formData.append(`${key}[${i}]`, v)
      })
    }

    // 객체
    else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
    }

    // 기본값
    else {
      formData.append(key, String(value))
    }
  })
  return formData
}

export function formatBusinessNumber(value: string) {
  const nums = value.replace(/\D/g, '')
  let result = ''
  if (nums.length < 4) {
    result = nums
  } else if (nums.length < 6) {
    result = `${nums.slice(0, 3)}-${nums.slice(3)}`
  } else if (nums.length <= 10) {
    result = `${nums.slice(0, 3)}-${nums.slice(3, 5)}-${nums.slice(5, 10)}`
  } else {
    result = `${nums.slice(0, 3)}-${nums.slice(3, 5)}-${nums.slice(5, 10)}`
  }
  return result
}

export function formatPhoneNumber(value: string) {
  const nums = value.replace(/\D/g, '')
  if (nums.length < 4) return nums
  if (nums.length < 8) return `${nums.slice(0, 3)}-${nums.slice(3)}`
  if (nums.length < 12)
    return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`
  return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`
}

/**
 * 문자열에서 모든 하이픈(-)을 제거합니다.
 */
export function stripHyphens(value: string): string {
  return value.replace(/-/g, '')
}
