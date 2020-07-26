import React from "react";
import Routes from "./routes/routes";
import Header from "./components/header";
import Acoes from "./components/acoes";
import { Divider, Hidden } from "@material-ui/core";

export default () => (
  <div className="App">
    <Header />
    <Hidden smDown>
      <Acoes />
    </Hidden>
    <Divider />
    <Routes />
  </div>
);
