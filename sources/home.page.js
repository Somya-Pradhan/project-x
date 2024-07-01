// Get the elements 
var mainSuperheroesContainer = document.getElementById('main-superheroes-container');

// Marvel API Configuration
const publicKey = 'bdc48d6848ec61c0c0bb86b4cb7a03c4';
const timeStamp = '1714812304945';
const hash = '4b02b632f4313781d7d1cfce06ad1f19';
const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1714812304945&apikey=bdc48d6848ec61c0c0bb86b4cb7a03c4&hash=4b02b632f4313781d7d1cfce06ad1f19`;

// Variable to store retrieved data from the api 
var retrievedData;

// Function to fetch Api
const fetchData = async () => {
    try {
        // Fetch data from Marvel API
        let retrieve = await fetch(apiUrl);

        // Check if response is okay
        if (!retrieve.ok) {
            throw new Error('Network response was not ok');
        }

        // Convert response to JSON
        let data = await retrieve.json();

        // Update response data
        retrievedData = data.data.results;

        // Ensure all URLs use HTTPS
        retrievedData.forEach(character => {
            if (character.thumbnail && character.thumbnail.path) {
                character.thumbnail.path = character.thumbnail.path.replace(/^http:\/\//i, 'https://');
            }
        });

        // Call renderSuperHeroCards to display fetched data
        renderSuperHeroCards();
        localStorage.setItem('retrieved-data', JSON.stringify(retrievedData));

    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
    }
};

// Function to construct superhero card
const superHeroCard = (superhero) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = 
        `<img class="card-img-top" id="characterImage" src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}">
        <h5 class="card-title text-center fw-semibold" title="${superhero.name}" id="characterName">${superhero.name}</h5>
        
        <div class="card-footer d-flex justify-content-around" id="cardBody">
            <button class="fa-solid fa-heart-circle-plus" onclick="addToFav(${superhero.id}, '${superhero.name}')" id="fav-button-${superhero.id}"></button>
            <button class="view-details" onclick="openViewDetailsPage(${superhero.id})">Details</button>
        </div>
    `;
    return card;
};

// Function to render/display fetched data 
const renderSuperHeroCards = () => {
    mainSuperheroesContainer.innerHTML = ''; // Clear previous content
    retrievedData.forEach(superhero => {
        const card = superHeroCard(superhero);
        mainSuperheroesContainer.appendChild(card);
    });
};

// Function for filter out the character based on search query
function searchFunction() {
    // Get the search input value
    let searchInput = document.getElementById('search-box').value.toLowerCase();

    // Filter characters whose names match the search query
    let filteredCharacters = retrievedData.filter(character => {
        return character.name.toLowerCase().includes(searchInput);
    });

    // Clear previous content
    mainSuperheroesContainer.innerHTML = '';
    mainSuperheroesContainer.style.justifyContent = 'unset';

    // Render the filtered characters
    if (filteredCharacters.length === 0) {
        const noDataFoundContainer = document.createElement('div');
        noDataFoundContainer.className = 'no-data-found-container';
        noDataFoundContainer.innerHTML = 
            '<img class="sad-icon" src="assets/sad.png"><div class="sorry-title d-flex align-items-center justify-content-center"><h1>Sorry! No Data Found</h1></div>'

        // Append the noDataFoundContainer to the mainSuperherosContainer
        mainSuperheroesContainer.appendChild(noDataFoundContainer);
    } else {
        filteredCharacters.forEach(character => {
            const card = superHeroCard(character);
            mainSuperheroesContainer.appendChild(card);
        });
    }
}

// Function to activate search function when clicking on search bar
function activateSearchFunction(){
    // Get the search query from the search bar
    document.getElementById('search-box').addEventListener('input', searchFunction);
};

// Function to open superhero page with more details about selected superhero
function openViewDetailsPage(superheroId){
    let selectedSuperhero = retrievedData.filter(superhero => superhero.id === superheroId);
    if (selectedSuperhero) {
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

// Function to add superhero into favorite superhero page
function addToFav(superheroId,superheroName) {
    // Alert function's function call
    popUpNoti(superheroId, superheroName);

    // Retrieve the current list of favorite superhero IDs from local storage
    let favouriteSuperheroes = JSON.parse(localStorage.getItem('fav-superheroIds')) || [];

    // Add the new superhero ID to the list if it's not already present
    if (!favouriteSuperheroes.includes(superheroId)) {
        favouriteSuperheroes.push(superheroId);
    }

    // Store the updated list back in local storage
    localStorage.setItem('fav-superheroIds', JSON.stringify(favouriteSuperheroes));
}

// Function to alert about favourite superhero list
function popUpNoti(superheroId, superheroName) {
    let storeId = JSON.parse(localStorage.getItem('fav-superheroIds'));

    if (!storeId) {
        storeId = []; // Initialize as an empty array if not found
        localStorage.setItem('fav-superheroIds', JSON.stringify(storeId));
    }

    if (storeId.length === 0) {
        console.log('List is empty!!!');
    } else {
        if (storeId.includes(superheroId)) {
            alert(superheroName + ' is already added to your favorite superhero list');
        }
    }
}

// Call fetchData() to fetch data from the API
fetchData();