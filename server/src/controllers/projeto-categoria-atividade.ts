import { ProjetoCategoriaAtividadeService as Service } from '@services'

const AtividadeProjetoCategoriaAtividadeByIdProjeto = async (req, res) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.ProjetoCategoriaAtividadeByIdProjeto(idProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

export default { AtividadeProjetoCategoriaAtividadeByIdProjeto }
