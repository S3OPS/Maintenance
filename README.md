# Maintenance

Google Sheets project for a Fairfield by Marriott maintenance dashboard.

## What is included

- `google-apps-script/Code.gs` builds a full Google Sheets workbook with:
  - Dashboard
  - Detailed room inspections
  - Parts inventory
  - Daily tasks
  - Weekly tasks
  - Monthly tasks
  - Hidden dropdown list sheet for validation
- `google-apps-script/appsscript.json` provides the Apps Script manifest.

## How to run this in Google Sheets

1. Create or open a Google Sheet.
2. Open **Extensions > Apps Script**.
3. Replace the default script with the contents of `google-apps-script/Code.gs`.
4. Replace the manifest with `google-apps-script/appsscript.json`.
5. Save the project.
6. Run `buildFairfieldMaintenanceProject` once and authorize the script.
7. Return to the spreadsheet and use the **Maintenance Dashboard** menu to rebuild or refresh the project any time.

## What the script creates

- A dashboard with live formulas and charts fed from the operating sheets.
- Inspection tracking for rooms and public spaces with status, system checks, work orders, and priorities.
- Parts inventory with reorder logic and critical-spares tracking.
- Daily, weekly, and monthly preventive-maintenance task sheets.
- Dropdowns, filters, color-coded status formatting, and a layout designed to be easy to read in Google Sheets.
