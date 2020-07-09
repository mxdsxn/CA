import React from "react";
import "./style.css";
import { ProgressBar } from "react-bootstrap";
import { Container } from "@material-ui/core";

export default () => {
  const [BpPassado, setBpPassado] = React.useState();
  const [BpPresente, setBpPresente] = React.useState();
  const [BpFuturo, setBpFuturo] = React.useState();
  const [BpExtra, setBpExtra] = React.useState();

  React.useEffect(() => {
    setBpExtra(10)
    setBpFuturo(50)
    setBpPresente(10)
    setBpPassado(40)
  }, [])

  return (
    <Container>
      <ProgressBar className="barra-progresso">
        <ProgressBar variant="success" now={BpPassado} key={1} />
        <ProgressBar animated variant="success" now={BpPresente} key={2} />
        <ProgressBar animated now={BpFuturo} key={3} />
        <ProgressBar variant="warning" now={BpExtra} key={4} />
      </ProgressBar>
    </Container>
  );
};
