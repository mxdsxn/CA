import React from "react";
import "./style.css";
import { ProgressBar } from "react-bootstrap";
import { Container } from "@material-ui/core";

import { default as apiConnection } from '../../service/api-connection'


export default (props) => {
  const [mesReferencia, setMesReferencia] = React.useState(props.mesReferencia)

  const [horasBarra, setHorasBarra] = React.useState(0)
  const [horasUteisMes, setHorasUteisMes] = React.useState(0)
  const [horasUteisHoje, setHorasUteisHoje] = React.useState(0)
  const [horasCadastradasAteHoje, setHorasCadastradasAteHoje] = React.useState(0)
  const [BpPassado, setBpPassado] = React.useState();
  const [BpPresente, setBpPresente] = React.useState();
  const [BpFuturo, setBpFuturo] = React.useState();
  const [BpExtra, setBpExtra] = React.useState();

  const idColaborador = 2359

  React.useEffect(() => {
    const {
      uteisMes,
      uteisHoje,
      cadastradasAteHoje
    } = horasBarra


    const pcCadastrado = 100 * cadastradasAteHoje / uteisMes
    const pcPrevistoHoje = (100 * uteisHoje / uteisMes) - pcCadastrado
    const pcRestante = 100 - pcCadastrado - pcPrevistoHoje
    
    console.log(pcCadastrado, pcPrevistoHoje, pcRestante)
    console.log(uteisMes, uteisHoje, cadastradasAteHoje)

    setBpExtra(10)
    setBpFuturo(pcRestante)
    setBpPresente(pcPrevistoHoje)
    setBpPassado(pcCadastrado)
  }, [horasBarra])

  React.useEffect(() => {
    apiConnection.colaborador.GetDadosBarraProgresso(idColaborador, mesReferencia)
      .then(res => {

        if (res.length) {
          setHorasBarra(res)
        } else {
          setHorasBarra([])
        }
      })

  }, [mesReferencia])

  return (
    <Container>
      <ProgressBar className="barra-progresso">
        <ProgressBar variant="success" now={BpPassado} key={1} />
        <ProgressBar animated variant="success" now={BpPresente} key={2} />
        <ProgressBar animated now={BpFuturo} key={3} />
        <ProgressBar variant="warning" now={BpExtra} key={4} />
      </ProgressBar>
    </Container>
  );
};
