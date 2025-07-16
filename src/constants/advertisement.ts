import type { Advertisement } from '@/types/advertisement'

export const advertisementTabMap = {
  create: '광고 시작하기',
  active: '진행중인 광고'
}

export const advertisementTabList = Object.entries(advertisementTabMap).map(
  ([key, label]) => ({
    key,
    label
  })
)

export const advertisementTypes = [
  {
    id: 'popular-menu',
    title: '잘나가는 메뉴 광고',
    description: '좋 좋은 음식에 더 많은 노출을 제공합니다.',
    price: '첫 한달 무료/월 89,000원/월',
    features: [
      '✕ 홈피드로',
      '✕ 맞춤요청 부적합',
      '✕ 이벤트 광고 상품 추가',
      'O 무제한 광고 무제',
      'O 지역별 광고 상품 및 기능 UP',
      'O 우리 광고의 상세한 리포트는 광고 OK'
    ],
    note: '추가 비용 500원 이하까지 충전으로 사용하는 광고 무제한입니다.',
    buttonText: '구매하기',
    highlighted: true
  },
  {
    id: 'banner',
    title: '베너 광고',
    description: '좋 좋은 음식에 더 많은 노출을 제공합니다.',
    buttonText: '문의하기'
  },
  {
    id: 'sponsorship',
    title: '스폰서십 광고',
    description: '많이 사랑해 주신 더 많은 노출을 제공합니다.',
    buttonText: '문의하기'
  }
]

export const advertisements: Advertisement[] = [
  {
    id: '1',
    title: '베너 광고',
    remaining: 12,
    period: '2024.01.12 까지',
    status: '진행중'
  },
  {
    id: '2',
    title: '스폰서십 광고',
    remaining: 12,
    period: '2024.01.12 까지',
    status: '일시중지'
  },
  {
    id: '3',
    title: '잘나가는 메뉴 광고',
    remaining: 12,
    period: '2024.01.12 까지',
    status: '진행중'
  },
  {
    id: '4',
    title: '잘나가는 메뉴 광고',
    remaining: 12,
    period: '2024.01.12 까지',
    status: '진행중'
  },
  {
    id: '5',
    title: '잘나가는 메뉴 광고',
    remaining: 12,
    period: '2024.01.12 까지',
    status: '진행중'
  }
]
