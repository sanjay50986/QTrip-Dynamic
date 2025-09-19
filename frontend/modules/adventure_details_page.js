import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const paramsId = new URLSearchParams(search)

  // Place holder for functionality to work in the Stubs
  return paramsId.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)

    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  let name = document.getElementById("adventure-name")
  let subtitle = document.getElementById("adventure-subtitle")
  let images = document.getElementById("photo-gallery")
  let content = document.getElementById("adventure-content")

  name.textContent = adventure.name
  subtitle.textContent = adventure.subtitle
  
  adventure.images.forEach((image) => {
    images.innerHTML += `
    <div >
      <img class = "activity-card-image" src = ${image}/>
    </div>
    `
  })

  content.textContent = adventure.content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  let gallery = document.getElementById("photo-gallery")
  gallery.innerHTML = `
    <div id = "adventureCarousel" class="carousel slide"  data-bs-ride="carousel">
      <div class="carousel-inner">
        ${images.map((img, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${img}" class="d-block w-100 activity-card-image" alt="Adventure image">
          </div>
        `)}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#adventureCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#adventureCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button> 
    </div>
  `
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.getElementById("reservation-panel-sold-out")
  let reservationPanel = document.getElementById("reservation-panel-available")
  let pricePerHead = document.getElementById("reservation-person-cost")
  
  if(adventure.available) {

     soldOut.style.display = "none"
     reservationPanel.style.display = "block"
     pricePerHead.textContent = adventure.costPerHead
     
  } else {
    soldOut.style.display = "block"
    reservationPanel.style.display = "none"
    
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = document.getElementById("reservation-cost")
  let costPerHead = adventure.costPerHead
  let totalAmount = costPerHead * persons

  reservationCost.textContent = totalAmount

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  
  let form = document.getElementById("myForm")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let data = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id
    }
    try {
      const response = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        alert("Success!")
        location.reload()
      } else {
        alert("Failed!")
      }
    } catch (error) {
      alert("Failed!")
    }
  })

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner")
  if(adventure.reserved) {
    reservedBanner.style.display = "block"
  } else {
    reservedBanner.style.display = "none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
