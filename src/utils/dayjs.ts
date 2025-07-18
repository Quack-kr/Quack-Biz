import { daysEng, daysKor } from '@/constants/dayjs'
import { WeeklyCounts } from '@/types/dashboard'

export function transformWeeklyData(
  week1: WeeklyCounts,
  week2: WeeklyCounts
): { day: string; last: number; current: number }[] {
  return daysEng.map((dayKey, i) => ({
    day: daysKor[i],
    last: week1[dayKey],
    current: week2[dayKey]
  }))
}
