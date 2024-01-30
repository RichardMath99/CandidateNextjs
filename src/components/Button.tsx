import React from 'react'
import { ButtonProps } from '@/types'

const Button = (props: ButtonProps) => {
  return (
    <button type="submit" disabled={props.disabled}>
      {props.text}
    </button>
  )
}
export default Button
