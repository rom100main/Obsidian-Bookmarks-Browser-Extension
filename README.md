# Obsidian Bookmarks

Obsidian Bookmarks is a Firefox extension that allows you to save bookmarks as markdown files directly into your Obsidian vault. 

## ✨ Features

- Save bookmarks to sub-folders within your Obsidian vault.
- Automatically grab images from the bookmarked website.
- Customize the template for your bookmark notes.

## ⚙️ Setup

1. **Install the Extension**: Add the Obsidian Bookmarks extension to your Firefox browser.
2. **Configure Options**: Go to the add-on options page in Firefox's Add-ons tab and set the vault name, folder name, file name template, and note template.

## 💡 Tips

You can create a bookmarks viewer in Obsidian with the [Minimal](https://github.com/kepano/obsidian-minimal) Theme, [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) plugin, and this note:

```markdown
---
cssclasses:
  - cards
  - cards-cover
  - cards-2-3
  - cards-cols-4
  - max
---

\`\`\`dataview
TABLE 
	WITHOUT id ("![](" + Cover + ")") AS Cover,
	("[" + Title + "](" + Link + ")") AS Title,
	Date,
	Tags[0] + ", " + Tags[1] + ", " + Tags[2]  AS Tags,
	("[[" + file.path + "| Edit ]]") AS Edit
FROM "Bookmarks"
SORT Title ASC
\`\`\`
```
(remove the backslashes before the triple backticks to use the code block)

## 🛠️ Development

### Prerequisites

- [Firefox](https://www.mozilla.org/en-US/firefox/)
- [Obsidian](https://obsidian.md/)

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/yourusername/obsidian-bookmarks.git
  cd obsidian-bookmarks
  ```

2. Load the extension in Firefox:
  - Open Firefox and go to `about:debugging`.
  - Click on "This Firefox" in the sidebar.
  - Click on "Load Temporary Add-on" and select the `manifest.json` file from the cloned repository.

### File Structure

- `popup.html`: The HTML file for the popup interface.
- `options.html`: The HTML file for the options page.
- `styles/`: Contains CSS files for styling the popup and options pages.
- `scripts/`: Contains JavaScript files for the extension's functionality.
  - `popup.js`: Handles the logic for the popup interface.
  - `options.js`: Handles the logic for the options page.
  - `content-script.js`: Extracts images from the bookmarked page.
  - `background.js`: Manages background tasks and communication between scripts.
- `manifest.json`: The manifest file for the Firefox extension.
- `mozilla.md`: Documentation for the Mozilla add-ons page.

## 📝 Notes

- This is a beta version, image grabbing may not work on all websites.
- If the save button is not working, try reclicking it or refreshing the page.
- This is an unofficial extension and is not affiliated with Obsidian.

Happy bookmarking!
