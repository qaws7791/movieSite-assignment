import {
  fetchPopularMovies,
  fetchMovieDetail,
  fetchGenreMovies,
  fetchSearchMovies,
} from "./fetch.js";
import jsonData from "./genre.json" assert { type: "json" };
const $content = document.querySelector("#content");
const genres = {};
jsonData.genres.forEach(({ id, name }) => (genres[id] = name));
console.log(genres);

//////////////////////////////////////////////////////////////////
async function home() {
  const movies = await fetchPopularMovies();
  const promises = [];
  for (const key in genres) {
    console.log(genres[key]);
    promises.push(fetchGenreMovies(key));
  }
  console.log(promises);
  const results = await Promise.all(promises);
  console.log(results);
  const sliders = results.map((genreMovies, i) => {
    return createMovieSlider(genreMovies, i);
  });
  console.log(sliders);
  const bannerSlides = movies
    .map(
      (movie) =>
        `<div class="swiper-slide">
        <a href='/#/movie/${movie.id}'>
          <img src='https://image.tmdb.org/t/p/original${movie.backdrop_path}' alt=${movie.title} />
        </a>
      </div>`
    )
    .join("");
  $content.innerHTML = `
  <h2>인기있는 영화들</h2>
  <div class="banner">
    <div class="swiper bannerSwiper">
      <div class="swiper-wrapper">
        ${bannerSlides}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
      ${Object.values(genres)
        .map((x, i) => `<h2>${x} 영화</h2>` + sliders[i])
        .join("")}
  `;
  const bannerSwiper = new Swiper(".bannerSwiper", {
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    breakpoints: {
      1250: {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 30,
      },
    },
  });
  const swipers = results.map((x, i) => generateMovieSwiper(i));
}

function generateMovieSwiper(i) {
  return new Swiper(`.movieSwiper-${i}`, {
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 30,
    navigation: {
      nextEl: `.movieSwiper-button-next-${i}`,
      prevEl: `.movieSwiper-button-next-${i}`,
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

function createMovieSlider(movies, index) {
  const Slides = movies
    .map(
      (movie) =>
        `
    <div class="swiper-slide poster-slide">
      <a href='/#/movie/${movie.id}'>
        <img src='https://image.tmdb.org/t/p/w342${movie.poster_path}' alt=${movie.title} />
      </a>
    </div>
    `
    )
    .join("");

  return `
  <section class="section">
    <div class="swiper movieSwiper-${index}">
      <div class="swiper-wrapper">
      ${Slides}
      </div>
      <div class="swiper-button-next movieSwiper-button-next-${index}"></div>
      <div class="swiper-button-prev movieSwiper-button-prev-${index}"></div>
    </div>
  </section>
  `;
}

async function movie(id) {
  const movieDetail = await fetchMovieDetail(id);
  const { title, backdrop_path, overview, poster_path } = movieDetail;
  console.log(movieDetail);
  $content.innerHTML = `
    <h1>${title}</h1>
    <p>${overview}</p>
  `;
}

async function search(query) {
  const movies = await fetchSearchMovies(query);
  const movieElements = movies
    .map((movie) => `<li>${movie.title}</li>`)
    .join("");
  $content.innerHTML = `<h1>Search: ${decodeURI(
    query
  )}</h1><ul>${movieElements}</ul>`;
}

function notFoundPage() {
  $content.innerHTML = `<h1>NotFound</h1>`;
}

async function genrePage(genre) {
  $content.innerHTML = `<h1>genre: ${genres[genre]}</h1>`;
}

async function discoverPage() {
  let genreList = "";
  for (const genre in genres) {
    genreList += `<li ><a class='genreList__item' href='#/genre/${genre}'>${genres[genre]}</a></li>`;
  }
  $content.innerHTML = `<h1>genre: </h1><ul class='genreList'>${genreList}</ul>`;
}
function router() {
  const path = location.hash;
  console.log(path);
  console.log(window.location.pathname);
  if (path === "") {
    home();
  } else if (path.slice(0, 7) === "#/movie") {
    movie(path.substr(8));
  } else if (path.slice(0, 8) === "#/search") {
    search(path.substr(9));
  } else if (path.slice(0, 10) === "#/discover") {
    discoverPage();
  } else if (path.slice(0, 7) === "#/genre") {
    const genre = path.substr(8);
    if (!genre) {
      console.log("not genre");
    }
    console.log(genre);
    if (genres.hasOwnProperty(genre)) {
      genrePage(genre);
    } else {
      notFoundPage();
    }
  }
}
window.addEventListener("hashchange", router);
router();
