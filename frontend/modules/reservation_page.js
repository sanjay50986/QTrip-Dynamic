import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error fetching reservations:", err);
    return null;
  }
  
  // Place holder for functionality to work in the Stubs

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent


  const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById("reservation-table-parent");


  if (reservations.length === 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
    return;
  } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
  }

  const table = document.getElementById("reservation-table");

  reservations.forEach((res) => {
    const row = document.createElement("tr");

 
    const date = new Date(res.date).toLocaleDateString("en-IN");

    const timeOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    };
    const dateObj = new Date(res.time);
    const bookingTime = `${dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })}, ${dateObj.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    })}`;

    row.innerHTML = `
      <td>${res.id}</td>
      <td>${res.name}</td>
      <td>${res.adventureName}</td>
      <td>${res.person}</td>
      <td>${date}</td>
      <td>${res.price}</td>
      <td>${bookingTime}</td>
      <td>
        <div  id="${res.id}">
          <a href="../detail/?adventure=${res.adventure}">
            <button class="reservation-visit-button">Visit Adventure</button>
          </a>
        </div>
      </td>
    `;

    table.appendChild(row);
  });
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page



    
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
