import knex from "knex";

const conn = knex({
  client: "mssql",
  connection: {
    server: `VMDEV006.dom_qp.com.br\\DEV`,
    user: "sistemas-internos",
    password: "u@m8w*d6",
    database: "Inovacred",
  },
});

export default conn;
