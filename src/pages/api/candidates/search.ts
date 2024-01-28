import { NextApiRequest, NextApiResponse } from 'next'
import { object, string } from 'yup'
import mysql from 'mysql2/promise'
import { dbConfig } from '../../../../server/config/database'
import { CandidateProps } from '../../../types/index'

const pool = mysql.createPool(dbConfig)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const schema = object({
    skills: string().required(),
  })

  if (!(await schema.isValid(req.query))) {
    return res.status(400).json({ error: 'O campo skills é obrigatório' })
  }

  const skills: string = (req.query.skills as string) || ''
  const arraySkills = skills.toLowerCase().replace(/\s/g, '').split(',')

  const conditionals = arraySkills
    .map((skill) => `JSON_SEARCH(skills, 'one', '${skill}') IS NOT NULL`)
    .join(' OR ')

  const query = `SELECT * FROM candidates WHERE ${conditionals}`

  try {
    const connection = await pool.getConnection()
    const [result] = await connection.query(query)

    let bestCandidate: CandidateProps | null = null
    let qtdSkillsBestCandidate: number | 0 = 0
    result.forEach((candidate: CandidateProps) => {
      const candidateSkills = candidate.skills || []
      const commonSkills = candidateSkills.filter((item) =>
        arraySkills.includes(item),
      )

      if (commonSkills.length >= qtdSkillsBestCandidate) {
        qtdSkillsBestCandidate = commonSkills.length
        bestCandidate = candidate
      }
    })

    if (!bestCandidate) {
      return res.status(404).json({
        error: 'Nenhum candidato corresponde às skills',
      })
    }

    return res.status(200).json({ bestCandidate })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao buscar candidato.' })
  }
}
