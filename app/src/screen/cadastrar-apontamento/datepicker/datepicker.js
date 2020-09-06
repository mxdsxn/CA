import React from 'react'

import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import 'moment/locale/pt-br'

moment.locale('pt_br')

export default (props) => {
  const locale = 'pt_br'

  const handleChange = date => props.onChange(date.utcOffset(false))

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
      <DatePicker
        fullWidth={props.fullWidth || false}
        autoOk={true}
        disableToolbar
        format='DD/MM/yyyy'
        label='Selecione o dia da atividade'
        minDate={props.minDate || undefined}
        maxDate={props.maxDate || undefined}
        onChange={handleChange}
        value={props.value}
        variant='inline'
        views={['year', 'month', 'date']}
      />
    </MuiPickersUtilsProvider>
  )
}
