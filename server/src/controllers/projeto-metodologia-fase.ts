import { ProjetoMetodologiaFaseService as Service } from '@services'

const ProjetoFaseByIdProjeto = (req, res) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.ProjetoFaseByIdProjeto(idProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

export default { ProjetoFaseByIdProjeto }
