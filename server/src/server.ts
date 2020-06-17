import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/api", (req, res) => {
  res.json({ message: "bem vindo à api do cadastro de atividades dextra" });
});

app.listen(1111);
