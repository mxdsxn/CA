import dbconnection from '@database'

const permissaoHoraExtraByIdColaboradorDia = (idColaborador: number, dia: string) => {
  return dbconnection('pessoas.PermissaoHoraExtra')
    .where({
      Ativo: true,
      IdColaborador: idColaborador
    })
    .andWhere('DataInicio', '<=', dia)
    .andWhere('DataFim', '>=', dia)
    .select('*')
    .first()
}

export default {
  permissaoHoraExtraByIdColaboradorDia
}
