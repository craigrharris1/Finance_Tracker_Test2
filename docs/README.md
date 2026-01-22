# Finance Tracker 📊

A Google Apps Script project to support household financial tracking in a Google Sheets spreadsheets.

## 📖 Table of Contents
1. [Directory Structure](#-directory-structure)
2. [Setup & Usage](#-setup--usage)
3. [Syncing Workflow](#-syncing-workflow)
4. [Troubleshooting](#-troubleshooting--sync-tips)

## 📁 Directory Structure
* [**/audits**](../audits) - *Click to view formula logs*
* [**/docs**](../docs) - *Project documentation*
* **Audit.js** - The core auditing engine (Root)
* **main.js** - Daily operation logic (Root)

## 📁 Project Structure
* **Audit.js**: Creates an audit of spreadsheet structure and formulae to enable change tracking
* **main.js**: Contains the core logic for the Finance Tracker's daily operations.
* **appsscript.json**: The project manifest file containing permissions and library dependencies.
* Code files are stored in the root directory.
* README and any other documentation are stored in the **/docs** directory
* Audit files are stored in the **audits** directory

## 🛠️ Setup & Usage
1. Open the associated Google Sheet.
2. Navigate to **Extensions > Apps Script**.
3. Run the `onOpen` function if the custom menu is not visible.

## 🔄 Syncing Note
* **Code** in this repository is synced via the **Google Apps Script GitHub Assistant**.
*   **Primary Editor**: Google Apps Script Editor.
*   **Workflow**: Changes are authored in Apps Script and **Pushed** to GitHub. 
*   **Caution**: Do not edit script files directly on GitHub to avoid sync conflicts with the local editor.

* **Audit files** are created locally and manually pushed to GitHub

*  **Documentation** can be created or updated locally and then pushed to GitHub, or edited directly in GitHub.

## ⚠️ Troubleshooting & Sync Tips
If you encounter the `github assistance undefined` error, check the following:

* **Avoid Subfolders for code files**: Google Apps Script filenames cannot contain slashes (`/`).
* **Root Directory**: Ensure all `.js` and `.json` files are kept in the **Root directory** of the repository to prevent naming crashes.
* **One-Way Sync**: only rely on the GutHub Assistant **Push (↑)** for Apps Script Editor to GutHub integration.
* **Source of Truth**: Treat the Apps Script editor as the "source of truth" and GitHub as the backup storage.
* **Manual Re-sync**: If the sides get out of alignment, manually copy the code from GitHub, paste it into the editor, and then perform a fresh **Push** to reset the connection.
* **Refresh GitHub**: Changes pushed from Apps Script may not appear immediately; always **refresh (F5)** the GitHub page to verify a successful push.
