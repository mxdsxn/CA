import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Hidden } from '@material-ui/core'

import MonthResume from "../screen/resumo-mes";
import IncluirAtv from "../screen/incluir-atividade";
import FecharSem from "../screen/fechar-semana";
import NavBar from "../components/menu-inferior";

//<Redirect exact from='/' to='resumoMes' />
export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <Route
            path="/resumoMes"
            render={(props) => <MonthResume />}
          />
          <Route
            path="/incluirAtv"
            render={(props) => <IncluirAtv />}
          />
          <Route
            path="/fecharSem"
            render={(props) => <FecharSem />}
          />
        </Route>
      </Switch>
      <Hidden mdUp>
        <NavBar />
      </Hidden>
    </BrowserRouter>
  );
};
