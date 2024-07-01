// Get the element
let favouriteSuperherosContainer = document.getElementById('fav-superheros-container');

// Retrieve the API data from the local storage 
let retrivedData = JSON.parse(localStorage.getItem('retrive-data')) || [];

// Retrieve the list of favourite superhero IDs from local storage
let favouriteSuperheroes = JSON.parse(localStorage.getItem('fav-superheroIds')) || [];

const favSuperheroCard = () => {
    if (favouriteSuperheroes.length == 0) {
        const noDataFoundContainer = document.createElement('div');
        noDataFoundContainer.className = 'no-data-found-container';
        noDataFoundContainer.innerHTML = 
            '<img class="sad-icon" src="assets/sad.png"><div class="sorry-title d-flex align-items-center justify-content-center"><h1>Sorry! Favourite Superhero List Is Empty</h1></div>';

        // Append the noDataFoundContainer to the mainSuperherosContainer
        favouriteSuperherosContainer.appendChild(noDataFoundContainer);
    } else {
        favouriteSuperheroes.forEach(id => {
            const existsInObj = retrivedData.find(obj => obj.id === id);
            if (existsInObj) {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = 
                    `<img class="card-img-top" id="characterImage" src="${existsInObj.thumbnail.path}.${existsInObj.thumbnail.extension}">
                    <h5 class="card-title text-center fw-semibold" title="${existsInObj.name}" id="characterName">${existsInObj.name}</h5>
        
                    <div class="card-footer d-flex justify-content-around" id="cardBody">
                    <button class="fa-solid fa-heart-circle-minus" onclick="removeFromFav(${existsInObj.id})" id="fav-button"></button>
                    <button class="view-details" onclick="openViewDetailsPage(${existsInObj.id})">Details</button>
                </div>`;

                favouriteSuperherosContainer.appendChild(card);
            } else {
                console.log(`${id} does not exist in the object.`);
            }
        });
    }
};

// Function to open superhero page with more details about selected superhero
function openViewDetailsPage(superheroId) {
    let selectedSuperhero = retrivedData.filter(superhero => superhero.id === superheroId);
    if (selectedSuperhero.length > 0) {
        // Extract required data from the superhero fetched data
        let selectedData = {
            id: selectedSuperhero[0].id,
            name: selectedSuperhero[0].name,
            thumbnail: selectedSuperhero[0].thumbnail,
            stories: selectedSuperhero[0].stories?.available,
            comics: selectedSuperhero[0].comics?.available,
            events: selectedSuperhero[0].events?.available,
            series: selectedSuperhero[0].series?.available,
            description: selectedSuperhero[0].description
        };
        // Store the selected superhero details in local storage
        localStorage.setItem('selected-data', JSON.stringify(selectedData));
        // Link the superhero page 
        window.location.href = 'viewdetails.page.html';
    } else {
        console.error('No superhero found with ID:', superheroId);
    }
};

// Function to remove to favourite superhero card
function removeFromFav(superheroId) {
    // Find the card with the matching data-id attribute
    if (favouriteSuperheroes.includes(superheroId)) {
        favouriteSuperheroes.splice(favouriteSuperheroes.indexOf(superheroId), 1);
        localStorage.setItem('fav-superheroIds', JSON.stringify(favouriteSuperheroes));
        favouriteSuperherosContainer.innerHTML = '';
        favSuperheroCard();
    }
}

// Function to redirect to the home page
function activateSearchFunction() {
    window.location.href = 'index.html';
}

// Function call to display or generate a card for favorite superhero.
favSuperheroCard();
