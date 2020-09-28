import { launchBrowser } from "./modules/browser";
import { runLighthouse, formatLighthouseResult } from "./modules/lighthouse";
import { storeLighthouseResult } from "./modules/connection";
const { Client } = require("pg");
const lhObserverConfig = require("../../lh-observer.config");

const main = async (targetUrls) => {
  const lighthouseResults = [];
  const browser = await launchBrowser();
  for (let url of targetUrls) {
    const { lhr } = await runLighthouse(browser, url);
    const result = formatLighthouseResult(lhr);
    lighthouseResults.push(result);
  }
  if (browser) await browser.close();

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  storeLighthouseResult(client, lighthouseResults);
};

main(lhObserverConfig.targetUrls);
