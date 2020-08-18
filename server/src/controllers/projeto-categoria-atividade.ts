import { ProjetoCategoriaAtividadeService as Service } from '@services'

const AtividadeProjetoCategoriaAtividadeByIdProjeto = async (req, res) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.ProjetoCategoriaAtividadeByIdProjeto(idProjeto)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { AtividadeProjetoCategoriaAtividadeByIdProjeto }
