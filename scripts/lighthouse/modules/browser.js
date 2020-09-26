const puppeteer = require('puppeteer');

export const launchBrowser = async () => {
  return await puppeteer.launch({
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--incognito'
    ]
  });
};