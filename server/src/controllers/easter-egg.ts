import { TesteService as Service } from '@services'
import libUtc from '@libUtc'

const Teste = async (req, res) => {
  const Data = libUtc.getDateByString(req.query.Data as string)

  Service.Teste()
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { Teste }
