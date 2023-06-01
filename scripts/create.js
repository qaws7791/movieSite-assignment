export function generateBannerSwiper() {
  new Swiper(".bannerSwiper", {
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".bannerSwiper-button-next",
      prevEl: ".bannerSwiper-button-prev",
    },
    loop: true,
    breakpoints: {
      1600: {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 30,
      },
    },
  });
}

export function createBannerSliderElement(movies) {
  const slides = movies
    .map(
      (movie) =>
        `<div class="swiper-slide">
        <a href='/#/movie/${movie.id}' class='bannerCard'>
          <img src='https://image.tmdb.org/t/p/original${movie.backdrop_path}' alt='${movie.title}' />
          <div class='bannerCard__content'>
            <h5 class='bannerCard__title'>${movie.title}</h5>
          </div>
        </a>
      </div>`
    )
    .join("");

  return `
    <div class="swiper bannerSwiper">
      <div class="swiper-wrapper">
        ${slides}
      </div>
      <div class="swiper-button-next bannerSwiper-button-next"></div>
      <div class="swiper-button-prev bannerSwiper-button-prev"></div>
    </div>
  `;
}

export function generateMovieSwiper(i) {
  return new Swiper(`.movieSwiper-${i}`, {
    slidesPerView: 2,
    centeredSlides: false,
    spaceBetween: 20,
    navigation: {
      nextEl: `.movieSwiper-button-next-${i}`,
      prevEl: `.movieSwiper-button-prev-${i}`,
    },
    loop: true,
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 40,
        centeredSlides: false,
      },
      750: {
        slidesPerView: 3,
        spaceBetween: 40,
        centeredSlides: true,
      },

      960: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
      },
      1500: {
        slidesPerView: 5,
        spaceBetween: 30,
        centeredSlides: true,
      },
      1800: {
        slidesPerView: 7,
        spaceBetween: 20,
        centeredSlides: true,
      },
    },
  });
}

export function createMovieSlidersElement(movies, index) {
  const slides = movies
    .map(
      (movie) =>
        `
    <div class="swiper-slide posterSlide">
      ${createPosterCardElement(movie)}
    </div>
    `
    )
    .join("");

  return `
  <section class="movieSection">
    <div class="swiper movieSwiper-${index}">
      <div class="swiper-wrapper">
      ${slides}
      </div>
    </div>
    <div class="swiper-button-next movieSwiper-button-next-${index}"></div>
      <div class="swiper-button-prev movieSwiper-button-prev-${index}"></div>
  </section>
  `;
}

export function createPosterCardElement(movie) {
  return `
  <a 
    href='/#/movie/${movie.id}' 
    class='posterCard' 
    onclick='alert("영화 id: ${movie.id}")'
  >
  <img 
    class='posterCard__poster' 
    src='https://image.tmdb.org/t/p/w342${movie.poster_path}' 
    alt='${movie.title}' 
    onerror="this.src='https://placehold.co/342x513?text=No+Image&font=roboto';" 
  />
  <div class='posterCard__content'>
    <div><h6 class='posterCard__title'>${movie.title}</h6></div>
    <div><p class='posterCard__overview'>${movie.overview}</p></div>
    <div>
      <p class='posterCard__rating'>
        <i class="fa-regular fa-thumbs-up"></i>
        ${Number.parseInt(Number(movie.vote_average) * 10)}%
      </p>
    </div>
  </div>
</a>`;
}
