import { lighthouseDBColumnNames } from "./constants";
const lighthouse = require("lighthouse");
const dayjs = require("dayjs");

export const runLighthouse = async (browser, url) => {
  return await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: ["json"],
    logLevel: "info",
  });
};

export const formatLighthouseResult = (lighthouseResults) => {
  const result = lighthouseDBColumnNames.map((columnName) => {
    const key = columnName.replace(/_/gi, "-");
    switch (columnName) {
      case "fetch_time":
        return dayjs(lighthouseResults.fetchTime).valueOf(); // unixtime (ms)
      case "requested_url":
        return lighthouseResults.requestedUrl;
      case "performance":
      case "accessibility":
      case "best_practices":
      case "seo":
      case "pwa":
        return lighthouseResults.categories[key].score || null;
      default:
        return lighthouseResults.audits[key].numericValue || null;
    }
  });

  return result;
};
