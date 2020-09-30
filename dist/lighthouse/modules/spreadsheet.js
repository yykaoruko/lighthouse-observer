"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendSpreadSheet = void 0;

const {
  google
} = require('googleapis');

const appendSpreadSheet = async (sheetName, values) => {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets('v4');
  return sheets.spreadsheets.values.append({
    auth,
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: values
    }
  });
};

exports.appendSpreadSheet = appendSpreadSheet;