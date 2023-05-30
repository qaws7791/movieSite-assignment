import {
  fetchPopularMovies,
  fetchMovieDetail,
  fetchGenreMovies,
  fetchSearchMovies,
} from "./fetch.js";
import {
  generateBannerSwiper,
  createBannerSliderElement,
  generateMovieSwiper,
  createMovieSlidersElement,
  createPosterCardElement,
} from "./create.js";

import jsonData from "./genre.json" assert { type: "json" };
const $content = document.querySelector("#content");
const genres = {};
jsonData.genres.forEach(({ id, name }) => (genres[id] = name));

//////////////////////////////////////////////////////////////////

async function homePage() {
  const movies = await fetchPopularMovies();
  const promises = [];
  for (const key in genres) {
    promises.push(fetchGenreMovies(key));
  }
  const results = await Promise.all(promises);
  const sliders = results.map((genreMovies, i) => {
    return createMovieSlidersElement(genreMovies, i);
  });

  $content.innerHTML = `
  <div class='homePage'>
    <h2>인기있는 영화들</h2>
    <div class="banner">
          ${createBannerSliderElement(movies)}
    </div>
        ${Object.values(genres)
          .map((x, i) => `<h2>${x} 영화</h2>` + sliders[i])
          .join("")}
  </div>
  `;
  const bannerSwiper = generateBannerSwiper();
  const swipers = results.map((x, i) => generateMovieSwiper(i));
}

async function movieDetailPage(id) {
  const movieDetail = await fetchMovieDetail(id);
  const { title, backdrop_path, overview, poster_path, vote_average } =
    movieDetail;
  const rating = Number.parseInt(Number(vote_average) * 10);
  $content.innerHTML = `
  <div class='movieDetail'>
  <div 
    class='movieDetail__bg' 
    style="--backdrop-image: url('https://image.tmdb.org/t/p/original${backdrop_path}');" 
  >
  <div class='movieDetail__content'>
  <img class='movieDetail__poster' src='https://image.tmdb.org/t/p/original${poster_path}' alt='${title}'/>
  <h1 class='movieDetail__title'>${title}</h1>
  
  <p class='movieDetail__vote'><i class="fa-regular fa-thumbs-up"></i> ${rating}%</p>
  <p class='movieDetail__overview'>${overview}</p>

</div>
  </div>
  </div>
  `;
}

async function searchPage(query) {
  let pageIndex = 1;
  const movies = await fetchSearchMovies(query);
  const moviesElements = movies
    .map((movie) => `<li>${createPosterCardElement(movie)}</li>`)
    .join("");

  async function loadMoreMovies(page) {
    const moreMovies = await fetchSearchMovies(query, pageIndex);
    if (moreMovies.length === 0) return 0;
    const moreMoviesElements = moreMovies
      .map((movie) => `<li>${createPosterCardElement(movie)}</li>`)
      .join("");
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = moreMoviesElements;
    while (tempDiv.firstChild) {
      document.querySelector(".movieList").appendChild(tempDiv.firstChild);
    }
    return moreMovies.length;
  }

  $content.innerHTML = `
  <h1>Search: ${decodeURI(query)}</h1>
  <div><ul class='movieList'>${moviesElements}</ul></div>
  `;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        pageIndex += 1;
        const movieLength = await loadMoreMovies(pageIndex);
        observer.unobserve(entry.target);
        if (movieLength !== 0)
          observer.observe(document.querySelector(".movieList").lastChild);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector(".movieList").lastChild);
}

function notFoundPage() {
  $content.innerHTML = `<h1>NotFound</h1>`;
}

async function genrePage(genre) {
  let pageIndex = 1;
  const movies = await fetchGenreMovies(genre);
  const moviesElements = movies
    .map((movie) => `<li>${createPosterCardElement(movie)}</li>`)
    .join("");

  async function loadMoreMovies(page) {
    const moreMovies = await fetchGenreMovies(genre, page);
    if (moreMovies.length === 0) return 0;
    const moreMoviesElements = moreMovies
      .map((movie) => `<li>${createPosterCardElement(movie)}</li>`)
      .join("");
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = moreMoviesElements;
    while (tempDiv.firstChild) {
      document.querySelector(".movieList").appendChild(tempDiv.firstChild);
    }
    return moreMovies.length;
  }

  $content.innerHTML = `
  <h1>genre: ${genres[genre]}</h1>
  <div><ul class='movieList'>${moviesElements}</ul></div>
  `;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        pageIndex += 1;
        const movieLength = await loadMoreMovies(pageIndex);
        observer.unobserve(entry.target);
        if (movieLength !== 0)
          observer.observe(document.querySelector(".movieList").lastChild);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector(".movieList").lastChild);
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
  if (path === "") {
    homePage();
  } else if (path.slice(0, 7) === "#/movie") {
    movieDetailPage(path.substr(8));
  } else if (path.slice(0, 8) === "#/search") {
    searchPage(path.substr(9));
  } else if (path.slice(0, 10) === "#/discover") {
    discoverPage();
  } else if (path.slice(0, 7) === "#/genre") {
    const genre = path.substr(8);
    if (!genre) {
    }
    if (genres.hasOwnProperty(genre)) {
      genrePage(genre);
    } else {
      notFoundPage();
    }
  }
}
window.addEventListener("hashchange", router);
router();
