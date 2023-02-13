window.onload = function () {
  if (window.parent === window) {
    console.error("window.parent is not defined.");
    alert("これは埋め込みでしか利用できません。");
    window.location.href = "../app/index.html";
    throw new Error("window.parent is not defined.");
  }
};

function saveAsTxt() {
  const text = txtArea.innerText;
  console.log(text);
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "text.txt";
  a.click();
  a.remove();
}

function createTextBox() {
  const textBoxId = "textbox-" + UUID.generate();
  const div = document.createElement("div");
  div.id = textBoxId;
  div.className = "text-box";
  div.innerHTML = `<div class="text-box-move" draggable></div><div class="text-box-writeable" contenteditable></div>`;
  document.body.appendChild(div);
  window.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById(textBoxId);
    element.addEventListener("dragstart", function (ev) {
      ev.dataTransfer.setData("text/plain", ev.target.id);
    });
  });
}
function uploadImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      addImageBox(e.target.result);
      input.remove();
    };
  };
  input.click();
}

function addImageBox(data) {
  const imageBoxId = "imagebox-" + UUID.generate();
  const div = document.createElement("div");
  div.id = imageBoxId;
  div.className = "image-box";
  div.innerHTML = `<div class="image-box-move" draggable></div><img class="image-box-image" src="${data}">`;
  document.body.appendChild(div);
}
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}
function drop_handler(ev) {
  ev.preventDefault();
  // 移動された要素のidを取得して、その要素をtargetのDOMに追加する
  const data = ev.dataTransfer.getData("text/plain");
  console.log(data);
}
