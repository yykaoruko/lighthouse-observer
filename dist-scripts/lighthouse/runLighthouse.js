"use strict";

var _browser = require("./modules/browser");

var _lighthouse = require("./modules/lighthouse");

var _connection = require("./modules/connection");

const {
  Client
} = require("pg");

const lhObserverConfig = require("../../lh-observer.config");

const main = async targetUrls => {
  const lighthouseResults = [];
  const browser = await (0, _browser.launchBrowser)();

  for (let url of targetUrls) {
    const {
      lhr
    } = await (0, _lighthouse.runLighthouse)(browser, url);
    const result = (0, _lighthouse.formatLighthouseResult)(lhr);
    lighthouseResults.push(result);
  }

  ;
  if (browser) await browser.close();
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  (0, _connection.storeLighthouseResult)(client, lighthouseResults);
};

main(lhObserverConfig.targetUrls);