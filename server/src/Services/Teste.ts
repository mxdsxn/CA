import connKnex from '@database'

const TesteService = {
  Teste: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim =
      mesReferenciaInicio.getMonth() < 11
        ? new Date(
          `${
          mesReferenciaInicio.getMonth() + 2
          }/1/${mesReferenciaInicio.getFullYear()}`
        )
        : mesReferenciaInicio.getMonth() === 11
          ? new Date(`1/1/${mesReferenciaInicio.getFullYear() + 1}`)
          : new Date()

    const teste = { msg: 'teste' }
    return teste
  }
}

export default TesteService
