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
  div.innerHTML = `<div id="textBoxMoveID${textBoxId}" class="text-box-move"></div><div class="text-box-writeable" contenteditable></div>`;
  document.body.appendChild(div);
  const moveElement = document.getElementById(`textBoxMoveID${textBoxId}`);
  moveElement.addEventListener("mousedown", mdown, false);
  moveElement.addEventListener("touchstart", mdown, false);
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
  div.innerHTML = `<div class="image-box-move" id="imgBoxMoveId_${imageBoxId}"></div><img class="image-box-image" src="${data}">`;
  document.body.appendChild(div);
  const moveElement = document.getElementById(`imgBoxMoveId_${imageBoxId}`);
  moveElement.addEventListener("mousedown", mdown, false);
  moveElement.addEventListener("touchstart", mdown, false);
}

//マウスが押された際の関数
function mdown(e) {
  //クラス名に .drag を追加
  const ID = this.id;
  console.log(ID);
  const moveElement = document.getElementById(ID);
  moveElement.classList.add("drag");
  //タッチデイベントとマウスのイベントの差異を吸収
  if (e.type === "mousedown") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  //要素内の相対座標を取得
  x = event.pageX - this.offsetLeft;
  y = event.pageY - this.offsetTop;

  //ムーブイベントにコールバック
  document.body.addEventListener("mousemove", mmove, false);
  document.body.addEventListener("touchmove", mmove, false);
}

//マウスカーソルが動いたときに発火
function mmove(e) {
  //ドラッグしている要素を取得
  const drag = document.getElementsByClassName("drag")[0];
  const id = drag.id.slice(13);
  console.log(id);
  const mainElement = document.getElementById(id);
  //同様にマウスとタッチの差異を吸収
  if (e.type === "mousemove") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  //フリックしたときに画面を動かさないようにデフォルト動作を抑制
  e.preventDefault();
  console.log(event.pageY);
  //マウスが動いた場所に要素を動かす
  mainElement.style.top = event.pageY - y + "px";
  mainElement.style.left = event.pageX - x + "px";

  //マウスボタンが離されたとき、またはカーソルが外れたとき発火
  drag.addEventListener("mouseup", mup, false);
  document.body.addEventListener("mouseleave", mup, false);
  drag.addEventListener("touchend", mup, false);
  document.body.addEventListener("touchleave", mup, false);
}

//マウスボタンが上がったら発火
function mup(e) {
  console.log("ドラッグアンドドロップ終わりました");
  const drag = document.getElementsByClassName("drag")[0];
  //ムーブベントハンドラの消去
  document.body.removeEventListener("mousemove", mmove, false);
  document.getElementById(drag.id).removeEventListener("mouseup", mup, false);
  document.body.removeEventListener("touchmove", mmove, false);
  document.getElementById(drag.id).removeEventListener("touchend", mup, false);

  //クラス名 .drag も消す
  drag.classList.remove("drag");
}
