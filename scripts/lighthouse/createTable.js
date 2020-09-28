import { createLigthouseTable } from "./modules/connection";
const { Client } = require("pg");

const main = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  createLigthouseTable(client);
};

main();
