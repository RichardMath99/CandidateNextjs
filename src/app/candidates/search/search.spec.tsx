import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './page'

describe('Página Busca de Candidatos', () => {
  it('Deve renderizar a página de busca', async () => {
    const { getByText } = render(<Search />)

    expect(getByText('Buscar candidatos')).toBeInTheDocument()
  })

  it('Deve realizar o teste de busca', async () => {
    const { getByText, getByPlaceholderText } = render(<Search />)

    const inputSkill = getByPlaceholderText('Digite uma skill')
    const submitButton = getByText('Buscar')

    userEvent.type(inputSkill, 'Javascript')
    userEvent.click(submitButton)
  })
})
