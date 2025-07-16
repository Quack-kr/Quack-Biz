export const storeManagementTabMap = {
  basic: '기본정보',
  business: '영업정보'
}

export const storeManagementTabList = Object.entries(storeManagementTabMap).map(
  ([key, label]) => ({
    key,
    label
  })
)
