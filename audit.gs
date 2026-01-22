/**
 * 
 * 
* Optimized Audit Script v2.3
* ADDED: Error Flagging AND Hardcode Detection
*/
function createFormulaAudit() {
  const FOLDER_NAME = 'Option 2 - GitHub Assistant'; 
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  
  if (!folders.hasNext()) {
    console.error("Folder not found!");
    return;
  }
  const folder = folders.next();

  let log = [
    "=== SPREADSHEET CONFIGURATION AUDIT ===",
    "Generated: " + new Date().toLocaleString(),
    "---------------------------------------",
    ""
  ];

  ss.getSheets().forEach(sheet => {
    const sheetName = sheet.getName();
    const range = sheet.getDataRange();
    const formulas = range.getFormulas();
    const values = range.getValues(); 
    let sheetHasIssues = false;

    log.push(`\n[Sheet: ${sheetName}]`);
  
    for (let i = 0; i < formulas.length; i++) {
      // Skip completely empty rows
      if (values[i].join("").length === 0) continue; 

      for (let j = 0; j < formulas[i].length; j++) {
        const formula = formulas[i][j];
        const value = values[i][j];
        const cellRef = getA1Notation(i + 1, j + 1);

        // 1. Check for Formula Errors (#REF, #VALUE, etc)
        if (formula) {
          if (value.toString().includes("#")) {
            log.push(`!! [ERROR] ${cellRef}: ${formula} (Result: ${value})`);
          } else {
            log.push(`${cellRef}: ${formula}`);
          }
          sheetHasIssues = true;
        } 
        // 2. Hardcode Detection: If no formula exists, but there is a number
        // We skip Row 1 (assuming headers) and check if the value is a number
        else if (i > 0 && typeof value === 'number' && value !== 0) {
            log.push(`?? [HARDCODED] ${cellRef}: ${value} (Check if this should be a formula)`);
            sheetHasIssues = true;
        }
      }
    }
    
    if (!sheetHasIssues) log.push("No formulas or hardcoded data issues found.");
  });

  const output = log.join("\n");
  const fileName = "audit.txt"; 
  
  const existingFiles = folder.getFilesByName(fileName);
  while (existingFiles.hasNext()) { existingFiles.next().setTrashed(true); }

  folder.createFile(fileName, output);
  console.log("Audit Complete: Errors and Hardcoding checked.");
}

function getA1Notation(row, col) {
  let a1 = "";
  while (col > 0) {
    let remainder = (col - 1) % 26;
    a1 = String.fromCharCode(65 + remainder) + a1;
    col = Math.floor((col - remainder) / 26);
  }
  return a1 + row;
}