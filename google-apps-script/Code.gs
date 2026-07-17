const SHEET_ORDER = [
  'Dashboard',
  'Active Work Orders',
  'Room Inspections',
  'Parts Inventory',
  'Daily Tasks',
  'Weekly Tasks',
  'Monthly Tasks',
  'Lists',
  'Room Inspection PM'
];

const PM_CYCLE_DAYS = 30;
const PM_UPCOMING_THRESHOLD_DAYS = 7;

const ROOM_INSPECTION_PM_SECTIONS = [
  {
    section: 'General Room Readiness',
    items: [
      ['Room presentation', 'Room is clean, odor-free, well-lit, and guest-ready with no visible clutter or trash.'],
      ['Bedding and mattress', 'Linens are fresh, dry, tight, and free of stains or tears; mattress, box spring, and headboard are secure and clean.'],
      ['Casegoods and upholstery', 'Desk, chair, nightstand, sofa, and other furniture are dust-free, stable, and free of chips, burns, stains, or loose hardware.'],
      ['Windows and treatments', 'Windows, sheers, blackout curtains, and blinds open and close smoothly; fabric is clean and undamaged.'],
      ['Closet and storage', 'Closet or wardrobe is clean and organized; hangers, luggage rack, and shelves are present and secure.'],
      ['Brand amenities', 'Coffee maker, cups, ice bucket, hair dryer, safe, iron, and board are present and functional when equipped in the room type.']
    ]
  },
  {
    section: 'HVAC / Climate Control',
    items: [
      ['PTAC or HVAC power', 'Unit powers on and responds correctly to the thermostat or control settings.'],
      ['Heating and cooling', 'Heating and cooling modes produce strong, even airflow and reach set temperature without delay.'],
      ['Filter and grille', 'Return grille, filter, and cabinet are clean, secured, and free of heavy dust build-up.'],
      ['Noise and vibration', 'Unit runs quietly with no rattles, grinding, odor, or abnormal vibration.'],
      ['Condensate and leaks', 'No water intrusion, condensate overflow, or staining is present around the unit.']
    ]
  },
  {
    section: 'Electrical / Lighting / Technology',
    items: [
      ['Room lighting', 'Entry, bedside, desk, vanity, and bath lighting all operate correctly with working switches or dimmers.'],
      ['Outlets and USB ports', 'All outlets, USB ports, and charging stations energize properly and are securely mounted.'],
      ['GFCI protection', 'Bathroom and vanity GFCI outlets trip and reset properly; covers and faceplates are intact.'],
      ['TV and remote', 'Television powers on, channels or streaming input work, and the remote operates correctly.'],
      ['Telephone and connectivity', 'Room phone, data port, or posted Wi-Fi information is present and usable when applicable.'],
      ['Cords and plugs', 'Power cords, plugs, and lamp wiring are undamaged, secured, and not creating a hazard.']
    ]
  },
  {
    section: 'Plumbing / Bathroom',
    items: [
      ['Sink faucet and drain', 'Hot and cold water operate correctly, pressure is acceptable, and the sink drains without leaking or backing up.'],
      ['Toilet operation', 'Toilet flushes, refills, and seats properly with no rocking, staining, or hidden leaks.'],
      ['Tub or shower', 'Tub, shower, head, curtain or door, grout, caulk, and drain are clean, intact, and leak-free.'],
      ['Vanity and mirror', 'Countertop, backsplash, mirror, sink basin, and vanity surfaces are clean and damage-free.'],
      ['Exhaust fan', 'Bathroom fan vents properly and is free of excessive dust, noise, or damage.'],
      ['Water temperature', 'Water temperature is consistent and acceptable at the sink and shower.'],
      ['Plumbing leaks', 'No visible leaks are present under the sink, around the toilet, or at wall penetrations.']
    ]
  },
  {
    section: 'Walls / Ceiling / Trim',
    items: [
      ['Walls and paint', 'Walls, wallpaper, and paint are free of holes, stains, peeling, scuffs, and visible patching issues.'],
      ['Ceiling and vents', 'Ceiling, sprinkler escutcheons, diffusers, and vents are clean with no water marks or cracks.'],
      ['Trim and caulk', 'Baseboards, corner beads, trim, and caulk lines are intact, sealed, and finished cleanly.'],
      ['Artwork and mirrors', 'Artwork, mirrors, and décor are straight, secure, and free of chips, cracks, or fading.'],
      ['Bathroom wall finish', 'Tile, grout, and wall finish in the bathroom are clean, sealed, and free of mold, mildew, or damage.']
    ]
  },
  {
    section: 'Floors / Baseboards / Thresholds',
    items: [
      ['Floor surface', 'Carpet, tile, LVT/VCT, or other floor finish is clean, dry, and in good condition.'],
      ['Floor damage', 'No burns, stains, cracks, lifted edges, loose tiles, or damaged seams are present.'],
      ['Transitions and thresholds', 'Door thresholds, transitions, rugs, and mats are secure and do not create a trip hazard.'],
      ['Baseboards and corners', 'Baseboards and corners are secure, clean, and free of gouges or separation.'],
      ['Under furniture', 'Area under the bed, behind the door, and behind furniture is clean and free of debris.']
    ]
  },
  {
    section: 'Doors / Locks / Security',
    items: [
      ['Entry door operation', 'Entry door closes, latches, and self-closes properly without binding or slamming.'],
      ['Deadbolt and swing bar', 'Deadbolt, security latch, and related hardware function smoothly and securely.'],
      ['Peephole and viewer', 'Peephole or viewer is clear, secure, and properly aligned.'],
      ['Door seals and sweep', 'Door seals, sweep, hinges, frame, and closer are intact with no obvious light or sound gaps.'],
      ['Bathroom and closet doors', 'Bathroom, closet, and connecting doors open, close, and latch properly.'],
      ['Window and patio security', 'Window locks, secondary latches, and balcony or patio doors operate correctly when present.']
    ]
  },
  {
    section: 'Safety / Life Safety / Guest Security',
    items: [
      ['Smoke detector', 'Smoke detector is present, unobstructed, and appears powered and functional.'],
      ['Sprinkler head', 'Sprinkler head and escutcheon are unobstructed and free of damage or paint.'],
      ['Emergency information', 'Emergency evacuation instructions, room phone info, and safety signage are present and legible.'],
      ['Immediate hazards', 'No exposed wiring, broken glass, damaged outlets, or other immediate safety hazards are present.'],
      ['Egress path', 'Primary exit path from the room is clear and unobstructed.']
    ]
  },
  {
    section: 'Final PM / Closeout',
    items: [
      ['Deficiency log', 'All deficiencies are documented with the proper work order number or follow-up note.'],
      ['Parts and materials', 'Parts, materials, or vendor support required for repair are identified and ordered if needed.'],
      ['Room status', 'Room status is clearly marked as Ready, Follow-Up, or Out of Order.'],
      ['Inspector sign-off', 'Inspector name, date, and supervisor review are completed before the room is returned to service.']
    ]
  }
];

