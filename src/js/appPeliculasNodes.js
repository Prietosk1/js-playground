const myBody = document.querySelector("body");
const myh1 = document.querySelector("h1");
const myh2 = document.querySelectorAll("h2");
const myh3 = document.querySelectorAll("h3");
let myP = document.querySelectorAll("p");

// Header - navbar
const navbar = document.querySelector(".navbar");
const navbarOptions = document.querySelectorAll(".navbar-list-container a");
const switchButton = document.querySelector(".mode-switch");
const circleSwitchButton = document.querySelector(".actual-mode");
const mobileButtonContainer = document.querySelector(
  ".mobile-button-container"
);

// Mobile navbar
const mobileNavbar = document.querySelector(".mobile-navbar");
const mobileBars = document.querySelector(".mobile-bars");
const mobileNavbarOptions = document.querySelectorAll(
  ".mobile-navbar-option a"
);

// Seccion busquedas
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

// Seccion home
const homeSection = document.querySelector(".home-section");
const homeMainTitle = document.querySelector(".home-main-title");
const homeTextItem = document.querySelectorAll(".home-text-item");
const homeMainImg = document.querySelector(".home-main-img");
const homeMainText = document.querySelector(".home-main-text");
const textItem1 = document.querySelector("#home-text-item-1");
const textItem2 = document.querySelector("#home-text-item-2");
const textItem3 = document.querySelector("#home-text-item-3");

// Seccion tendencias
const movieContainerSubtitle = document.querySelector(
  ".movie-container-subtitle"
);
let movieInfoText = document.querySelectorAll(".movie-info");
let movieImg = document.querySelectorAll(".movie-img");

// Seccion tendencias diarias
const mainMoviesSection = document.querySelector(".main-movies-section");
const mainMoviesContainer = document.querySelector(
  ".main-movies-section .main-movies-container"
);

// Seccion tendencias semanales
const weeklyMoviesContainer = document.querySelector(
  ".weekly-trends-section .weekly-movies-container"
);

// Seccion categorias
const categoriesContainer = document.querySelector(
  ".categories-section .categories-container"
);

// Seccion de pelicula elegida
const choosenMovieSection = document.querySelector(".choosen-movie-section");
const choosenMovieContainer = document.querySelector(
  ".choosen-movie-container"
);
const choosenMovieCloseButton = document.querySelector(".close-button");
let choosenMovieImg = document.querySelector(".choosen-movie-img");
let choosenMovieTitle = document.querySelector(".choosen-movie-title");
let choosenMovieRating = document.querySelector(".choosen-movie-rating");
let choosenMovieDate = document.querySelector(".choosen-movie-date");
let choosenMovieOverview = document.querySelector(".choosen-movie-overview");
const choosenMovieGenres = document.querySelector(".choosen-movie-genres");
let categoriesToDelete = document.querySelectorAll(
  ".choosen-movie-genres .category"
);
const addFavoriteContainer = document.querySelector(
  ".favorite-button-container"
);
const addFavoriteButtonText = document.querySelector(".add-favorite-text");
const addFavoriteButtonIcon = document.querySelector(".add-favorite-icon");

// Footer
const footerContainer = document.querySelector("footer");
