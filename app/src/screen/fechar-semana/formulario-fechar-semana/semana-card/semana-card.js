import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography
} from '@material-ui/core'

// import moment from 'moment'

import { atividadeFechamentoApi } from '../../../../service/api-connection'

const useStyles = makeStyles({
  root: { marginBottom: 10 },
  bullet: {
    display: 'inline-block',
    margin: '0',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
})

export default (props) => {
  const classes = useStyles()
  const idColaborador = process.env.REACT_APP_ID_COL

  return (
    <Container maxWidth='sm'>

      <Card className={classes.root} key={props.index}>
        <CardContent>
          <Typography variant='h6' component='h3'>
            {`Semana ${props.index + 1} de ${props.inicioSemana.format('MMMM')}`}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            Atividades entre {props.inicioSemana.format('DD-MM-YYYY')} e {props.fimSemana.format('DD-MM-YYYY')}
          </Typography>
        </CardContent>
        {
          props.atividadeFechamentoSemana.IdAtividadeFechamentoStatus === 1
            ? (
              <CardActions>
                <Button onClick={() => atividadeFechamentoApi.fecharSemana(idColaborador, props.inicioSemana.format('YYYY-MM-DD'))} size='small'>Fechar</Button>
              </CardActions>
            )
            : null
        }
      </Card>
    </Container>
  )
}
