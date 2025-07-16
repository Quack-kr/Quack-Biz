export interface Advertisement {
  id: string
  title: string
  remaining: number
  period: string
  status: '진행중' | '일시중지' | '완료'
}
