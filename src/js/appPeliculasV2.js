async function getDailyTrending() {
  // Se consulta en la api los datos de las tendencias diarias
  const results = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si se encuentran, se guardan en un archivo JSON
  const dailyResultsData = await results.json();

  // Guardamos las peliculas en un arreglo
  dailyMovies = dailyResultsData.results;
}

async function getWeeklyTrending() {
  // Se consulta en la api los datos de las tendencias diarias
  const results = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si se encuentran, se guardan en un archivo JSON
  const dailyResultsData = await results.json();

  // Guardamos las peliculas en un arreglo
  weeklyMovies = dailyResultsData.results;
}

// Funcion pra obtener las categorias
async function getCategories() {
  // Consultamos en la API los datos de las categorias en español
  const results = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si tenemos exito se convierten en un archivo JSON
  const resultsData = await results.json();

  // Guardamos las categorias en un arreglo
  categoryList = resultsData.genres;

  chargeCategories(categoryList, categoriesContainer);
}

// Funcion para mostrar datos de la pelicula
async function showMovieInfo(myId, myTime) {
  // Se consulta una vez mas a la API con los datos de las tendencias diarias
  const results = await fetch(
    "https://api.themoviedb.org/3/trending/movie/" +
      myTime +
      "?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si se encuentran, se guardan en un archivo JSON
  const resultsData = await results.json();

  // Guardamos las peliculas en un arreglo
  const movies = resultsData.results;

  // Ahora consultamos los datos de las categorias
  // Consultamos en la API los datos de las categorias
  const categoryResults = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      API_KEY_AppPeliculas
  );
  // Si tenemos exito se convierten en un archivo JSON
  const categoryResultsData = await categoryResults.json();

  // Guardamos las categorias en un arreglo
  const categories = categoryResultsData.genres;

  // Obtenemos las categorias actuales para luego eliminarlas
  categoriesToDelete = document.querySelectorAll(
    ".choosen-movie-genres .category"
  );
  categoriesToDelete.forEach((myCategorie) => {
    myCategorie.remove();
  });

  // Limpiamos la parte de las calificaciones
  while (choosenMovieRating.firstChild) {
    choosenMovieRating.removeChild(choosenMovieRating.firstChild);
  }

  // Revisamos en el array cada elemento para ver si encontramos su posicion, y asi poder acceder a los datos relevantes
  movies.forEach((movie, index) => {
    if (movie.id == myId) {
      // Actualizamos la portada
      choosenMovieImg.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/original" + movie.backdrop_path
      );
      choosenMovieTitle.textContent = movie.title;

      // Actualizamos la puntuacion
      const bigStaricon = document.createElement("img");
      bigStaricon.setAttribute("src", "/src/assets/img/star.png");
      bigStaricon.setAttribute("alt", "Star Icon");
      bigStaricon.classList.add("big-star-icon");
      const choosenMovieRatingText = document.createTextNode(
        movie.vote_average.toFixed(1)
      );

      // Conectamos estos elementos a la parte de la calificacion
      choosenMovieRating.appendChild(bigStaricon);
      choosenMovieRating.appendChild(choosenMovieRatingText);

      // Actualizamos el contenido de la fecha
      choosenMovieDate.textContent = `- Release date: ${movie.release_date}`;

      // Actualizamos la descripcion
      choosenMovieOverview.textContent = movie.overview;

      // Dependiendo de la cantidad de categorias se agregaran
      for (i = 0; i < movie.genre_ids.length; i++) {
        // Se crea el boton contenedor de la categoria
        const categoryContainer = document.createElement("button");
        categoryContainer.classList.add("category");
        // Creamos el recuadro de color de la categoria
        const categoryColor = document.createElement("div");
        categoryColor.classList.add("category-color");
        categoryColor.id = `id${movie.genre_ids[i]}`;
        // Creamos el espacio para el texto de la categoria
        const categoryName = document.createElement("p");
        categoryName.classList.add("category-name");
        if (actualTheme == "light") {
          categoryName.style.color = "var(--primary-color)";
        } else {
          categoryName.style.color = "var(--light-mode-background)";
        }
        // Creamos el texto de la categoria
        let categoryText;
        categories.forEach((myCategory, index) => {
          if (myCategory.id == movie.genre_ids[i]) {
            categoryText = document.createTextNode(categories[index].name);
            return;
          }
        });

        // Conectamos los elementos restantes
        categoryName.appendChild(categoryText);

        categoryContainer.appendChild(categoryColor);
        categoryContainer.appendChild(categoryName);

        choosenMovieGenres.appendChild(categoryContainer);
      }

      choosenMovieRating.appendChild(choosenMovieRatingText);

      return;
    }

    // Por ultimo mostramos el nuevo modal
    choosenMovieSection.classList.remove("inactive");
  });
}

