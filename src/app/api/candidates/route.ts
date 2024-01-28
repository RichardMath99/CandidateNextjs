import { object, string, array } from 'yup'
import mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'
import { dbConfig } from '../../../../server/config/database.js'

const pool = mysql.createPool(dbConfig)

export async function POST(req: Request) {
  const schema = object().shape({
    name: string().required(),
    skills: array().of(string()).required(),
  })

  const body = await req.json()

  if (!schema.isValidSync(body)) {
    return new Response(
      JSON.stringify({
        message:
          'Os campos nome e skills são obrigatórios e o campo skills deve ser um array.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const { name, skills } = body

  const formattedSkills = skills.map((skill) => skill && skill.toLowerCase())
  const id = uuidv4()

  try {
    const connection = await pool.getConnection()
    await connection.query(
      'INSERT INTO candidates (id, name, skills) VALUES (?, ?, ?)',
      [id, name, JSON.stringify(formattedSkills)],
    )

    connection.release()

    return new Response(
      JSON.stringify({
        message: 'O candidato foi criado com sucesso.',
        candidate: { id, name, skills },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error(error)
    return new Response('Erro ao cadastrar candidato.', {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
