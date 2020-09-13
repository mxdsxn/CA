import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import SemanaCard from './semana-card'

import moment from 'moment'

const useStyles = makeStyles({
  root: {
    width: '100%',
  }
})

export default (props) => {
  const classes = useStyles()
  const inicioMes = moment(props.mesReferencia.format('YYYY-MM-DD')).startOf('month')


  const inicioSemana = (index) => {
    let result = moment()
    if (moment(inicioMes.format('YYYY-MM-DD')).add(index, 'week').startOf('isoweek').month() !== inicioMes.month()) {
      if (index === 0) {
        result = moment(inicioMes.format('YYYY-MM-DD')).startOf('month')
      }
    } else {
      result = moment(inicioMes.format('YYYY-MM-DD')).add(index, 'week').startOf('isoweek')
    }
    return result
  }

  const fimSemana = (index) => {
    let result = moment()
    if (moment(inicioMes.format('YYYY-MM-DD')).add(index, 'week').endOf('isoweek').month() !== inicioMes.month()) {
      if (index === props.semanasMes.length - 1) {
        result = moment(inicioMes.format('YYYY-MM-DD')).endOf('month')
      }
    } else {
      result = moment(inicioMes.format('YYYY-MM-DD')).add(index, 'week').endOf('isoweek')
    }
    return result
  }

  return (
    <div className={classes.root}>
      {
        props.semanasMes.map((semana, index) => {
          return (
            <SemanaCard key={index} index={index} inicioSemana={inicioSemana(index)} fimSemana={fimSemana(index)} atividadeFechamentoSemana={semana} />
          )
        })
      }

    </div>
  )
}
