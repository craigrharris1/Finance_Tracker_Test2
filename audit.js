/**
 * 
* Optimized Audit Script
* 1. Removes visual alerts to prevent hanging.
* 2. Uses bulk-processing for speed.
* 3. Handles wide sheets (AA, AB, etc.)
*/
function createFormulaAudit() {
 const FOLDER_NAME = 'Option 2 - GitHub Assistant'; // Ensure this matches your folder name
 const ss = SpreadsheetApp.getActiveSpreadsheet();
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
 if (!folders.hasNext()) {
   console.error("Folder not found!");
   return;
 }
 const folder = folders.next();


 let output = "=== SPREADSHEET CONFIGURATION AUDIT ===\n";
 output += "Generated: " + new Date().toLocaleString() + "\n\n";


 ss.getSheets().forEach(sheet => {
   output += `[Sheet: ${sheet.getName()}]\n`;
  
   // Bulk grab all formulas in one API call (much faster)
   const range = sheet.getDataRange();
   const formulas = range.getFormulas();
  
   for (let i = 0; i < formulas.length; i++) {
     for (let j = 0; j < formulas[i].length; j++) {
       if (formulas[i][j]) {
         // Robustly get A1 notation without extra API calls
         const cellRef = getA1Notation(i + 1, j + 1);
         output += `${cellRef}: ${formulas[i][j]}\n`;
       }
     }
   }
   output += "\n";
 });


 const fileName = ss.getName() + "_Audit.txt";
 const existingFiles = folder.getFilesByName(fileName);
 while (existingFiles.hasNext()) { existingFiles.next().setTrashed(true); }


 folder.createFile(fileName, output);
 console.log("Audit Complete. No alerts issued.");
}


/**
* Helper function to convert coordinates to A1 notation efficiently
*/
function getA1Notation(row, col) {
 let a1 = "";
 while (col > 0) {
   let remainder = (col - 1) % 26;
   a1 = String.fromCharCode(65 + remainder) + a1;
   col = Math.floor((col - remainder) / 26);
 }
 return a1 + row;
}