import React from 'react'

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import HistoricoMensal from '../screen/historico-mensal'
import CadastroApontamento from '../screen/cadastrar-apontamento'
import FecharSemana from '../screen/fechar-semana'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <Route
            path='/historico-mensal'
            render={(props) => <HistoricoMensal />}
          />
          <Route path='/' exact>
            <Redirect to='/cadastro-apontamento' />
          </Route>
          <Route
            path='/cadastro-apontamento'
            render={(props) => <CadastroApontamento />}
          />
          <Route
            path='/fechar-semana'
            render={(props) => <FecharSemana />}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
