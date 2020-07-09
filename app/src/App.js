import React from "react";
import Routes from "./routes/routes";
import Header from "./components/header";
import Acoes from "./components/acoes";
import BarraProgresso from "./components/barra-progresso";
import { Divider, Hidden } from "@material-ui/core";

export default () => (
  <div className="App">
    <Header />
    <BarraProgresso />

    <Hidden smDown>
      <Acoes />
    </Hidden>

    <Divider />

    <Routes />

  </div>
);
