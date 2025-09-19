import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
 try {
   const response = await fetch(`${config.backendEndpoint}/cities`)
   const cityData = await response.json()
   return cityData

 } catch (error) {
    return null
 }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let card = document.getElementById("data")
  let tile = document.createElement("div")
  tile.className = "col-12 col-sm-6 col-lg-3 mb-4 tile"

  tile.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
    <img src="${image}" alt="${city}" class="img-responsive" />
    <div class="tile-text">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
  </a>
  `
  card.appendChild(tile)
}

export { init, fetchCities, addCityToDOM };
