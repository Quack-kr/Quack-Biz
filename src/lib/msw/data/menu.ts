import { GetMenuResponse } from '@/types/menu'

export const mockMenuData: Record<number, GetMenuResponse['data']> = {
  1: {
    restaurantId: 1,
    restaurantName: '맛있는 식당 1호점',
    menus: [
      {
        category: '메인메뉴',
        name: '김치찌개',
        price: '8000',
        description: '국산 묵은지를 사용한 얼큰한 김치찌개',
        imageUrl: '/images/kimchi.png',
        order: '1'
      },
      {
        category: '사이드메뉴',
        name: '계란말이',
        price: '4000',
        description: '달콤하고 부드러운 계란말이',
        imageUrl: '/images/egg.png',
        order: '2'
      }
    ],
    categories: ['메인메뉴', '사이드메뉴']
  },
  2: {
    restaurantId: 2,
    restaurantName: '깔끔한 샐러드 바 2호점',
    menus: [
      {
        category: '샐러드',
        name: '닭가슴살 샐러드',
        price: '9500',
        description: '건강한 단백질 샐러드',
        imageUrl: '/images/salad.png',
        order: '1'
      }
    ],
    categories: ['샐러드']
  },
  3: {
    restaurantId: 3,
    restaurantName: '정통 카레 전문점 3호점',
    menus: [
      {
        category: '메인메뉴',
        name: '치킨 카레라이스',
        price: '11000',
        description: '부드러운 치킨과 진한 카레의 만남',
        imageUrl: '/images/chicken_curry.png',
        order: '1'
      },
      {
        category: '사이드메뉴',
        name: '난',
        price: '2000',
        description: '카레와 잘 어울리는 인도식 난',
        imageUrl: '/images/nan.png',
        order: '2'
      }
    ],
    categories: ['메인메뉴', '사이드메뉴']
  },
  4: {
    restaurantId: 4,
    restaurantName: '수제 버거 하우스 4호점',
    menus: [
      {
        category: '버거',
        name: '더블 치즈버거',
        price: '9000',
        description: '큼직한 패티와 고소한 치즈가 가득',
        imageUrl: '/images/double_cheese.png',
        order: '1'
      },
      {
        category: '사이드',
        name: '감자튀김',
        price: '3500',
        description: '바삭하고 고소한 수제 감자튀김',
        imageUrl: '/images/fries.png',
        order: '2'
      }
    ],
    categories: ['버거', '사이드']
  },
  5: {
    restaurantId: 5,
    restaurantName: '이탈리안 파스타 명가 5호점',
    menus: [
      {
        category: '파스타',
        name: '빠네 크림파스타',
        price: '13000',
        description: '빵 속에 담긴 고소한 크림파스타',
        imageUrl: '/images/cream_pasta.png',
        order: '1'
      },
      {
        category: '샐러드',
        name: '시저 샐러드',
        price: '7500',
        description: '신선한 로메인과 부드러운 드레싱',
        imageUrl: '/images/caesar.png',
        order: '2'
      }
    ],
    categories: ['파스타', '샐러드']
  },
  6: {
    restaurantId: 6,
    restaurantName: '일본 라멘 전문점 6호점',
    menus: [
      {
        category: '라멘',
        name: '쇼유라멘',
        price: '10000',
        description: '진한 간장육수와 쫄깃한 면발',
        imageUrl: '/images/shoyu.png',
        order: '1'
      },
      {
        category: '사이드',
        name: '교자',
        price: '4000',
        description: '육즙 가득한 수제 교자',
        imageUrl: '/images/gyoza.png',
        order: '2'
      }
    ],
    categories: ['라멘', '사이드']
  },
  7: {
    restaurantId: 7,
    restaurantName: '프리미엄 한우구이 7호점',
    menus: [
      {
        category: '고기구이',
        name: '한우 등심',
        price: '35000',
        description: '최고급 국내산 한우 등심',
        imageUrl: '/images/sirloin.png',
        order: '1'
      },
      {
        category: '사이드',
        name: '명이나물',
        price: '2000',
        description: '깊은 풍미를 더하는 명이나물',
        imageUrl: '/images/myungina.png',
        order: '2'
      }
    ],
    categories: ['고기구이', '사이드']
  },
  8: {
    restaurantId: 8,
    restaurantName: '베이커리 카페 8호점',
    menus: [
      {
        category: '빵',
        name: '크루아상',
        price: '3200',
        description: '겹겹의 결이 살아있는 신선한 크루아상',
        imageUrl: '/images/croissant.png',
        order: '1'
      },
      {
        category: '음료',
        name: '아메리카노',
        price: '3800',
        description: '진한 에스프레소로 내린 아메리카노',
        imageUrl: '/images/americano.png',
        order: '2'
      }
    ],
    categories: ['빵', '음료']
  }
}
