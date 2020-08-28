/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React from 'react'


import {
    TextField,
    MenuItem,
} from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'

export default (props) => {
    const defaultList = [{ idItem: 0, labelItem: 'Selecione' }]
    const [dataList, setDataList] = useState(props.dataList)

    const handleChangeValue = (event) => props.onChange(event.target.value)

    useEffect(() => {
        setDataList([].concat(
            defaultList,
            props.defaultList || [],
            props.dataList || []
        ))
    }, [])

    console.log(dataList, props.id)
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
            {
                dataList.map((item) => (
                    <MenuItem value={item.idItem} key={item.idItem}>{item.labelItem}</MenuItem>
                ))
            }
        </TextField>
    )
}