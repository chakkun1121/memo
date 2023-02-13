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
  const div = document.createElement("div");
  div.className = "text-box";
  div.innerHTML = `<div class="text-box-move"></div><div class="text-box-writeable" contenteditable></div>`;
  document.body.appendChild(div);
}
