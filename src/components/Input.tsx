import React, { ChangeEvent } from 'react'
import { InputProps } from '../types/index'

const Input = ({
  name,
  register,
  onChange,
  required,
  placeholder,
}: InputProps & { onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => (
  <input
    {...register(name, { required })}
    onChange={onChange}
    autoComplete="off"
    placeholder={placeholder}
  />
)

export default Input
