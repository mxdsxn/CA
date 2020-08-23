import { ProjetoMetodologiaFaseService as Service } from '@services'

const ProjetoFaseByIdProjeto = async (req, res) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.ProjetoFaseByIdProjeto(idProjeto)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { ProjetoFaseByIdProjeto }
