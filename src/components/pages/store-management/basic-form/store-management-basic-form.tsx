import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Clock, Phone } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FormSection } from '@/components/ui/form-section/form-section'
import { TextField } from '@/components/ui/form-section/form-fields/text-field'
import { TextareaField } from '@/components/ui/form-section/form-fields/textarea-field'
import { BusinessTypeField } from '@/components/ui/form-section/form-fields/business-type-field'
import { ContactsField } from '@/components/ui/form-section/form-fields/contacts-field'
import { MultiSelect } from '@/components/ui/select/multi-select'
import { SingleSelect } from '@/components/ui/select/single-select'
import { Label } from '@/components/ui/label'
import {
  StoreManagementBasicSchema,
  type StoreManagementBasicFormValues
} from './validators/store-management-basic-schema'

type OpenSection =
  | 'storeName'
  | 'address'
  | 'exposureArea'
  | 'businessType'
  | 'contacts'
  | 'oneLineIntro'
  | 'detailedIntro'
  | 'services'
  | 'photos'
  | null

export const StoreManagementBasicForm = () => {
  const form = useForm<StoreManagementBasicFormValues>({
    resolver: zodResolver(StoreManagementBasicSchema),
    defaultValues: {
      storeName: '백설식당 1호',
      address: '서울특별시 광진구 자양로 31길 9호',
      exposureArea: '광진구/건대',
      businessType: { emoji: '🍜', name: '냉면' },
      contacts: [{ type: 'phone', value: '02-1234-5678' }],
      oneLineIntro: '',
      detailedIntro: '',
      services: ['고기 구워드려요'],
      photos: []
    }
  })

  const { handleSubmit, setValue, watch } = form
  const formData = watch()
  const [open, setOpen] = useState<OpenSection>(null)

  // 옵션 데이터
  const businessTypes = [
    { emoji: '🍜', name: '냉면' },
    { emoji: '🍖', name: '고기' },
    { emoji: '🍕', name: '피자' },
    { emoji: '🍗', name: '치킨' },
    { emoji: '🍱', name: '도시락' },
    { emoji: '🍲', name: '찌개' }
  ]

  const exposureAreas = [
    '광진구/건대',
    '용산/상지',
    '강남/역삼',
    '홍대/합정',
    '이태원/한남'
  ]
  const serviceOptions = [
    '고기 구워드려요',
    '포장 가능',
    '배달 가능',
    '주차 가능',
    '반려동물 동반 가능',
    '24시간 운영'
  ]

  // 폼 제출 핸들러 생성 함수
  const createSubmitHandler = (field: keyof StoreManagementBasicFormValues) => {
    return handleSubmit((data) => {
      setValue(field, data[field])
      setOpen(null)
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_375px] md:gap-[111px] xl:pl-10 xl:pr-0">
      {/* 왼쪽 컬럼 - 가게 정보 */}
      <div className="space-y-6">
        {/* 가게명 */}
        <FormSection
          title="가게명"
          subtitle="수정시 심사를 진행중이에요"
          value={formData.storeName}
          isOpen={open === 'storeName'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'storeName' : null)}
          onSubmit={createSubmitHandler('storeName')}
        >
          <TextField
            id="storeName"
            label="가게명"
            value={formData.storeName}
            onChange={(value) => setValue('storeName', value)}
            placeholder="가게명을 입력해주세요"
          />
        </FormSection>

        {/* 주소 */}
        <FormSection
          title="주소"
          subtitle="수정시 심사를 진행중이에요"
          value={formData.address}
          isOpen={open === 'address'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'address' : null)}
          onSubmit={createSubmitHandler('address')}
        >
          <TextField
            id="address"
            label="주소"
            value={formData.address}
            onChange={(value) => setValue('address', value)}
            placeholder="주소를 입력해주세요"
          />
        </FormSection>

        {/* 노출지역 */}
        <FormSection
          title="노출지역"
          value={formData.exposureArea}
          isOpen={open === 'exposureArea'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'exposureArea' : null)}
          onSubmit={createSubmitHandler('exposureArea')}
        >
          <div className="space-y-4">
            <Label className="text-white">노출지역을 선택해주세요</Label>
            <SingleSelect
              options={exposureAreas}
              defaultValue={formData.exposureArea}
              onValueChange={(value) => setValue('exposureArea', value)}
            />
          </div>
        </FormSection>

        {/* 업종 */}
        <FormSection
          title="업종"
          value={
            <div className="flex items-center gap-2">
              <span className="text-2xl">{formData.businessType.emoji}</span>
              <span>{formData.businessType.name}</span>
            </div>
          }
          isOpen={open === 'businessType'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'businessType' : null)}
          onSubmit={createSubmitHandler('businessType')}
        >
          <BusinessTypeField
            options={businessTypes}
            value={formData.businessType}
            onChange={(value) => setValue('businessType', value)}
          />
        </FormSection>

        {/* 연락사항 */}
        <FormSection
          title="연락사항"
          subtitle="최대 5개"
          value={
            <div className="space-y-1">
              {formData.contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Phone className="size-4 text-quack-gray" />
                  <span>{contact.value}</span>
                </div>
              ))}
            </div>
          }
          isOpen={open === 'contacts'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'contacts' : null)}
          onSubmit={createSubmitHandler('contacts')}
        >
          <ContactsField
            contacts={formData.contacts}
            onChange={(contacts) => setValue('contacts', contacts)}
          />
        </FormSection>

        {/* 한 줄 소개 */}
        <FormSection
          title="한 줄 소개"
          subtitle="최대 40자"
          value={formData.oneLineIntro || '등록된 내용이 없어요'}
          buttonText={formData.oneLineIntro ? '수정하기' : '등록하기'}
          isOpen={open === 'oneLineIntro'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'oneLineIntro' : null)}
          onSubmit={createSubmitHandler('oneLineIntro')}
        >
          <TextField
            id="oneLineIntro"
            label="한 줄 소개 (최대 40자)"
            value={formData.oneLineIntro || ''}
            onChange={(value) => setValue('oneLineIntro', value)}
            placeholder="가게를 한 줄로 소개해주세요"
            maxLength={40}
          />
        </FormSection>

        {/* 상세소개 */}
        <FormSection
          title="상세소개"
          subtitle="최대 150자 (텍스트박스 400x104)"
          value={formData.detailedIntro || '등록된 내용이 없어요'}
          buttonText={formData.detailedIntro ? '수정하기' : '등록하기'}
          isOpen={open === 'detailedIntro'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'detailedIntro' : null)}
          onSubmit={createSubmitHandler('detailedIntro')}
        >
          <TextareaField
            id="detailedIntro"
            label="상세소개 (최대 150자)"
            value={formData.detailedIntro || ''}
            onChange={(value) => setValue('detailedIntro', value)}
            placeholder="가게에 대해 자세히 소개해주세요"
            maxLength={150}
          />
        </FormSection>

        {/* 서비스 및 환경 */}
        <FormSection
          title="서비스 및 환경"
          value={formData.services?.join(', ') || '등록된 내용이 없어요'}
          isOpen={open === 'services'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'services' : null)}
          onSubmit={createSubmitHandler('services')}
        >
          <div className="space-y-4">
            <Label className="text-white">제공하는 서비스를 선택해주세요</Label>
            <MultiSelect
              options={serviceOptions}
              defaultValues={formData.services || []}
              onValuesChange={(values) => setValue('services', values)}
            />
          </div>
        </FormSection>
      </div>

      {/* 오른쪽 컬럼 - 이미지 및 지도 */}
      <div className="space-y-6 border-t border-t-quack-gray pb-8 pt-6 md:border-t-0 md:py-0">
        <div>
          <h3 className="mb-4 font-medium text-white">가게 미리보기</h3>
          <Card className="rounded-none border-none bg-[#2A2A26]">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=250&width=375"
                  alt={formData.storeName}
                  className="h-[250px] w-full rounded-t-lg object-cover"
                />
                <div className="absolute left-2 top-2">
                  <Badge className="text-white">9:41</Badge>
                </div>
              </div>
            </CardContent>
            <CardContent className="p-4">
              <div className="rounded-lg bg-[#21211D] p-3 text-white">
                <h4 className="font-medium">{formData.storeName}</h4>
                <p className="text-sm text-gray-300">
                  한식 • {formData.businessType.name} • 1.8km
                </p>
                <p className="mt-2 text-sm">
                  {formData.oneLineIntro ||
                    '부산에서 서울까지 진출해버린 연남동 맛집'}
                </p>
              </div>
            </CardContent>
            <CardContent className="p-4">
              <div className="flex h-[139px] items-center justify-center rounded-lg bg-gray-200">
                <img
                  src="/placeholder.svg?height=139&width=343"
                  alt="지도"
                  className="size-full rounded-lg object-cover"
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-[#A8A7A1]" />
                  <span className="text-[#A8A7A1]">{formData.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-[#A8A7A1]" />
                  <span className="text-[#A8A7A1]">
                    영업시간 • 매일 10:00~23:00
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
