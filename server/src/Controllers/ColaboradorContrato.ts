import express from 'express'
import { ColaboradorContratoService as Service } from '@services'

const route = express.Router()

route.post('/ColaboradorContrato/GetContratosByDataId', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = new Date(String(req.query.Data))

  Service.GetContratosByDataId(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const ColaboradorContratoControler = route
export default ColaboradorContratoControler
