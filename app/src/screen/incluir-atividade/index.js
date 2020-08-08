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

const idColaboradorLogado = 2359

const listasDefault = {
  projeto: [{ IdProjeto: 0, Nome: 'Selecione' }, { IdProjeto: -1, Nome: 'Projeto Default' }],
  projetoDefault: [{ IdProjeto: 0, Nome: 'Selecione' }],
  projetoFase: [{ IdProjetoMetodologiaFase: 0, Fase: 'Selecione' }],
  categoriaAtividade: [{ IdProjetoCategoriaAtividade: 0, Descricao: 'Selecione' }],
  coordenador: [{ IdColaborador: 0, Nome: 'Selecione' }],
  contratoAtivo: { CargaHoraria: 0 }
}

export default (props) => {
  const classes = useStyles()

  const [listaProjeto, setListaProjeto] = useState(listasDefault.projeto)
  const [listaProjetoDefault, setListaProjetoDefault] = useState(listasDefault.projetoDefault)
  const [listaProjetoFase, setListaProjetoFase] = useState(listasDefault.projetoFase)
  const [listaCategoriaAtividade, setListaCategoriaAtividade] = useState(listasDefault.categoriaAtividade)
  const [listaCoordenador, setListaCoordenador] = useState(listasDefault.coordenador)
  const [contratoAtivoDia, setContratoAtivo] = useState()

  const dataInicio = new Date("01/01/1900")
  const cargaReferencia = new Date(" 1 January, 2000")

  const [diaAtividade, setDiaAtividade] = useState(new Date())
  const [cargaSelecionada, setCargaSelecionada] = useState(cargaReferencia)
  const [projetoSelecionado, setProjetoSelecionado] = useState(0)
  const [projetoDefaultSelecionado, setProjetoDefaultSelecionado] = useState(0)
  const [projetoFaseSelecionado, setProjetoFaseSelecionado] = useState(0)
  const [categoriaAtividadeSelecionado, setCategoriaAtividadeSelecionado] = useState(0)
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(0)
  const [tagAtividade, setTagAtividade] = useState('')
  const [descricaoAtividade, setDescricaoAtividade] = useState('')

  console.log(cargaSelecionada)
  // reseta campos caso dia da atividade mude
  // carrega projeto que o colaborador esta alocado
  useEffect(() => {
    apiConnection.projeto.GetProjetosByIdColaboradorDia(idColaboradorLogado, diaAtividade)
      .then(res =>
        res ?
          setListaProjeto([].concat(listasDefault.projeto, res)) :
          setListaProjeto(listasDefault.projeto)
      )
    apiConnection.colaboradorContrato.GetContratoAtivoByIdColaboradorDia(idColaboradorLogado, diaAtividade)
      .then(res =>
        res ?
          setContratoAtivo(res) :
          setContratoAtivo(listasDefault.contratoAtivo)
      )
    setListaProjetoFase(listasDefault.projetoFase)
    setListaCategoriaAtividade(listasDefault.categoriaAtividade)
    setListaProjetoDefault(listasDefault.projetoDefault)
    setListaCoordenador(listasDefault.coordenador)
    setTagAtividade('')
    setDescricaoAtividade('')
  }, [diaAtividade])

  useEffect(() => {
    // se algum projeto(>0) selecionado, carregar Fase e Categoria, caso existam
    if (projetoSelecionado > 0) {
      listaProjetoDefault !== listasDefault.projetoDefault ?? setListaProjetoDefault(listasDefault.projetoDefault)
      listaCoordenador !== listasDefault.coordenador ?? setListaCoordenador(listasDefault.coordenador)

      // if (listaProjeto.find(x => x.IdProjeto === projetoSelecionado).IdProjetoTipo !== 4) {
      apiConnection.projetoMetodologiaFase.GetProjetoFaseByIdProjeto(projetoSelecionado)
        .then(res =>
          res ?
            setListaProjetoFase([].concat(listasDefault.projetoFase, res)) :
            setListaProjetoFase(listasDefault.projetoFase)
        )
      setProjetoFaseSelecionado(0)
      setListaCategoriaAtividade(listasDefault.categoriaAtividade)
      // }

      // if (listaProjeto.find(x => x.IdProjeto === projetoSelecionado).IdProjetoTipo === 4) {
      apiConnection.projetoCategoriaAtividade.GetProjetoCategoriaAtividadeByIdProjeto(projetoSelecionado)
        .then(res =>
          res ?
            setListaCategoriaAtividade([].concat(listasDefault.categoriaAtividade, res)) :
            setListaCategoriaAtividade(listasDefault.categoriaAtividade)
        )
      setCategoriaAtividadeSelecionado(0)
      setListaProjetoFase(listasDefault.projetoFase)
      // }

    } else
      // se projeto é default (-1), carrega projetos default e coordenadores 
      if (projetoSelecionado === -1) {
        listaProjetoFase !== listasDefault.listaProjetoFase ?? setListaProjetoFase(listasDefault.projetoFase)
        listaCategoriaAtividade !== listasDefault.listaCategoriaAtividade ?? setListaCategoriaAtividade(listasDefault.categoriaAtividade)

        apiConnection.projeto.GetProjetosDefault(diaAtividade)
          .then(res =>
            res ?
              setListaProjetoDefault([].concat(listasDefault.projetoDefault, res)) :
              setListaProjetoDefault(listasDefault.projetoDefault)
          )
        setProjetoDefaultSelecionado(0)

        apiConnection.colaborador.GetCoordenadoresByDia(diaAtividade)
          .then(res =>
            res ?
              setListaCoordenador([].concat(listasDefault.coordenador, res)) :
              setListaCoordenador(listasDefault.coordenador)
          )
        setCoordenadorSelecionado(0)

        setListaCategoriaAtividade(listasDefault.categoriaAtividade)
        setListaProjetoFase(listasDefault.projetoFase)
      } else if (projetoSelecionado === 0) {
        setListaProjetoFase(listasDefault.projetoFase)
        setListaCategoriaAtividade(listasDefault.categoriaAtividade)
        setListaProjetoDefault(listasDefault.projetoDefault)
        setListaCoordenador(listasDefault.coordenador)
        setCoordenadorSelecionado(0)
        setProjetoDefaultSelecionado(0)
        setCategoriaAtividadeSelecionado(0)
        setProjetoFaseSelecionado(0)

      }

  }, [projetoSelecionado])

  const handleChangeDiaAtividade = (diaAtividade) => {
    setProjetoSelecionado(0)
    setDiaAtividade(diaAtividade)
  }
  const handleChangeCargaAtividade = (cargaAtividade) => {
    setCargaSelecionada(cargaAtividade)
  }
  const handleChangeProjeto = (event) => setProjetoSelecionado(event.target.value)
  const handleChangeProjetoDefault = (event) => setProjetoDefaultSelecionado(event.target.value)
  const handleChangeProjetoFase = (event) => setProjetoFaseSelecionado(event.target.value)
  const handleChangeCategoriaAtividade = (event) => setCategoriaAtividadeSelecionado(event.target.value)
  const handleChangeCoordenador = (event) => setCoordenadorSelecionado(event.target.value)
  const handleChangeDescricao = (event) => setDescricaoAtividade(event.target.value)
  const handleChangeTag = (tags) => setTagAtividade(tags)

  const salvarAtividade = () => {
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


  const campoProjeto = () => {
    return (
      <Grid item xs={12} sm={12} md={12} xl={12} align="center">
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
                <MenuItem value={proj.IdProjeto} key={proj.IdProjeto}>{proj.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
    )
  }

  const campoProjetoDefault = () => {
    return projetoSelecionado === -1 && listaProjetoDefault !== [] ?
      <Grid item xs={12} sm={12} md={12} xl={12} align="center" >
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
                <MenuItem value={projDef.IdProjeto} key={projDef.IdProjeto}>{projDef.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoProjetoFase = () => {
    return listaProjetoFase !== listasDefault.projetoFase && listaProjetoFase !== [] ?
      <Grid item xs={12} sm={12} md={12} xl={12} align="center" >
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
              listaProjetoFase.map((projFase) => (
                <MenuItem value={projFase.IdProjetoMetodologiaFase} key={projFase.IdProjetoMetodologiaFase}>{projFase.Fase}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoCategoriaAtividade = () => {

    return listaCategoriaAtividade !== listasDefault.categoriaAtividade && listaCategoriaAtividade !== [] ?
      <Grid item xs={12} sm={12} md={12} xl={12} align="center" >
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
              listaCategoriaAtividade.map((categoriaAtividade) => (
                <MenuItem value={categoriaAtividade.IdProjetoCategoriaAtividade} key={categoriaAtividade.IdProjetoCategoriaAtividade}>{categoriaAtividade.Descricao}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoCoordenador = () => {
    return projetoSelecionado === -1 && listaCoordenador !== [] ?
      <Grid item xs={12} sm={12} md={12} xl={12} align="center">
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
                <MenuItem value={coordenador.IdColaborador} key={coordenador.IdColaborador}>{coordenador.Nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid> : null
  }

  const campoTag = () => {
    return (
      <Grid item xs={12} sm={12} md={12} xl={12} align="center">
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
      <Grid item xs={12} sm={12} md={12} xl={12} align="center">
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

  const renderBarraProgresso = () => {
    const mesReferencia = new Date()
    return <BarraProgresso mesReferencia={mesReferencia} />
  }

  const renderDateTimePicker = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12} xl={12} align="center">
          <div align="center">
            <DataPicker
              onChange={handleChangeDiaAtividade}
              value={diaAtividade}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12} align="center">
          <div align="center">
            <TimePicker
              onChange={handleChangeCargaAtividade}
              value={cargaSelecionada}
            />
          </div>
        </Grid>
      </>
    )
  }

  return (
    <div className="container">
      {renderBarraProgresso()}
      {renderDateTimePicker()}
      <Grid container spacing={3}>
        {campoProjeto()}
        {campoProjetoFase()}
        {campoCategoriaAtividade()}
        {campoProjetoDefault()}
        {campoCoordenador()}
        {campoTag()}
        {campoDescricao()}
      </Grid>
      <Button
        onClick={salvarAtividade}
        variant="contained"
        className={classes.colorDefault}
      >
        Salvar Atividade
      </Button>
    </div>
  )
}
