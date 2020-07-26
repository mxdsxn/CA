import React from "react";
import "./style.css";
import { Container, Hidden } from "@material-ui/core";
import BtnIncluir from "./incluir-atividade/";
import BtnFechar from "./fechar-semana/";

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
  );
};
