# Google Sheet Template for KabaHub Waitlist

## Quick Copy-Paste Headers

Copy and paste this into Row 1 of your Google Sheet:

```
Timestamp	Name	Email	Company	Source
```

**Or type them individually:**
- A1: `Timestamp`
- B1: `Name`
- C1: `Email`
- D1: `Company`
- E1: `Source`

## Example Data (for testing)

Here's what your sheet will look like after signups:

| Timestamp | Name | Email | Company | Source |
|-----------|------|-------|---------|--------|
| 2025-11-04 13:00:00 | John Smith | john@example.com | Acme Corp | Website |
| 2025-11-04 13:15:30 | Sarah Johnson | sarah@startup.io | StartupXYZ | Website |
| 2025-11-04 14:02:15 | Mike Chen | mike@tech.com | TechCo | Website |

## Formatting Tips

### 1. Freeze the Header Row
1. Click on Row 2
2. View → Freeze → 1 row
3. Now you can scroll while keeping headers visible

### 2. Auto-resize Columns
1. Select all columns (click the square between A and 1)
2. Double-click any column border
3. All columns resize to fit content

### 3. Add Data Validation
Prevent duplicates by highlighting duplicate emails:
1. Select the Email column (C:C)
2. Format → Conditional formatting
3. Format rules → Custom formula: `=COUNTIF(C:C,C1)>1`
4. Choose red background

### 4. Add a Counter
In any empty cell, add:
```
=COUNTA(B:B)-1
```
This shows total signups (minus the header)

### 5. Sort by Latest First
1. Select all data (A1:E1000)
2. Data → Sort range
3. Sort by: Timestamp
4. Order: Z → A (descending)

## Useful Formulas

### Count Signups Today
```
=COUNTIF(A:A,">="&TODAY())
```

### Count Signups This Week
```
=COUNTIF(A:A,">="&TODAY()-7)
```

### Count Signups with Company
```
=COUNTIF(D:D,"<>N/A")-1
```

### Most Common Company Domain
```
=INDEX(SORT(UNIQUE(REGEXEXTRACT(C2:C,"@.*")),2,FALSE),1)
```

## Advanced: Create a Dashboard

Add a new sheet called "Dashboard" with these stats:

```
Total Signups:     =COUNTA(Sheet1!B:B)-1
Today:             =COUNTIF(Sheet1!A:A,">="&TODAY())
This Week:         =COUNTIF(Sheet1!A:A,">="&TODAY()-7)
This Month:        =COUNTIF(Sheet1!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))
With Company:      =COUNTIF(Sheet1!D:D,"<>N/A")
```

## Export Templates

### For Email Marketing
Export columns: Name, Email, Company
Format: CSV

### For Sales Team
Export columns: Name, Email, Company, Timestamp
Format: Excel (.xlsx)
Add: Conditional formatting for priority follow-ups

### For Analytics
Export all columns
Format: CSV
Import to: Google Analytics, Mixpanel, etc.

## Privacy & GDPR Compliance

Add a "Notes" column (F) for tracking:
- Consent timestamp
- Marketing opt-in status
- Communication preferences
- Unsubscribe requests

## Backup Strategy

### Automatic (Recommended)
Google Sheets auto-saves and keeps version history:
- File → Version history → See version history

### Manual Backup
Download weekly:
- File → Download → Microsoft Excel (.xlsx)
- Save to your computer/cloud storage

## Team Collaboration

### Share with Team
1. Click "Share" button (top right)
2. Add team members' emails
3. Set permissions:
   - **Viewer**: Can only view
   - **Commenter**: Can view and comment
   - **Editor**: Can edit (be careful!)

### Suggested Permissions
- Marketing Team: Editor
- Sales Team: Viewer
- Executives: Viewer

## Integration Ideas

### Connect to Other Tools
- **Zapier**: Auto-add to Mailchimp, HubSpot, etc.
- **Google Data Studio**: Create visualizations
- **Slack**: Get notifications in Slack channel
- **Airtable**: Sync to Airtable for CRM features

### Automation
Use Google Apps Script to:
- Send welcome emails
- Tag contacts by company size
- Score leads
- Update CRM automatically

---

**Pro Tip**: Keep the sheet organized from day one. It's harder to clean up 1000 messy records than to maintain good structure from the start!
