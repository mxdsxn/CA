import React from 'react'
import { useHistory } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import PostAdd from '@material-ui/icons/PostAdd'
import Today from '@material-ui/icons/Today'
import EventAvailable from '@material-ui/icons/EventAvailable'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default (props) => {
  const history = useHistory()

  const [state, setState] = React.useState({ right: false })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: 'Historico mensal', path: 'historico-mensal' },
          { text: 'Cadastro de atividade', path: 'cadastro-atividade' },
          { text: 'Fechar semanas', path: 'fechar-semana' }
        ].map((menuItem, index) => (
          <ListItem button key={menuItem.text} onClick={() => history.push(`/${menuItem.path}`)}>
            <ListItemIcon>{index === 0 ? <Today /> : index === 1 ? <PostAdd /> : index === 2 ? <EventAvailable /> : null}</ListItemIcon>
            <ListItemText primary={menuItem.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{ text: 'Sair' }].map((menuItem, index) => (
          <ListItem button key={menuItem.text} onClick={() => history.push('/historico-mensal')}>
            <ListItemIcon>{index === 0 ? <ExitToAppIcon /> : null}</ListItemIcon>
            <ListItemText primary={menuItem.text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <React.Fragment key={'right'}>
        <props.iconMenu onClick={toggleDrawer('right', true)} />
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
