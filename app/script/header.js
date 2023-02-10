//header監視用
let isHeaderShown = true;
const header = document.querySelector("header");
function moveHeader() {
  if (isHeaderShown) {
    header.classList.add("hide");
    moveHeaderButton.classList.add("header-hidden");
    downIcon.style.display = "block";
    upIcon.style.display = "none";
    isHeaderShown = false;
  } else {
    header.classList.remove("hide");
    moveHeaderButton.classList.remove("header-hidden");
    downIcon.style.display = "none";
    upIcon.style.display = "block";
    isHeaderShown = true;
  }
}
