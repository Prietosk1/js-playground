const randomImg = document.querySelector("#random-img");
const favoriteImg = document.querySelector("#favorite-img");
const buttonChanger = document.querySelector("#button-changer");
const buttonFavorite = document.querySelector("#button-favorite");
const spanError = document.querySelector("#error");

const API_URL =
  "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1";

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites";
const API_KEY =
  "live_aEn98XwXywJi4iKmPJ2ZXA6LAWD3TynhtPtJgi98yl609l7i5HiJbid9l3HgPPzf";

buttonChanger.addEventListener("click", async function () {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Imagen no encontrada");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Se recibio con exito la data", data);
      randomImg.src = data[0].url;
    })
    .catch((error) => {
      throw new Error("Ocurrio un problema con la funcion fetch", error);
    });

  /*
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(response.status);
  console.log(data.message);

  if (response.status >= 200 && response.status < 300) {
    randomImg.src = data[0].url;
  } else {
    spanError.innerHTML = `Hubo un error: ${response.status} ${data.message}`;
  }
  */
});

buttonFavorite.addEventListener("click", async function (id) {
  const newFavourite = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      image_id: id.toString(),
      sub_id: "null",
    }),
  });
  console.log(newFavourite);

  console.log("1");

  const data = await newFavourite.json();
  console.log("2");
  console.log(`Favorites: ${data}`);
  if (newFavourite.status >= 200 && newFavourite.status < 300) {
    favoriteImg.src = data.url;
  } else if (res.status === 401) {
    console.log("Error de autorización");
    // Lógica para manejar el error 401
  } else {
    console.log("Error");
    spanError.innerHTML = `Hubo un error: ${newFavourite.status} ${data.message}`;
  }
});

/*
fetch(API_URL) // Extraera los datos de la url que se le proporcione
  .then((respuesta) => respuesta.json()) // Convierte esos datos en un archivo con formato JSON
  .then((data) => {
    // Ya con los datos transformados se accede al primer elemento del array y usamos su propiedad url para asignarlo como fuente de la imagen
    randomImg.src = data[0].url;
  });

  */
