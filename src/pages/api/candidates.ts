import { NextApiRequest, NextApiResponse } from 'next'
import { object, string, array } from 'yup'
import mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'
import { dbConfig } from '../../../server/config/database'

const pool = mysql.createPool(dbConfig)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const schema = object().shape({
    name: string().required(),
    skills: array().of(string()).required(),
  })

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: 'Os campos nome e skills são obrigatórios.',
    })
  }

  const { name, skills } = req.body

  const formattedSkills = skills.map((skill: string) => skill.toLowerCase())
  const id = uuidv4()

  try {
    const connection = await pool.getConnection()
    await connection.query(
      'INSERT INTO candidates (id, name, skills) VALUES (?, ?, ?)',
      [id, name, JSON.stringify(formattedSkills)],
    )

    connection.release()

    return res.status(201).json({
      res: 'O candidato foi criado com sucesso.',
      candidato: { id, name, skills },
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Erro ao cadastrar candidato.' })
  }
}
