/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {
  AtividadeEntity,
  CalendarioEntity,
  ColaboradorContratoEntity
} from '@entities'

import {
  AtividadeService,
  CalendarioService,
  ColaboradorContratoService
} from '@services'

import { ColaboradorRepository as Repo } from '@repositories'

import libUtc from '@libUtc'
import { AtividadeModel } from '@models'

/* retorna lista de coordenadores(gerentes de projetos), para aprovaçao de atividades em projetos Default */
const coordenadorByDiaÏ = async (diaReferencia: Date) => {
  const listaCoordenador = await Repo.coordenadorByDiaÏ(diaReferencia)

  return listaCoordenador
}

export default {
  coordenadorByDiaÏ
}
