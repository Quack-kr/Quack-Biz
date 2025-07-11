import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { postInquiry } from 'apis/services/common'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const inquirySchema = z.object({
  name: z.string().min(1, '성함을 입력해 주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  content: z.string().min(1, '문의하실 내용을 입력해 주세요.')
})

type InquirySchema = z.infer<typeof inquirySchema>

export function DescktopInquiryDialog({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const [complete, setComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<InquirySchema>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      content: ''
    }
  })

  useEffect(() => {
    if (!open) {
      setComplete(false)
      setLoading(false)
      form.reset()
    }
  }, [open, form])

  const onSubmit = async (data: InquirySchema) => {
    setLoading(true)
    try {
      await postInquiry({
        name: data.name,
        email: data.email,
        message: data.content
      })
      setComplete(true)
      form.reset()
    } catch (error) {
      console.log('postInquiry error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-[784px] !rounded-[20px] border-none bg-[#171714] p-0 shadow-none">
        {!complete ? (
          <div className="px-10 py-[60px]">
            <DialogHeader>
              <DialogTitle className="mb-6 text-center text-[32px] font-bold text-quack-white">
                문의하기
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 px-20"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-pretendard text-xl font-bold text-quack-white">
                        성함*
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="성함을 입력해주세요"
                          className="h-14 rounded-[6px] border border-quack-gray bg-[#21211D] pl-6 font-pretendard font-medium text-[#F9F8F4] placeholder:font-medium placeholder:text-quack-gray"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="font-pretendard text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-pretendard text-xl font-bold text-quack-white">
                        이메일*
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="이메일을 입력해주세요"
                          className="h-14 rounded-[6px] border border-quack-gray bg-[#21211D] pl-6 font-pretendard font-medium text-[#F9F8F4] placeholder:font-medium placeholder:text-quack-gray"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="font-pretendard text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-pretendard text-xl font-bold text-quack-white">
                        문의내용*
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          autoComplete="off"
                          placeholder="문의하실 내용을 입력해주세요"
                          className="h-14 min-h-[120px] rounded-[8px] border border-quack-gray bg-[#21211D] pl-6 pt-4 font-pretendard font-medium text-[#F9F8F4] placeholder:font-medium placeholder:text-quack-gray"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="font-pretendard text-red-500" />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="submit"
                    className="mx-auto mt-4 h-14 w-[380px] rounded-[8px] bg-[#EFD800] font-pretendard text-base font-bold text-[#171714] transition hover:bg-[#FFD600]"
                    disabled={loading}
                  >
                    {loading ? '전송 중...' : '문의하기'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        ) : (
          <div className="flex flex-col px-[120px] py-[60px]">
            <DialogTitle className="mb-6 text-left font-pretendard text-[32px] font-bold text-quack-white">
              문의가 완료되었어요.
            </DialogTitle>
            <DialogDescription className="mb-[56px] text-left font-pretendard text-xl font-medium text-quack-gray">
              문의가 정상적으로 접수되었습니다.
              <br />
              담당자가 확인 후 순차적으로 연락드릴 예정입니다.
            </DialogDescription>
            <div className="flex w-full items-center justify-center gap-4">
              <Button
                variant="outline"
                className="h-12 w-[224px] rounded-[8px] border-[#323230] bg-[#323230] font-pretendard text-quack-white hover:bg-[#323230af] hover:text-quack-white"
                onClick={onClose}
              >
                취소
              </Button>
              <Button
                className="h-12 w-[224px] rounded-[8px] bg-quack-white font-pretendard font-bold text-[#171714] hover:bg-[#FFE100]"
                onClick={onClose}
              >
                확인
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
