import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import PostAdd from '@material-ui/icons/PostAdd'
import Today from '@material-ui/icons/Today'
import EventAvailable from '@material-ui/icons/EventAvailable'


export default (props) => {
  const history = useHistory()
  const [valueNavBar, setValueNavBar] = React.useState()

  useEffect(() => {
    const pathUrl = window.location.pathname
    switch (pathUrl) {
      case '/resumoMes':
        setValueNavBar(0)
        break
      case '/incluirAtv':
        setValueNavBar(1)
        break
      case '/fecharSem':
        setValueNavBar(2)
        break
      default:
        setValueNavBar()
        break
    }
  }, [])

  return (
    <BottomNavigation
      className={`fixed-bottom`}
      value={valueNavBar}
      showLabels
      onChange={(event, newValue) => {
        setValueNavBar(newValue)
      }}
    >
      <BottomNavigationAction
        onClick={() => history.push('/resumoMes')}
        label='Resumo Mes'
        icon={<Today />}
      />

      <BottomNavigationAction
        onClick={() => history.push('/incluirAtv')}
        label='Incluir Atividade'
        icon={<PostAdd />}
      />

      <BottomNavigationAction
        onClick={() => history.push('/fecharSem')}
        label='Fechar Semana'
        icon={<EventAvailable />}
      />
    </BottomNavigation>
  )
}
