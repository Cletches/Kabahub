# Google Sheets Waitlist Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "KabaHub Waitlist"
3. In the first row, add these headers:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Company`
   - Column E: `Source`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add row with timestamp
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.company || 'N/A',
      data.source || 'Website'
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'message': 'Waitlist API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

4. Click the **Save** icon (💾) and name the project "Waitlist API"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Waitlist API v1"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to Waitlist API (unsafe)**
9. Click **Allow**
10. **COPY THE WEB APP URL** (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

## Step 4: Add URL to Your App

1. Open the file: `src/googleSheetsConfig.js`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your copied URL
3. Save the file

## Step 5: Test the Integration

1. Visit your website at http://localhost:5173
2. Click "Join Waitlist"
3. Fill out the form and submit
4. Check your Google Sheet - a new row should appear!

## Troubleshooting

### "Authorization required" error
- Make sure you deployed the script with "Execute as: Me" and "Who has access: Anyone"
- Re-deploy if needed

### Data not appearing in sheet
- Check the browser console for errors
- Verify the URL in googleSheetsConfig.js is correct
- Make sure the sheet has the correct headers in row 1

### CORS errors
- Apps Script web apps automatically handle CORS
- If you see CORS errors, redeploy the script

## Optional: Set Up Email Notifications

Add this to your Apps Script to get email notifications for new signups:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add row with timestamp
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.company || 'N/A',
      data.source || 'Website'
    ]);

    // Send email notification
    MailApp.sendEmail({
      to: 'kabahubteam@gmail.com',
      subject: '🎉 New Waitlist Signup!',
      body: `New signup from ${data.name}\n\nEmail: ${data.email}\nCompany: ${data.company || 'Not provided'}\n\nTotal signups: ${sheet.getLastRow() - 1}`
    });

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Export Options

You can export your waitlist data at any time:
- **Excel**: File → Download → Microsoft Excel (.xlsx)
- **CSV**: File → Download → Comma-separated values (.csv)
- **PDF**: File → Download → PDF document (.pdf)

## Security Notes

- The web app URL is public but unique to your deployment
- Only you can see the Google Sheet data
- You can revoke access anytime by undeploying the script
- Consider adding rate limiting for production use
