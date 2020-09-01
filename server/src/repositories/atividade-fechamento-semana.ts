/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'

const atividadeFechamentoSemanaByIdColaboradorSemanaAno = async (idColaborador: number, semana: number, ano: number) => {
    return dbConnection('pessoas.AtividadeFechamentoSemana')
        .where({
            IdColaborador: idColaborador,
            Semana: semana,
            Ano: ano
        })
        .select('*')
}

const atividadeFechamentoSemanaByIdColaboradorMesAno = async (idColaborador: number, mes: number, ano: number) => {
    return dbConnection('pessoas.AtividadeFechamentoSemana')
        .where({
            Mes: mes,
            Ano: ano,
            IdColaborador: idColaborador
        })
        .select('*')
}

const statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno = async (idColaborador: number, semana: number, mes: number, ano: number) => {
    return dbConnection('pessoas.AtividadeFechamentoSemana')
        .where({
            Semana: semana,
            Mes: mes,
            Ano: ano,
            idColaborador: idColaborador
        })
        .select('IdAtividadeFechamentoStatus')
        .first()
}

export default {
    atividadeFechamentoSemanaByIdColaboradorSemanaAno,
    atividadeFechamentoSemanaByIdColaboradorMesAno,
    statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno
}