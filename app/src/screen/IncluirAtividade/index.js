import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import api from '../../service/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  colorDefault: {
    color: "#002C4F",
    background: "#f0ad4e",
  },
}));
const useStylesTagInput = makeStyles({
  input: {
    padding: "10px",
  },
});

const dadosCadAtv = {
  gerentes: [
    { idColab: 1234, nome: "Joaozinho" },
    { idColab: 4321, nome: "Mariazinha" },
  ],
};
const idColaboradorLogado = 2359


export default (props) => {
  const classes = useStyles();
  const tagInputStyle = useStylesTagInput();

  const [listaProjeto, setListaProjeto] = useState([])
  const [projeto, setProjeto] = useState(0);
  const [listaProjetoFase, setListaProjetoFase] = useState([])
  const [projetoFase, setProjetoFase] = useState(0);


  useEffect(() => {
    api.GetProjetosByIdColaboradorDia(idColaboradorLogado, '04/01/2020')
      .then(res =>
        setListaProjeto(res)
      )
  }, [])
  useEffect(() => {
    api.GetProjetoFaseByIdProjeto(projeto)
      .then(res =>
        setListaProjetoFase(res)
      )
  }, [projeto])


  const handleChangeProjeto = (event) => {
    setProjeto(event.target.value);
  };
  const handleChangeProjetoFase = (event) => {
    setProjetoFase(event.target.value);
  };



  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} xl={6} align="center">
          <FormControl className={classes.formControl}>
            <InputLabel id="select-label-projeto">Projeto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="select-projeto"
              value={projeto}
              onChange={handleChangeProjeto}
            >
              {listaProjeto.map((proj) => (
                <MenuItem value={proj.IdProjeto}>{proj.Nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} xl={6} align="center">
          <FormControl className={classes.formControl}>
            <InputLabel id="select-label-fase">Fase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="select-fase"
              value={projetoFase}
              onChange={handleChangeProjetoFase}
            >
              {listaProjetoFase.map((projFase) => (
                <MenuItem value={projFase.IdProjetoMetodologiaFase}>{projFase.Fase}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} xl={6} align="center">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Gerente</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={0}
            // onChange={handleChangeGerente}
            >
              {dadosCadAtv.gerentes.map((gerente) => (
                <MenuItem value={gerente.idCola3}>{gerente.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} xl={6} align="center">
          <ChipInput
            fullWidth
            label="Tags"
            classes={{ input: tagInputStyle.input }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} xl={6} align="center">
          <FormControl className={classes.formControl}>
            <TextField id="outlined-basic" label="Descricao" multiline />
          </FormControl>
        </Grid>
      </Grid>
      <Button
        // onClick={salvarAtividade}
        variant="contained"
        className={classes.colorDefault}
      >
        Salvar Atividade
      </Button>
    </div>
  );
};
