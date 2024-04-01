async function obtenerTrendringSemanal() {
  const results = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" +
      API_KEY_AppPeliculas
  );
  const resultsData = await results.json();
  console.log(resultsData);
  const movies = resultsData.results;
  movies.forEach((movie) => {
    const trendingPreviewMovies = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movies.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );
    console.log(movieImg.getAttribute("alt"));
    console.log(movieImg.getAttribute("src"));
    movieContainer.appendChild(movieImg);
    trendingPreviewMovies.appendChild(movieContainer);
  });
}

async function obtenerCategorias() {
  const results = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=es&api_key=" +
      API_KEY_AppPeliculas
  );
  const resultsData = await results.json();
  console.log(resultsData);
  const movies = resultsData.genres;
  movies.forEach((movie) => {
    const categoriesPreviewMovies = document.querySelector(
      "#categoriesPreview .categoriesPreview-list"
    );
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    const movieCategory = document.createElement("h3");
    movieCategory.classList.add("category-title");
    movieCategory.id = `id${movie.id}`;
    const categoryText = document.createTextNode(movie.name);

    movieCategory.appendChild(categoryText);
    categoryContainer.appendChild(movieCategory);
    categoriesPreviewMovies.appendChild(categoryContainer);
    console.log(movieCategory);
    console.log(categoryContainer);
    console.log(categoriesPreviewMovies);
  });
}

obtenerTrendringSemanal();
obtenerCategorias();
