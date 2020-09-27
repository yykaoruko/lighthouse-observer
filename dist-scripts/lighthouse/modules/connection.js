"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeLighthouseResult = void 0;

var _constants = require("./constants");

const storeLighthouseResult = (client, lighthouseResult) => {
  const keysString = _constants.lighthouseDBColumnNames.join(',');

  let valuesString = '';
  lighthouseResult.forEach((result, index) => {
    if (index !== 0) valuesString += ',';
    valuesString += `$${index + 1}`;
  });
  const query = `INSERT INTO lighthouse (${keysString}) VALUES (${valuesString});`;
  console.log(query);
  client.connect();
  client.query(query, lighthouseResult, (err, res) => {
    if (err) throw err;

    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }

    client.end();
  });
};

exports.storeLighthouseResult = storeLighthouseResult;