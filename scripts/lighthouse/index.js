import { appendSpreadSheet } from './modules/spreadsheet';

const main = async () => {
  await appendSpreadSheet('test', [[1, 2, 3]]);
}

exports.runLighthouseObserver = main;