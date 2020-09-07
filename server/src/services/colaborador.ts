/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Moment } from 'moment'

import { ColaboradorRepository as Repo } from '@repositories'

/* retorna lista de coordenadores(gerentes de projetos), para aprovaçao de atividades em projetos Default */
const coordenadorByDia = async (diaReferencia: Moment) => {
  const listaCoordenador = await Repo.coordenadorByDia(diaReferencia)

  return listaCoordenador
}

export default {
  coordenadorByDia
}
