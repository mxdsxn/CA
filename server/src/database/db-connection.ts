import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const connection = knex({
  client: 'mssql',
  connection: {
    server: process.env.SERVER,
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    database: process.env.DATABASE
  }
})

console.log(process.env.SERVER)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DATABASE)
console.log(process.env.PORT)

export default connection
