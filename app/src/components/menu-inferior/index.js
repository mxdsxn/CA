import React, { useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PostAdd from '@material-ui/icons/PostAdd';
import Today from '@material-ui/icons/Today';
import EventAvailable from '@material-ui/icons/EventAvailable';
import { useHistory } from 'react-router-dom';


export default (props) => {
  const history = useHistory();
  const [valueNavBar, setValueNavBar] = React.useState();

  useEffect(() => {
    const pathUrl = window.location.pathname
    pathUrl === '/resumoMes'
      ? setValueNavBar(0)
      : pathUrl === '/incluirAtv'
        ? setValueNavBar(1)
        : pathUrl === '/fecharSem'
          ? setValueNavBar(2)
          : setValueNavBar()
  }, [])

  return (
    <BottomNavigation
      className={`fixed-bottom`}
      value={valueNavBar}
      showLabels
      onChange={(event, newValue) => {
        setValueNavBar(newValue);
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
  );
}
