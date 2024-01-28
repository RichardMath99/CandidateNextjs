import dotenv from 'dotenv'

dotenv.config()

export const dbConfig = {
  dialect: process.env.MYSQL_DIALECT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}
