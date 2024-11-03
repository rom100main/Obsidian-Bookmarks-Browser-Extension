if (window.location.search.includes("firstInstall=true")) {
  let mainElement = document.querySelector("main");
  if (mainElement) {
    let divElement = document.createElement("div");
    divElement.innerHTML = `
      <h1>Welcome to Obsidian Bookmarks</h1>
      <p>
        Thank you for installing the extension.<br/>
        <br/>
        In order to work properly, you need to set the right vault name.<br/>
        You can change these settings at any time by clicking on the extension icon then settings icon.<br/>
        <br/>
        Happy bookmarking!
      </p>
      `;
    mainElement.innerHTML = divElement.outerHTML + mainElement.innerHTML;
  }
}

browser.storage.local
  .get([
    "obsidianbookmarks_opts_vault_name",
    "obsidianbookmarks_opts_folder",
    "obsidianbookmarks_opts_file_name",
    "obsidianbookmarks_opts_template",
    "obsidianbookmarks_opts_tags",
    "obsidianbookmarks_opts_sub_folders",
  ])
  .then(function (result) {
    // Options
    let vaultName = result.obsidianbookmarks_opts_vault_name;
    let folder = result.obsidianbookmarks_opts_folder;
    let fileName = result.obsidianbookmarks_opts_file_name;
    let template = result.obsidianbookmarks_opts_template;

    document.getElementById("vaultName").value = vaultName;
    document.getElementById("folder").value = folder;
    document.getElementById("fileName").value = fileName;
    document.getElementById("template").textContent = template;

    // Tags
    let tags = result.obsidianbookmarks_opts_tags;
    document.getElementById("tags").value = tags || "";

    // Sub Folders
    let subFolders = result.obsidianbookmarks_opts_sub_folders;
    document.getElementById("subFolders").value = subFolders || "";
  });

document.getElementById("submit").addEventListener("click", function () {
  let vaultName = document.getElementById("vaultName").value;
  let folder = document.getElementById("folder").value;
  let fileName = document.getElementById("fileName").value;
  let template = document.getElementById("template").value;

  browser.storage.local.set({
    obsidianbookmarks_opts_vault_name: vaultName,
    obsidianbookmarks_opts_folder: folder,
    obsidianbookmarks_opts_file_name: fileName,
    obsidianbookmarks_opts_template: template,
  });
});

document.getElementById("setTags").addEventListener("click", function () {
  let tags = document.getElementById("tags").value.split(",");
  tags = tags.map((tag) => tag.trim());
  browser.storage.local.set({
    obsidianbookmarks_opts_tags: tags,
  });
});

document.getElementById("setSubFolders").addEventListener("click", function () {
  let subFolders = document.getElementById("subFolders").value.split(",");
  subFolders = subFolders.map((subFolder) => subFolder.trim());
  browser.storage.local.set({
    obsidianbookmarks_opts_sub_folders: subFolders,
  });
});
