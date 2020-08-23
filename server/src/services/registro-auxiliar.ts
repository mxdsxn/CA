import { RegistroAuxiliarRepository as Repo } from '@repositories'

/* retorna lista de registro auxiliar naquele mes */
const RegistroAuxiliarByIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
  const listaRegistroAuxiliar = await Repo.RegistroAuxiliarByIdColaboradorMes(idColaborador, mesReferencia)

  return (listaRegistroAuxiliar)
}

export default {
  RegistroAuxiliarByIdColaboradorMes
}
