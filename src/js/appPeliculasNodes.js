const myBody = document.querySelector("body");
const myh1 = document.querySelector("h1");
const myh2 = document.querySelectorAll("h2");
const myh3 = document.querySelectorAll("h3");
let myP = document.querySelectorAll("p");

// Headre - navbar
const navbar = document.querySelector(".navbar");
const navbarOptions = document.querySelectorAll(".navbar-list-container a");
const switchButton = document.querySelector(".mode-switch");
const circleSwitchButton = document.querySelector(".actual-mode");

// Seccion busquedas
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

// Seccion tendencias
let movieInfoText = document.querySelectorAll(".movie-info");

// Seccion tendencias diarias
const dailyMoviesContainer = document.querySelector(
  ".daily-trends-section .daily-movies-container"
);

// Seccion tendencias semanales
const weeklyMoviesContainer = document.querySelector(
  ".weekly-trends-section .weekly-movies-container"
);

// Seccion categorias
const categoriesContainer = document.querySelector(
  ".categories-section .categories-container"
);

// Footer
const footerContainer = document.querySelector("footer");
