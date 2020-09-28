"use strict";

var _browser = require("./modules/browser");

var _lighthouse = require("./modules/lighthouse");

var _connection = require("./modules/connection");

const {
  Client
} = require("pg");

const lhObserverConfig = require("../../lh-observer.config");

const main = async targetUrls => {
  const lighthousePromises = targetUrls.map(async url => {
    const browser = await (0, _browser.launchBrowser)();
    const {
      lhr
    } = await (0, _lighthouse.runLighthouse)(browser, url);
    if (browser) await browser.close();
    return (0, _lighthouse.formatLighthouseResult)(lhr);
  });
  const lighthouseResults = await Promise.all(lighthousePromises).then(results => results);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  lighthouseResults.forEach(result => {
    (0, _connection.storeLighthouseResult)(client, result);
  });
};

main(lhObserverConfig.targetUrls);