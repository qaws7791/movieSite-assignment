$navCloseButtons = document.querySelector(".navCloseButton");
$navOpenButtons = document.querySelector(".navOpenButton");
$inputSearch = document.querySelector("#inputSearch");
$navContainer = document.querySelector(".navContainer");
$nav__bg = document.querySelector(".nav__bg");
$navSpace = document.querySelector(".navSpace");
$navItems = document.querySelectorAll(".navItem");
$searchOpenButton = document.querySelector(".searchOpenButton");
$searchCloseButton = document.querySelector(".searchCloseButton");
$searchBar = document.querySelector(".searchBar");

window.addEventListener("resize", onResizeWindow);
document.addEventListener("DOMContentLoaded", onDOMLoad);
$navOpenButtons.addEventListener("click", openNav);
$navCloseButtons.addEventListener("click", closeNav);
$searchOpenButton.addEventListener("click", openSearchBar);
$searchCloseButton.addEventListener("click", closeSearchBar);
$inputSearch.addEventListener("keyup", submitDetectEnter);
$nav__bg.addEventListener("click", onClickNav__bg);

function onClickNav__bg() {
  closeNav();
}

function onDOMLoad() {
  $inputSearch.focus();
}

function onResizeWindow() {
  if (window.innerWidth <= 600) {
    closeSearchBar();
  } else {
    openSearchBar();
  }
}

function openSearchBar() {
  $searchBar.classList.remove("hide");
}

function closeSearchBar() {
  $searchBar.classList.add("hide");
}

function openNav() {
  $navContainer.classList.remove("hide");
}
function closeNav() {
  $navContainer.classList.add("hide");
}
$navItems.forEach((navItem) => {
  navItem.addEventListener("click", closeNav);
});

function handleSearchSubmit() {
  if ($inputSearch.value)
    window.location.href = `/#/search/${$inputSearch.value}`;
}

function submitDetectEnter(e) {
  if (e.keyCode === 13) handleSearchSubmit();
}
onResizeWindow();
