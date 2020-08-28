import React from 'react'
import { Divider } from "@material-ui/core"

import Header from "../../components/header"
import Acoes from "../../components/acoes"
import FormularioAtividade from './formulario-atividade'

export default () => {

    return (
        <>
            <Header />
            <Acoes />
            <Divider />
            <FormularioAtividade />
        </>
    )
}