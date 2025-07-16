import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { postInquiry } from '@/apis/services/common'
import { useDisableScroll } from '@/hooks/use-disable-scroll'

const inquirySchema = z.object({
  name: z.string().min(1, '성함을 입력해 주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  content: z.string().min(1, '문의하실 내용을 입력해 주세요.')
})

type InquirySchema = z.infer<typeof inquirySchema>

export const MobileMenuDialog = ({
  auth,
  toggleMenuDialog,
  handleClickAppDownloadOrLogout
}: {
  auth: string | null
  toggleMenuDialog: () => void
  handleClickAppDownloadOrLogout: () => void
}) => {
  useDisableScroll()

  const [mode, setMode] = useState<'menu' | 'inquiry'>('menu')

  const [showPcOnlyModal, setShowPcOnlyModal] = useState(false)
  const [showCompletePopup, setShowCompletePopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<InquirySchema>({
    resolver: zodResolver(inquirySchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', content: '' }
  })

  const onSubmit = async (data: InquirySchema) => {
    setLoading(true)
    try {
      await postInquiry({
        name: data.name,
        email: data.email,
        message: data.content
      })
      setShowCompletePopup(true)
      form.reset()
    } catch (error) {
      console.log('postInquiry error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseInquiry = () => {
    setMode('menu')
    setShowCompletePopup(false)
    form.reset()
    setLoading(false)
  }

  const handleCompleteConfirm = () => {
    handleCloseInquiry()
    toggleMenuDialog()
  }

  // 문의하기 폼 UI
  const InquiryForm = (
    <div
      className="fixed left-0 top-[56px] z-50 flex h-[calc(100vh-566px)] w-full flex-col bg-quack-black"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div className="flex flex-1 flex-col px-5">
        <h2 className="mb-6 mt-5 text-[32px] font-bold text-quack-white">
          문의하기
        </h2>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <label className="font-pretendard font-bold text-quack-white">
            성함*
            <input
              {...form.register('name')}
              autoComplete="off"
              placeholder="성함을 입력해주세요."
              className="mt-2 block h-10 w-full rounded-[8px] bg-[#21211D] px-4 text-xs font-medium text-[#EFEEDF] placeholder-[#A8A7A1] placeholder:font-medium focus:outline-none"
              disabled={loading}
            />
            <span className="text-xs text-red-700">
              {form.formState.errors.name?.message}
            </span>
          </label>
          <label className="font-pretendard font-bold text-quack-white">
            이메일*
            <input
              {...form.register('email')}
              autoComplete="off"
              placeholder="이메일을 입력해주세요."
              className="mt-2 block h-10 w-full rounded-[8px] bg-[#21211D] px-4 text-xs font-medium text-[#EFEEDF] placeholder-[#A8A7A1] placeholder:font-medium focus:outline-none"
              disabled={loading}
            />
            <span className="text-xs text-red-700">
              {form.formState.errors.email?.message}
            </span>
          </label>
          <label className="font-pretendard font-bold text-quack-white">
            문의내용*
            <textarea
              {...form.register('content')}
              autoComplete="off"
              placeholder="문의하실 내용을 입력해주세요."
              className="mt-2 block h-10 min-h-[110px] w-full rounded-[8px] bg-[#21211D] p-4 text-xs font-medium text-[#EFEEDF] placeholder-[#A8A7A1] placeholder:font-medium focus:outline-none"
              disabled={loading}
            />
            <span className="text-xs text-red-700">
              {form.formState.errors.content?.message}
            </span>
          </label>
          <Button
            type="submit"
            className={`h-12 w-full rounded-[8px] bg-[#21211D] font-bold transition 
    hover:bg-[#21211D] hover:text-quack-gray
    ${form.formState.isValid ? 'text-white' : 'text-quack-gray'}`}
            disabled={loading}
          >
            {loading ? '전송 중...' : '문의하기'}
          </Button>
        </form>
      </div>
    </div>
  )

  // 문의 완료 팝업 UI
  const CompletePopup = (
    <div className="fixed left-0 top-0 z-[60] flex size-full items-center justify-center bg-[#07070699]">
      <div className="flex h-[144px] w-[calc(100vw-48px)] flex-col items-center justify-center rounded-[20px] bg-quack-yellow shadow-lg">
        <span className="text-center font-bold text-quack-black">
          문의가 완료되었어요.
        </span>
        <Button
          className="mt-4 h-12 w-[160px] rounded-[40px] bg-quack-black font-bold text-quack-yellow hover:bg-quack-black hover:text-quack-yellow"
          onClick={handleCompleteConfirm}
        >
          확인
        </Button>
      </div>
    </div>
  )

  // 가게관리 팝업 UI
  const PcOnlyModal = (
    <div className="fixed left-0 top-0 z-[60] flex size-full items-center justify-center bg-[#07070699]">
      <div className="flex h-[144px] w-[calc(100vw-48px)] flex-col items-center justify-center rounded-[20px] bg-quack-yellow shadow-lg">
        <span className="text-center font-bold text-quack-black">
          가게관리는
          <br />
          PC로만 이용가능해요
        </span>
        <Button
          className="mt-4 h-12 w-[160px] rounded-[40px] bg-quack-black font-bold text-quack-yellow hover:bg-quack-black hover:text-quack-yellow"
          onClick={() => setShowPcOnlyModal(false)}
        >
          확인
        </Button>
      </div>
    </div>
  )

  // 메뉴 UI
  const Menu = (
    <>
      <div
        className="absolute left-0 top-[116px] z-30 h-[calc(100vh-56px)] w-full bg-[#07070699]"
        onClick={toggleMenuDialog}
      />
      <section className="absolute left-0 top-[55px] z-50 w-full rounded-b-[20px] bg-quack-black">
        <div className="flex w-full flex-col items-center justify-center pb-10 pt-1">
          <a
            href="https://quack.io.kr/"
            className="mb-6 text-base font-bold text-quack-white"
            onClick={toggleMenuDialog}
          >
            서비스 소개
          </a>
          <button
            className="mb-6 text-base font-bold text-quack-white"
            onClick={toggleMenuDialog}
          >
            사장님 가게관리
          </button>
          <button
            className="mb-6 text-base font-bold text-quack-white"
            onClick={() => setMode('inquiry')}
          >
            문의하기
          </button>
          <button
            className="mb-6 text-base font-bold text-quack-white"
            onClick={handleClickAppDownloadOrLogout}
          >
            {auth ? '로그아웃' : '앱 다운로드'}
          </button>
        </div>
      </section>
    </>
  )

  return (
    <>
      {mode === 'menu' && Menu}
      {mode === 'inquiry' && InquiryForm}
      {showCompletePopup && CompletePopup}
      {showPcOnlyModal && PcOnlyModal}
    </>
  )
}
