import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PostAdd from "@material-ui/icons/PostAdd";
import Today from "@material-ui/icons/Today";
import EventAvailable from "@material-ui/icons/EventAvailable";
import { useHistory } from "react-router-dom";

export default (props) => {
  const history = useHistory();

  return (
      <BottomNavigation className="fixed-bottom"
        value={props.valueNavBar}
        showLabels
      >
        <BottomNavigationAction
          onClick={() => history.push("/resumoMes")}
          label="Resumo Mes"
          icon={<Today />}
        />
        <BottomNavigationAction
          onClick={() => history.push("/incluirAtv")}
          label="Incluir Atividade"
          icon={<PostAdd />}
        />
        <BottomNavigationAction
          onClick={() => history.push("/fecharSem")}
          label="Fechar Semana"
          icon={<EventAvailable />}
        />
      </BottomNavigation>
  );
}
