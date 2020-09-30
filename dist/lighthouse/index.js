"use strict";

var _browser = require("./modules/browser");

var _lighthouse = require("./modules/lighthouse");

var _spreadsheet = require("./modules/spreadsheet");

const lhObserverConfig = require("../../lh-observer.config");

const main = async () => {
  const browser = await (0, _browser.launchBrowser)();

  for (let url of lhObserverConfig.targetUrls) {
    const {
      lhr
    } = await (0, _lighthouse.runLighthouse)(browser, url);
    const result = (0, _lighthouse.formatLighthouseResult)(lhr);
    await (0, _spreadsheet.appendSpreadSheet)(url, [result]);
  }

  if (browser) await browser.close();
};

exports.runLighthouseObserver = main;