import React from 'react'
import { CandidateProps } from '../types/index'

const Result = (props: CandidateProps) => {
  return (
    <div className="search-result">
      <h2>Resultado</h2>
      <div className="box-search-result">
        <div className="box-info-result">
          <p>Nome: </p>
          <p>{props.name}</p>
        </div>
        <div className="box-info-result">
          <p>Skills: </p>
          <p>{props.skills.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}

export default Result
