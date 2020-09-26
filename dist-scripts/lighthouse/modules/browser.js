"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launchBrowser = void 0;

const puppeteer = require('puppeteer');

const launchBrowser = async () => {
  return await puppeteer.launch({
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito']
  });
};

exports.launchBrowser = launchBrowser;