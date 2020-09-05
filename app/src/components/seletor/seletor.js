import React from 'react'

import {
    TextField,
    MenuItem,
} from '@material-ui/core'

export default (props) => {
    const emptyList = () => <MenuItem value={0} key={0}>Selecione</MenuItem>
    const defaultList = () => <MenuItem value={-1} key={-1}>Projeto Default</MenuItem>

    const handleChangeValue = (event) => props.onChange(event.target.value)


    const renderMenuItemList = () => {
        switch (props.typeSelect) {
            case 'projeto':
                return [].concat(
                    emptyList(),
                    defaultList(),
                    props.dataList.map((item) => (<MenuItem value={item.IdProjeto} key={item.IdProjeto}>{item.Nome}</MenuItem>)))
            case 'projeto-default':
                return [].concat(
                    emptyList(),
                    props.dataList.map((item) => (<MenuItem value={item.IdProjeto} key={item.IdProjeto}>{item.Nome}</MenuItem>)))
            case 'fase':
                return [].concat(
                    emptyList(),
                    props.dataList.map((item) => (<MenuItem value={item.IdProjetoMetodologiaFase} key={item.IdProjetoMetodologiaFase}>{item.Fase}</MenuItem>)))
            case 'categoria':
                return [].concat(
                    emptyList(),
                    props.dataList.map((item) => (<MenuItem value={item.IdProjetoCategoriaAtividade} key={item.IdProjetoCategoriaAtividade}>{item.Descricao}</MenuItem>)))
            case 'coordenador':
                return [].concat(
                    emptyList(),
                    props.dataList.map((item) => (<MenuItem value={item.IdColaborador} key={item.IdColaborador}>{item.Nome}</MenuItem>)))
            default:
                return emptyList()
        }
    }

    return (
        <TextField
            error={props.error || false}
            fullWidth={props.fullWidth || false}
            helperText={props.helperText || 'Helper Text'}
            id={props.id || 'id-select'}
            label={props.label || 'label'}
            margin={props.margin || 'normal'}
            onChange={handleChangeValue}
            required={props.required || false}
            select
            size={props.size || 'small'}
            value={props.value || 0}
        >
            {renderMenuItemList()}
        </TextField>
    )
}
