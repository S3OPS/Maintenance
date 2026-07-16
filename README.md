# Maintenance

Google Sheets project for a Fairfield by Marriott maintenance dashboard.

## What is included

- `google-apps-script/Code.gs` builds a full Google Sheets workbook with:
  - Dashboard
  - Printable room inspection / PM sheet
  - Detailed room inspections
  - Active work orders
  - Parts inventory
  - Daily tasks
  - Weekly tasks
  - Monthly tasks
  - Hidden dropdown list sheet for validation
- `google-apps-script/appsscript.json` provides the Apps Script manifest.

## How to run this in Google Sheets

### Step 1 — Create a new Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and sign in with your Google account.
2. Click **+ Blank** to create a new spreadsheet.
3. Give it a name (e.g., *Fairfield Maintenance Dashboard*) by clicking "Untitled spreadsheet" at the top.

### Step 2 — Open the Apps Script editor

1. In the spreadsheet menu bar, click **Extensions**.
2. Click **Apps Script**.
3. A new browser tab opens showing the Apps Script editor with a default file called `Code.gs`.

### Step 3 — Replace the script code

1. In the Apps Script editor, click on `Code.gs` in the left-hand **Files** panel.
2. Select all the existing text in the editor (Ctrl+A or Cmd+A) and delete it.
3. Open `google-apps-script/Code.gs` from this repository and copy its entire contents.
4. Paste the copied code into the now-empty editor.

### Step 4 — Replace the manifest (appsscript.json)

The manifest file sets the timezone and runtime version. It is hidden by default.

1. In the Apps Script editor, click the **gear icon (⚙)** in the left sidebar to open **Project Settings**.
2. Scroll down and check the box labelled **"Show 'appsscript.json' manifest file in editor"**.
3. Click the back arrow (←) to return to the editor. You will now see `appsscript.json` in the **Files** panel.
4. Click on `appsscript.json`, select all the text, and delete it.
5. Open `google-apps-script/appsscript.json` from this repository, copy its entire contents, and paste them into the editor.

### Step 5 — Save the project

1. Click **File > Save all** (or press Ctrl+S / Cmd+S) to save both files.
2. You may be prompted to name the Apps Script project — use any name you like (e.g., *Fairfield Maintenance*).

### Step 6 — Run the builder and authorize the script

1. In the editor toolbar, make sure the function dropdown (next to the run ▶ button) shows **`buildFairfieldMaintenanceProject`**. If it does not, click the dropdown and select that function.
2. Click the **▶ Run** button.
3. A dialog will appear: **"Authorization required"**. Click **Review permissions**.
4. Choose the Google account you are using for this spreadsheet.
5. You may see a **"Google hasn't verified this app"** warning. Click **Advanced**, then click **"Go to [your project name] (unsafe)"**. This is expected for personal scripts that have not been submitted to Google for review.
6. Review the permissions (the script needs access to your Google Sheets) and click **Allow**.
7. The script will begin building the workbook. Wait for the execution log at the bottom of the editor to show **"Execution completed"** — this usually takes 5–15 seconds.

### Step 7 — Return to the spreadsheet

1. Switch back to the Google Sheets tab (or go to [sheets.google.com](https://sheets.google.com) and reopen the file).
2. You will see nine sheets created along the bottom tab bar:
   - **Dashboard** — live summary metrics and charts
   - **Room Inspection PM** — printable Fairfield guest-room inspection / PM checklist
   - **Room Inspections** — per-room pass/fail tracking
   - **Active Work Orders** — immediate-issue tracking for guest and staff reported problems
   - **Parts Inventory** — stock levels and reorder alerts
   - **Daily Tasks**, **Weekly Tasks**, **Monthly Tasks** — PM task lists
   - **Lists** *(hidden)* — dropdown validation values
3. A new menu item, **Maintenance Dashboard**, will appear in the menu bar. Use **Maintenance Dashboard > Build / Refresh Fairfield Project** any time you want to reset and rebuild all sheets from scratch.

### Troubleshooting

| Issue | Solution |
|---|---|
| `appsscript.json` is not visible in the editor | Enable it in **Project Settings (⚙) > Show "appsscript.json" manifest file in editor** |
| "Authorization required" appears every time | This only happens once per Google account. Click through the authorization flow once and it will not appear again. |
| The **Maintenance Dashboard** menu does not appear | Reload the spreadsheet tab. The `onOpen` trigger fires when the sheet loads, not when the script runs. |
| Execution fails with a permissions error | Make sure you clicked **Allow** during the authorization step and that you are running the script from the same Google account that owns the spreadsheet. |
| The script runs but no sheets are created | Check the Apps Script execution log (bottom of the editor) for error details. The most common cause is pasting incomplete code — repeat Step 3. |

## What the script creates

- A dashboard with live formulas, charts, and upcoming PM tracking fed from the operating sheets.
- A printable Fairfield room inspection / PM sheet for guest-room condition checks and corrective action tracking.
- Inspection tracking for rooms and public spaces with status, system checks, PM intervals, and priorities.
- An active work orders sheet with dropdown validation for room/location and status.
- Parts inventory with reorder logic and critical-spares tracking.
- Daily, weekly, and monthly preventive-maintenance task sheets.
- Dropdowns, filters, color-coded status formatting, and a layout designed to be easy to read in Google Sheets.
