const { google } = require('googleapis');

export const getGoogleClientAuth = () => {
  return google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
}

export const appendSpreadSheet = async (auth, sheetName, values) => {
  const sheets = google.sheets('v4');
  console.log('[result]', values);
  return sheets.spreadsheets.values.append({
    auth,
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      majorDimension: "ROWS",
      values: values
    }
  });
};