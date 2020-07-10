import React, { useEffect, useState } from "react"
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core"
import ChipInput from "material-ui-chip-input"

import { default as apiConnection } from '../../service/api-connection'
import DataPicker from "./datepicker/";

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
  input: {
    padding: "7px",
  },
}))



const idColaboradorLogado = 2359

const listasDefault = {
  projeto: [{ IdProjeto: 0, Nome: 'Selecione' }, { IdProjeto: -1, Nome: 'Projeto Default' }],
  projetoDefault: [{ IdProjeto: 0, Nome: 'Selecione' }],
  projetoFase: [{ IdProjetoMetodologiaFase: 0, Fase: 'Selecione' }],
  categoriaAtividade: [{ IdProjetoCategoria: 0, Descricao: 'Selecione' }],
  coordenador: [{ IdColaborador: 0, Nome: 'Selecione' }],
}
export default (props) => {
  const classes = useStyles()

  const [listaProjeto, setListaProjeto] = useState(listasDefault.projeto)
  const [listaProjetoDefault, setListaProjetoDefault] = useState(listasDefault.projetoDefault)
  const [listaProjetoFase, setListaProjetoFase] = useState(listasDefault.projetoFase)
  const [listaCategoriaAtividade, setListaCategoriaAtividade] = useState(listasDefault.categoriaAtividade)
  const [listaCoordenador, setListaCoordenador] = useState(listasDefault.coordenador)

  const [diaAtividade, setDiaAtividade] = useState(new Date())
  const [projetoSelecionado, setProjetoSelecionado] = useState(0)
  const [projetoDefaultSelecionado, setProjetoDefaultSelecionado] = useState(0)
  const [projetoFaseSelecionado, setProjetoFaseSelecionado] = useState(0)
  const [categoriaAtividadeSelecionado, setCategoriaAtividadeSelecionado] = useState(0)
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(0)
  const [tagAtividade, setTagAtividade] = useState('')
  const [descricaoAtividade, setDescricaoAtividade] = useState('')

  // reseta campos caso dia da atividade mude
  useEffect(() => {
    setListaProjeto(listasDefault.projeto)
    setListaProjetoDefault(listasDefault.projetoDefault)
    setListaProjetoFase(listasDefault.projetoFase)
    setListaCategoriaAtividade(listasDefault.categoriaAtividade)
    setListaCoordenador(listasDefault.coordenador)
    setProjetoSelecionado(0)
    setProjetoDefaultSelecionado(0)
    setProjetoFaseSelecionado(0)
    setCategoriaAtividadeSelecionado(0)
    setCoordenadorSelecionado(0)
    setTagAtividade('')
    setDescricaoAtividade('')
  }, [diaAtividade])

  // carrega projeto que o colaborador esta alocado
  useEffect(() => {
    apiConnection.projeto.GetProjetosByIdColaboradorDia(idColaboradorLogado, '04/01/2020')
      .then(res =>
        res ?
          setListaProjeto(res) :
          setListaProjeto(listasDefault.projeto)
      )
  }, [])

  // se algum projeto(>0) selecionado, carregar Fase e Categoria, caso existam
  // se projeto é default (-1), carrega projetos default e coordenadores 
  useEffect(() => {
    if (projetoSelecionado > 0) {
      apiConnection.projetoMetodologiaFase.GetProjetoFaseByIdProjeto(projetoSelecionado)
        .then(res =>
          res ?
            setListaProjetoFase(res) :
            setListaProjetoFase(listasDefault.projetoFase)
        )
      apiConnection.projetoCategoriaAtividade.GetProjetoCategoriaAtividadeByIdProjeto(projetoSelecionado)
        .then(res =>
          res ?
            setListaCategoriaAtividade(res) :
            setListaCategoriaAtividade(listasDefault.categoriaAtividade)
        )
    } else if (projetoSelecionado === -1) {
      apiConnection.projeto.GetProjetosDefault()
        .then(res =>
          res ?
            setListaProjetoDefault(res) :
            setListaProjetoDefault(listasDefault.projetoDefault)
        )
      apiConnection.colaborador.GetCoordenadoresByDia(diaAtividade)
        .then(res =>
          res ?
            setListaCoordenador(res) :
            setListaCoordenador(listasDefault.coordenador)
        )
    }

  }, [diaAtividade, projetoSelecionado])

  const handleChangeDiaAtividade = (diaAtividade) => setDiaAtividade(diaAtividade)
  const handleChangeProjeto = (event) => setProjetoSelecionado(event.target.value)
  const handleChangeProjetoDefault = (event) => setProjetoDefaultSelecionado(event.target.value)
  const handleChangeProjetoFase = (event) => setProjetoFaseSelecionado(event.target.value)
  const handleChangeCategoriaAtividade = (event) => setCategoriaAtividadeSelecionado(event.target.value)
  const handleChangeCoordenador = (event) => setCoordenadorSelecionado(event.target.value)
  const handleChangeDescricao = (event) => setDescricaoAtividade(event.target.value)
  const handleChangeTag = (tags) => setTagAtividade(tags)


  const campoProjeto = () => {
    return (
      <Grid item xs={12} sm={6} md={6} xl={6} align="center">
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label-projeto">Projeto*</InputLabel>
          <Select
            id="select-projeto"
            label="Selecione um Projeto"
            labelId="select-projeto"
            onChange={handleChangeProjeto}
            placeholder="Selecione um Projeto"
            value={projetoSelecionado}
          >
            {
              listaProjeto.map((proj) => (
                <MenuItem value={proj.IdProjeto}>{proj.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
    )
  }

  const campoProjetoDefault = () => {
    return projetoSelecionado === -1 ?
      <Grid item xs={12} sm={6} md={6} xl={6} align="center" >
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label-fase">Projeto Default*</InputLabel>
          <Select
            id="select-projetoDefault"
            label='Selecione um Projeto Default'
            labelId="select-projeto-default"
            onChange={handleChangeProjetoDefault}
            placeholder='Selecione um Projeto Default'
            value={projetoDefaultSelecionado}
          >
            {
              listaProjetoDefault.map((projDef) => (
                <MenuItem value={projDef.IdProjeto}>{projDef.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoProjetoFase = () => {
    return listaProjetoFase !== listasDefault.projetoFase ?
      <Grid item xs={12} sm={6} md={6} xl={6} align="center" >
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label-fase">Fase*</InputLabel>
          <Select
            id="select-projetoDefault"
            label='Selecione uma Fase'
            labelId="select-fase"
            onChange={handleChangeProjetoFase}
            placeholder='Selecione uma Fase'
            value={projetoFaseSelecionado}
          >
            {
              listaProjetoDefault.map((projDef) => (
                <MenuItem value={projDef.IdProjeto}>{projDef.Nome}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoCategoriaAtividade = () => {
    return listaCategoriaAtividade !== listasDefault.categoriaAtividade ?
      <Grid item xs={12} sm={6} md={6} xl={6} align="center" >
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label-fase">Categoria Atividade*</InputLabel>
          <Select
            id="select-projetoDefault"
            label='Selecione uma Categoria'
            labelId="select-categoria"
            onChange={handleChangeCategoriaAtividade}
            placeholder='Selecione uma Categoria'
            value={categoriaAtividadeSelecionado}
          >
            {
              listaProjetoDefault.map((projDef) => (
                <MenuItem value={projDef.IdProjeto}>{projDef.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoCoordenador = () => {
    return projetoSelecionado === -1 ?
      <Grid item xs={12} sm={6} md={6} xl={6} align="center">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Coordenador*</InputLabel>
          <Select
            id="demo-simple-select"
            label='Selecione um(a) Coordenador(a)'
            labelId="select-coordenador"
            onChange={handleChangeCoordenador}
            placeholder='Selecione um(a) Coordenador(a)'
            value={coordenadorSelecionado}
          >
            {
              listaCoordenador.map((coordenador) => (
                <MenuItem value={coordenador.IdColaborador} key={coordenador.idColab}>{coordenador.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoTag = () => {
    return (
      <Grid item xs={12} sm={6} md={6} xl={6} align="center">
        <ChipInput
          fullWidth
          classes={{ input: classes.input }}
          onChange={handleChangeTag}
          value={tagAtividade}
          placeholder="Tags"
          label="Tags*"
        />
      </Grid>
    )
  }

  const campoDescricao = () => {
    return (
      <Grid item xs={12} sm={6} md={6} xl={6} align="center">
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Descricao da Atividade"
            multiline
            onChange={handleChangeDescricao}
            placeholder='Descrição da Atividade'
            value={descricaoAtividade}
          />
        </FormControl>
      </Grid>
    )
  }

  return (
    <div className="container">

      <div align="center">
        <DataPicker
          onChange={handleChangeDiaAtividade}
          value={diaAtividade}
        />
      </div>

      <Grid container spacing={3}>
        {campoProjeto()}
        {campoProjetoDefault()}
        {campoProjetoFase()}
        {campoCategoriaAtividade()}
        {campoCoordenador()}
        {campoTag()}
        {campoDescricao()}
      </Grid>

      <Button
        // onClick={salvarAtividade}
        variant="contained"
        className={classes.colorDefault}
      >
        Salvar Atividade
      </Button>
    </div>
  )
}
