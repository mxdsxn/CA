import express from "express";
import connKnex from "./Database/connection";

import AtividadeController from "./Controllers/Atividade";
const atividadeController = new AtividadeController();
import CalendarioController from "./Controllers/Calendario";
const calendarioController = new CalendarioController();
import RegistroAuxiliarController from "./Controllers/RegistroAuxiliar";
const registroAuxiliarController = new RegistroAuxiliarController();
import PontoController from "./Controllers/Ponto";
const pontoController = new PontoController();
import ContratoController from "./Controllers/ColaboradorContrato";
const contratoController = new ContratoController();

const routes = express.Router();

routes.post(
  "/GetAtividadesByDataColaboradores",
  atividadeController.GetAtividadesByDataColaboradores
);

routes.post("/GetFeriadosByData", calendarioController.GetFeriadosByData);

routes.post(
  "/GetRegistroAuxiliarByData",
  registroAuxiliarController.GetRegistroAuxiliarByData
);

routes.post("/GetPontoByDataId", pontoController.GetPontoByDataId);

routes.post("/GetContratosByDataId", contratoController.GetContratosByDataId);

export default routes;
