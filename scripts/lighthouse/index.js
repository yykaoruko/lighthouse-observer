import {
  launchBrowser,
  runLighthouse,
  formatLighthouseResult,
  storeLighthouseResult } from './modules';
const { Client } = require('pg');
const lhObserverConfig = require('../../lh-observer.config');

const main = async (targetUrls) => {
  const lighthousePromises = targetUrls.map(async (url) => {
    const browser = await launchBrowser();
    const { lhr } = await runLighthouse(browser, url);
    if (browser) await browser.close();
    return formatLighthouseResult(lhr);
  });

  const lighthouseResults = await Promise
    .all(lighthousePromises)
    .then(results => results);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  lighthouseResults.forEach(result => {
    storeLighthouseResult(client, result);
  });
};

main(lhObserverConfig.targetUrls);