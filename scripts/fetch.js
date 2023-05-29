import env from "./env.json" assert { type: "json" };
const ApiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${env.accessToken}`,
  },
};

export async function fetchPopularMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    ApiOptions
  );
  const { results } = await res.json();
  return results;
}

export async function fetchMovieDetail(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
    ApiOptions
  );
  const json = await res.json();
  return json;
}

export async function fetchGenreMovies(genreId, page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
    ApiOptions
  );
  const { results } = await res.json();
  return results;
}

export async function fetchSearchMovies(query, page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}`,
    ApiOptions
  );
  const { results } = await res.json();
  return results;
}
