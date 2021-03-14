const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron");
const formEl = document.getElementById("image-form");
const sliderEl = document.getElementById("slider");
const imgInputEl = document.getElementById("img");

document.getElementById("output-path").innerText = path.join(
  os.homedir(),
  "shrinkit"
);

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const imgPath = imgInputEl.files[0].path;
  const quality = sliderEl.value;
  ipcRenderer.send("image:minimize", {
    imgPath,
    quality,
  });
});
ipcRenderer.on("image:done", () => {
  //
  M.toast({
    html: `Image resized to ${sliderEl.value}% quality`,
  });
});
