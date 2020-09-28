/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

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
import Notificacao from '../../../components/notificacao'

import {
  atividadeApi,
  colaboradorApi,
  projetoApi,
  projetoCategoriaAtividadeApi,
  projetoMetodologiaFaseApi,
} from '../../../service/api-connection'

import './style.css'

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

export default (props) => {
  const history = useHistory()
  const classes = useStyles()
  const idColaboradorLogado = process.env.REACT_APP_ID_COL

  const [listaProjeto, setListaProjeto] = useState([])
  const [listaProjetoDefault, setListaProjetoDefault] = useState([])
  const [listaCoordenador, setListaCoordenador] = useState([])
  const [listaProjetoFase, setListaProjetoFase] = useState([])
  const [listaCategoriaAtividade, setListaCategoriaAtividade] = useState([])

  const [atividadeEditada, setAtividadeEditada] = useState()

  const [diaAtividade, setDiaAtividade] = useState(defaultValue.diaAtividade)
  const [cargaSelecionada, setCargaSelecionada] = useState(defaultValue.cargaZerada)
  const [projetoSelecionado, setProjetoSelecionado] = useState(defaultValue.idDefault)
  const [projetoDefaultSelecionado, setProjetoDefaultSelecionado] = useState(defaultValue.idDefault)
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(defaultValue.idDefault)
  const [projetoFaseSelecionado, setProjetoFaseSelecionado] = useState(defaultValue.idDefault)
  const [categoriaAtividadeSelecionado, setCategoriaAtividadeSelecionado] = useState(defaultValue.idDefault)
  const [descricaoAtividade, setDescricaoAtividade] = useState('')
  const [tagAtividade, setTagAtividade] = useState([])

  const [formularioCheck, setFormularioCheck] = useState(false)

  const [mostrarNotif, setMostrarNotif] = useState(false)
  const [mensagemNotif, setMensagemNotif] = useState(false)

  const zeraIdSelecionados = () => {
    setCoordenadorSelecionado(0)
    setProjetoDefaultSelecionado(0)
    setCategoriaAtividadeSelecionado(0)
    setProjetoFaseSelecionado(0)
    setProjetoSelecionado(0)
  }

  useEffect(() => {
    atividadeApi.atividadeById(idColaboradorLogado, props.idAtividade)
      .then(atividade => {
        setAtividadeEditada(atividade)

        const carga = atividade.Carga.split(':').map(x => Number(x))
        setCargaSelecionada(cargaSelecionada.hours(carga[0]).minutes(carga[1]))

        setDiaAtividade(moment(moment.utc(atividade.DataAtividade).format('YYYY-MM-DD')))

        setDescricaoAtividade(atividade.Descricao)

      })
  }, [])

  useEffect(() => {
    projetoApi.projetosByIdColaboradorDia(idColaboradorLogado, diaAtividade.format('YYYY-MM-DD'))
      .then(res => {
        if (res) {
          setListaProjeto(res)

          if (atividadeEditada) {
            if (res.find(x => x.IdProjeto === atividadeEditada.IdProjeto)) {
              setProjetoSelecionado(atividadeEditada.IdProjeto)
              setProjetoFaseSelecionado(atividadeEditada.IdProjetoMetodologiaFase ?? 0)
              setCategoriaAtividadeSelecionado(atividadeEditada.IdProjetoCategoriaAtividade ?? 0)

            } else {
              setProjetoSelecionado(-1)
              setProjetoDefaultSelecionado(atividadeEditada.IdProjeto)
            }
          }
        } else
          setListaProjeto([])
      })

    // setListaCategoriaAtividade([])
    // setListaCoordenador([])
    // setListaProjetoFase([])
    // setListaProjetoDefault([])
  }, [diaAtividade])

  useEffect(() => {
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

  const handleChangeCargaAtividade = (cargaAtividade) => setCargaSelecionada(moment(cargaAtividade))
  const handleChangeProjeto = (value) => setProjetoSelecionado(value)
  const handleChangeProjetoDefault = (value) => setProjetoDefaultSelecionado(value)
  const handleChangeProjetoFase = (value) => setProjetoFaseSelecionado(value)
  const handleChangeCategoriaAtividade = (value) => setCategoriaAtividadeSelecionado(value)
  const handleChangeCoordenador = (value) => setCoordenadorSelecionado(value)
  const handleChangeDescricao = (event) => setDescricaoAtividade(event.target.value)
  const handleChangeTag = (tags) => setTagAtividade(tags)
  const handleEditarAtividade = async () => {
    const result = await atividadeApi.editarAtividade(
      idColaboradorLogado,
      atividadeEditada.IdAtividade,
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

    if (result.status === 200) {
      setMensagemNotif(result.data)
      setMostrarNotif(true)
    }
  }

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

  const renderNotificacao = () => {
    return mostrarNotif && mensagemNotif
      ? (
        <Notificacao
          onClose={() => {
            setMostrarNotif(false)
            if (mensagemNotif.tipo === 'Sucesso')
              history.push('historico-mensal')
          }}
          show={mostrarNotif}
          data={mensagemNotif}
        />
      )
      : null
  }

  return (
    <div className='container cadastro'>
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
        onClick={handleEditarAtividade}
        variant='contained'
        className={classes.colorDefault}
        disabled={!formularioCheck}
      >
        Salvar Atividade
      </Button>
      {renderNotificacao()}
    </div>
  )
}
