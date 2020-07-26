import React from 'react';
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { format } from 'date-fns'
const useStyles = makeStyles({
  root: { marginBottom: 10 },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} key={props.atv.IdAtividade}>
      <CardContent>
        <Typography variant="h6" component='h3'>
          {props.atv.Projeto || "-"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Data Cadastro: {format(new Date(
                  Date.UTC(
                    new Date(props.atv.DataCadastro).getUTCFullYear(),
                    new Date(props.atv.DataCadastro).getUTCMonth(),
                    new Date(props.atv.DataCadastro).getUTCDate(),
                    + new Date(props.atv.DataCadastro).getHours(),
                    0,
                    0,
                    0
                  )), "d/MM/yyyy") || "-"}
        </Typography>
        <Typography variant="body2" component="p">
          {props.atv.Descricao || "-"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
      </CardActions>
    </Card>
  );
}
