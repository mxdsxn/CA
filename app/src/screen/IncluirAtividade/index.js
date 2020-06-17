import React from "react";
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
  projetos: [
    { idProj: 1111, nome: "projeto1" },
    { idProj: 1234, nome: "projeto2" },
  ],
  projetoDefault: [
    { idProj: 9999, nome: "projDefault1" },
    { idProj: 8888, nome: "projDefault2" },
  ],
  gerentes: [
    { idColab: 1234, nome: "Joaozinho" },
    { idColab: 4321, nome: "Mariazinha" },
  ],
};

export default (props) => {
  if (props.setValueNavBar) {
  }

  const classes = useStyles();
  const tagInputStyle = useStylesTagInput();

  const [projeto, setProjeto] = React.useState("");
  const [projDef, setProjDef] = React.useState("");
  const [gerente, setGerente] = React.useState("");

  const handleChangeProjeto = (event) => {
    setProjeto(event.target.value);
    console.log(projeto);
  };
  const handleChangeProjDef = (event) => {
    setProjDef(event.target.value);
    console.log(projDef);
  };
  const handleChangeGerente = (event) => {
    setGerente(event.target.value);
    console.log(gerente);
  };

  const salvarAtividade = () => {
    const atv = { IdProjeto: projeto, IdGerente: gerente };
    console.log(atv);
  };

  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} xl={6} align="center">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Projeto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projeto}
              onChange={handleChangeProjeto}
            >
              {dadosCadAtv.projetos.map((proj) => (
                <MenuItem value={proj.idProj}>{proj.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} xl={6} align="center">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Projeto Default
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projDef}
              onChange={handleChangeProjDef}
            >
              {dadosCadAtv.projetoDefault.map((projD) => (
                <MenuItem value={projD.idProj}>{projD.nome}</MenuItem>
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
              value={gerente}
              onChange={handleChangeGerente}
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
        onClick={salvarAtividade}
        variant="contained"
        className={classes.colorDefault}
      >
        Salvar Atividade
      </Button>
    </div>
  );
};
