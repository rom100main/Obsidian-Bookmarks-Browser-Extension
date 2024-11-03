browser.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    // Set default values
    vaultName = "Second Brain";
    folder = "Bookmarks";
    fileName = "{{date}} - {{title}}";
    template = `---
Link: {{link}}
Title: "{{title}}"
Image: {{image}}
Date: {{date}}
Tags: {{tags}}
---

# {{title}}

{{comment}}`;

    browser.storage.local.set({
      obsidianbookmarks_opts_vault_name: vaultName,
      obsidianbookmarks_opts_folder: folder,
      obsidianbookmarks_opts_file_name: fileName,
      obsidianbookmarks_opts_template: template,
      obsidianbookmarks_opts_tags: [],
      obsidianbookmarks_opts_sub_folders: [],
    });

    // Open options page
    browser.tabs.create({
      url: browser.runtime.getURL("options.html"),
    });
  }
});

// Receive data from content script
browser.runtime.onMessage.addListener(async function (message) {
  // console.log("Received message from content script");
  submitNote(message);
});

async function submitNote(data) {
  let vaultName = data.vaultName;
  let folder = data.folder;
  let subFolder = data.subFolder;
  let fileName = data.fileName;
  let template = data.template;
  let imgSrc = data.imgSrc;

  subFolder = encodeURIComponent(subFolder);

  // Replace
  fileName = fileName.replace(/{{image}}/g, imgSrc).replace(/[\/\\:]/g, " ");
  fileName = fileName.replace(/[<>:"/\\?*|^]/g, ""); // remove invalid characters
  fileName = fileName.replace(/[.\s]+$/, "");
  fileName = encodeURIComponent(fileName);

  template = template.replace(/{{image}}/g, imgSrc);
  template = encodeURIComponent(template);

  // URI
  const obsidianURI = `obsidian://new?vault=${vaultName}&file=${folder}${subFolder}${fileName}.md&content=${template}&overwrite`;

  // Tabs
  // console.log("Opening Obsidian with URI: " + obsidianURI);

  browser.tabs.create({
    url: obsidianURI,
  });

  /* With tab closing automatically
  browser.tabs.create(
    { url: obsidianURI, active: true },
    function (obsidianTab) {
      setTimeout(function () {
        browser.tabs.remove(obsidianTab.id);
      }, 500);
    },
  );
  */
}
