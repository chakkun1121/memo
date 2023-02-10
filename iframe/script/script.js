window.onload = function () {
  if (window.parent === window) {
    console.error("window.parent is not defined.");
    alert("これは埋め込みでしか利用できません。");
    window.location.href = "../app/index.html";
    throw new Error("window.parent is not defined.");
  }
};
