import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { format } from 'date-fns'

import CardAtividade from "./atividade-card";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels(props) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    console.log(panel)
  };

  if (props.atvMes != null && props.atvMes.length > 0) {
    handleChange(props.atvMes[0].dia)
    return (
      <>
        {props.atvMes.map((dia) => (
          dia.atividadesDia.length === 0 ? null : (
            <ExpansionPanel
              square
              expanded={expanded === dia.dia}
              onChange={handleChange(dia.dia)}
            >
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{format(new Date(
                  Date.UTC(
                    new Date(dia.dia).getUTCFullYear(),
                    new Date(dia.dia).getUTCMonth(),
                    new Date(dia.dia).getUTCDate(),
                    + new Date(dia.dia).getHours(),
                    0,
                    0,
                    0
                  )), "d/MM/yyyy")}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {
                    dia.atividadesDia.map(atv =>
                      <>
                        <CardAtividade atv={atv} />
                      </>
                    )
                  }
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        ))
        }
      </>
    )
  } else
    return <div> -  Nenhuma atividade registrada  - </div>
}
