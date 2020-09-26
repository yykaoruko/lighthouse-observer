"use strict";

var _modules = require("./modules");

const lhObserverConfig = require('../../lh-observer.config');

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
  console.log(lighthouseResults);
};

main(lhObserverConfig.targetUrls);