export const myPageTabMap = {
  alarm: '알림',
  billing: '구독내역',
  account: '계정관리'
}

export const myPageTabList = Object.entries(myPageTabMap).map(
  ([key, label]) => ({
    key,
    label
  })
)
