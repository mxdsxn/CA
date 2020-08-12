/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState
} from "react"
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
import DataPicker from "./datepicker";
import TimePicker from "./timepicker/";
import BarraProgresso from '../../components/barra-progresso'

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

const defaultValue = {
  cargaZerada: new Date(" 1 January, 2000"),
  contratoDefault: { CargaHoraria: 0 },
  diaAtividade: new Date(),
  idDefault: 0,
  listaProjeto: [{ IdProjeto: 0, Nome: 'Selecione' }, { IdProjeto: -1, Nome: 'Projeto Default' }],
  listaCategoriaAtividade: [{ IdProjetoCategoriaAtividade: 0, Descricao: 'Selecione' }],
  listaCoordenador: [{ IdColaborador: 0, Nome: 'Selecione' }],
  listaProjetoDefault: [{ IdProjeto: 0, Nome: 'Selecione' }],
  listaProjetoFase: [{ IdProjetoMetodologiaFase: 0, Fase: 'Selecione' }],
}

export default (props) => {

  //#region Constantes
  const classes = useStyles()
  const idColaboradorLogado = 2359
  //#endregion

  //#region Funcoes
  const zeraIdSelecionados = () => {
    setCoordenadorSelecionado(0)
    setProjetoDefaultSelecionado(0)
    setCategoriaAtividadeSelecionado(0)
    setProjetoFaseSelecionado(0)
  }
  //#endregion

  //#region States
  // states do formulario
  const [listaCategoriaAtividade, setListaCategoriaAtividade] = useState(defaultValue.listaCategoriaAtividade)
  const [listaCoordenador, setListaCoordenador] = useState(defaultValue.listaCoordenador)
  const [listaProjeto, setListaProjeto] = useState(defaultValue.listaProjeto)
  const [listaProjetoDefault, setListaProjetoDefault] = useState(defaultValue.listaProjetoDefault)
  const [listaProjetoFase, setListaProjetoFase] = useState(defaultValue.listaProjetoFase)

  // states selecionados
  const [cargaSelecionada, setCargaSelecionada] = useState(defaultValue.cargaZerada)
  const [categoriaAtividadeSelecionado, setCategoriaAtividadeSelecionado] = useState(defaultValue.idDefault)
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(defaultValue.idDefault)
  const [contratoAtivoDia, setContratoAtivo] = useState(defaultValue.contratoDefault)
  const [descricaoAtividade, setDescricaoAtividade] = useState('')
  const [diaAtividade, setDiaAtividade] = useState(defaultValue.diaAtividade)
  const [projetoDefaultSelecionado, setProjetoDefaultSelecionado] = useState(defaultValue.idDefault)
  const [projetoFaseSelecionado, setProjetoFaseSelecionado] = useState(defaultValue.idDefault)
  const [projetoSelecionado, setProjetoSelecionado] = useState(defaultValue.idDefault)
  const [tagAtividade, setTagAtividade] = useState('')

  // state validacao
  const [descricaoAtividadeCheck, setDescricaoAtividadeCheck] = useState(true)
  const [categoriaAtividadeSelecionadoCheck, setCategoriaAtividadeSelecionadoCheck] = useState(true)
  const [coordenadorSelecionadoCheck, setCoordenadorSelecionadoCheck] = useState(true)
  const [projetoDefaultSelecionadoCheck, setProjetoDefaultSelecionadoCheck] = useState(true)
  const [projetoFaseSelecionadoCheck, setProjetoFaseSelecionadoCheck] = useState(true)
  const [projetoSelecionadoCheck, setProjetoSelecionadoCheck] = useState(true)
  const [tagAtividadeCheck, setTagAtividadeCheck] = useState(true)
  const [formularioCheck, setFormularioCheck] = useState(false)
  //#endregion

  //#region UseEffects
  useEffect(() => {
    apiConnection.colaboradorContrato.GetContratoAtivoByIdColaboradorDia(idColaboradorLogado, diaAtividade)
      .then(res =>
        res ?
          setContratoAtivo(res) :
          setContratoAtivo(defaultValue.contratoDefault)
      )
    apiConnection.projeto.GetProjetosByIdColaboradorDia(idColaboradorLogado, diaAtividade)
      .then(res =>
        res ?
          setListaProjeto([].concat(defaultValue.listaProjeto, res)) :
          setListaProjeto(defaultValue.listaProjeto)
      )

    setDescricaoAtividade('')
    setListaCategoriaAtividade([])
    setListaCoordenador([])
    setListaProjetoFase([])
    setListaProjetoDefault([])
    setTagAtividade('')
    zeraIdSelecionados()
  }, [diaAtividade])

  useEffect(() => {
    // se algum projeto(>0) selecionado, carregar Fase e Categoria, caso existam
    if (projetoSelecionado > 0) {
      setListaCoordenador([])
      setListaProjetoDefault([])
      setCoordenadorSelecionado(0)
      setProjetoDefaultSelecionado(0)

      apiConnection.projetoCategoriaAtividade.GetProjetoCategoriaAtividadeByIdProjeto(projetoSelecionado)
        .then(res =>
          res ?
            setListaCategoriaAtividade([].concat(defaultValue.listaCategoriaAtividade, res)) :
            setListaCategoriaAtividade(defaultValue.listaCategoriaAtividade)
        )
      apiConnection.projetoMetodologiaFase.GetProjetoFaseByIdProjeto(projetoSelecionado)
        .then(res =>
          res ?
            setListaProjetoFase([].concat(defaultValue.listaProjetoFase, res)) :
            setListaProjetoFase(defaultValue.listaProjetoFase)
        )
    } else if (projetoSelecionado === -1) {
      // se projeto é default (-1), carrega projetos default e coordenadores 
      setListaCategoriaAtividade([])
      setListaProjetoFase([])
      setCategoriaAtividadeSelecionado(0)
      setProjetoFaseSelecionado(0)

      apiConnection.projeto.GetProjetosDefault(diaAtividade)
        .then(res =>
          res ?
            setListaProjetoDefault([].concat(defaultValue.listaProjetoDefault, res)) :
            setListaProjetoDefault(defaultValue.listaProjetoDefault)
        )

      apiConnection.colaborador.GetCoordenadoresByDia(diaAtividade)
        .then(res =>
          res ?
            setListaCoordenador([].concat(defaultValue.listaCoordenador, res)) :
            setListaCoordenador(defaultValue.listaCoordenador)
        )
    } else if (projetoSelecionado === 0) {
      setListaProjetoFase([])
      setListaCategoriaAtividade([])
      setListaProjetoDefault([])
      setListaCoordenador([])
      zeraIdSelecionados()
    }
  }, [projetoSelecionado])
  //#endregion

  //#region Validacoes
  // const validaCargaSelecionada = () => {}
  const validaCategoriaAtividadeSelecionado = () => {
    if (listaCategoriaAtividade.length > 1 && categoriaAtividadeSelecionado === 0)
      setCategoriaAtividadeSelecionadoCheck(false)
    else
      setCategoriaAtividadeSelecionadoCheck(true)
  }
  const validaCoordenadorSelecionado = () => {
    if (listaCoordenador.length > 1 && coordenadorSelecionado === 0)
      setCoordenadorSelecionadoCheck(false)
    else
      setCoordenadorSelecionadoCheck(true)
  }
  // const validaContratoAtivoDia = () => { }
  const validaDescricaoAtividade = () => {
    if (descricaoAtividade === '')
      setDescricaoAtividadeCheck(false)
    else
      setDescricaoAtividadeCheck(true)
  }
  // const validaDiaAtividade = () => {}
  const validaProjetoDefaultSelecionado = () => {
    if (listaProjetoDefault.length > 1 && projetoDefaultSelecionado === 0)
      setProjetoDefaultSelecionadoCheck(false)
    else
      setProjetoDefaultSelecionadoCheck(true)
  }
  const validaProjetoFaseSelecionado = () => {
    if (listaProjetoFase.length > 1 && projetoFaseSelecionado === 0)
      setProjetoFaseSelecionadoCheck(false)
    else
      setProjetoFaseSelecionadoCheck(true)
  }
  const validaProjetoSelecionado = () => {
    if (listaProjeto.length > 1 && projetoSelecionado === 0)
      setProjetoSelecionadoCheck(false)
    else
      setProjetoSelecionadoCheck(true)
  }
  const validaTagAtividade = () => {
    if (tagAtividade === '')
      setTagAtividadeCheck(false)
    else
      setTagAtividadeCheck(true)
  }

  const validaFormulario = () => {
    if (projetoSelecionado === -1)
      projetoDefaultSelecionadoCheck && coordenadorSelecionadoCheck
        ? setFormularioCheck(true)
        : setFormularioCheck(false)
  }
  //#endregion

  //#region Handles
  const handleChangeDiaAtividade = (diaAtividade) => { setProjetoSelecionado(0); setDiaAtividade(diaAtividade) }
  const handleChangeCargaAtividade = (cargaAtividade) => setCargaSelecionada(cargaAtividade)
  const handleChangeProjeto = (event) => setProjetoSelecionado(event.target.value)
  const handleChangeProjetoDefault = (event) => setProjetoDefaultSelecionado(event.target.value)
  const handleChangeProjetoFase = (event) => setProjetoFaseSelecionado(event.target.value)
  const handleChangeCategoriaAtividade = (event) => setCategoriaAtividadeSelecionado(event.target.value)
  const handleChangeCoordenador = (event) => setCoordenadorSelecionado(event.target.value)
  const handleChangeDescricao = (event) => {
    setDescricaoAtividade(event.target.value)
    setTimeout(() => {
      validaDescricaoAtividade()
      validaFormulario()
    }, 1000);
  }
  const handleChangeTag = (tags) => setTagAtividade(tags)
  const handleSalvarAtividade = () => {

    apiConnection.atividade.SalvarAtividade(
      null,
      cargaSelecionada,
      projetoSelecionado,
      projetoDefaultSelecionado,
      coordenadorSelecionado,
      projetoFaseSelecionado,
      categoriaAtividadeSelecionado,
      tagAtividade,
      descricaoAtividade
    )
  }
  //#endregion

  //#region Renders
  const renderBarraProgresso = () => {
    const mesReferencia = new Date()
    return <BarraProgresso mesReferencia={mesReferencia} />
  }

  const renderCampoCategoriaAtividade = () => {
    return listaCategoriaAtividade.length > 1 ?
      <Grid item xs={12} sm={6} md={4} xl={4} align="center" >
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label-fase">Categoria Atividade*</InputLabel>
          <Select
            error={!categoriaAtividadeSelecionadoCheck}
            id="select-projetoDefault"
            label='Selecione uma Categoria'
            labelId="select-categoria"
            onChange={handleChangeCategoriaAtividade}
            onFocus={validaCategoriaAtividadeSelecionado}
            placeholder='Selecione uma Categoria'
            value={categoriaAtividadeSelecionado}
          >
            {
              listaCategoriaAtividade.map((categoriaAtividade) => (
                <MenuItem value={categoriaAtividade.IdProjetoCategoriaAtividade} key={categoriaAtividade.IdProjetoCategoriaAtividade}>{categoriaAtividade.Descricao}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const renderCampoCoordenador = () => {
    return projetoSelecionado === -1 && listaCoordenador.length > 1 ?
      <Grid item xs={12} sm={6} md={4} xl={4} align="center">
        <FormControl className={classes.formControl} >
          <InputLabel id="demo-simple-select-label">Coordenador*</InputLabel>
          <Select
            error={!coordenadorSelecionadoCheck}
            id="demo-simple-select"
            label='Selecione um(a) Coordenador(a)'
            labelId="select-coordenador"
            onChange={handleChangeCoordenador}
            onFocus={validaCoordenadorSelecionado}
            placeholder='Selecione um(a) Coordenador(a)'
            value={coordenadorSelecionado}
          >
            {
              listaCoordenador.map((coordenador) => (
                <MenuItem value={coordenador.IdColaborador} key={coordenador.IdColaborador}>{coordenador.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const renderCampoDescricao = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align="center">
        <FormControl className={classes.formControl}>
          <TextField
            error={!descricaoAtividadeCheck}
            id="outlined-basic"
            label="Descricao da Atividade"
            // multiline
            onChange={handleChangeDescricao}
            onFocus={validaDescricaoAtividade}
            placeholder='Descrição da Atividade'
            value={descricaoAtividade}
          />
        </FormControl>
      </Grid>
    )
  }

  const renderCampoProjeto = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align="center">
        <FormControl className={classes.formControl} >
          <InputLabel id="select-label-projeto">Projeto*</InputLabel>
          <Select
            error={!projetoSelecionadoCheck}
            id="select-projeto"
            label="Selecione um Projeto"
            labelId="select-projeto"
            onChange={handleChangeProjeto}
            onFocus={validaProjetoSelecionado}
            placeholder="Selecione um Projeto"
            value={projetoSelecionado}
          >
            {
              listaProjeto.map((proj) => (
                <MenuItem value={proj.IdProjeto} key={proj.IdProjeto}>{proj.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
    )
  }

  const renderCampoProjetoDefault = () => {
    return projetoSelecionado === -1 && listaProjetoDefault.length > 1 ?
      <Grid item xs={12} sm={6} md={4} xl={4} align="center" >
        <FormControl className={classes.formControl} >
          <InputLabel id="select-label-fase">Projeto Default*</InputLabel>
          <Select
            error={!projetoDefaultSelecionadoCheck}
            id="select-projetoDefault"
            label='Selecione um Projeto Default'
            labelId="select-projeto-default"
            onChange={handleChangeProjetoDefault}
            onFocus={validaProjetoDefaultSelecionado}
            placeholder='Selecione um Projeto Default'
            value={projetoDefaultSelecionado}
          >
            {
              listaProjetoDefault.map((projDef) => (
                <MenuItem value={projDef.IdProjeto} key={projDef.IdProjeto}>{projDef.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const renderCampoProjetoFase = () => {
    return listaProjetoFase.length > 1 ?
      <Grid item xs={12} sm={6} md={4} xl={4} align="center" >
        <FormControl className={classes.formControl} >
          <InputLabel id="select-label-fase">Fase*</InputLabel>
          <Select
            error={!projetoFaseSelecionadoCheck}
            id="select-projetoDefault"
            label='Selecione uma Fase'
            labelId="select-fase"
            onChange={handleChangeProjetoFase}
            onFocus={validaProjetoFaseSelecionado}
            placeholder='Selecione uma Fase'
            value={projetoFaseSelecionado}
          >
            {
              listaProjetoFase.map((projFase) => (
                <MenuItem value={projFase.IdProjetoMetodologiaFase} key={projFase.IdProjetoMetodologiaFase}>{projFase.Fase}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid> : null
  }

  const renderCampoTag = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align="center">
        <ChipInput
          classes={{ input: classes.input }}
          fullWidth
          onChange={handleChangeTag}
          label="Tags*"
          placeholder="Tags"
          value={tagAtividade}
        />
      </Grid>
    )
  }

  const renderCargaAtividadePicker = () => {
    return (
      <TimePicker
        onChange={handleChangeCargaAtividade}
        value={cargaSelecionada}
      />
    )
  }

  const renderDiaAtividadePicker = () => {
    return (
      <DataPicker
        onChange={handleChangeDiaAtividade}
        value={diaAtividade}
      />
    )
  }

  //#endregion

  return (
    <div className="container">
      {/* {renderBarraProgresso()} */}
      {renderDiaAtividadePicker()}
      {renderCargaAtividadePicker()}
      <Grid container spacing={3}>
        {renderCampoProjeto()}
        {renderCampoProjetoFase()}
        {renderCampoCategoriaAtividade()}
        {renderCampoProjetoDefault()}
        {renderCampoCoordenador()}
        {renderCampoTag()}
        {renderCampoDescricao()}
      </Grid>
      <Button
        onClick={handleSalvarAtividade}
        variant="contained"
        className={classes.colorDefault}
        disabled={!formularioCheck}
      >
        Salvar Atividade
      </Button>
    </div>
  )
}
