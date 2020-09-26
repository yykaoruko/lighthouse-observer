const pgp = require('pg-promise');
export const storeLighthouseResult = (client, lighthouseResult) => {
  const insertQuery = pgp.helpers.insert(lighthouseResult, null, 'lighthouse');
  client.connect();
  client.query(insertQuery, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}