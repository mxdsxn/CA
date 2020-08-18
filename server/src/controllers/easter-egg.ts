import { TesteService as Service } from '@services'
import libUtc from '@libUtc'

const Teste = (req, res) => {
  const Data = libUtc.getDateByString(req.query.Data as string)

  Service.Teste()
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

export default { Teste }
