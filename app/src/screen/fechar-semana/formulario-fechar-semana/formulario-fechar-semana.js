import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
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
            label='Semana 1 de Setembro'
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='textSecondary'>
            Atividadeesss
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
