import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(timeMs = 300) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs)
  })
}
