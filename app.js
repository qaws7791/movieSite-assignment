const $container = document.querySelector("#container");
function home() {
  $container.innerHTML = "<h1>Home</h1>";
}
function movie(id) {
  $container.innerHTML = `<h1>Movie: ${id}</h1>`;
}
function category(id) {
  $container.innerHTML = `<h1>Category: ${id}</h1>`;
}
function router() {
  const path = location.hash;
  console.log(path);
  if (path === "") {
    home();
  } else if (path.slice(0, 8) === "#/movie/") {
    movie(path.substr(8));
  } else if (path.slice(0, 11) === "#/category/") {
    category(path.substr(11));
  }
}
window.addEventListener("hashchange", router);
router();
