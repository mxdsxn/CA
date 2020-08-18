import { ProjetoAlocacaoPeriodoService as Service } from '@services'
import libUtc from '@libUtc'


const PeriodoProjetoAlocacaoPeriodoByIdColaboradorDia = async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ProjetoAlocacaoPeriodoByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { PeriodoProjetoAlocacaoPeriodoByIdColaboradorDia }
