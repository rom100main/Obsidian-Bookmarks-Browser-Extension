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
        ],
      )
      .then(function (result) {
        vaultName = result.obsidianbookmarks_opts_vault_name;
        vaultName = encodeURIComponent(vaultName);

        folder = result.obsidianbookmarks_opts_folder;
        if (folder) {
          folder = folder + "/";
        }
        folder = encodeURIComponent(folder);

        fileName = result.obsidianbookmarks_opts_file_name;

        template = result.obsidianbookmarks_opts_template;
      });

    document.getElementById("title").value = tabs[0].title;
    title = tabs[0].title;

    document.getElementById("link").value = tabs[0].url;
    link = tabs[0].url;
  });

document.getElementById("submit").addEventListener("click", function () {
  let data = preBuildNote();

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

function preBuildNote() {
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
