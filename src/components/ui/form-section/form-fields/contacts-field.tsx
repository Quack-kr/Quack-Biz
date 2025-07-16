import { Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Contact {
  type: 'phone' | 'kakao' | 'instagram'
  value: string
}

interface ContactsFieldProps {
  contacts: Contact[]
  onChange: (contacts: Contact[]) => void
  maxContacts?: number
}

export function ContactsField({
  contacts,
  onChange,
  maxContacts = 5
}: ContactsFieldProps) {
  const handleContactChange = (index: number, value: string) => {
    const newContacts = [...contacts]
    newContacts[index].value = value
    onChange(newContacts)
  }

  const handleRemoveContact = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index)
    onChange(newContacts)
  }

  const handleAddContact = () => {
    onChange([...contacts, { type: 'phone', value: '' }])
  }

  return (
    <div className="space-y-4">
      <Label className="text-white">연락사항 (최대 {maxContacts}개)</Label>
      {contacts.map((contact, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={contact.value}
            onChange={(e) => handleContactChange(index, e.target.value)}
            className="border-[#3A3A36] bg-[#2A2A26] text-white"
            placeholder="연락처를 입력해주세요"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleRemoveContact(index)}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      {contacts.length < maxContacts && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAddContact}
          className="border-[#EFD800] bg-transparent text-[#EFD800] hover:bg-[#EFD800] hover:text-black"
        >
          <Plus className="mr-2 size-4" />
          연락처 추가
        </Button>
      )}
    </div>
  )
}
