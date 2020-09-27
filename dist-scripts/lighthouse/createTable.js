"use strict";

var _connection = require("./modules/connection");

const {
  Client
} = require('pg');

const main = async targetUrls => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  (0, _connection.createLigthouseTable)(client);
};

main();