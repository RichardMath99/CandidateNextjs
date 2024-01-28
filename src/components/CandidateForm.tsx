import React, { useState } from 'react'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'

import SkillsInput from './SkillsInput'
import Input from './Input'
import Button from './Button'

import { FormProps, CandidateFormProps, CandidateProps } from '../types/index'

const CandidateForm = (props: CandidateFormProps) => {
  const [skills, setSkills] = useState([''])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<FormProps>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      skills: [''],
    },
  })

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/candidates',
        {
          name: data.name,
          skills: data.skills,
        },
      )
      setSkills([''])
      reset()
      props.onSubmitSuccess()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
    setValue('skills', newSkills)
  }

  const handleAddSkill = () => {
    setSkills([...skills, ''])
  }

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills]
    newSkills.splice(index, 1)
    setSkills(newSkills)
    setValue('skills', newSkills)
  }

  return (
    <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nome
        <em className="required-mark">*</em>
      </label>
      <Input
        onChange={(e) => setValue('name', e.target.value)}
        name="name"
        placeholder="Digite o nome do candidato"
        register={register}
        required
      />
      <label>
        Skills
        <em className="required-mark">*</em>
      </label>
      <div className="box-skills">
        {skills.map((skill: string, index: number) => (
          <SkillsInput
            key={index}
            skill={skill}
            onChange={(value) => handleSkillChange(index, value)}
            onAdd={handleAddSkill}
            onRemove={() => handleRemoveSkill(index)}
            isFirst={index === 0}
            isLast={index === skills.length - 1}
            register={register}
            index={index}
            totalSkills={skills.length}
          />
        ))}
      </div>

      <div className="container-btn">
        <Button text="Cadastrar" disabled={!isValid} />
      </div>
    </form>
  )
}

export default CandidateForm
