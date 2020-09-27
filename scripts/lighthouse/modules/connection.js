export const storeLighthouseResult = (client, lighthouseResult) => {
  const keysString = Object.keys(lighthouseResult).join(',');
  const valuesString = Object.values(lighthouseResult).join(',');
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
}