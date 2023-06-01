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
import { DateStringToKrString, changeDocumentTitle } from "./utils.js";

import jsonData from "./genre.json" assert { type: "json" };
const $content = document.querySelector("#content");
const genres = {};
jsonData.genres.forEach(({ id, name }) => (genres[id] = name));

//////////////////////////////////////////////////////////////////

//homePage: 인기영화 + 장르별 영화 페이지
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
  changeDocumentTitle();
  $content.innerHTML = `
  <div class='homePage'>
    <h2 class='homePage__title'>인기있는 영화</h2>
    <div class="banner">
          ${createBannerSliderElement(movies)}
          <div></div>
    </div>
        ${Object.values(genres)
          .map(
            (genre, i) =>
              `<h2 class='movieSection__title'>${genre} 영화</h2>` + sliders[i]
          )
          .join("")}
  </div>
  `;
  const bannerSwiper = generateBannerSwiper();
  const swipers = results.map((x, i) => generateMovieSwiper(i));
}

//movieDetailPage: 단일 영화 자세히 보기 페이지
async function movieDetailPage(id) {
  const movieDetail = await fetchMovieDetail(id);
  const {
    title,
    original_title,
    backdrop_path,
    overview,
    poster_path,
    vote_average,
    release_date,
  } = movieDetail;
  const rating = Number.parseInt(Number(vote_average) * 10);
  const release_KrDate = DateStringToKrString(release_date);
  changeDocumentTitle(title);
  $content.innerHTML = `
  <div class='movieDetailPage'>
    <div class='movieDetail'>
    <div 
      class='movieDetail__bg' 
      style="--backdrop-image: url('https://image.tmdb.org/t/p/original${backdrop_path}');" 
    >
      <div class='movieDetail__content'>
      <img class='movieDetail__poster' src='https://image.tmdb.org/t/p/original${poster_path}' alt='${title}'/>
      <h1 class='movieDetail__title'>${title}</h1>
      ${
        title !== original_title
          ? `<h2 class='movieDetail__originalTitle'>(${original_title})</h2>`
          : ""
      }
      <p class='movieDetail__rating'><i class="fa-regular fa-thumbs-up"></i> ${rating}%</p>
      <p class='movieDetail__date'>개봉일: ${release_KrDate}</p>
      <p class='movieDetail__overview'>${overview}</p>
      </div>
    </div>
    </div>
  </div>
  `;
}

//searchPage: 검색결과 페이지
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
  changeDocumentTitle("검색: " + decodeURI(query));
  $content.innerHTML = `
  <div class='searchPage'>
    <h2 class='searchPage__title'>검색어: ${decodeURI(query)}</h2>
    <div><ul class='movieList'>${moviesElements}</ul></div>
  </div>
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
  changeDocumentTitle();
  $content.innerHTML = `<div class='notFoundPage'><h2>NotFound</h2></div>`;
}

//genrePage: 해당 장르 페이지
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
  changeDocumentTitle(genres[genre] + " 영화");
  $content.innerHTML = `
  <div class='genrePage'>
    <h2 class='genrePage__title'>장르: ${genres[genre]}</h2>
    <div><ul class='movieList'>${moviesElements}</ul></div>
  </div>
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

//discoverPage: 장르 선택 페이지
async function discoverPage() {
  let genreList = "";
  for (const genre in genres) {
    genreList += `<li ><a class='genreList__item' href='#/genre/${genre}'>${genres[genre]}</a></li>`;
  }
  $content.innerHTML = `<div class='discoverPage'><h2 class='discoverPage__title'>장르를 선택하세요</h2><ul class='genreList'>${genreList}</ul></div>`;
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
