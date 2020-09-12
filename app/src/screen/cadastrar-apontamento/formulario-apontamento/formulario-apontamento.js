/* eslint-disable react-hooks/exhaustive-deps */
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

import DataPicker from '../datepicker'
import TimePicker from '../timepicker'
import Seletor from '../../../components/seletor'

import {
  atividadeApi,
  colaboradorApi,
  projetoApi,
  projetoCategoriaAtividadeApi,
  projetoMetodologiaFaseApi,
} from '../../../service/api-connection'

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
  cargaZerada: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
  diaAtividade: moment().startOf('day').utcOffset(false),
  idDefault: 0,
  listaProjeto: [{ IdProjeto: -1, Nome: 'Projeto Default' }],
}

export default (_props) => {
  //#region Constantes
  const classes = useStyles()
  const idColaboradorLogado = 2359
  //#endregion

  //#region States
  // states do formulario
  const [listaProjeto, setListaProjeto] = useState([])
  const [listaProjetoDefault, setListaProjetoDefault] = useState([])
  const [listaCoordenador, setListaCoordenador] = useState([])
  const [listaProjetoFase, setListaProjetoFase] = useState([])
  const [listaCategoriaAtividade, setListaCategoriaAtividade] = useState([])

  // states selecionados
  const [diaAtividade, setDiaAtividade] = useState(defaultValue.diaAtividade)
  const [cargaSelecionada, setCargaSelecionada] = useState(defaultValue.cargaZerada)
  const [projetoSelecionado, setProjetoSelecionado] = useState(defaultValue.idDefault)
  const [projetoDefaultSelecionado, setProjetoDefaultSelecionado] = useState(defaultValue.idDefault)
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(defaultValue.idDefault)
  const [projetoFaseSelecionado, setProjetoFaseSelecionado] = useState(defaultValue.idDefault)
  const [categoriaAtividadeSelecionado, setCategoriaAtividadeSelecionado] = useState(defaultValue.idDefault)
  const [descricaoAtividade, setDescricaoAtividade] = useState('')
  const [tagAtividade, setTagAtividade] = useState([])

  // state validacao
  const [formularioCheck, setFormularioCheck] = useState(false)
  //#endregion

  //#region Funcoes
  const zeraIdSelecionados = () => {
    setCoordenadorSelecionado(0)
    setProjetoDefaultSelecionado(0)
    setCategoriaAtividadeSelecionado(0)
    setProjetoFaseSelecionado(0)
    setProjetoSelecionado(0)
  }
  //#endregion

  //#region UseEffects
  useEffect(() => {
    projetoApi.projetosByIdColaboradorDia(idColaboradorLogado, diaAtividade.format('YYYY-MM-DD'))
      .then(res => res ? setListaProjeto(res) : setListaProjeto([]))

    setDescricaoAtividade('')
    setListaCategoriaAtividade([])
    setListaCoordenador([])
    setListaProjetoFase([])
    setListaProjetoDefault([])
    setTagAtividade([])
    zeraIdSelecionados()
  }, [diaAtividade])

  useEffect(() => {
    setDescricaoAtividade('')
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

      projetoApi.projetosDefault(diaAtividade.format('YYYY-MM-DD'))
        .then(res => res ? setListaProjetoDefault(res) : setListaProjetoDefault([]))

      colaboradorApi.coordenadoresByDia(diaAtividade.format('YYYY-MM-DD'))
        .then(res => res ? setListaCoordenador(res) : setListaCoordenador([]))

    } else if (projetoSelecionado === 0) {
      setListaProjetoFase([])
      setListaCategoriaAtividade([])
      setListaProjetoDefault([])
      setListaCoordenador([])
      zeraIdSelecionados()
    }
  }, [projetoSelecionado])

  useEffect(() => {
    validaFormulario()
  }, [projetoDefaultSelecionado, coordenadorSelecionado, categoriaAtividadeSelecionado, projetoFaseSelecionado, descricaoAtividade, cargaSelecionada])
  //#endregion

  //#region Handles
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
      idColaboradorLogado,
      null,
      diaAtividade.format('YYYY-MM-DD'),
      cargaSelecionada.format('YYYY-MM-DD HH:mm'),
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
  const validaFormulario = () => {
    if (descricaoAtividade !== '' && (cargaSelecionada.hour() > 0 || cargaSelecionada.minute() > 0)) {
      if (projetoSelecionado === -1) {
        if (listaProjetoDefault.length > 0 && listaCoordenador.length > 0 && projetoDefaultSelecionado > 0 && coordenadorSelecionado > 0)
          setFormularioCheck(true)
        else setFormularioCheck(false)
      }
      else if (projetoSelecionado > 0) {
        if ((listaProjetoFase.length > 0 ? (projetoFaseSelecionado > 0 ? true : false) : true) && (listaCategoriaAtividade.length > 0 ? categoriaAtividadeSelecionado > 0 ? true : false : true))
          setFormularioCheck(true)
        else setFormularioCheck(false)
      }
    } else
      setFormularioCheck(false)
  }
  //#endregion

  //#region Renders

  const renderCampoCategoriaAtividade = () => {
    return listaCategoriaAtividade.length > 0
      ? <Grid item xs={12} sm={6} md={4} xl={4} align='center' >
        <Seletor
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
        <Seletor
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
        <Seletor
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
        <Seletor
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
        <Seletor
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
      <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <TimePicker
          fullWidth
          onChange={handleChangeCargaAtividade}
          value={cargaSelecionada}
        />
      </Grid>
    )
  }

  const renderDiaAtividadePicker = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <DataPicker
          fullWidth
          onChange={setDiaAtividade}
          value={diaAtividade}
        />
      </Grid>
    )
  }

  //#endregion

  return (
    <div className='container'>
      <Grid container spacing={4}>
        {renderDiaAtividadePicker()}
        {renderCargaAtividadePicker()}
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
