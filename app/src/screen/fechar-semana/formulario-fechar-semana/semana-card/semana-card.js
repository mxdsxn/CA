/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import atividadeApi from '../../../../service/atividade-api'

export default (props) => {
  const [atividades, setAtividades] = useState()

  useEffect(async () => {
    // const result = await atividadeApi.atividadesByIdColaboradorMes(2359, props.inicioSemana.format('YYYY-MM-DD'), props.fimSemana.format('YYYY-MM-DD'))
    // setAtividades(result)
  }, [])

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        // aria-label='Expand'
        // aria-controls='additional-actions1-content'
        id='additional-actions1-header'
      >
        <FormControlLabel
          aria-label='Acknowledge'
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox />}
          label={`Semana ${props.index + 1} de ${props.inicioSemana.format('MMMM')}`}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Typography color='textSecondary'>
          Atividades entre {props.inicioSemana.format('DD-MM-YYYY')} e {props.fimSemana.format('DD-MM-YYYY')}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
