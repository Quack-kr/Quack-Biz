import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent } from '@/components/ui/card'
import { FormSection } from '@/components/ui/form-section/form-section'
import { SwitchTimeField } from '@/components/ui/form-section/form-fields/switch-time-field'
import { BusinessHoursField } from '@/components/ui/form-section/form-fields/business-hours-field'
import { TextareaField } from '@/components/ui/form-section/form-fields/textarea-field'
import { SingleSelect } from '@/components/ui/select/single-select'
import { MultiSelect } from '@/components/ui/select/multi-select'
import { Label } from '@/components/ui/label'
import {
  StoreManagementBusinessSchema,
  type StoreManagementBusinessFormValues
} from './validators/store-management-business-schema'

type OpenSection =
  | 'status'
  | 'openTime'
  | 'holiday'
  | 'break'
  | 'lastOrder'
  | 'note'
  | null

export function StoreManagementBusinessForm() {
  const form = useForm<StoreManagementBusinessFormValues>({
    resolver: zodResolver(StoreManagementBusinessSchema),
    defaultValues: {
      status: '임시휴무',
      openType: '매일같아요',
      openTime: {
        same: { start: '10:00', end: '22:00' },
        different: {
          월: { start: '10:00', end: '22:00', closed: false },
          화: { start: '10:00', end: '22:00', closed: false },
          수: { start: '10:00', end: '22:00', closed: false },
          목: { start: '10:00', end: '22:00', closed: false },
          금: { start: '10:00', end: '22:00', closed: false },
          토: { start: '10:00', end: '22:00', closed: false },
          일: { start: '10:00', end: '22:00', closed: false }
        }
      },
      breakTime: { hasBreak: false, start: '', end: '' },
      holiday: [],
      lastOrder: { hasLast: false, time: '' },
      note: ''
    }
  })

  const { handleSubmit, setValue, watch } = form
  const formData = watch()
  const [open, setOpen] = useState<OpenSection>(null)

  // 옵션 데이터
  const statusOptions = ['영업중', '임시휴무', '재료소진', '준비중']
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'] as const

  // 영업시간 표시 함수
  const getBusinessHoursDisplay = () => {
    if (formData.openType === '매일같아요') {
      return `매일 ${formData.openTime.same.start}-${formData.openTime.same.end}`
    } else {
      const openDays = weekDays.filter(
        (day) =>
          !formData.openTime.different[
            day as keyof typeof formData.openTime.different
          ].closed
      )
      if (openDays.length === 0) return '휴무'
      const firstDay = openDays[0] as keyof typeof formData.openTime.different
      return `${openDays.join(', ')} ${
        formData.openTime.different[firstDay].start
      }-${formData.openTime.different[firstDay].end}`
    }
  }

  // 폼 제출 핸들러 생성 함수
  const createSubmitHandler = (
    field: keyof StoreManagementBusinessFormValues
  ) => {
    return handleSubmit((data) => {
      setValue(field, data[field])
      setOpen(null)
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_375px] md:gap-[111px] xl:pl-10 xl:pr-0">
      {/* 왼쪽 컬럼 - 가게 정보 */}
      <div className="space-y-6">
        {/* 영업상태 */}
        <FormSection
          title="영업상태"
          value={formData.status}
          isOpen={open === 'status'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'status' : null)}
          onSubmit={createSubmitHandler('status')}
        >
          <div className="space-y-4">
            <Label className="text-white">영업상태를 선택해주세요</Label>
            <SingleSelect
              options={statusOptions}
              defaultValue={formData.status}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onValueChange={(value) => setValue('status', value as any)}
            />
          </div>
        </FormSection>

        {/* 영업시간 */}
        <FormSection
          title="영업시간"
          value={getBusinessHoursDisplay()}
          isOpen={open === 'openTime'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'openTime' : null)}
          onSubmit={createSubmitHandler('openTime')}
        >
          <BusinessHoursField
            openType={formData.openType}
            openTime={formData.openTime}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onOpenTypeChange={(type) => setValue('openType', type as any)}
            onOpenTimeChange={(openTime) => setValue('openTime', openTime)}
          />
        </FormSection>

        {/* 정기휴무 */}
        <FormSection
          title="정기휴무"
          value={
            formData.holiday.length > 0 ? formData.holiday.join(', ') : '없음'
          }
          isOpen={open === 'holiday'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'holiday' : null)}
          onSubmit={createSubmitHandler('holiday')}
        >
          <div className="space-y-4">
            <Label className="text-white">정기휴무 요일을 선택해주세요</Label>
            <MultiSelect
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              options={weekDays as any}
              defaultValues={formData.holiday}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onValuesChange={(values) => setValue('holiday', values as any)}
            />
          </div>
        </FormSection>

        {/* 브레이크 타임 */}
        <FormSection
          title="브레이크 타임"
          value={
            formData.breakTime.hasBreak
              ? `${formData.breakTime.start || ''} ~ ${
                  formData.breakTime.end || ''
                }`
              : '없음'
          }
          isOpen={open === 'break'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'break' : null)}
          onSubmit={createSubmitHandler('breakTime')}
        >
          <SwitchTimeField
            label="브레이크 타임"
            hasTime={formData.breakTime.hasBreak}
            startTime={formData.breakTime.start || ''}
            endTime={formData.breakTime.end || ''}
            onHasTimeChange={(hasBreak) =>
              setValue('breakTime.hasBreak', hasBreak)
            }
            onStartTimeChange={(time) => setValue('breakTime.start', time)}
            onEndTimeChange={(time) => setValue('breakTime.end', time)}
          />
        </FormSection>

        {/* 라스트 오더 */}
        <FormSection
          title="라스트 오더"
          value={
            formData.lastOrder.hasLast ? formData.lastOrder.time || '' : '없음'
          }
          isOpen={open === 'lastOrder'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'lastOrder' : null)}
          onSubmit={createSubmitHandler('lastOrder')}
        >
          <SwitchTimeField
            label="라스트 오더"
            hasTime={formData.lastOrder.hasLast}
            startTime={formData.lastOrder.time || ''}
            onHasTimeChange={(hasLast) =>
              setValue('lastOrder.hasLast', hasLast)
            }
            onStartTimeChange={(time) => setValue('lastOrder.time', time)}
            singleTime={true}
          />
        </FormSection>

        {/* 매장 특이사항 */}
        <FormSection
          title="매장 특이사항"
          value={formData.note || '등록된 내용이 없어요'}
          buttonText={formData.note ? '수정하기' : '등록하기'}
          isOpen={open === 'note'}
          onOpenChange={(isOpen) => setOpen(isOpen ? 'note' : null)}
          onSubmit={createSubmitHandler('note')}
        >
          <TextareaField
            id="note"
            label="매장 특이사항"
            value={formData.note || ''}
            onChange={(value) => setValue('note', value)}
            placeholder="매장의 특이사항을 입력해주세요"
            minHeight="120px"
          />
        </FormSection>
      </div>

      {/* 오른쪽 컬럼 - 영업시간 미리보기 */}
      <div className="space-y-6 border-t border-t-quack-gray pb-8 pt-6 md:border-t-0 md:py-0">
        <div>
          <h3 className="mb-4 font-medium text-white">영업시간 미리보기</h3>
          <Card className="rounded-lg border-none bg-[#2A2A26]">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">영업상태</span>
                  <span className="text-sm text-[#EFD800]">
                    {formData.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-white">영업시간</span>
                  {formData.openType === '매일같아요' ? (
                    <div className="text-sm text-[#A8A7A1]">
                      매일 {formData.openTime.same.start}-
                      {formData.openTime.same.end}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {weekDays.map((day) => {
                        const dayData =
                          formData.openTime.different[
                            day as keyof typeof formData.openTime.different
                          ]
                        return (
                          <div
                            key={day}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-[#A8A7A1]">{day}요일</span>
                            <span className="text-[#A8A7A1]">
                              {dayData.closed
                                ? '휴무'
                                : `${dayData.start}-${dayData.end}`}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {formData.holiday.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-medium text-white">정기휴무</span>
                    <div className="text-sm text-[#A8A7A1]">
                      {formData.holiday.join(', ')}
                    </div>
                  </div>
                )}

                {formData.breakTime.hasBreak && (
                  <div className="space-y-2">
                    <span className="font-medium text-white">
                      브레이크 타임
                    </span>
                    <div className="text-sm text-[#A8A7A1]">
                      {formData.breakTime.start || ''} ~{' '}
                      {formData.breakTime.end || ''}
                    </div>
                  </div>
                )}

                {formData.lastOrder.hasLast && (
                  <div className="space-y-2">
                    <span className="font-medium text-white">라스트 오더</span>
                    <div className="text-sm text-[#A8A7A1]">
                      {formData.lastOrder.time || ''}
                    </div>
                  </div>
                )}

                {formData.note && (
                  <div className="space-y-2">
                    <span className="font-medium text-white">
                      매장 특이사항
                    </span>
                    <div className="text-sm text-[#A8A7A1]">
                      {formData.note}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
