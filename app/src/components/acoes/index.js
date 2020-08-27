import React from "react"

import {
  Container,
  Hidden
} from "@material-ui/core"

import BtnIncluir from "./incluir-atividade/"
import BtnFechar from "./fechar-semana/"

import "./style.css"

export default () => {
  return (
    <div className="linha">
      <Container className="grid">
        <div className="row">
          <div className="col-sm-6" align="left">
            <Hidden smDown>
              <BtnIncluir />
            </Hidden>
          </div>
          <div className="col-sm-6" align="right">
            <Hidden smDown>
              <BtnFechar />{" "}
            </Hidden>
          </div>
        </div>
      </Container>
    </div>
  )
}
