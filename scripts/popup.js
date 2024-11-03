let vaultName;
let folder;
let fileName;
let template;

let link;
let title;

// Get tabs and storage data
browser.tabs
  .query({
    active: true,
    currentWindow: true,
  })
  .then(function (tabs) {
    browser.storage.local
      .get(
        // Load data
        [
          "obsidianbookmarks_opts_vault_name",
          "obsidianbookmarks_opts_folder",
          "obsidianbookmarks_opts_file_name",
          "obsidianbookmarks_opts_template",
          "obsidianbookmarks_opts_tags",
          "obsidianbookmarks_opts_sub_folders",
        ],
      )
      .then(function (result) {
        // Base values
        vaultName = result.obsidianbookmarks_opts_vault_name;
        vaultName = encodeURIComponent(vaultName);

        folder = result.obsidianbookmarks_opts_folder;
        if (folder) {
          folder = folder + "/";
        }
        folder = encodeURIComponent(folder);

        fileName = result.obsidianbookmarks_opts_file_name;

        template = result.obsidianbookmarks_opts_template;

        // Tags
        let tags = result.obsidianbookmarks_opts_tags || [];
        let tagsList = document.getElementById("tagsList");
        tags.forEach(function (tag) {
          let option = document.createElement("option");
          option.value = tag;
          tagsList.appendChild(option);
        });

        // Sub Folders
        let subFolders = result.obsidianbookmarks_opts_sub_folders || [];
        let subFoldersList = document.getElementById("subFoldersList");
        subFolders.forEach(function (subFolder) {
          let option = document.createElement("option");
          option.value = subFolder;
          subFoldersList.appendChild(option);
        });
      });

    document.getElementById("title").value = tabs[0].title;
    title = tabs[0].title;

    document.getElementById("link").value = tabs[0].url;
    link = tabs[0].url;
  });

document.getElementById("submit").addEventListener("click", async function () {
  let data = await preBuildNote();

  // Execute content script to find image
  // console.log("Execute content script");
  // console.log(data);

  browser.tabs.executeScript(
    {
      code: "let data = " + JSON.stringify(data),
    },
    function () {
      chrome.tabs.executeScript({ file: "scripts/content-script.js" });
    },
  );
});

async function preBuildNote() {
  //Values
  let tags = document.getElementById("tags").value;
  tags = `[${tags.replace(/[^,]+/g, "'$&'").replace(/,\s*$/, "")}]`;

  let subFolder = document.getElementById("subFolder").value;
  if (subFolder) {
    subFolder = subFolder + "/";
  }

  let comment = document.getElementById("comment").value;

  // Browser values
  let date = new Date();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0
  let yyyy = date.getFullYear();
  date = yyyy + "-" + mm + "-" + dd;

  // Replace
  title = title.replace(/"/g, " ");

  fileName = fileName
    .replace(/{{title}}/g, title)
    .replace(/{{link}}/g, link)
    .replace(/{{tags}}/g, tags)
    .replace(/{{date}}/g, date)
    .replace(/{{comment}}/g, comment)
    .replace(/[\/\\:]/g, " ");

  template = template
    .replace(/{{title}}/g, title)
    .replace(/{{link}}/g, link)
    .replace(/{{tags}}/g, tags)
    .replace(/{{date}}/g, date)
    .replace(/{{comment}}/g, comment);

  // Build data
  let data = {
    vaultName: vaultName,
    folder: folder,
    subFolder: subFolder,
    fileName: fileName,
    template: template,
  };

  return data;
}

document.getElementById("settings").addEventListener("click", function () {
  browser.tabs.create({
    url: browser.runtime.getURL("options.html"),
  });
});
