const SHEET_ORDER = [
  'Dashboard',
  'Room Inspections',
  'Parts Inventory',
  'Daily Tasks',
  'Weekly Tasks',
  'Monthly Tasks',
  'Lists'
];

const ROOM_INSPECTIONS = [
  ['2026-07-16', 'North Tower', '1', '101', 'Pass', 'OK', 'OK', 'OK', 'OK', 'OK', 'Ready for guest turnover', 'Low', 'WO-2401', 'Chief Engineer', '2026-07-16'],
  ['2026-07-16', 'North Tower', '1', '104', 'Follow-Up', 'Repair', 'OK', 'OK', 'OK', 'OK', 'PTAC making noise overnight', 'Medium', 'WO-2402', 'HVAC Tech', '2026-07-17'],
  ['2026-07-16', 'South Tower', '2', '214', 'Fail', 'OK', 'Repair', 'OK', 'Repair', 'OK', 'Bathroom leak and damaged vinyl edge', 'High', 'WO-2403', 'Maintenance Supervisor', '2026-07-16'],
  ['2026-07-16', 'South Tower', '3', '318', 'Pass', 'OK', 'OK', 'OK', 'OK', 'OK', 'Deep-clean complete', 'Low', 'WO-2404', 'Room Inspector', '2026-07-18'],
  ['2026-07-16', 'Main Building', 'Lobby', 'Fitness', 'Follow-Up', 'OK', 'OK', 'Repair', 'OK', 'OK', 'Treadmill outlet trips under load', 'Medium', 'WO-2405', 'Electrician', '2026-07-18']
];

const INVENTORY_ITEMS = [
  ['INV-001', 'HVAC', 'PTAC Filter', 'Guest Rooms', 'Grainger', 12.5, 40, 20, 30, 4, '', 'Yes', 'Shelf A1', 'Quarterly swap item'],
  ['INV-002', 'Electrical', 'LED 9W Bulb', 'Guest Rooms', 'Home Depot', 3.75, 80, 60, 120, 2, '', 'Yes', 'Shelf B2', 'Warm white standard'],
  ['INV-003', 'Plumbing', '1/2 in Supply Line', 'Bathrooms', 'Ferguson', 9.95, 12, 15, 20, 3, '', 'No', 'Shelf C1', 'Common faucet repair'],
  ['INV-004', 'Life Safety', 'Smoke Detector', 'Guest Rooms', 'HD Supply', 28, 8, 10, 12, 5, '', 'Yes', 'Cage 1', 'Serialized component'],
  ['INV-005', 'General', 'Door Closer', 'Hallways', 'Amazon Business', 45, 6, 4, 6, 2, '', 'No', 'Shelf D4', 'ADA compliant']
];

const DAILY_TASKS = [
  ['D-001', 'Boiler Room', 'Check boiler pressure, temperature, and leak points', 'AM Engineer', 'Daily', 'Every Day', 20, 'Complete', '2026-07-16', 'Document readings in log book'],
  ['D-002', 'Pool', 'Verify pool chemistry and equipment alarms', 'PM Engineer', 'Daily', 'Every Day', 15, 'In Progress', '2026-07-15', 'Coordinate with front desk on closures'],
  ['D-003', 'Public Areas', 'Inspect lobby, corridors, and elevators for lighting or trip hazards', 'Shift Engineer', 'Daily', 'Every Day', 25, 'Not Started', '2026-07-15', 'Open work order for deficiencies'],
  ['D-004', 'Exterior', 'Check parking lot, signage, and entry doors', 'Shift Engineer', 'Daily', 'Every Day', 15, 'Complete', '2026-07-16', 'Note weather-related issues']
];

