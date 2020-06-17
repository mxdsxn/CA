import { Request, Response } from "express";

import connKnex from "../Database/connection";
import IPonto from "../Models/Ponto";

export default class PontoController {
  async GetPontoByDataId(req: Request, res: Response) {
    const { Data, IdColab } = req.query;

    const mesReferenciaInicio = new Date(String(Data));
    const mesReferenciaFim =
      mesReferenciaInicio.getMonth() < 11
        ? new Date(
            `${
              mesReferenciaInicio.getMonth() + 2
            }/1/${mesReferenciaInicio.getFullYear()}`
          )
        : mesReferenciaInicio.getMonth() == 11
        ? new Date(`1/1/${mesReferenciaInicio.getFullYear() + 1}`)
        : new Date();

    let listaPonto: IPonto[];
    listaPonto = await connKnex
      .select("*")
      .from(`pessoas.Ponto`)
      .where(`Data`, `>=`, mesReferenciaInicio)
      .andWhere(`Data`, `<`, mesReferenciaFim)
      .andWhere(`IdColaborador`, Number(IdColab));

    res.json(listaPonto);
  }
}
