import { launchBrowser } from "./modules/browser";
import { runLighthouse, formatLighthouseResult } from "./modules/lighthouse";
import { appendSpreadSheet } from './modules/spreadsheet';
const lhObserverConfig = require("../../lh-observer.config");

const main = async () => {
  const browser = await launchBrowser();
  for (let url of lhObserverConfig.targetUrls) {
    const { lhr } = await runLighthouse(browser, url);
    const result = formatLighthouseResult(lhr);
    await appendSpreadSheet(url, [result])
  }
  if (browser) await browser.close();
}

exports.runLighthouseObserver = main;