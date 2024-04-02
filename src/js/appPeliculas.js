async function obtenerTrendringSemanal() {
  // Se consulta en la api los datos de las tendencias diarias
  const results = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si se encuentran, se guardan en un archivo JSON
  const resultsData = await results.json();
  console.log(resultsData);

  // Guardamos las peliculas en un arreglo
  const movies = resultsData.results;

  // Por cada pelicula, se creara nuevos elementos para agregarlos a las peliculas en tendencia
  movies.forEach((movie) => {
    const trendingPreviewMovies = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );
    // Creamos el contenedor de las peliculas
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    // Creamos la imagen con sus propiedades principales
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movies.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );
    console.log(movieImg.getAttribute("alt"));
    console.log(movieImg.getAttribute("src"));

    // Unimos los elementos
    movieContainer.appendChild(movieImg);
    trendingPreviewMovies.appendChild(movieContainer);
  });
}

async function obtenerCategorias() {
  // Consultamos en la API los datos de las categorias en español
  const results = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=es&api_key=" +
      API_KEY_AppPeliculas
  );
  // Si tenemos exito se convierten en un archivo JSON
  const resultsData = await results.json();
  console.log(resultsData);

  // Guardamos las categorias en un arreglo
  const categories = resultsData.genres;

  // Por cada pelicula, se creara nuevos elementos para agregarlos a las peliculas en tendencia
  categories.forEach((category) => {
    // Guardamos el contenedor de categorias
    const categoriesPreviewMovies = document.querySelector(
      "#categoriesPreview .categoriesPreview-list"
    );

    // Creamos el contenedor de la categoria
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    // Creamos el espacio para el texto de la categoria
    const movieCategory = document.createElement("h3");
    movieCategory.classList.add("category-title");
    movieCategory.id = `id${category.id}`;
    // Creamos el texto de la categoria
    const categoryText = document.createTextNode(category.name);

    // Combinamos todos los elementos
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
