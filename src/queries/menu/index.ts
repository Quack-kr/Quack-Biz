import { useQuery, useMutation } from '@tanstack/react-query'
import { getMenu, postMenu } from '@/apis/services/menu'
import type { PostMenuRequest } from '@/types/menu'

export function useMenu(restaurantId: number) {
  return useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: () => getMenu(restaurantId),
    enabled: !!restaurantId
  })
}

export function usePostMenu(restaurantId: number) {
  return useMutation({
    mutationFn: (body: PostMenuRequest) => postMenu(restaurantId, body)
  })
}
