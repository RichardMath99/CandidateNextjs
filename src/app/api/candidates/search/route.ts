import { object, string } from 'yup'
import mysql from 'mysql2/promise'
import { dbConfig } from '../../../../../server/config/database.js'

const pool = mysql.createPool(dbConfig)

interface CandidateProps extends mysql.RowDataPacket {
  id: string
  name: string
  skills: string[]
}

export async function GET(req: Request) {
  const schema = object().shape({
    skills: string().required(),
  })

  try {
    const url = new URL(req.url)

    const { skills } = schema.validateSync({
      skills: url.searchParams.get('skills'),
    })

    const arraySkills = skills.toLowerCase().replace(/\s/g, '').split(',')

    const conditionals = arraySkills
      .map((skill) => `JSON_SEARCH(skills, 'one', '${skill}') IS NOT NULL`)
      .join(' OR ')

    const query = `SELECT * FROM candidates WHERE ${conditionals}`

    const connection = await pool.getConnection()
    const [result] = await connection.query<CandidateProps[]>(query)

    let bestCandidate: CandidateProps | null = null
    let qtdSkillsBestCandidate: number | 0 = 0
    if (Array.isArray(result) && result.length > 0) {
      result.forEach((candidate) => {
        const candidateSkills = candidate.skills || []
        const commonSkills = candidateSkills.filter((item) =>
          arraySkills.includes(item),
        )

        if (commonSkills.length >= qtdSkillsBestCandidate) {
          qtdSkillsBestCandidate = commonSkills.length
          bestCandidate = candidate
        }
      })
    }

    if (!bestCandidate) {
      return new Response(
        JSON.stringify({
          error: 'Nenhum candidato corresponde às skills.',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Candidato encontrado com sucesso.',
        candidate: bestCandidate,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Erro ao buscar candidato.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
