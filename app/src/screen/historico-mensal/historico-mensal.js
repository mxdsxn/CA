/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import {
  Container,
  Divider
} from '@material-ui/core'

import moment from 'moment'

import DataPicker from './datepicker'
import HistoricoTable from './historico-table'
import HistoricoMobile from './historico-mobile'
import BarraProgresso from '../../components/barra-progresso'
import Cabecalho from '../../components/cabecalho'

import { atividadeApi } from '../../service/api-connection'


export default (props) => {
  const idColaborador = props.idColaborador || 2359

  const mesAtual = moment().startOf('month', 'day').utcOffset(false)
  const mesMin = moment().startOf('month', 'day').subtract(3, 'month').utcOffset(false)

  const [historicoMensal, setHistoricoMensal] = useState([])
  const [mesReferencia, setMesReferencia] = useState(mesAtual)

  useEffect(() => {
    atividadeApi.atividadesByIdColaboradorMes(idColaborador, mesReferencia.format('YYYY-MM-DD'))
      .then(res => res
        ? setHistoricoMensal(res)
        : setHistoricoMensal([])
      )
  }, [mesReferencia])

  return (
    <>
      <Cabecalho />
      <Divider />
      <Container>
        <BarraProgresso mesReferencia={mesReferencia} />
        <div align='center'>
          <DataPicker
            minDate={mesMin}
            maxDate={mesAtual}
            onChange={setMesReferencia}
            value={mesReferencia} />
        </div>
        <HistoricoMobile historicoMensal={historicoMensal} />
        <HistoricoTable historicoMensal={historicoMensal} />
      </Container>
    </>
  )
}
