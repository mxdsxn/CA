import knex from 'knex'

const connection = knex({
  client: 'mssql',
  connection: {
    server: process.env.SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
  }
})

export default connection
