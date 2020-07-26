import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import ResumoMobile from "./resumo-mobile";
import ResumoDesktop from "./resumo-desktop";
import DataPicker from "./datepicker/";

import BarraProgresso from '../../components/barra-progresso'
import { default as apiConnection } from '../../service/api-connection'

export default (props) => {
  const mesVigente = new Date();

  const [atividadesMes, setAtividadesMes] = useState([]);
  const [mesReferencia, setMesReferencia] = useState(mesVigente);

  const handleDateChange = (date) => {
    setMesReferencia(date);
  };

  useEffect(() => {
    apiConnection.atividade.GetAtividadesByIdColaboradorMes(2359, mesReferencia)
      .then(res =>
        res ?
          setAtividadesMes(res) :
          setAtividadesMes([])
      )
  }, [mesReferencia])

  return (
    <Container>
      <BarraProgresso mesReferencia={mesReferencia} />
      <div align="center">
        <DataPicker onChange={handleDateChange} value={mesReferencia} />
      </div>
      <ResumoMobile atvMes={atividadesMes} />
      <ResumoDesktop atvMes={atividadesMes} />
    </Container>
  );
};
