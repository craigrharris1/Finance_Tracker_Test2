# Finance Tracker 📊

A Google Apps Script project to support household financial tracking in a Google Sheets spreadsheets.

## 📁 Project Structure
* **Audit.js**: Creates an audit of spreadsheet structure and formulae to enable change tracking
* **main.js**: Contains the core logic for the Finance Tracker's daily operations.
* **appsscript.json**: The project manifest file containing permissions and library dependencies.

## 🛠️ Setup & Usage
1. Open the associated Google Sheet.
2. Navigate to **Extensions > Apps Script**.
3. Run the `onOpen` function if the custom menu is not visible.

## 🔄 Syncing Note
This repository is synced via the **Google Apps Script GitHub Assistant**.
* **Primary Editor**: Google Apps Script Editor.
* **Workflow**: Changes are authored in Apps Script and **Pushed** to GitHub. 
* **Caution**: Do not edit script files directly on GitHub to avoid sync conflicts with the local editor.