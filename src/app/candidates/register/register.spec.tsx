import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from './page'

describe('Página Cadastro do candidato', () => {
  it('Deve renderizar a página de cadastro', async () => {
    const { getByText } = render(<Register />)

    expect(getByText('Cadastro')).toBeInTheDocument()
  })

  it('Deve realizar o teste de cadastro', async () => {
    const { getByText, getByPlaceholderText } = render(<Register />)

    const inputName = getByPlaceholderText('Digite o nome do candidato')
    const inputSkill = getByPlaceholderText('Digite uma skill')
    const submitButton = getByText('Cadastrar')

    userEvent.type(inputName, 'Richard Matheus')
    userEvent.type(inputSkill, 'Javascript')
    userEvent.click(submitButton)
  })
})