const WEEKLY_TASKS = [
  ['W-001', 'Guest Rooms', 'Test sample of PTAC units and clean return grilles', 'HVAC Tech', 'Weekly', 'Monday', 90, 'Not Started', '2026-07-09', 'Rotate floors weekly'],
  ['W-002', 'Fire Safety', 'Test emergency lighting and exit signage', 'Electrician', 'Weekly', 'Tuesday', 60, 'Complete', '2026-07-15', 'Log failures for replacement'],
  ['W-003', 'Water Systems', 'Flush low-use fixtures and inspect for odor', 'Plumber', 'Weekly', 'Wednesday', 45, 'In Progress', '2026-07-10', 'Focus on out-of-order rooms'],
  ['W-004', 'Exterior', 'Inspect roof drains, downspouts, and grounds irrigation', 'Grounds/Maintenance', 'Weekly', 'Friday', 75, 'Not Started', '2026-07-11', 'Escalate ponding issues immediately']
];

const MONTHLY_TASKS = [
  ['M-001', 'Life Safety', 'Inspect fire extinguishers and document seal/pressure status', 'Chief Engineer', 'Monthly', '1st Business Day', 75, 'Not Started', '2026-06-30', 'Coordinate with vendor if replacement is needed'],
  ['M-002', 'Guest Rooms', 'Deep inspection of 10% of rooms with furnishings checklist', 'Maintenance Supervisor', 'Monthly', '2nd Week', 180, 'In Progress', '2026-06-20', 'Use room inspection sheet for findings'],
  ['M-003', 'Inventory', 'Cycle count critical spares and update reorder points', 'Storeroom Clerk', 'Monthly', '3rd Week', 120, 'Complete', '2026-07-02', 'Match with purchasing records'],
  ['M-004', 'Mechanical', 'Lubricate motors, bearings, and door hardware', 'Shift Engineer', 'Monthly', 'Last Week', 150, 'Not Started', '2026-06-26', 'Record used materials']
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Maintenance Dashboard')
    .addItem('Build / Refresh Fairfield Project', 'buildFairfieldMaintenanceProject')
    .addToUi();
}

function buildFairfieldMaintenanceProject() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('Fairfield Maintenance Dashboard');
  prepareWorkbook_(spreadsheet);
  createListsSheet_(spreadsheet);
  createRoomInspectionsSheet_(spreadsheet);
  createInventorySheet_(spreadsheet);
  createTaskSheet_(spreadsheet, 'Daily Tasks', 'Daily Maintenance Tasks', 'Use this sheet to manage daily building checks, hotel operations walk-throughs, and shift handoffs.', DAILY_TASKS);
  createTaskSheet_(spreadsheet, 'Weekly Tasks', 'Weekly Maintenance Tasks', 'Use this sheet to plan recurring weekly preventive maintenance work.', WEEKLY_TASKS);
  createTaskSheet_(spreadsheet, 'Monthly Tasks', 'Monthly Maintenance Tasks', 'Use this sheet to track higher-touch preventive maintenance and inventory routines.', MONTHLY_TASKS);
  createDashboardSheet_(spreadsheet);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Dashboard'));
  SpreadsheetApp.flush();
}

function prepareWorkbook_(spreadsheet) {
  SHEET_ORDER.forEach((name, index) => {
    let sheet = spreadsheet.getSheetByName(name);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(name);
    }
    resetSheet_(sheet);
    spreadsheet.setActiveSheet(sheet);
    spreadsheet.moveActiveSheet(index + 1);
  });

  spreadsheet.getSheets().forEach((sheet) => {
    if (!SHEET_ORDER.includes(sheet.getName())) {
      spreadsheet.deleteSheet(sheet);
    }
  });
}

function resetSheet_(sheet) {
  sheet.getDataRange().breakApart();
  sheet.clear();
  sheet.clearConditionalFormatRules();
  const filter = sheet.getFilter();
  if (filter) {
    filter.remove();
  }
  sheet.getBandings().forEach((banding) => banding.remove());
  sheet.getCharts().forEach((chart) => sheet.removeChart(chart));
  sheet.showSheet();
  sheet.setFrozenRows(0);
  sheet.setFrozenColumns(0);
}

function applyTitle_(sheet, title, subtitle, mergeColumns) {
  sheet.getRange(1, 1, 1, mergeColumns).merge();
  sheet.getRange(2, 1, 1, mergeColumns).merge();
  sheet.getRange('A1').setValue(title).setFontSize(16).setFontWeight('bold');
  sheet.getRange('A2').setValue(subtitle).setWrap(true);
}

