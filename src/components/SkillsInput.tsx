import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import Input from './Input'
import { SkillsInputProps } from '../types/index'

const SkillsInput = (props: SkillsInputProps) => {
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value)
  }

  return (
    <div className="box-input">
      <Input
        name={`skills[${props.index}]`}
        register={props.register}
        onChange={handleSkillChange}
        placeholder="Digite uma skill"
        required
      />
      {props.isFirst && (
        <button type="button" onClick={props.onAdd}>
          <FaPlus />
        </button>
      )}
      {props.isLast && props.index > 0 && (
        <button type="button" onClick={props.onRemove}>
          <FaMinus />
        </button>
      )}
    </div>
  )
}

export default SkillsInput
