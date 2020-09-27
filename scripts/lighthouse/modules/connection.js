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

export const createLigthouseTable = (client) => {
  const query = `CREATE TABLE IF NOT EXISTS lighthouse (
  id SERIAL NOT NULL,
  first_contentful_paint numeric,
  speed_index numeric,
  largest_contentful_paint numeric,
  interactive numeric,
  total_blocking_time numeric,
  cumulative_layout_shift numeric,
  first_cpu_idle numeric,
  max_potential_fid numeric,
  first_meaningful_paint numeric,
  estimated_input_latency numeric,
  server_response_time numeric,
  mainthread_work_breakdown numeric,
  bootup_time numeric,
  network_server_latency numeric,
  performance numeric,
  accessibility numeric,
  best_practices numeric,
  seo numeric,
  pwa numeric,
  fetch_time numeric,
  requested_url varchar(255),
  created_at timestamp default current_timestamp,
  PRIMARY KEY (id)
);`
  client.connect();
  client.query(query, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}