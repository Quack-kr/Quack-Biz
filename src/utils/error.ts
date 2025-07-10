export function getErrorMessage(error: unknown, fallback: string) {
  if (!error) return fallback
  if (typeof error === 'string') return error
  if (typeof error === 'object' && error !== null) {
    // @ts-expect-error: __
    return error.response?.data?.message || fallback
  }
  return fallback
}
