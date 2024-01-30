import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import SkillsInput from '@/components/SkillsInput'
import NoResult from '@/components/NoResults'
import Result from '@/components/Result'
import Button from '@/components/Button'

import api from '@/services/api'

import { FormProps, CandidateProps } from '@/types'

const SearchForm = () => {
  const [skills, setSkills] = useState([''])
  const [searchResult, setSearchResult] = useState<CandidateProps | null>(null)
  const [searchNoResults, setSearchNoResults] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<FormProps>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const response = await api.get('/api/candidates/search', {
        params: { skills: data.skills.join(',') },
      })
      setSearchResult(response.data.candidate)
      setSearchNoResults(false)
    } catch (error) {
      setSearchResult(null)
      setSearchNoResults(true)
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button text="Buscar" disabled={!isValid} />
        </div>
      </form>
      {searchResult && !searchNoResults && (
        <Result
          id={searchResult.id}
          name={searchResult.name}
          skills={searchResult.skills}
        />
      )}

      {searchNoResults && <NoResult />}
    </>
  )
}

export default SearchForm
