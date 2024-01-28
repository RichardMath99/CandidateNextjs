import { dbConfig } from '../config/database.js'
import mysql from 'mysql2'

const db = mysql.createConnection(dbConfig)

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
    return
  }

  const useDatabaseQuery = `USE ${dbConfig.database}`

  db.query(useDatabaseQuery, (err) => {
    if (err) {
      console.error('Erro ao selecionar o banco de dados:', err)
      db.end()
      return
    }

    console.log('Banco de dados selecionado com sucesso.')

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS candidates (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      skills JSON NOT NULL
      )
    `

    db.query(createTableQuery, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela:', err)
      } else {
        console.log('Tabela criada com sucesso!')
      }

      db.end()
    })
  })
})
