export interface FormProps {
  name: string
  skills: string
}

export interface CandidateProps {
  id: string
  name: string
  skills: string[]
}

export interface InputProps {
  name: string
  placeholder: string
  register: (...args: any) => any
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface CandidateFormProps {
  onSubmitSuccess: () => void
}

export interface ModalProps {
  onClose: () => void
}

export interface SkillsInputProps {
  skill: string
  onChange: (value: string) => void
  onAdd: () => void
  onRemove: () => void
  isFirst: boolean
  isLast: boolean
  register: any
  index: number
  totalSkills: number
}

export interface ButtonProps {
  disabled: boolean
  text: string
}
