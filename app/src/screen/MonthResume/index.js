import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import ResumoCard from "./ResumoCard";
import ResumoTable from "./ResumoTable";
import Datepic from "./Datepic/";

import api from '../../service/api'

export default (props) => {
  const y = new Date().getFullYear();
  const m = new Date().getMonth();
  const mesVigente = new Date(y, m, 1);

  const [atividadesMes, setAtividadesMes] = useState([]);
  const [mesReferencia, setMesReferencia] = useState(mesVigente);

  const handleDateChange = (date) => {
    setMesReferencia(date);
  };

  useEffect(() => {
    api.GetAtividadesMesByIdColabMes(2359, mesReferencia)
      .then(res =>
        setAtividadesMes(res)
      )
  }, [mesReferencia])

  return (
    <Container>
      <div align="center">
        <Datepic changeMes={handleDateChange} mes={mesReferencia} />
      </div>
      <ResumoCard atvMes={atividadesMes} />
      <ResumoTable atvMes={atividadesMes} />
    </Container>
  );
};
