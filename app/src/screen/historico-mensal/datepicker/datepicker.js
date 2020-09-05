import React from 'react'
import './style.css'
import tema from './style'

import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import { ThemeProvider } from '@material-ui/styles'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import ptbrLocale from 'date-fns/locale/pt-BR'

export default (props) => {
  const pt_br = ptbrLocale

  const diaHoje = new Date()
  const inicioDatePicker = new Date('01/01/2020')
  const fimDatePicker = new Date(
    Date.UTC(
      diaHoje.getUTCFullYear(),
      diaHoje.getUTCMonth() + 1,
      1,
      0,
      0,
      0,
      0
    )
  )

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt_br}>
      <ThemeProvider theme={tema}>
        <DatePicker
          autoOk={true}
          label='Selecione o mês'
          minDate={inicioDatePicker}
          maxDate={fimDatePicker}
          onChange={props.onChange}
          openTo='month'
          value={props.value}
          variant='inline'
          views={['year', 'month']}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )
}
