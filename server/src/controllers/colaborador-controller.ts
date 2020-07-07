import express from 'express'
import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.post('/Colaborador/GetGerentesByIdColaboradorDia', (req, res) => {
  const Data = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetGerentesByIdColaboradorDia(Data)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