function applyHeaderStyle_(range) {
  range
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
}

function applyBodyStyle_(range) {
  range
    .setBorder(true, true, true, true, true, true, '#D9D9D9', SpreadsheetApp.BorderStyle.SOLID)
    .setWrap(true)
    .setVerticalAlignment('top');
}

function setColumnWidths_(sheet, widths) {
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));
}

function createListsSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Lists');
  applyTitle_(sheet, 'Dropdown Lists', 'Hidden lookup values used by the dashboard and operating sheets.', 5);
  const values = [
    ['Inspection Status', 'System Status', 'Priority', 'Task Status', 'Critical Item'],
    ['Pass', 'OK', 'Low', 'Not Started', 'Yes'],
    ['Follow-Up', 'Repair', 'Medium', 'In Progress', 'No'],
    ['Fail', 'Replace', 'High', 'Complete', ''],
    ['', '', 'Critical', 'Deferred', '']
  ];
  sheet.getRange(3, 1, values.length, values[0].length).setValues(values);
  applyHeaderStyle_(sheet.getRange(3, 1, 1, 5));
  applyBodyStyle_(sheet.getRange(4, 1, values.length - 1, 5));
  setColumnWidths_(sheet, [150, 150, 120, 150, 120]);
  sheet.hideSheet();
}

function createRoomInspectionsSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Room Inspections');
  const headers = ['Date', 'Wing/Area', 'Floor', 'Room/Space', 'Inspection Status', 'HVAC', 'Plumbing', 'Electrical', 'Walls/Floors', 'Life Safety', 'Notes', 'Priority', 'Work Order', 'Assigned To', 'Target Date'];
  applyTitle_(sheet, 'Detailed Room Inspections - Marriott Fairfield', 'Track guest rooms and public spaces with pass/follow-up/fail outcomes and system-level notes.', headers.length);
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(4, 1, ROOM_INSPECTIONS.length, headers.length).setValues(ROOM_INSPECTIONS);
  applyHeaderStyle_(sheet.getRange(3, 1, 1, headers.length));
  applyBodyStyle_(sheet.getRange(4, 1, ROOM_INSPECTIONS.length, headers.length));
  sheet.getRange(3, 1, ROOM_INSPECTIONS.length + 1, headers.length).applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  setColumnWidths_(sheet, [100, 130, 70, 100, 130, 90, 90, 90, 100, 90, 300, 90, 100, 130, 100]);
  sheet.setFrozenRows(3);
  sheet.getRange(3, 1, ROOM_INSPECTIONS.length + 1, headers.length).createFilter();

  const lists = spreadsheet.getSheetByName('Lists');
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('A4:A6'), true).setAllowInvalid(false).build();
  const systemRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('B4:B6'), true).setAllowInvalid(false).build();
  const priorityRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('C4:C7'), true).setAllowInvalid(false).build();
  sheet.getRange('E4:E250').setDataValidation(statusRule);
  ['F4:F250', 'G4:G250', 'H4:H250', 'I4:I250', 'J4:J250'].forEach((range) => sheet.getRange(range).setDataValidation(systemRule));
  sheet.getRange('L4:L250').setDataValidation(priorityRule);

  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Pass').setBackground('#C6EFCE').setRanges([sheet.getRange('E4:E250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Follow-Up').setBackground('#FFEB9C').setRanges([sheet.getRange('E4:E250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Fail').setBackground('#FFC7CE').setRanges([sheet.getRange('E4:E250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Critical').setBackground('#FFC7CE').setRanges([sheet.getRange('L4:L250')]).build()
  ]);
}

function createInventorySheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Parts Inventory');
  const headers = ['Part ID', 'Category', 'Part Name', 'Equipment/Area', 'Vendor', 'Unit Cost', 'On Hand', 'Min Level', 'Reorder Qty', 'Lead Time (Days)', 'Reorder Status', 'Critical Item', 'Storage Location', 'Notes'];
  applyTitle_(sheet, 'Parts Inventory', 'Manage critical spares, reorder triggers, vendors, and storage locations.', headers.length);
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(4, 1, INVENTORY_ITEMS.length, headers.length).setValues(INVENTORY_ITEMS);
  INVENTORY_ITEMS.forEach((_, index) => {
    const row = index + 4;
    sheet.getRange(row, 11).setFormula(`=IF(G${row}<=H${row},"Reorder","OK")`);
  });
  applyHeaderStyle_(sheet.getRange(3, 1, 1, headers.length));
  applyBodyStyle_(sheet.getRange(4, 1, INVENTORY_ITEMS.length, headers.length));
  sheet.getRange(3, 1, INVENTORY_ITEMS.length + 1, headers.length).applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  setColumnWidths_(sheet, [100, 110, 140, 140, 140, 90, 75, 75, 85, 110, 110, 90, 120, 240]);
  sheet.setFrozenRows(3);
  sheet.getRange(3, 1, INVENTORY_ITEMS.length + 1, headers.length).createFilter();
  sheet.getRange('F4:F250').setNumberFormat('$#,##0.00');

  const lists = spreadsheet.getSheetByName('Lists');
  const criticalRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('E4:E5'), true).setAllowInvalid(false).build();
  sheet.getRange('L4:L250').setDataValidation(criticalRule);
  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Reorder').setBackground('#FFEB9C').setRanges([sheet.getRange('K4:K250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Yes').setBackground('#D9EAF7').setRanges([sheet.getRange('L4:L250')]).build()
  ]);
}

function createTaskSheet_(spreadsheet, sheetName, title, subtitle, rows) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  const headers = ['Task ID', 'Area', 'Task', 'Assigned To', 'Frequency', 'Due Day/Date', 'Est. Minutes', 'Status', 'Last Completed', 'Notes'];
  applyTitle_(sheet, title, subtitle, headers.length);
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(4, 1, rows.length, headers.length).setValues(rows);
  applyHeaderStyle_(sheet.getRange(3, 1, 1, headers.length));
  applyBodyStyle_(sheet.getRange(4, 1, rows.length, headers.length));
  sheet.getRange(3, 1, rows.length + 1, headers.length).applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  setColumnWidths_(sheet, [90, 120, 340, 130, 90, 120, 90, 110, 110, 240]);
  sheet.setFrozenRows(3);
  sheet.getRange(3, 1, rows.length + 1, headers.length).createFilter();

  const lists = spreadsheet.getSheetByName('Lists');
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('D4:D7'), true).setAllowInvalid(false).build();
  sheet.getRange('H4:H250').setDataValidation(statusRule);
  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Complete').setBackground('#C6EFCE').setRanges([sheet.getRange('H4:H250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('In Progress').setBackground('#FFEB9C').setRanges([sheet.getRange('H4:H250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Deferred').setBackground('#FFC7CE').setRanges([sheet.getRange('H4:H250')]).build()
  ]);
}

function createDashboardSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Dashboard');
  applyTitle_(sheet, 'Fairfield Maintenance Command Center', 'Interactive dashboard fed by the inspection, inventory, and recurring task sheets.', 7);
  setColumnWidths_(sheet, [180, 120, 120, 120, 180, 140, 120]);
  sheet.setFrozenRows(3);

  const metricLabels = [
    ['Inspections Logged', '=COUNTA(\'Room Inspections\'!A4:A250)'],
    ['Rooms Passed', '=COUNTIF(\'Room Inspections\'!E4:E250,"Pass")'],
    ['Needs Follow-Up', '=COUNTIF(\'Room Inspections\'!E4:E250,"Follow-Up")'],
    ['Rooms Failed', '=COUNTIF(\'Room Inspections\'!E4:E250,"Fail")']
  ];
  metricLabels.forEach((entry, index) => {
    const row = index + 4;
    sheet.getRange(row, 1).setValue(entry[0]).setBackground('#D9EAF7').setFontWeight('bold');
    sheet.getRange(row, 2).setFormula(entry[1]);
  });

  const inventoryLabels = [
    ['Inventory Items', '=COUNTA(\'Parts Inventory\'!A4:A250)'],
    ['Items to Reorder', '=COUNTIF(\'Parts Inventory\'!K4:K250,"Reorder")'],
    ['Inventory Value', '=SUMPRODUCT(\'Parts Inventory\'!F4:F250,\'Parts Inventory\'!G4:G250)'],
    ['Critical Spares', '=COUNTIF(\'Parts Inventory\'!L4:L250,"Yes")']
  ];
  inventoryLabels.forEach((entry, index) => {
    const row = index + 4;
    sheet.getRange(row, 4).setValue(entry[0]).setBackground('#D9EAF7').setFontWeight('bold');
    sheet.getRange(row, 5).setFormula(entry[1]);
  });
  sheet.getRange('E6').setNumberFormat('$#,##0.00');
  applyBodyStyle_(sheet.getRange('A4:B7'));
  applyBodyStyle_(sheet.getRange('D4:E7'));

  sheet.getRange('A10:D10').merge().setValue('Recurring Task Completion').setFontWeight('bold').setFontSize(12);
  sheet.getRange(11, 1, 1, 4).setValues([['Cadence', 'Completed', 'Total', 'Completion %']]);
  applyHeaderStyle_(sheet.getRange(11, 1, 1, 4));
  const taskSummary = [
    ['Daily', '=COUNTIF(\'Daily Tasks\'!H4:H250,"Complete")', '=COUNTA(\'Daily Tasks\'!A4:A250)', '=IFERROR(B12/C12,0)'],
    ['Weekly', '=COUNTIF(\'Weekly Tasks\'!H4:H250,"Complete")', '=COUNTA(\'Weekly Tasks\'!A4:A250)', '=IFERROR(B13/C13,0)'],
    ['Monthly', '=COUNTIF(\'Monthly Tasks\'!H4:H250,"Complete")', '=COUNTA(\'Monthly Tasks\'!A4:A250)', '=IFERROR(B14/C14,0)']
  ];
  taskSummary.forEach((row, index) => {
    sheet.getRange(12 + index, 1, 1, 4).setValues([[row[0], '', '', '']]);
    sheet.getRange(12 + index, 2).setFormula(row[1]);
    sheet.getRange(12 + index, 3).setFormula(row[2]);
    sheet.getRange(12 + index, 4).setFormula(row[3]);
  });
  sheet.getRange('D12:D14').setNumberFormat('0%');
  applyBodyStyle_(sheet.getRange('A12:D14'));

  sheet.getRange('F10:G10').merge().setValue('Follow-Up Snapshot').setFontWeight('bold').setFontSize(12);
  sheet.getRange(11, 6, 1, 2).setValues([['Room / Area', 'Priority']]);
  applyHeaderStyle_(sheet.getRange(11, 6, 1, 2));
  for (let row = 12; row <= 16; row += 1) {
    const offset = row - 11;
    sheet.getRange(row, 6).setFormula(`=IFERROR(INDEX(FILTER('Room Inspections'!D4:D250,'Room Inspections'!E4:E250<>"Pass"),${offset}),"")`);
    sheet.getRange(row, 7).setFormula(`=IF(F${row}="","",INDEX(FILTER('Room Inspections'!L4:L250,'Room Inspections'!E4:E250<>"Pass"),${offset}))`);
  }
  applyBodyStyle_(sheet.getRange('F12:G16'));

  const barChart = sheet.newChart()
    .asColumnChart()
    .addRange(sheet.getRange('A11:C14'))
    .setPosition(17, 1, 0, 0)
    .setOption('title', 'Task Completion by Cadence')
    .setOption('legend', { position: 'top' })
    .build();
  sheet.insertChart(barChart);

  const pieChart = sheet.newChart()
    .asPieChart()
    .addRange(sheet.getRange('A4:B7'))
    .setPosition(17, 5, 0, 0)
    .setOption('title', 'Inspection Status Mix')
    .build();
  sheet.insertChart(pieChart);
}
