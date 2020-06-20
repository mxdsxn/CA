import { Request, Response } from "express";

import connKnex from "@database/connection";
import IRegistroAuxiliar from "@models/RegistroAuxiliar";

export default class RegistroAuxiliarController {
  async GetRegistroAuxiliarByData(req: Request, res: Response) {
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

    let listaRA: IRegistroAuxiliar[];
    listaRA = await connKnex
      .select("*")
      .from(`pessoas.RegistroAuxiliar`)
      .where(`Data`, `>=`, mesReferenciaInicio)
      .andWhere(`Data`, `<`, mesReferenciaFim)
      .andWhere(`IdColaborador`, Number(IdColab));

    res.json(listaRA);
  }
}
