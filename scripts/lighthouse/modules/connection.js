import { lighthouseDBColumnNames } from './constants';
export const storeLighthouseResult = (client, lighthouseResult) => {
  const keysString = lighthouseDBColumnNames.join(',');
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
}