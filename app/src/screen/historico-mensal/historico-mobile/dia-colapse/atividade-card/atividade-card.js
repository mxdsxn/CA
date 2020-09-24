import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'

const useStyles = makeStyles({
  root: { marginBottom: 10 }
})

export default function SimpleCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root} key={props.atividade.IdAtividade}>
      <CardContent>
        <Typography variant='button'>
          {props.atividade.NomeProjeto || '-'}
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          Data Cadastro: {moment(props.atividade.DataCadastro).utc().format('L') || '-'}
        </Typography>
        <Typography variant='body2' component='p'>
          {props.atividade.Descricao || '-'}
        </Typography>
      </CardContent>
      {props.semanaAberta ?
        <CardActions>
          <Button size='small'>
            <Typography variant='button'>
              Editar
          </Typography>
          </Button>
        </CardActions> : null
      }
    </Card>
  )
}
