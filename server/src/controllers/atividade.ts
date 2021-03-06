/* eslint-disable no-unused-vars */
import moment from 'moment'
import { AtividadeService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const atividadesByIdColaboradorMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = moment(req.query.mesReferencia as string).utcOffset(0, true)

  try {
    const result = await Service.atividadesByIdColaboradorMes(idColaborador, mesReferencia)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const atividadesByIdColaboradorDia = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = moment(req.query.diaReferencia as string).utcOffset(0, true)

  try {
    const result = await Service.atividadesByIdColaboradorDia(idColaborador, diaReferencia)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const atividadeById = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const idAtividade = Number(req.query.idAtividade)

  try {
    const result = await Service.atividadeById(idColaborador, idAtividade)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const salvarAtividade = async (req: Request, res: Response) => {
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
    const result = await Service.salvarAtividade({
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
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const editarAtividade = async (req: Request, res: Response) => {
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
    const result = await Service.editarAtividade({
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
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const deletaAtividade = async (req: Request, res: Response) => {
  const idAtividade = Number(req.query.idAtividade)

  try {
    const result = Service.deletaAtividade(idAtividade)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

const horasMesByIdColaborador = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = moment(req.query.mesReferencia as string).startOf('month')

  try {
    const result = await Service.horasMesByIdColaborador(idColaborador, mesReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default {
  atividadeById,
  atividadesByIdColaboradorMes,
  atividadesByIdColaboradorDia,
  salvarAtividade,
  editarAtividade,
  deletaAtividade,
  horasMesByIdColaborador
}
