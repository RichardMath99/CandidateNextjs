import React from 'react'

const NoResults = () => {
  return (
    <div className="search-result">
      <h2>Resultado da Busca</h2>
      <div className="box-search-result">
        <div className="not-found">Nenhum candidato corresponde às skills</div>
      </div>
    </div>
  )
}

export default NoResults
