"use strict";

var _modules = require("./modules");

const {
  Client
} = require("pg");

const lhObserverConfig = require("../../lh-observer.config");

const main = async targetUrls => {
  const lighthousePromises = targetUrls.map(async url => {
    const browser = await (0, _modules.launchBrowser)();
    const {
      lhr
    } = await (0, _modules.runLighthouse)(browser, url);
    if (browser) await browser.close();
    return (0, _modules.formatLighthouseResult)(lhr);
  });
  const lighthouseResults = await Promise.all(lighthousePromises).then(results => results);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  lighthouseResults.forEach(result => {
    (0, _modules.storeLighthouseResult)(client, result);
  });
};

main(lhObserverConfig.targetUrls);