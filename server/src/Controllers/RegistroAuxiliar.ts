import express from 'express'
import { RegistroAuxiliarService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/RegistroAuxiliar/GetRegistroAuxiliarByIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = timeUtc.utcString(req.query.mesReferencia as string)

  Service.GetRegistroAuxiliarByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const RegistroAuxiliarController = route
export default RegistroAuxiliarController
