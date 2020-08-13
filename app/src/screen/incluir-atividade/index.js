/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState
} from 'react'
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'

import { default as apiConnection } from '../../service/api-connection'
import DataPicker from './datepicker';
import TimePicker from './timepicker/';
import BarraProgresso from '../../components/barra-progresso'

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
  cargaZerada: new Date(' 1 January, 2000'),
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
  setTimeout(() => {
    validaFormulario()
  }, 1000);
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
  const [descricaoAtividadeCheck, setDescricaoAtividadeCheck] = useState(false)
  const [categoriaAtividadeSelecionadoCheck, setCategoriaAtividadeSelecionadoCheck] = useState(false)
  const [coordenadorSelecionadoCheck, setCoordenadorSelecionadoCheck] = useState(false)
  const [projetoDefaultSelecionadoCheck, setProjetoDefaultSelecionadoCheck] = useState(false)
  const [projetoFaseSelecionadoCheck, setProjetoFaseSelecionadoCheck] = useState(false)
  const [projetoSelecionadoCheck, setProjetoSelecionadoCheck] = useState(false)
  const [tagAtividadeCheck, setTagAtividadeCheck] = useState(false)
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
      setCategoriaAtividadeSelecionadoCheck(true)
    else
      setCategoriaAtividadeSelecionadoCheck(false)
  }
  const validaCoordenadorSelecionado = () => {
    if (listaCoordenador.length > 1 && coordenadorSelecionado === 0)
      setCoordenadorSelecionadoCheck(true)
    else
      setCoordenadorSelecionadoCheck(false)
  }
  // const validaContratoAtivoDia = () => { }
  const validaDescricaoAtividade = () => {
    if (descricaoAtividade === '')
      setDescricaoAtividadeCheck(true)
    else
      setDescricaoAtividadeCheck(false)
  }
  // const validaDiaAtividade = () => {}
  const validaProjetoDefaultSelecionado = () => {
    if (listaProjetoDefault.length > 1 && projetoDefaultSelecionado === 0)
      setProjetoDefaultSelecionadoCheck(true)
    else
      setProjetoDefaultSelecionadoCheck(false)
  }
  const validaProjetoFaseSelecionado = () => {
    if (listaProjetoFase.length > 1 && projetoFaseSelecionado === 0)
      setProjetoFaseSelecionadoCheck(true)
    else
      setProjetoFaseSelecionadoCheck(false)
  }
  const validaProjetoSelecionado = () => {
    if (listaProjeto.length > 1 && projetoSelecionado === 0)
      setProjetoSelecionadoCheck(true)
    else
      setProjetoSelecionadoCheck(false)
  }
  const validaTagAtividade = () => {
    if (tagAtividade === '')
      setTagAtividadeCheck(true)
    else
      setTagAtividadeCheck(false)
  }

  const validaFormulario = () => {
    if (projetoSelecionado === -1)
      projetoDefaultSelecionadoCheck && coordenadorSelecionadoCheck && descricaoAtividadeCheck
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
  const handleChangeDescricao = (event) => { setDescricaoAtividade(event.target.value) }
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
      <Grid item xs={12} sm={6} md={4} xl={4} align='center' >
        <TextField
          error={categoriaAtividadeSelecionadoCheck}
          fullWidth
          helperText='Selecione uma Categoria'
          id='select-projetoDefault'
          label='Categoria Atividade'
          margin='normal'
          onChange={handleChangeCategoriaAtividade}
          onFocus={validaCategoriaAtividadeSelecionado}
          required
          select
          size='small'
          value={categoriaAtividadeSelecionado}
        >
          {
            listaCategoriaAtividade.map((categoriaAtividade) => (
              <MenuItem value={categoriaAtividade.IdProjetoCategoriaAtividade} key={categoriaAtividade.IdProjetoCategoriaAtividade}>{categoriaAtividade.Descricao}</MenuItem>
            ))
          }
        </TextField>
      </Grid> : null
  }

  const renderCampoCoordenador = () => {
    return projetoSelecionado === -1 && listaCoordenador.length > 1 ?
      <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <TextField
          error={coordenadorSelecionadoCheck}
          fullWidth
          helperText='Selecione um(a) Coordenador(a)'
          id='demo-simple-select'
          label='Coordenador(a)'
          margin='normal'
          onChange={handleChangeCoordenador}
          onFocus={validaCoordenadorSelecionado}
          required
          select
          size='small'
          value={coordenadorSelecionado}
        >
          {
            listaCoordenador.map((coordenador) => (
              <MenuItem value={coordenador.IdColaborador} key={coordenador.IdColaborador}>{coordenador.Nome}</MenuItem>
            ))
          }
        </TextField>
      </Grid> : null
  }

  const renderCampoDescricao = () => {
    return (
      <Grid item xs={12} sm={6} md={4} xl={4} align='center'>
        <TextField
          error={descricaoAtividadeCheck}
          fullWidth
          id='outlined-basic'
          label='Descreva sua atividade'
          helperText=' '
          margin='normal'
          multiline
          onChange={handleChangeDescricao}
          onFocus={validaDescricaoAtividade}
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
        <TextField
          error={projetoSelecionadoCheck}
          fullWidth
          helperText='Selecione um Projeto'
          id='select-projeto'
          label='Projeto'
          margin='normal'
          onChange={handleChangeProjeto}
          onFocus={validaProjetoSelecionado}
          required
          select
          size='small'
          value={projetoSelecionado}
        >
          {
            listaProjeto.map((proj) => (
              <MenuItem value={proj.IdProjeto} key={proj.IdProjeto}>{proj.Nome}</MenuItem>
            ))
          }
        </TextField>
      </Grid>
    )
  }

  const renderCampoProjetoDefault = () => {
    return projetoSelecionado === -1 && listaProjetoDefault.length > 1 ?
      <Grid item xs={12} sm={6} md={4} xl={4} align='center' >
        <TextField
          error={projetoDefaultSelecionadoCheck}
          fullWidth
          helperText='Selecione um Projeto Default'
          id='select-projeto-default'
          label='Projeto Default'
          margin='normal'
          onChange={handleChangeProjetoDefault}
          onFocus={validaProjetoDefaultSelecionado}
          required
          select
          size='small'
          value={projetoDefaultSelecionado}
        >
          {
            listaProjetoDefault.map((projDef) => (
              <MenuItem value={projDef.IdProjeto} key={projDef.IdProjeto}>{projDef.Nome}</MenuItem>
            ))
          }
        </TextField>
      </Grid> : null
  }

  const renderCampoProjetoFase = () => {
    return listaProjetoFase.length > 1 ?
      <Grid item xs={12} sm={6} md={4} xl={4} align='center' >
        <TextField
          error={projetoFaseSelecionadoCheck}
          fullWidth
          helperText='Selecione uma Fase'
          id='select-fase-projeto'
          label='Fase Projeto'
          margin='normal'
          onChange={handleChangeProjetoFase}
          onFocus={validaProjetoFaseSelecionado}
          required
          select
          size='small'
          value={projetoFaseSelecionado}
        >
          {
            listaProjetoFase.map((projFase) => (
              <MenuItem value={projFase.IdProjetoMetodologiaFase} key={projFase.IdProjetoMetodologiaFase}>{projFase.Fase}</MenuItem>
            ))}
        </TextField>
      </Grid> : null
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
