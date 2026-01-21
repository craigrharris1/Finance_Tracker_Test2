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

## ⚠️ Troubleshooting & Sync Tips
If you encounter the `github assistance undefined` error, check the following:

* **Avoid Subfolders**: Google Apps Script filenames cannot contain slashes (`/`).
* **Root Directory**: Ensure all `.js` and `.json` files are kept in the **Root directory** of the repository to prevent naming crashes.
* **One-Way Sync**: If the **Pull (↓)** function crashes, rely on the **Push (↑)** function only.
* **Source of Truth**: Treat the Apps Script editor as the "source of truth" and GitHub as the backup storage.
* **Manual Re-sync**: If the sides get out of alignment, manually copy the code from GitHub, paste it into the editor, and then perform a fresh **Push** to reset the connection.
* **Refresh GitHub**: Changes pushed from Apps Script may not appear immediately; always **refresh (F5)** the GitHub page to verify a successful push.