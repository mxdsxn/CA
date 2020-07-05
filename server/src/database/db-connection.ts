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

const validationResult = (result: any) => {
  // console.log(result)
  // const obj = result.length !== 0 ? result : null // OK .select OK promise
  // const obj = result.length > 0 ? result : null // OK .select OK promise
  // const obj = result !== undefined ? result : null // OK .first()
  // console.log(typeof obj.length)
  // return obj
}

export default connection
export {
  validationResult
}
