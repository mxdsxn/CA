import express from 'express'
import { RegistroAuxiliarService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/RegistroAuxiliar/RegistroAuxiliarByIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.RegistroAuxiliarByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const RegistroAuxiliarController = route
export default RegistroAuxiliarController
