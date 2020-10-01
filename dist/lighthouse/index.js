"use strict";

var _browser = require("./modules/browser");

var _lighthouse = require("./modules/lighthouse");

var _spreadsheet = require("./modules/spreadsheet");

const config = require("../../lh-observer.config");

const main = async () => {
  const browser = await (0, _browser.launchBrowser)();
  const auth = await (0, _spreadsheet.getGoogleClientAuth)();

  for (let target of config.targets) {
    console.log('[start]', target.url);
    const {
      lhr
    } = await (0, _lighthouse.runLighthouse)(browser, target.url);
    const result = (0, _lighthouse.formatLighthouseResult)(lhr);
    await (0, _spreadsheet.appendSpreadSheet)(auth, target.sheetName, [result]);
  }

  if (browser) await browser.close();
};

exports.runLighthouseObserver = main;