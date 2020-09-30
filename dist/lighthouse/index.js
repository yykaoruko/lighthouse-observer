"use strict";

var _spreadsheet = require("./modules/spreadsheet");

const main = async () => {
  await (0, _spreadsheet.appendSpreadSheet)('test', [[1, 2, 3]]);
};

exports.runLighthouseObserver = main;