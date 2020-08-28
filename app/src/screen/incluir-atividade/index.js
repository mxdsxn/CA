/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState
} from 'react'

import {
  Grid,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import moment from 'moment'

import BarraProgresso from '../../components/barra-progresso'
import DataPicker from './datepicker'
import TimePicker from './timepicker/'
import SelectComponent from './select-input'

import {
  atividadeApi,
  colaboradorApi,
  colaboradorContratoApi,
  projetoApi,
  projetoCategoriaAtividadeApi,
  projetoMetodologiaFaseApi,
} from '../../service/api-connection'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  colorDefault: {
    color: '#002C4F',
    background: '#f0ad4e',
  },
  input: {
    padding: '13px',
  },
}))

const defaultValue = {
  cargaZerada: moment().set({ hour: 0, minute: 0, second: 0 }),
  contratoDefault: { CargaHoraria: 0 },
  diaAtividade: moment(),
  idDefault: 0,
  listaProjeto: [{ IdProjeto: -1, Nome: 'Projeto Default' }],
}

export default (props) => {
  //#region Constantes
  const classes = useStyles()
  const idColaboradorLogado = 2359
  //#endregion

  //#region States
  // states do formulario
  const [listaCategoriaAtividade, setListaCategoriaAtividade] = useState([])
  const [listaCoordenador, setListaCoordenador] = useState([])
  const [listaProjeto, setListaProjeto] = useState([])
  const [listaProjetoDefault, setListaProjetoDefault] = useState([])
  const [listaProjetoFase, setListaProjetoFase] = useState([])

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
  const [descricaoAtividadeCheck, setDescricaoAtividadeCheck] = useState(false)
  const [categoriaAtividadeSelecionadoCheck, setCategoriaAtividadeSelecionadoCheck] = useState(false)
  const [coordenadorSelecionadoCheck, setCoordenadorSelecionadoCheck] = useState(false)
  const [projetoDefaultSelecionadoCheck, setProjetoDefaultSelecionadoCheck] = useState(false)
  const [projetoFaseSelecionadoCheck, setProjetoFaseSelecionadoCheck] = useState(false)
  const [projetoSelecionadoCheck, setProjetoSelecionadoCheck] = useState(false)
  const [tagAtividadeCheck, setTagAtividadeCheck] = useState(false)
  const [formularioCheck, setFormularioCheck] = useState(false)
  //#endregion

  //#region Funcoes
  const habilitaBotao = () => {
    if (descricaoAtividadeCheck) {
      if (projetoSelecionado === -1) {
        projetoDefaultSelecionadoCheck && coordenadorSelecionadoCheck
          ? setFormularioCheck(true)
          : setFormularioCheck(false)
      }
      else if (projetoSelecionado > 0) {
        projetoFaseSelecionadoCheck && categoriaAtividadeSelecionadoCheck
          ? setFormularioCheck(true)
          : setFormularioCheck(false)
      }
    } else
      setFormularioCheck(false)
  }

  const zeraIdSelecionados = () => {
    setCoordenadorSelecionado(0)
    setProjetoDefaultSelecionado(0)
    setCategoriaAtividadeSelecionado(0)
    setProjetoFaseSelecionado(0)
  }
  //#endregion

  //#region UseEffects
  useEffect(() => {
    formularioCheck ??
      setFormularioCheck(false)
    validaFormulario()
  }, [projetoSelecionado, projetoDefaultSelecionado, coordenadorSelecionado, categoriaAtividadeSelecionado, projetoFaseSelecionado, descricaoAtividade])

  useEffect(() => {
    colaboradorContratoApi.contratoAtivoByIdColaboradorDia(idColaboradorLogado, diaAtividade.utcOffset(0, true).format())
      .then(res => res ? setContratoAtivo(res) : setContratoAtivo(defaultValue.contratoDefault)
      )
    projetoApi.projetosByIdColaboradorDia(idColaboradorLogado, diaAtividade.utcOffset(0, true).format())
      .then(res => res ? setListaProjeto(res) : setListaProjeto([]))

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

      projetoCategoriaAtividadeApi.projetoCategoriaAtividadeByIdProjeto(projetoSelecionado)
        .then(res => res ? setListaCategoriaAtividade(res) : setListaCategoriaAtividade([]))

      projetoMetodologiaFaseApi.projetoFaseByIdProjeto(projetoSelecionado)
        .then(res => res ? setListaProjetoFase(res) : setListaProjetoFase([]))
    } else if (projetoSelecionado === -1) {
      // se projeto é default (-1), carrega projetos default e coordenadores 
      setListaCategoriaAtividade([])
      setListaProjetoFase([])
      setCategoriaAtividadeSelecionado(0)
      setProjetoFaseSelecionado(0)

      projetoApi.projetosDefault(diaAtividade.utcOffset(0, true).format())
        .then(res => res ? setListaProjetoDefault(res) : setListaProjetoDefault([]))

      colaboradorApi.coordenadoresByDia(diaAtividade.utcOffset(0, true).format())
        .then(res => res ? setListaCoordenador(res) : setListaCoordenador([]))

    } else if (projetoSelecionado === 0) {
      setListaProjetoFase([])
      setListaCategoriaAtividade([])
      setListaProjetoDefault([])
      setListaCoordenador([])
      zeraIdSelecionados()
    }
  }, [projetoSelecionado])
  //#endregion

  //#region Handles
  const handleChangeDiaAtividade = (diaAtividade) => setDiaAtividade(moment(diaAtividade))
  const handleChangeCargaAtividade = (cargaAtividade) => setCargaSelecionada(moment(cargaAtividade))
  const handleChangeProjeto = (value) => setProjetoSelecionado(value)
  const handleChangeProjetoDefault = (value) => setProjetoDefaultSelecionado(value)
  const handleChangeProjetoFase = (value) => setProjetoFaseSelecionado(value)
  const handleChangeCategoriaAtividade = (value) => setCategoriaAtividadeSelecionado(value)
  const handleChangeCoordenador = (value) => setCoordenadorSelecionado(value)
  const handleChangeDescricao = (event) => setDescricaoAtividade(event.target.value)
  const handleChangeTag = (tags) => setTagAtividade(tags)

  const handleSalvarAtividade = () => {
    atividadeApi.salvarAtividade(
      null,
      diaAtividade.utcOffset(0, true).format(),
      cargaSelecionada.utcOffset(0, true).format(),
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
    validaDescricaoAtividade()
    validaProjetoSelecionado()

    if (projetoSelecionado === -1) {
      validaProjetoDefaultSelecionado()
      validaCoordenadorSelecionado()
    }
    else if (projetoSelecionado > 0) {
      validaCategoriaAtividadeSelecionado()
      validaProjetoFaseSelecionado()
    }
    habilitaBotao()
  }
  //#endregion

  //#region Renders
  const renderBarraProgresso = () => {
    const mesReferencia = new Date()
    return <BarraProgresso mesReferencia={mesReferencia} />
  }

  const renderCampoCategoriaAtividade = () => {
    return listaCategoriaAtividade.length > 0
      ? <Grid item xs={12} sm={6} md={4} xl={4} align='center' >
        <SelectComponent
          dataList={listaCategoriaAtividade}
          fullWidth
          helperText='Selecione uma Categoria'
          id='select-catetoria'
          label='Categoria Atividade'
          margin='normal'
          onChange={handleChangeCategoriaAtividade}
          required
          select
          size='small'
          typeSelect='categoria'
          value={categoriaAtividadeSelecionado}
        />
      </Grid>
      : null
  }

  const renderCampoCoordenador = () => {
    return listaCoordenador.length > 0
      ? <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <SelectComponent
          dataList={listaCoordenador}
          fullWidth
          helperText='Selecione um(a) Coordenador(a)'
          id='select-coordenador'
          label='Coordenador(a)'
          margin='normal'
          onChange={handleChangeCoordenador}
          required
          select
          size='small'
          typeSelect='coordenador'
          value={coordenadorSelecionado}
        />
      </Grid>
      : null
  }

  const renderCampoDescricao = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <TextField
          fullWidth
          id='outlined-basic'
          label='Descreva sua atividade'
          helperText=' '
          margin='normal'
          multiline
          onChange={handleChangeDescricao}
          required
          size='small'
          value={descricaoAtividade}
        />
      </Grid>
    )
  }

  const renderCampoProjeto = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <SelectComponent
          dataList={listaProjeto}
          fullWidth
          helperText='Selecione um Projeto'
          id='select-projeto'
          label='Projeto'
          margin='normal'
          onChange={handleChangeProjeto}
          required
          size='small'
          typeSelect='projeto'
          value={projetoSelecionado}
        />
      </Grid >
    )
  }

  const renderCampoProjetoDefault = () => {
    return listaProjetoDefault.length > 0
      ? <Grid item xs={12} sm={6} md={4} xl={4} align='center' >
        <SelectComponent
          dataList={listaProjetoDefault}
          fullWidth
          helperText='Selecione um Projeto Default'
          id='select-projeto-default'
          label='Projeto Default'
          margin='normal'
          onChange={handleChangeProjetoDefault}
          required
          size='small'
          typeSelect='projeto-default'
          value={projetoDefaultSelecionado}
        />
      </Grid>
      : null
  }

  const renderCampoProjetoFase = () => {
    return listaProjetoFase.length > 0
      ? <Grid item xs={12} sm={6} md={4} xl={4} align='center' >
        <SelectComponent
          dataList={listaProjetoFase}
          fullWidth
          helperText='Selecione uma Fase'
          id='select-fase-projeto'
          label='Fase Projeto'
          margin='normal'
          onChange={handleChangeProjetoFase}
          required
          select
          size='small'
          typeSelect='fase'
          value={projetoFaseSelecionado}
        />
      </Grid>
      : null
  }

  const renderCampoTag = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <ChipInput
          classes={{ input: classes.input }}
          fullWidth
          label='Tags'
          onChange={handleChangeTag}
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
    <div className='container'>
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
        variant='contained'
        className={classes.colorDefault}
        disabled={!formularioCheck}
      >
        Salvar Atividade
      </Button>
    </div>
  )
}
