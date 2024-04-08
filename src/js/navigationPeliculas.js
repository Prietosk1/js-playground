// Este eventlistener se ejecutara funciones al cambiar de location hash
window.addEventListener("hashchange", navigatorPeliculas, false);

// Mientras que este se cambiara apenas el contenido de la pagina ya haya cargado
window.addEventListener("DOMContentLoaded", navigatorPeliculas, false);

function navigatorPeliculas() {
  // Dependiendo del location hash se ejecutaran las siguiente funciones
  if (location.hash.startsWith("#dailyTrends")) {
    dailyTrendsPage();
  } else if (location.hash.startsWith("#weeklyTrends")) {
    weeklyTrendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviesPage();
  } else if (location.hash.startsWith("#favorites")) {
    favoritesPage();
  } else {
    homePage();
  }
}

function dailyTrendsPage() {
  movieContainerSubtitle.textContent = "Daily Trends";
  homeSection.classList.add("inactive");
  mainMoviesSection.classList.remove("inactive");
  console.log("Trends");
  chargeMovies(dailyMovies, "day");
}

function weeklyTrendsPage() {
  movieContainerSubtitle.textContent = "Weekly Trends";
  homeSection.classList.add("inactive");
  mainMoviesSection.classList.remove("inactive");
  chargeMovies(weeklyMovies, "week");
}

function searchPage() {
  console.log("Search!");
}

function moviesPage() {
  console.log("Movie!");
}

function favoritesPage() {
  if (favoriteMoviesList.length == 0) {
    chargeNoFavoritesSection();
    homeSection.classList.remove("inactive");
    mainMoviesSection.classList.add("inactive");
  } else {
    chargeFavoriteMovies();
  }
}

function homePage() {
  mainMoviesSection.classList.add("inactive");
  console.log("si");
}

const isHomeSectionActive = true;
