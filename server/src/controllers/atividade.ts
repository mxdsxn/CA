/* eslint-disable no-unused-vars */
import moment from 'moment'
import { AtividadeService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const AtividadesByIdColaboradorMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  try {
    const result = await Service.AtividadesByIdColaboradorMes(idColaborador, mesReferencia)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const AtividadesByIdColaboradorDia = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  try {
    const result = await Service.AtividadesByIdColaboradorDia(idColaborador, diaReferencia)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const SalvarAtividade = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const idAtividade = Number(req.query.idAtividade)
  const diaAtividade = moment(req.query.diaAtividade as string)
  const cargaAtividade = moment(req.query.cargaAtividade as string)
  const idProjeto = Number(req.query.idProjeto)
  const idProjetoDefault = Number(req.query.idProjetoDefault)
  const idCoordenador = Number(req.query.idCoordenador)
  const idProjetoFase = Number(req.query.idProjetoFase)
  const idCategoriaAtividade = Number(req.query.idCategoriaAtividade)
  const tagsAtividade = req.query.tagsAtividade as [string]
  const descricaoAtividade = req.query.descricaoAtividade as string

  try {
    const result = await Service.SalvarAtividade({
      idColaborador,
      idAtividade,
      diaAtividade,
      cargaAtividade,
      idProjeto,
      idProjetoDefault,
      idCoordenador,
      idProjetoFase,
      idCategoriaAtividade,
      tagsAtividade,
      descricaoAtividade
    })
    res.json(result)
    // console.log(result)
    return res.status(200)
  } catch (error) {
    console.log(error)
    res.json(error)
    return res.status(500)
  }
}

export default {
  AtividadesByIdColaboradorMes,
  AtividadesByIdColaboradorDia,
  SalvarAtividade
}
