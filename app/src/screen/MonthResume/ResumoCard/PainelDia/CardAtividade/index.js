import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  
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
    <Card className={classes.root} key={props.atv.idAtividade}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.atv.dataAtividade}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.atv.projeto}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Data Cadastro: {props.atv.dataCadastro}
        </Typography>
        <Typography variant="body2" component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus turpis a libero imperdiet, sed laoreet ex porta.
          <br />
          {'"PS: blablabla"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
      </CardActions>
    </Card>
  );
}
