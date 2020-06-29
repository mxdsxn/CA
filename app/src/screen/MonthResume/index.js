import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import ResumoCard from "./ResumoCard";
import ResumoTable from "./ResumoTable";
import Datepic from "./Datepic/";

import { AtividadeService } from '@services'

export default (props) => {
  const y = new Date().getFullYear();
  const m = new Date().getMonth();
  const mesVigente = new Date(y, m, 1);

  const [atividadesMes, setAtividadesMes] = useState([]);
  const [mesReferencia, setMesReferencia] = useState(mesVigente);

  const handleDateChange = (date) => {
    setMesReferencia(date);
  };

  useEffect(() => { AtividadeService.GetAtividadesMesByIdColabMes(2359, mesReferencia) }, [mesReferencia])

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
