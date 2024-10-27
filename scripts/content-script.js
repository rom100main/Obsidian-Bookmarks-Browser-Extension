(async () => {
  // Search the image in the most relevant place
  let searchIn = document;
  if (searchIn.getElementsByTagName("main").length > 0) {
    searchIn = searchIn.getElementsByTagName("main")[0];
  }
  if (searchIn.getElementsByTagName("article").length > 0) {
    searchIn = searchIn.getElementsByTagName("article")[0];
  }

  // Find image
  let imgList = searchIn.getElementsByTagName("img");
  let imgSrc;

  for (let i = 0; i < imgList.length; i++) {
    let boxSize = imgList[i].getBoundingClientRect();

    if (
      // Alt filter
      !imgList[i].alt.toLowerCase().includes("logo") &&
      !imgList[i].alt.toLowerCase().includes("menu") &&
      !imgList[i].alt.toLowerCase().includes("profil") &&
      !imgList[i].alt.toLowerCase().includes("blank") &&
      // Src filter
      !imgList[i].src.toLowerCase().includes("logo") &&
      !imgList[i].src.toLowerCase().includes("menu") &&
      !imgList[i].src.toLowerCase().includes("profil") &&
      !imgList[i].src.toLowerCase().includes("blank") &&
      // Size filter
      boxSize.width > 100 &&
      boxSize.height > 100
    ) {
      imgSrc = imgList[i].src;

      // console.log("Found image");
      // console.log(imgList[i]);

      break;
    }
  }
  if (!imgSrc) {
    imgSrc = imgList[0].getAttribute("src") || "";
  }

  // Send data to background script
  data.imgSrc = imgSrc;

  // console.log("Send to background script");

  browser.runtime.sendMessage(data);
})();
