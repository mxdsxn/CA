import { EasterEggService as Service } from '@services'
import libUtc from '@libUtc'

const Teste = async (req, res) => {

  Service.Teste()
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { Teste }
