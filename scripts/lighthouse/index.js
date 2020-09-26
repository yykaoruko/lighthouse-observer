import { launchBrowser, runLighthouse, formatLighthouseResult } from './modules';
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

  console.log(lighthouseResults);
};

main(lhObserverConfig.targetUrls);