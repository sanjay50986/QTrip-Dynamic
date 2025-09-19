import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const parentDiv = document.getElementById("data");
  parentDiv.innerHTML = "";

  adventures.map((adventureCard) => {
    const { id, category, image, name, costPerHead, duration } = adventureCard;
    parentDiv.innerHTML += `
        <div class = "col-6 col-lg-3">
        <a href = "detail/?adventure=${id}" id = "${id}">
          <div class="activity-card mb-4">
            <img src= ${image}  alt="...">
            <div class = "category-banner">${category}</div>
            <div class = "w-100 py-2 px-3" >
            <div class = " d-flex flex-wrap justify-content-between align-items-center">
              <h6 class ="fw-semibold">${name}</h6>
              <span class="fw-medium">₹ ${costPerHead}</span>
            </div>

            <div class = "d-flex flex-wrap justify-content-between align-items-center pt-2">
              <h6 class ="fw-semibold">Duration</h6>
              <span class="fw-medium">${duration} hours</span>
            </div>
            </div>
          </div>
        </a>
        </div>
      `;
  });
}

// addAdventureToDOM(adventures)

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(
    (filteredList) =>
      filteredList.duration > low && filteredList.duration <= high
  );
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter((adventure) =>
    categoryList.includes(adventure.category)
  );
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  let filteredList = [];

  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  if (filters.category.length > 0 && filters.duration.length > 0) {
    let [low, high] = filters.duration.split("-");
    filteredList = filterByDuration(list, low, high);

    filteredList = filterByCategory(filteredList, filters.category);
  
  } else if (filters.category.length > 0) {
    filteredList = filterByCategory(list, filters.category);
  
  } else if (filters.duration.length > 0) {
    let [low, high] = filters.duration.split("-");
    filteredList = filterByDuration(list, low, high);
  
  } else {
    return list;
  }

  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // return json.parse(localStorage.getItem("filterCategory"))
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"))
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pill = document.getElementById("category-list");
  filters.category.forEach((categoryPills) => {
    pill.innerHTML += `
    <div class = "category-filter">
      ${categoryPills}
    </div>
  `;
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
