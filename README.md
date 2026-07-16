# Maintenance

Fairfield by Marriott maintenance dashboard — available as both a Google Sheets project and a standalone HTML web app.

## What is included

- **`html/index.html`** — a fully self-contained HTML dashboard anyone can open in a browser. No server or Google account required. See [HTML Web App](#html-web-app) below.
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

---

## HTML Web App

`html/index.html` is a zero-dependency, single-file web application containing the same dashboard and all five operating sheets.

### How to use

1. Open `html/index.html` in any modern browser — no installation or internet connection needed.
2. Click any cell in a table to edit it. Changes are saved automatically to the browser's **local storage**.
3. Use the tab bar to switch between Dashboard, Room Inspections, Parts Inventory, and the three task sheets.
4. Use **+ Add Row** to append a new row to any table.
5. Use **⬇ Export JSON** to download a backup of your data.
6. Use **⬆ Import JSON** to restore a backup or transfer data to another browser or device.
7. Use **↺ Reset to Default** to restore the original sample data.
8. Use the 🖨 **Print** button on any tab to send that sheet to the printer.

### Features

- Live dashboard metrics (inspection pass/fail/follow-up counts, inventory value, task completion progress bars, follow-up snapshot).
- Colour-coded status cells (green = Pass/Complete, yellow = Follow-Up/In Progress, red = Fail/Deferred) matching the Google Sheets theme.
- Automatic **Reorder Status** calculation — updates immediately when On Hand or Min Level values change.
- Dropdown validation on all status, priority, and system-check columns.
- Data persists in local storage per browser — export/import JSON to share data across devices.
