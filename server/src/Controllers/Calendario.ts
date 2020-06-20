import { Request, Response } from "express";

import connKnex from "@database/connection";
import ICalendario from "@models/Calendario";

export default class CalendarioController {
  async GetFeriadosByData(req: Request, res: Response) {
    const { Data } = req.query;

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

    let feriadosMes: ICalendario[];
    feriadosMes = await connKnex
      .select("*")
      .from(`pessoas.Calendario`)
      .where(`Dia`, `>=`, mesReferenciaInicio)
      .andWhere(`Dia`, `<`, mesReferenciaFim);
    res.json(feriadosMes);
  }
}
