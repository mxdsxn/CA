/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import Cabecalho from '../../components/cabecalho'
import FormularioFecharSemana from './formulario-fechar-semana'
import DataPicker from './datepicker'

import { atividadeFechamentoSemanaApi } from '../../service/api-connection'

import {
  Container,
  Divider,
} from '@material-ui/core'

import moment from 'moment'

import './style.css'

export default (props) => {
  const idColaborador = process.env.REACT_APP_ID_COL

  const mesAtual = moment().startOf('month', 'day').utcOffset(false)
  const mesMin = moment(mesAtual).startOf('year').utcOffset(false)

  const [semanasMes, setSemanasMes] = useState([])
  const [mesReferencia, setMesReferencia] = useState(mesAtual)

  useEffect(() => {
    atividadeFechamentoSemanaApi.listaAtividadeFechamentoSemanaByIdColaboradorMesAno(idColaborador, mesReferencia.format('YYYY-MM-DD'))
      .then(res => res
        ? setSemanasMes(res)
        : setSemanasMes([])
      )
  }, [mesReferencia])
  return (
    <>
      <Cabecalho />
      <Divider />
      <Container align='center'>
        <div align='center' className='datepicker'>
          <DataPicker
            minDate={mesMin}
            maxDate={mesAtual}
            onChange={setMesReferencia}
            value={mesReferencia} />
        </div>
        <FormularioFecharSemana
          semanasMes={semanasMes}
          mesReferencia={mesReferencia}
        />
      </Container>
    </>
  )
}
