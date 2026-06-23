// Google Apps Script for FORGE America Now Newsletter Signups
// Deploy this as a web app to accept form submissions and save to Google Sheets

function doPost(e) {
  try {
    // Get the form data
    const params = e.parameter;
    
    // Get the active spreadsheet (make sure you have one open when deploying)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Add headers if this is the first submission (row 1 is empty)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'ZIP Code'
      ]);
    }
    
    // Append the new row with form data
    sheet.appendRow([
      new Date(),
      params.firstName || '',
      params.lastName || '',
      params.email || '',
      params.zipCode || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Signup received!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET requests for testing
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ready',
      message: 'Google Apps Script is deployed and ready to receive submissions'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
