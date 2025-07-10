export const truncateFileName = (fileName: string, maxLength = 30): string => {
  if (fileName.length <= maxLength) return fileName

  const extension = fileName.split('.').pop() || ''
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'))

  if (nameWithoutExt.length <= maxLength - extension.length - 4) {
    return fileName
  }

  const truncatedName = nameWithoutExt.substring(
    0,
    maxLength - extension.length - 4
  )
  return `${truncatedName}...${extension ? `.${extension}` : ''}`
}
