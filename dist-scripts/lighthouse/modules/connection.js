"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeLighthouseResult = void 0;

const storeLighthouseResult = (client, lighthouseResult) => {
  const keysString = Object.keys(lighthouseResult).join(',');
  let valuesString = '';
  Object.values(lighthouseResult).forEach(value => {
    if (valuesString.length > 0) valuesString += `,`;

    if (typeof value === 'string') {
      valuesString += `"${value}"`;
      return;
    }

    valuesString += `${value}`;
  });
  const insertQuery = `INSERT INTO products (${keysString}) VALUES (${valuesString});`;
  console.log(insertQuery);
  client.connect();
  client.query(insertQuery, (err, res) => {
    if (err) throw err;

    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }

    client.end();
  });
};

exports.storeLighthouseResult = storeLighthouseResult;