import React from 'react'
import { Link } from 'react-router-dom'
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import moment from 'moment'

import { atividadeApi } from '../../../../../service/api-connection'

const useStyles = makeStyles({
  root: { marginBottom: 10 }
})

export default function SimpleCard(props) {
  const classes = useStyles()

  const deletaAtividade = async (idAtividade) => {
    const result = await atividadeApi.deletarAtividade(props.atividade.IdAtividade)
    if (result.status === 200)
      props.onDelete()
  }

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
          <Link to={{
            pathname: '/editar-atividade',
            idAtividade: props.atividade.IdAtividade
          }}>
            <Button size='small'>
              <Typography variant='button'>
                Editar
          </Typography>
            </Button>
          </Link>
          <Button size='small' onClick={() => deletaAtividade(props.atividade.IdAtividade)}>
            <Typography variant='button'>
              Apagar
          </Typography>
          </Button>
        </CardActions> : null
      }
    </Card>
  )
}
