export const storeLighthouseResult = (client, lighthouseResult) => {
  const insertQuery = 'INSERT INTO lighthouse SET ?';
  client.connect();
  client.query(insertQuery, lighthouseResult, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}