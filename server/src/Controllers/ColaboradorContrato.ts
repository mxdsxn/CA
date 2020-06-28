import express from 'express'
import { ColaboradorContratoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/ColaboradorContrato/GetContratosByDataId', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = timeUtc.utcString(req.query.Data)

  Service.GetContratosByDataId(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})
route.post('/ColaboradorContrato/GetContratoAtivoByIdColabDia', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Dia = timeUtc.utcString(req.query.Dia)

  Service.GetContratoAtivoByIdColabDia(IdColab, Dia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const ColaboradorContratoControler = route
export default ColaboradorContratoControler
