function navigatorPeliculas() {
  if (location.hash.startsWith("#trends")) {
    console.log("Trends");
  } else if (location.hash.startsWith("#search=")) {
    console.log("Search!");
  } else if (location.hash.startsWith("#movie=")) {
    console.log("Movie!");
  } else if (location.hash.startsWith("#category=")) {
    console.log("Category!");
  } else {
    console.log("Home");
  }
}

window.addEventListener("hashchange", navigatorPeliculas, false);
window.addEventListener("DOMContentLoaded", navigatorpeliculas), false;
