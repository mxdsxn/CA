import React from 'react'

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import HistoricoMensal from '../screen/historico-mensal'
import CadastroAtividade from '../screen/cadastrar-apontamento'
import EditarAtividade from '../screen/editar-apontamento'
import FecharSemana from '../screen/fechar-semana'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <Route
            path='/historico-mensal'
            render={(props) => <HistoricoMensal {...props} />}
          />
          <Route path='/' exact>
            <Redirect to='/cadastro-atividade' />
          </Route>
          <Route
            path='/cadastro-atividade'
            render={(props) => <CadastroAtividade {...props} />}
          />
          <Route
            path='/editar-atividade'
            render={(props) => <EditarAtividade {...props} />}
          />
          <Route
            path='/fechar-semana'
            render={(props) => <FecharSemana {...props} />}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
