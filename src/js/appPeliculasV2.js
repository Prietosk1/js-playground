async function obtenerTrending(tipoContenedor) {
  // Determinamos que clase de consulta haremos, si semanal o diaria
  let tiempo;
  if (tipoContenedor == dailyMoviesContainer) {
    tiempo = "day";
  } else {
    tiempo = "week";
  }

  // Se consulta en la api los datos de las tendencias diarias
  const results = await fetch(
    "https://api.themoviedb.org/3/trending/movie/" +
      tiempo +
      "?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si se encuentran, se guardan en un archivo JSON
  const resultsData = await results.json();
  console.log(resultsData);

  // Guardamos las peliculas en un arreglo
  const movies = resultsData.results;

  console.log(movies);
  // Por cada pelicula, se creara nuevos elementos para agregarlos a las peliculas en tendencia
  movies.forEach((movie) => {
    // Creamos el contenedor de las peliculas
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    // Creamos la imagen con sus propiedades principales
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );

    // Creamos el contenedor de la info de la pelicula
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    // Primero se crea el contenedor del rating
    const movieRating = document.createElement("p");
    movieRating.classList.add("movie-rating");
    // Empezamos con su icono
    const starIcon = document.createElement("img");
    starIcon.classList.add("star-icon");
    starIcon.setAttribute("alt", "Star Icon");
    starIcon.setAttribute("src", "/src/assets/img/star.png");
    // Y terminamos con su calificacion
    const ratingText = document.createTextNode(movie.vote_average.toFixed(1));

    // Ahora crearemos su titulo
    const movieTitle = document.createTextNode(movie.title);

    console.log(movieImg.getAttribute("alt"));
    console.log(movieImg.getAttribute("src"));
    console.log(ratingText);
    console.log(movieTitle);

    // Unimos los elementos
    movieRating.appendChild(starIcon);
    movieRating.appendChild(ratingText);

    movieInfo.appendChild(movieRating);
    movieInfo.appendChild(movieTitle);

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieInfo);
    tipoContenedor.appendChild(movieContainer);
  });
}

async function obtenerCategorias() {
  // Consultamos en la API los datos de las categorias en español
  const results = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si tenemos exito se convierten en un archivo JSON
  const resultsData = await results.json();
  console.log(resultsData);

  // Guardamos las categorias en un arreglo
  const categories = resultsData.genres;

  // Por cada pelicula, se creara nuevos elementos para agregarlos a las peliculas en tendencia
  categories.forEach((category) => {
    // Creamos el boton de la categoria
    const categoryContainer = document.createElement("button");
    categoryContainer.classList.add("category");
    // Creamos el recuadro de color de la categoria
    const categoryColor = document.createElement("div");
    categoryColor.classList.add("category-color");
    categoryColor.id = `id${category.id}`;
    // Creamos el espacio para el texto de la categoria
    const categoryName = document.createElement("p");
    categoryName.classList.add("category-name");
    // Creamos el texto de la categoria
    const categoryText = document.createTextNode(category.name);

    // Combinamos todos los elementos
    categoryName.appendChild(categoryText);

    categoryContainer.appendChild(categoryColor);
    categoryContainer.appendChild(categoryName);
    categoriesContainer.appendChild(categoryContainer);
    console.log(categoryName);
    console.log(categoryContainer);
    console.log(categoriesContainer);
  });
}

obtenerCategorias();
obtenerTrending(dailyMoviesContainer);
obtenerTrending(weeklyMoviesContainer);