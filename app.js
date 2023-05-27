const $content = document.querySelector("#content");
function home() {
  $content.innerHTML = `
  <h2>인기있는 영화들</h2>
  <div class="banner">
    <div class="swiper bannerSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
  <h2>액션 영화</h2>
  <section class="section">
    <div class="swiper movieSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
      </div>
      <div class="swiper-button-next movieSwiper-button-next"></div>
      <div class="swiper-button-prev movieSwiper-button-prev"></div>
    </div>
  </section>
  `;
  const bannerSwiper = new Swiper(".bannerSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });
  const movieSwiper = new Swiper(".movieSwiper", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".movieSwiper-button-next",
      prevEl: ".movieSwiper-button-prev",
    },
    loop: true,
  });
}
function movie(id) {
  $content.innerHTML = `<h1>Movie: ${id}</h1>`;
}
function category(id) {
  $content.innerHTML = `<h1>Category: ${id}</h1>`;
}
function router() {
  const path = location.hash;
  console.log(path);
  console.log(window.location.pathname);
  if (path === "") {
    home();
  } else if (path.slice(0, 7) === "#/movie") {
    movie(path.substr(7));
  } else if (path.slice(0, 10) === "#/category") {
    category(path.substr(10));
  }
}
window.addEventListener("hashchange", router);
router();
