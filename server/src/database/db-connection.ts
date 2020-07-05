import knex from 'knex'

const connection = knex({
  client: 'mssql',
  connection: {
    server: 'VMDEV006.dom_qp.com.br\\DEV',
    user: 'sistemas-internos',
    password: 'u@m8w*d6',
    database: 'Inovacred'
  }
})

const validationArray = (result: any) => {
  const obj = result.length > 0 ? result : null // OK .select OK promise
  return obj
}
const validationObject = (result: any) => {
  const obj = result !== undefined ? result : null // OK .first()
  return obj
}

export default connection
export {
  validationArray,
  validationObject
}