// Funcion para cargar las peliculas
function chargeMovies(newData, time) {
  // Limpiamos todo el contenedor
  mainMoviesContainer.innerHTML = "";

  // Cambiamos al placeholder la primera pelicula que obtengamos de la base de datos
  searchInput.placeholder = newData[0].title;

  // Por cada pelicula, se creara nuevos elementos para agregarlos a las peliculas en tendencia
  newData.forEach((movie) => {
    // Creamos el contenedor de las peliculas y le agregamos una id unica
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.id = movie.id;
    movieContainer.classList.add(time);

    // Creamos la imagen con sus propiedades principales
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );
    movieImg.onclick = function () {
      showMovieInfo(movieContainer.id, time);
    };

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

    // Unimos los elementos de la calificacion
    movieRating.appendChild(starIcon);
    movieRating.appendChild(ratingText);

    // Los elementos de la info
    movieInfo.appendChild(movieRating);
    movieInfo.appendChild(movieTitle);

    // Los elementos de las imagenes y la info, al contenedor principal
    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieInfo);
    mainMoviesContainer.appendChild(movieContainer);
  });

  // Cargamos de nuevo los elementos creados
  myP = document.querySelectorAll("p");
  movieImg = document.querySelectorAll(".movie-img");
  movieInfoText = document.querySelectorAll(".movie-info");

  changeTheme();

  console.log("MOVIES CHARGED!");
}

function chargeCategories(newCategoryData, targetContainer) {
  // Por cada pelicula, se creara nuevos elementos para agregarlos a las peliculas en tendencia
  newCategoryData.forEach((category) => {
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
    targetContainer.appendChild(categoryContainer);
  });

  myP = document.querySelectorAll("p");
}

// Funcion para cambiar los temas
function changeTheme() {
  if (actualTheme == "dark") {
    // Cambios generales
    changeStyleMultiple(myh2, "color", "var(--light-mode-background");
    changeStyleMultiple(myh3, "color", "var(--light-mode-background");
    changeStyleMultiple(myP, "color", "var(--light-mode-background");
    changeStyleMultiple(movieInfoText, "color", "var(--light-mode-background");
    changeStyleSingle(myBody, "backgroundColor", "var(--dark-mode-background)");

    // Cambios navbar
    changeStyleSingle(navbar, "backgroundColor", "var(--dark-mode-background)");
    changeStyleMultiple(navbarOptions, "color", "var(--other-use)");
    changeStyleSingle(
      switchButton,
      "border",
      "2px solid var(--light-mode-background)"
    );
    changeStyleSingle(switchButton, "justifyContent", "end");
    changeStyleSingle(
      circleSwitchButton,
      "backgroundColor",
      "var(--light-mode-background)"
    );

    // Cambios seccion busqueda
    changeStyleSingle(searchForm, "border", "2px solid var(--border-color)");
    changeStyleSingle(searchInput, "color", "var(--light-mode-background)");

    // Cambios modal de Pelicula elegida
    changeStyleSingle(
      choosenMovieContainer,
      "backgroundColor",
      "var(--dark-mode-background)"
    );

    // Cambios footer
    changeStyleSingle(
      footerContainer,
      "backgroundColor",
      "var(--light-border-color)"
    );
  } else {
    changeStyleMultiple(myh2, "color", "var(--primary-color)");
    changeStyleMultiple(myh3, "color", "var(--primary-color)");
    changeStyleMultiple(myP, "color", "var(--primary-color)");
    changeStyleMultiple(movieInfoText, "color", "var(--primary-color)");
    changeStyleSingle(
      myBody,
      "backgroundColor",
      "var(--light-mode-background)"
    );

    // Cambios navbar
    changeStyleSingle(
      navbar,
      "backgroundColor",
      "var(--light-mode-background)"
    );
    changeStyleMultiple(navbarOptions, "color", "var(--secondary-color)");
    changeStyleSingle(
      switchButton,
      "border",
      "2px solid var(--dark-mode-background)"
    );
    changeStyleSingle(switchButton, "justifyContent", "start");
    changeStyleSingle(
      circleSwitchButton,
      "backgroundColor",
      "var(--dark-mode-background)"
    );

    // Cambios seccion busqueda
    changeStyleSingle(searchForm, "border", "2px solid var(--primary-color)");
    changeStyleSingle(searchInput, "color", "var(--primary-color)");

    // Cambios modal de Pelicula elegida
    changeStyleSingle(
      choosenMovieContainer,
      "backgroundColor",
      "var(--light-mode-background)"
    );

    // Cambios en el footer
    changeStyleSingle(footerContainer, "backgroundColor", "var(--other-use)");
  }
}

// Funcion para cambiar el estilo de un elemento
function changeStyleSingle(myElement, newProperty, newValue) {
  myElement.style[newProperty] = newValue;
}

// Funcion para cambiar el estilo de multiples elementos
function changeStyleMultiple(nodeList, newProperty, newValue) {
  const elementArray = Array.from(nodeList);
  elementArray.forEach((element) => {
    element.style[newProperty] = newValue;
  });
}

// Funcion para cerrar el modal de la info de la pelicula
function closeMovieInfo() {
  choosenMovieSection.classList.add("inactive");
}

// Cada ves que se de click al boton de cambio de tema se cambiara el
switchButton.addEventListener("click", () => {
  if (actualTheme == "light") {
    actualTheme = "dark";
  } else {
    actualTheme = "light";
  }
  changeTheme();
});

// Cada vez que se presione el boton de cerrar, se cerrara el modal
choosenMovieCloseButton.addEventListener("click", () => {
  closeMovieInfo();
});

// Variables de estados
let actualTheme = "light";
let panelInfoPelicula = false;

// Variables que guardan los datos extraidos de las APIS
let weeklyMovies;
let dailyMovies;
let categoryList;

// Se define el hash como vacio al cargar la pagina
location.hash = "";

getCategories();
getDailyTrending();
getWeeklyTrending();