const ROOM_INSPECTIONS = [
  ['2026-07-16', '101',     'Pass',      'OK',     'OK',     'OK',     'OK',     'Room ready for guest turnover; all systems verified.',                        'Low',      'Chief Engineer',        '2026-06-18'],
  ['2026-07-16', '104',     'Follow-Up', 'Repair', 'OK',     'OK',     'OK',     'PTAC making noise overnight; fan blade inspection needed.',                   'Medium',   'HVAC Tech',             '2026-06-25'],
  ['2026-07-16', '214',     'Fail',      'OK',     'Repair', 'OK',     'Repair', 'Bathroom leak detected; vinyl flooring edge damaged near threshold.',         'High',     'Maintenance Supervisor', '2026-06-30'],
  ['2026-07-16', '318',     'Pass',      'OK',     'OK',     'OK',     'OK',     'Deep-clean complete; room ready for next arrival.',                           'Low',      'Room Inspector',         '2026-06-20'],
  ['2026-07-16', 'Fitness', 'Follow-Up', 'OK',     'OK',     'Repair', 'OK',     'Treadmill outlet trips under load; GFCI needs testing.',                     'Medium',   'Electrician',            '2026-07-01'],
  ['2026-07-15', '202',     'Pass',      'OK',     'OK',     'OK',     'OK',     'All mechanical and life safety systems checked and operational.',             'Low',      'Shift Engineer',         '2026-06-15'],
  ['2026-07-15', '307',     'Follow-Up', 'OK',     'OK',     'OK',     'Repair', 'Scuff marks on wall near closet door; paint touch-up required.',             'Low',      'Room Inspector',         '2026-06-22'],
  ['2026-07-14', '401',     'Fail',      'OK',     'OK',     'Repair', 'OK',     'GFCI outlet in bathroom failed reset; vanity light intermittently dead.',    'High',     'Electrician',            '2026-06-28'],
  ['2026-07-14', '209',     'Follow-Up', 'Repair', 'OK',     'OK',     'OK',     'PTAC filter heavily clogged; airflow restriction affecting guests.',         'Medium',   'HVAC Tech',              '2026-06-19'],
  ['2026-07-13', '313',     'Fail',      'OK',     'Repair', 'OK',     'Repair', 'Ceiling stain above bathroom vent; active leak suspected from floor above.', 'High',     'Maintenance Supervisor', '2026-06-10'],
  ['2026-07-13', '105',     'Pass',      'OK',     'OK',     'OK',     'OK',     'Fresh paint and carpet clean; guest ready.',                                  'Low',      'Room Inspector',         '2026-06-25'],
  ['2026-07-12', '221',     'Fail',      'OK',     'OK',     'OK',     'OK',     'Balcony door latch inoperable; room out of order pending repair.',            'Critical', 'Chief Engineer',         '2026-06-17'],
  ['2026-07-12', '415',     'Pass',      'OK',     'OK',     'OK',     'OK',     'TV connectivity resolved; hotel Wi-Fi firmware update applied.',              'Low',      'Technology',             '2026-06-24'],
  ['2026-07-11', '302',     'Follow-Up', 'OK',     'OK',     'OK',     'Repair', 'Carpet threshold lifting near entry door; trip hazard noted.',               'Medium',   'Shift Engineer',         '2026-06-21'],
  ['2026-07-10', '217',     'Follow-Up', 'OK',     'OK',     'Repair', 'OK',     'Bathroom GFCI flickering; electrician inspection recommended.',              'Medium',   'Electrician',            '2026-07-08']
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

const WORK_ORDER_LOCATIONS = [
  'Other',
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '121',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
  '209',
  '210',
  '211',
  '213',
  '214',
  '215',
  '216',
  '217',
  '218',
  '219',
  '221',
  '301',
  '302',
  '303',
  '304',
  '305',
  '306',
  '307',
  '308',
  '309',
  '310',
  '311',
  '313',
  '314',
  '315',
  '316',
  '317',
  '318',
  '319',
  '321',
  '401',
  '402',
  '403',
  '404',
  '405',
  '406',
  '407',
  '408',
  '409',
  '410',
  '411',
  '413',
  '414',
  '415',
  '416',
  '417',
  '418',
  '419',
  '421'
];

const WORK_ORDER_STATUSES = ['Not Started', 'Work In Progress', 'Completed'];

const WORK_ORDER_ISSUE_TYPES = ['Misc.', 'Climate/AC', 'Electrical', 'Technology', 'Plumbing', 'Walls', 'Ceiling', 'Floors', 'Doors', 'Safety'];

// Seed data for Active Work Orders (columns B–G: Room/Location, Issue Type, Issue Description, Priority, Date Reported, Status).
// Column A (Ticket ID) is auto-generated by formula based on the Status column.
const WORK_ORDERS = [
  ['214',   'Climate/AC',  'PTAC unit not cooling; thermostat unresponsive to temperature changes.',                  'High',     '2026-07-15', 'Work In Progress'],
  ['318',   'Plumbing',    'Bathroom faucet dripping continuously; supply line appears corroded.',                    'Medium',   '2026-07-14', 'Not Started'],
  ['105',   'Electrical',  'Bedside lamp outlet has no power; GFCI tripped and will not reset.',                     'Medium',   '2026-07-13', 'Work In Progress'],
  ['202',   'Doors',       'Entry door not self-closing properly; door closer mechanism is damaged.',                 'High',     '2026-07-12', 'Not Started'],
  ['401',   'Safety',      'Smoke detector chirping continuously; possible battery failure or end-of-life device.',  'High',     '2026-07-11', 'Work In Progress'],
  ['307',   'Technology',  'Television screen has horizontal lines; remote pairing lost.',                           'Low',      '2026-07-10', 'Not Started'],
  ['Other', 'Floors',      'Lobby tile cracked near elevator bank; potential trip hazard for guests.',               'High',     '2026-07-09', 'Work In Progress'],
  ['313',   'Walls',       'Water stain on ceiling near bathroom exhaust vent; leak suspected from floor above.',    'Medium',   '2026-07-08', 'Not Started'],
  ['209',   'Climate/AC',  'PTAC making loud rattling noise overnight; loose fan blade vibration.',                  'Medium',   '2026-07-07', 'Work In Progress'],
  ['404',   'Plumbing',    'Toilet running continuously; flapper valve needs replacement.',                          'Low',      '2026-07-06', 'Not Started'],
  ['101',   'Ceiling',     'Ceiling tile sagging near A/C diffuser; water damage suspected above.',                  'High',     '2026-07-05', 'Not Started'],
  ['217',   'Electrical',  'Bathroom GFCI outlet not resetting; vanity light flickering intermittently.',            'Medium',   '2026-07-04', 'Work In Progress'],
  ['302',   'Floors',      'Carpet edge lifted at threshold creating a trip hazard; adhesive failure.',              'Low',      '2026-07-03', 'Not Started'],
  ['415',   'Technology',  'Smart TV not connecting to hotel Wi-Fi network; firmware update needed.',                'Low',      '2026-07-01', 'Not Started'],
  ['221',   'Doors',       'Balcony door latch broken; door will not lock from inside room.',                        'Critical', '2026-06-30', 'Work In Progress']
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
  createRoomInspectionPmSheet_(spreadsheet);
  createRoomInspectionsSheet_(spreadsheet);
  createActiveWorkOrdersSheet_(spreadsheet);
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
  const dataRange = sheet.getDataRange();
  const fullSheetRange = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  dataRange.breakApart();
  sheet.clear();
  fullSheetRange.clearDataValidations();
  sheet.setConditionalFormatRules([]);
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

function columnLetter_(columnNumber) {
  let letter = '';
  let current = columnNumber;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    current = Math.floor((current - 1) / 26);
  }
  return letter;
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

function createRoomInspectionPmSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Room Inspection PM');
  const headers = ['Inspection Item', 'Fairfield Standard', 'Result', 'Notes / Deficiencies', 'Corrective Action'];
  const resultOptions = ['Pass', 'Follow-Up', 'Fail', 'N/A'];

  applyTitle_(
    sheet,
    'Marriott Fairfield Room Inspection / PM',
    'Printable guest-room inspection sheet tailored to Fairfield standards for guest-ready presentation, PM follow-up, and detailed corrective action tracking.',
    headers.length
  );

  sheet.getRange('A4').setValue('Date');
  sheet.getRange('B4:C4').merge().setValue('');
  sheet.getRange('D4').setValue('Inspector');
  sheet.getRange('E4').setValue('');
  sheet.getRange('A5').setValue('Property / Wing');
  sheet.getRange('B5:C5').merge().setValue('');
  sheet.getRange('D5').setValue('Room / Floor');
  sheet.getRange('E5').setValue('');
  sheet.getRange('A6').setValue('Room Type');
  sheet.getRange('B6:C6').merge().setValue('');
  sheet.getRange('D6').setValue('Work Order');
  sheet.getRange('E6').setValue('');
  sheet.getRange('A7').setValue('Occupancy');
  sheet.getRange('B7:C7').merge().setValue('');
  sheet.getRange('D7').setValue('Status / Target');
  sheet.getRange('E7').setValue('');

  applyHeaderStyle_(sheet.getRange('A4:A7'));
  applyHeaderStyle_(sheet.getRange('D4:D7'));
  applyBodyStyle_(sheet.getRange('B4:C7'));
  applyBodyStyle_(sheet.getRange('E4:E7'));
  sheet.getRange('A4:E7').setBorder(true, true, true, true, true, true, '#D9D9D9', SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange(9, 1, 1, headers.length).setValues([headers]);
  applyHeaderStyle_(sheet.getRange(9, 1, 1, headers.length));

  const resultRule = SpreadsheetApp.newDataValidation().requireValueInList(resultOptions, true).setAllowInvalid(false).build();
  const resultRanges = [];
  const sectionRows = [];
  let row = 10;

  ROOM_INSPECTION_PM_SECTIONS.forEach((section) => {
    sectionRows.push(row);
    sheet.getRange(row, 1, 1, headers.length).merge();
    sheet.getRange(row, 1).setValue(section.section);
    sheet.getRange(row, 1, 1, headers.length)
      .setBackground('#1F4E78')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setVerticalAlignment('middle');
    row += 1;

    section.items.forEach((item) => {
      sheet.getRange(row, 1, 1, headers.length).setValues([[item[0], item[1], '', '', '']]);
      resultRanges.push(sheet.getRange(row, 3));
      row += 1;
    });
  });

  const lastRow = row - 1;
  applyBodyStyle_(sheet.getRange(10, 1, lastRow - 9, headers.length));
  sheet.getRange(10, 1, lastRow - 9, headers.length).setWrap(true).setVerticalAlignment('top');
  resultRanges.forEach((range) => range.setDataValidation(resultRule).setHorizontalAlignment('center'));

  sheet.setFrozenRows(9);
  sheet.setHiddenGridlines(true);
  setColumnWidths_(sheet, [170, 230, 90, 230, 180]);
  sheet.setRowHeight(1, 28);
  sheet.setRowHeight(2, 42);
  sheet.setRowHeights(4, 4, 24);
  sheet.setRowHeight(9, 28);
  sheet.autoResizeRows(10, lastRow - 9);
  sectionRows.forEach((sectionRow) => sheet.setRowHeight(sectionRow, 26));

  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Pass').setBackground('#C6EFCE').setRanges([sheet.getRange('C10:C250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Follow-Up').setBackground('#FFEB9C').setRanges([sheet.getRange('C10:C250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Fail').setBackground('#FFC7CE').setRanges([sheet.getRange('C10:C250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('N/A').setBackground('#E7E6E6').setRanges([sheet.getRange('C10:C250')]).build()
  ]);
}

function createRoomInspectionsSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Room Inspections') || spreadsheet.insertSheet('Room Inspections');
  const headers = ['Date', 'Room/Space', 'Inspection Status', 'HVAC', 'Plumbing', 'Electrical', 'Walls/Floors', 'Notes', 'Priority', 'Performed By', 'Last PM Date', 'Next Due Date', 'Days Remaining', 'PM Status'];
  applyTitle_(sheet, 'Detailed Room Inspections - Marriott Fairfield', 'Track room inspections, PM intervals, and follow-up status with a 30-day maintenance cycle.', headers.length);
  const dataWidth = ROOM_INSPECTIONS[0]?.length || headers.length;
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(4, 1, ROOM_INSPECTIONS.length, dataWidth).setValues(ROOM_INSPECTIONS);
  applyHeaderStyle_(sheet.getRange(3, 1, 1, headers.length));
  applyBodyStyle_(sheet.getRange(4, 1, 247, headers.length));
  sheet.getRange(3, 1, 248, headers.length).applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  setColumnWidths_(sheet, [100, 120, 130, 90, 90, 90, 110, 280, 90, 130, 110, 110, 90, 110]);
  sheet.setFrozenRows(3);
  sheet.getRange(3, 1, 248, headers.length).createFilter();

  const lists = spreadsheet.getSheetByName('Lists');
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('A4:A6'), true).setAllowInvalid(false).build();
  const systemRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('B4:B6'), true).setAllowInvalid(false).build();
  const priorityRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('C4:C7'), true).setAllowInvalid(false).build();
  sheet.getRange('C4:C250').setDataValidation(statusRule);
  ['D4:D250', 'E4:E250', 'F4:F250', 'G4:G250'].forEach((range) => sheet.getRange(range).setDataValidation(systemRule));
  sheet.getRange('I4:I250').setDataValidation(priorityRule);
  sheet.getRange('K4:K250').setDataValidation(SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build());
  sheet.getRange('K4:L250').setNumberFormat('yyyy-mm-dd');
  sheet.getRange('M4:M250').setNumberFormat('0');

  const PM_START_ROW = 4;
  const PM_END_ROW = 250;
  const pmRows = PM_END_ROW - PM_START_ROW + 1;
  // Next Due Date is derived from Last PM Date plus the 30-day PM cycle.
  sheet.getRange(PM_START_ROW, 12, pmRows, 1).setFormulaR1C1(`=IF(RC[-1]="","",RC[-1]+${PM_CYCLE_DAYS})`);
  // Days Remaining subtracts today's date from the Next Due Date.
  sheet.getRange(PM_START_ROW, 13, pmRows, 1).setFormulaR1C1('=IF(RC[-1]="","",RC[-1]-TODAY())');
  sheet.getRange(PM_START_ROW, 14, pmRows, 1).setFormulaR1C1(`=IF(RC[-1]="","",IF(RC[-1]<0,"Overdue",IF(RC[-1]<=${PM_UPCOMING_THRESHOLD_DAYS},"Due Soon","Current")))`);

  sheet.setConditionalFormatRules([
   SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Pass').setBackground('#C6EFCE').setRanges([sheet.getRange('C4:C250')]).build(),
   SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Follow-Up').setBackground('#FFEB9C').setRanges([sheet.getRange('C4:C250')]).build(),
   SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Fail').setBackground('#FFC7CE').setRanges([sheet.getRange('C4:C250')]).build(),
   SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Critical').setBackground('#FFC7CE').setRanges([sheet.getRange('I4:I250')]).build(),
   SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Current').setBackground('#C6EFCE').setRanges([sheet.getRange('N4:N250')]).build(),
   SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Due Soon').setBackground('#FFEB9C').setRanges([sheet.getRange('N4:N250')]).build(),
   SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Overdue').setBackground('#FFC7CE').setRanges([sheet.getRange('N4:N250')]).build()
  ]);
}

function createActiveWorkOrdersSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Active Work Orders');
  const headers = ['Ticket ID', 'Room/Location', 'Issue Type', 'Issue Description', 'Priority', 'Date Reported', 'Status'];
  applyTitle_(sheet, 'Active Work Orders', 'Track guest- or staff-reported issues that need immediate attention and follow-up.', headers.length);
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]);
  applyHeaderStyle_(sheet.getRange(3, 1, 1, headers.length));
  applyBodyStyle_(sheet.getRange(4, 1, 247, headers.length));
  sheet.getRange(3, 1, 248, headers.length).applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  setColumnWidths_(sheet, [110, 150, 130, 320, 100, 120, 150]);
  sheet.setFrozenRows(3);
  sheet.getRange(3, 1, 248, headers.length).createFilter();
  sheet.setHiddenGridlines(true);

  const lists = spreadsheet.getSheetByName('Lists');
  const priorityRule = SpreadsheetApp.newDataValidation().requireValueInRange(lists.getRange('C4:C7'), true).setAllowInvalid(false).build();
  const locationRule = SpreadsheetApp.newDataValidation().requireValueInList(WORK_ORDER_LOCATIONS, true).setAllowInvalid(false).build();
  const issueTypeRule = SpreadsheetApp.newDataValidation().requireValueInList(WORK_ORDER_ISSUE_TYPES, true).setAllowInvalid(false).build();
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(WORK_ORDER_STATUSES, true).setAllowInvalid(false).build();

  sheet.getRange('B4:B250').setDataValidation(locationRule);
  sheet.getRange('C4:C250').setDataValidation(issueTypeRule);
  sheet.getRange('E4:E250').setDataValidation(priorityRule);
  sheet.getRange('F4:F250').setNumberFormat('yyyy-mm-dd').setDataValidation(SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build());
  sheet.getRange('G4:G250').setDataValidation(statusRule);

  // Auto-generate Ticket ID when the Status cell (column G) is selected via dropdown.
  // ROW()-3 converts the sheet row to a 1-based sequence (rows 1-3 are title and header; data begins at row 4).
  // The ID is tied to the row position so each row always carries a fixed, predictable ID (e.g. WO-001 … WO-247).
  sheet.getRange(4, 1, 247, 1).setFormulaR1C1('=IF(RC[6]<>"","WO-"&TEXT(ROW()-3,"000"),"")');
  sheet.getRange('A4:A250').setHorizontalAlignment('center');

  if (WORK_ORDERS.length > 0) {
    sheet.getRange(4, 2, WORK_ORDERS.length, WORK_ORDERS[0].length).setValues(WORK_ORDERS);
  }

  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Not Started').setBackground('#FFEB9C').setRanges([sheet.getRange('G4:G250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Work In Progress').setBackground('#D9EAF7').setRanges([sheet.getRange('G4:G250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Completed').setBackground('#C6EFCE').setRanges([sheet.getRange('G4:G250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('High').setBackground('#FFC7CE').setRanges([sheet.getRange('E4:E250')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Critical').setBackground('#EA9999').setRanges([sheet.getRange('E4:E250')]).build()
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

  // ─── LAYOUT ──────────────────────────────────────────────────
  setColumnWidths_(sheet, [180, 120, 120, 120, 180, 140, 120, 120, 120, 150, 130, 110, 100, 110, 110]);
  sheet.setFrozenRows(3);
  sheet.setHiddenGridlines(true);

  // ─── TITLE BAR ───────────────────────────────────────────────
  sheet.getRange(1, 1, 1, 15).merge()
    .setValue('🏨  Fairfield Maintenance Command Center')
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontSize(18)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 44);

  sheet.getRange(2, 1, 1, 15).merge()
    .setValue('Real-time operations dashboard  ·  Work Orders  ·  PM Schedules  ·  Parts Inventory  ·  Facility Health')
    .setBackground('#2E75B6')
    .setFontColor('#BDD7EE')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(2, 20);

  // Thin decorative divider
  sheet.getRange(3, 1, 1, 15).setBackground('#BDD7EE');
  sheet.setRowHeight(3, 6);

  // ─── KPI TILES (A4:B7) ───────────────────────────────────────
  const kpiData = [
    ['🎟️  Open Tickets',
     "=COUNTIF('Active Work Orders'!G4:G250,\"Not Started\")+COUNTIF('Active Work Orders'!G4:G250,\"Work In Progress\")"],
    ['🏠  Rooms w/ Open WOs',
     "=IFERROR(COUNTUNIQUE(FILTER('Active Work Orders'!B4:B250,'Active Work Orders'!A4:A250<>\"\","
     + "'Active Work Orders'!B4:B250<>\"\","
     + "'Active Work Orders'!B4:B250<>\"Other\","
     + "'Active Work Orders'!G4:G250<>\"Completed\")),0)"],
    ['⚠️  PMs Overdue',
     "=COUNTIF('Room Inspections'!N4:N250,\"Overdue\")"],
    ['📦  Parts to Reorder',
     "=COUNTIF('Parts Inventory'!K4:K250,\"Reorder\")"]
  ];
  kpiData.forEach(([label, formula], i) => {
    const row = 4 + i;
    sheet.getRange(row, 1)
      .setValue(label)
      .setBackground('#1F4E78')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setFontSize(11)
      .setHorizontalAlignment('left')
      .setVerticalAlignment('middle');
    sheet.getRange(row, 2)
      .setFormula(formula)
      .setBackground('#EBF3FB')
      .setFontColor('#1F4E78')
      .setFontSize(22)
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
    sheet.setRowHeight(row, 38);
  });
  // Thick outer border around the KPI block; inner borders preserved by null params.
  sheet.getRange('A4:B7').setBorder(true, true, true, true, null, null, '#1F4E78', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // ─── WORK ORDER STATUS TABLE (D4:E7) ─────────────────────────
  // Replaces the previous QUERY-based "Out of Order Rooms" section.
  // COUNTIF formulas are more reliable than QUERY for simple counting operations.
  sheet.getRange('D4:E4').merge()
    .setValue('Work Order Status')
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  const woStatusRows = [
    ['Not Started',      "=COUNTIF('Active Work Orders'!G4:G250,\"Not Started\")"],
    ['Work In Progress', "=COUNTIF('Active Work Orders'!G4:G250,\"Work In Progress\")"],
    ['Completed',        "=COUNTIF('Active Work Orders'!G4:G250,\"Completed\")"]
  ];
  woStatusRows.forEach(([label, formula], i) => {
    const row = 5 + i;
    sheet.getRange(row, 4).setValue(label).setFontWeight('bold').setFontSize(10);
    sheet.getRange(row, 5).setFormula(formula).setHorizontalAlignment('center').setFontSize(18).setFontWeight('bold');
  });
  applyBodyStyle_(sheet.getRange('D5:E7'));
  sheet.getRange('D5:E7').setVerticalAlignment('middle');
  sheet.getRange('D4:E7').setBorder(true, true, true, true, null, null, '#1F4E78', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // ─── PRIORITY BREAKDOWN TABLE (G4:H8) ────────────────────────
  sheet.getRange('G4:H4').merge()
    .setValue('Open WOs by Priority')
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  const priorityRows = [
    ['🚨 Critical', "=COUNTIF('Active Work Orders'!E4:E250,\"Critical\")"],
    ['🔴 High',     "=COUNTIF('Active Work Orders'!E4:E250,\"High\")"],
    ['🟡 Medium',   "=COUNTIF('Active Work Orders'!E4:E250,\"Medium\")"],
    ['🟢 Low',      "=COUNTIF('Active Work Orders'!E4:E250,\"Low\")"]
  ];
  priorityRows.forEach(([label, formula], i) => {
    const row = 5 + i;
    sheet.getRange(row, 7).setValue(label).setFontWeight('bold').setFontSize(10);
    sheet.getRange(row, 8).setFormula(formula).setHorizontalAlignment('center').setFontSize(18).setFontWeight('bold');
    sheet.setRowHeight(row, 38);
  });
  applyBodyStyle_(sheet.getRange('G5:H8'));
  sheet.getRange('G5:H8').setVerticalAlignment('middle');
  sheet.getRange('G4:H8').setBorder(true, true, true, true, null, null, '#1F4E78', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // Priority breakdown horizontal bar chart (anchored at column J, row 4)
  const priorityChart = sheet.newChart()
    .asBarChart()
    .addRange(sheet.getRange('G4:H8'))
    .setNumHeaders(1)
    .setPosition(4, 10, 0, 0)
    .setOption('title', 'Open Work Orders by Priority')
    .setOption('titleTextStyle', { fontSize: 12, bold: true, color: '#1F4E78' })
    .setOption('legend', { position: 'none' })
    .setOption('chartArea', { width: '65%', height: '70%' })
    .setOption('colors', ['#C00000', '#FF5050', '#FFC000', '#70AD47'])
    .setOption('hAxis', { minValue: 0 })
    .setOption('width', 490)
    .setOption('height', 220)
    .build();
  sheet.insertChart(priorityChart);

  // ─── CRITICAL & HIGH PRIORITY OPEN WOs (A10:C16) ─────────────
  sheet.getRange('A10:C10').merge()
    .setValue('🚨  Critical & High Priority Open Work Orders')
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(12)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(10, 30);
  sheet.getRange(11, 1, 1, 3).setValues([['Room / Location', 'Issue Type', 'Priority']]);
  applyHeaderStyle_(sheet.getRange(11, 1, 1, 3));
  sheet.setRowHeight(11, 24);

  // Filter rows where priority is Critical or High and work order is not yet Completed.
  // SORT ascending on column 4 of B:G result (Priority = E) so "Critical" precedes "High".
  // The range 'Active Work Orders'!B4:G250 maps to 1-based indices: 1=Room(B), 2=IssueType(C), 4=Priority(E).
  const woDataRange = "'Active Work Orders'!B4:G250";
  const critHighBase = `SORT(FILTER(${woDataRange},`
    + `('Active Work Orders'!E4:E250="Critical")+('Active Work Orders'!E4:E250="High"),`
    + `'Active Work Orders'!G4:G250<>"Completed",`
    + `'Active Work Orders'!B4:B250<>""),4,TRUE)`;
  for (let row = 12; row <= 16; row += 1) {
    const offset = row - 11;
    // Within B4:G250: col 1=Room(B), col 2=IssueType(C), col 4=Priority(E)
    sheet.getRange(row, 1).setFormula(`=IFERROR(INDEX(${critHighBase},${offset},1),"")`);
    sheet.getRange(row, 2).setFormula(`=IF(A${row}="","",IFERROR(INDEX(${critHighBase},${offset},2),""))`);
    sheet.getRange(row, 3).setFormula(`=IF(A${row}="","",IFERROR(INDEX(${critHighBase},${offset},4),""))`);
    sheet.setRowHeight(row, 26);
  }
  applyBodyStyle_(sheet.getRange('A12:C16'));
  sheet.getRange('A12:C16').setHorizontalAlignment('center');

  // ─── UPCOMING PM SECTION (J10:O16) ───────────────────────────
  const ROOM_INSPECTIONS_FIRST_COLUMN = 2;
  const ROOM_INSPECTIONS_LAST_PM_DATE_COLUMN = 11;
  const ROOM_INSPECTIONS_DAYS_REMAINING_COLUMN = 13;
  const ROOM_INSPECTIONS_FILTER_END_COLUMN = 14;
  const ROOM_INSPECTIONS_DAYS_REMAINING_SORT_INDEX = 12;

  const pmFilterStartColumn = columnLetter_(ROOM_INSPECTIONS_FIRST_COLUMN);
  const pmFilterEndColumn = columnLetter_(ROOM_INSPECTIONS_FILTER_END_COLUMN);
  const pmLastPmDateColumn = columnLetter_(ROOM_INSPECTIONS_LAST_PM_DATE_COLUMN);
  const pmDaysRemainingColumn = columnLetter_(ROOM_INSPECTIONS_DAYS_REMAINING_COLUMN);
  const pmDaysRemainingSortIndex = ROOM_INSPECTIONS_DAYS_REMAINING_SORT_INDEX;

  sheet.getRange('J10:O10').merge()
    .setValue(`🔔  Upcoming PM — Due Within ${PM_UPCOMING_THRESHOLD_DAYS} Days`)
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(12)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.getRange(11, 10, 1, 6).setValues([['Room / Space', 'Performed By', 'Last PM Date', 'Next Due Date', 'Days Remaining', 'PM Status']]);
  applyHeaderStyle_(sheet.getRange(11, 10, 1, 6));
  const sortedPmFormula = `SORT(FILTER('Room Inspections'!${pmFilterStartColumn}4:${pmFilterEndColumn}250,'Room Inspections'!${pmLastPmDateColumn}4:${pmLastPmDateColumn}250<>"",'Room Inspections'!${pmDaysRemainingColumn}4:${pmDaysRemainingColumn}250<=${PM_UPCOMING_THRESHOLD_DAYS}),${pmDaysRemainingSortIndex},TRUE)`;
  for (let row = 12; row <= 16; row += 1) {
    const offset = row - 11;
    sheet.getRange(row, 10).setFormula(`=IFERROR(INDEX(${sortedPmFormula},${offset},1),"")`);
    sheet.getRange(row, 11).setFormula(`=IF(J${row}="","",INDEX(${sortedPmFormula},${offset},9))`);
    sheet.getRange(row, 12).setFormula(`=IF(J${row}="","",INDEX(${sortedPmFormula},${offset},10))`);
    sheet.getRange(row, 13).setFormula(`=IF(J${row}="","",INDEX(${sortedPmFormula},${offset},11))`);
    sheet.getRange(row, 14).setFormula(`=IF(J${row}="","",INDEX(${sortedPmFormula},${offset},12))`);
    sheet.getRange(row, 15).setFormula(`=IF(J${row}="","",INDEX(${sortedPmFormula},${offset},13))`);
  }
  sheet.getRange('L12:M16').setNumberFormat('yyyy-mm-dd');
  sheet.getRange('N12:N16').setNumberFormat('0');
  applyBodyStyle_(sheet.getRange('J12:O16'));

  // ─── WORK ORDERS LAST 30 DAYS – DATA TABLE (A19:B29) ─────────
  const issueTypeStartRow = 19;
  sheet.getRange(issueTypeStartRow, 1, 1, 2).merge()
    .setValue('Work Orders – Last 30 Days by Issue Type')
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(12)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(issueTypeStartRow, 28);

  sheet.getRange(issueTypeStartRow + 1, 1, 1, 2).setValues([['Issue Type', 'Count']]);
  applyHeaderStyle_(sheet.getRange(issueTypeStartRow + 1, 1, 1, 2));

  WORK_ORDER_ISSUE_TYPES.forEach((type, i) => {
    const row = issueTypeStartRow + 2 + i;
    sheet.getRange(row, 1).setValue(type);
    sheet.getRange(row, 2).setFormula(
      `=COUNTIFS('Active Work Orders'!C$4:C$250,"${type}",'Active Work Orders'!F$4:F$250,">="&(TODAY()-30))`
    );
    sheet.setRowHeight(row, 24);
  });
  applyBodyStyle_(sheet.getRange(issueTypeStartRow + 2, 1, WORK_ORDER_ISSUE_TYPES.length, 2));

  // ─── PIE CHART – LAST 30 DAYS WORK ORDERS ────────────────────
  // Large pie chart with title and legend centered at the bottom.
  const pieChart = sheet.newChart()
    .asPieChart()
    .addRange(sheet.getRange(issueTypeStartRow + 1, 1, WORK_ORDER_ISSUE_TYPES.length + 1, 2))
    .setNumHeaders(1)
    .setPosition(issueTypeStartRow, 4, 0, 0)
    .setOption('title', 'Work Orders by Issue Type – Last 30 Days')
    .setOption('titleTextStyle', { fontSize: 14, bold: true, color: '#1F4E78' })
    .setOption('legend', { position: 'bottom', alignment: 'center', textStyle: { fontSize: 11, color: '#444444' } })
    .setOption('chartArea', { width: '82%', height: '58%', top: '12%', left: 'auto' })
    .setOption('colors', ['#1F4E78', '#2E75B6', '#4472C4', '#5B9BD5', '#9DC3E6', '#FFC000', '#FF7F40', '#BDD7EE', '#70AD47', '#FF4444'])
    .setOption('pieSliceTextStyle', { fontSize: 10, color: '#FFFFFF' })
    .setOption('width', 700)
    .setOption('height', 430)
    .build();
  sheet.insertChart(pieChart);

  // ─── CONDITIONAL FORMATTING ───────────────────────────────────
  sheet.setConditionalFormatRules([
    // Open Tickets KPI: red ≥10, yellow 5–9, green <5
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThanOrEqualTo(10).setBackground('#FFC7CE').setFontColor('#C00000')
      .setRanges([sheet.getRange('B4')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(5, 9).setBackground('#FFEB9C').setFontColor('#9C5700')
      .setRanges([sheet.getRange('B4')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(5).setBackground('#C6EFCE').setFontColor('#375623')
      .setRanges([sheet.getRange('B4')]).build(),
    // PMs Overdue KPI: red if any, green if zero
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0).setBackground('#FFC7CE').setFontColor('#C00000')
      .setRanges([sheet.getRange('B6')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberEqualTo(0).setBackground('#C6EFCE').setFontColor('#375623')
      .setRanges([sheet.getRange('B6')]).build(),
    // Parts to Reorder KPI: yellow if any, green if zero
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0).setBackground('#FFEB9C').setFontColor('#9C5700')
      .setRanges([sheet.getRange('B7')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberEqualTo(0).setBackground('#C6EFCE').setFontColor('#375623')
      .setRanges([sheet.getRange('B7')]).build(),
    // Work Order Status counts
    SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setFontColor('#C00000')
      .setRanges([sheet.getRange('E5')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setFontColor('#2E75B6')
      .setRanges([sheet.getRange('E6')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setFontColor('#375623')
      .setRanges([sheet.getRange('E7')]).build(),
    // Priority counts
    SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setFontColor('#C00000')
      .setRanges([sheet.getRange('H5')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setFontColor('#FF5050')
      .setRanges([sheet.getRange('H6')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setFontColor('#9C5700')
      .setRanges([sheet.getRange('H7')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setFontColor('#375623')
      .setRanges([sheet.getRange('H8')]).build(),
    // Critical & High Priority list – Priority column
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Critical').setBackground('#FFC7CE').setFontColor('#C00000').setFontWeight('bold')
      .setRanges([sheet.getRange('C12:C16')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('High').setBackground('#FFEB9C').setFontColor('#9C5700').setFontWeight('bold')
      .setRanges([sheet.getRange('C12:C16')]).build(),
    // PM Status
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Current').setBackground('#C6EFCE')
      .setRanges([sheet.getRange('O12:O16')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Due Soon').setBackground('#FFEB9C')
      .setRanges([sheet.getRange('O12:O16')]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Overdue').setBackground('#FFC7CE')
      .setRanges([sheet.getRange('O12:O16')]).build()
  ]);
}
