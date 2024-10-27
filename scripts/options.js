window.addEventListener("DOMContentLoaded", function () {
  browser.storage.local
    .get([
      "obsidianbookmarks_opts_vault_name",
      "obsidianbookmarks_opts_folder",
      "obsidianbookmarks_opts_file_name",
      "obsidianbookmarks_opts_template",
    ])
    .then(function (result) {
      let vaultName = result.obsidianbookmarks_opts_vault_name;
      let folder = result.obsidianbookmarks_opts_folder;
      let fileName = result.obsidianbookmarks_opts_file_name;
      let template = result.obsidianbookmarks_opts_template;

      document.getElementById("vaultName").value = vaultName;
      document.getElementById("folder").value = folder;
      document.getElementById("fileName").value = fileName;
      document.getElementById("template").textContent = template;
    });
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
