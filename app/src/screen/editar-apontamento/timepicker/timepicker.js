import React from 'react'

import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import 'moment/locale/pt-br'

moment.locale('pt_br')

export default (props) => {
  const locale = 'pt_br'

  const handleChange = date => props.onChange(date)

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
      <KeyboardTimePicker
        fullWidth={props.fullWidth || false}
        ampm={false}
        variant='standard'
        label='Seleciona a carga da atividade'
        value={props.value}
        onChange={handleChange}
        autoOk
      />
    </MuiPickersUtilsProvider >
  )
}
