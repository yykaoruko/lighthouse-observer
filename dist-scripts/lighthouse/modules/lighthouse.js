"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatLighthouseResult = exports.runLighthouse = void 0;

const lighthouse = require('lighthouse');

const dayjs = require('dayjs');

const runLighthouse = async (browser, url) => {
  return await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: ['json'],
    logLevel: 'info'
  });
};

exports.runLighthouse = runLighthouse;

const formatLighthouseResult = lighthouseResults => {
  const auditKeys = ['first-contentful-paint', 'speed-index', 'largest-contentful-paint', 'interactive', 'total-blocking-time', 'cumulative-layout-shift', 'first-cpu-idle', 'max-potential-fid', 'first-meaningful-paint', 'estimated-input-latency', 'server-response-time', 'mainthread-work-breakdown', 'bootup-time', 'network-server-latency'];
  const scoreKeys = ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'];
  const result = {
    'fetch-time': dayjs(lighthouseResults.fetchTime).valueOf(),
    // unixtime (ms)
    'requested-url': lighthouseResults.requestedUrl
  };

  for (let key of auditKeys) {
    result[key] = lighthouseResults.audits[key].numericValue || null;
  }

  for (let key of scoreKeys) {
    result[`${key}-score`] = lighthouseResults.categories[key].score || null;
  }

  return result;
};

exports.formatLighthouseResult = formatLighthouseResult;