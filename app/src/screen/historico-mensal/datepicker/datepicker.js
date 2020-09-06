import React from 'react'

import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/styles'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import 'moment/locale/pt-br'

import './style.css'
import tema from './style'

moment.locale('pt_br')

export default (props) => {
  const locale = 'pt_br'

  const handleChange = date => props.onChange(date.utcOffset(false))

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
      <ThemeProvider theme={tema}>
        <DatePicker
          autoOk={true}
          label='Selecione o mês'
          minDate={props.minDate || undefined}
          maxDate={props.maxDate || undefined}
          onChange={handleChange}
          openTo='month'
          value={props.value}
          variant='inline'
          views={['year', 'month']}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )
}
