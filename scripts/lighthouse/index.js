import { launchBrowser } from "./modules/browser";
import { runLighthouse, formatLighthouseResult } from "./modules/lighthouse";
import { appendSpreadSheet, getGoogleClientAuth } from './modules/spreadsheet';
const config = require("../../lh-observer.config");

const main = async () => {
  const browser = await launchBrowser();
  const auth = await getGoogleClientAuth();
  for (let target of config.targets) {
    console.log('[start]', target.url)
    const { lhr } = await runLighthouse(browser, target.url);
    const result = formatLighthouseResult(lhr);
    await appendSpreadSheet(auth, target.sheetName, [result]);
  }
  if (browser) await browser.close();
}

exports.runLighthouseObserver = main;