// Get and store the data from the local storge 
const selectedData = localStorage.getItem('selected-data');

// Converting JSON-formatted string back into a JavaScript object
const selectedSuperheroDetails = JSON.parse(selectedData);

// Create layout for super hero details 
document.getElementById('superhero-details-container').innerHTML = 
`<div class="superhero-content-container">
    <div class="superhero-img">
        <img src="${selectedSuperheroDetails.thumbnail.path}.${selectedSuperheroDetails.thumbnail.extension}" alt="${selectedSuperheroDetails.name}">
    </div>
    <div class="superhero-details d-flex flex-column justify-content-center">
        <div class="name-box">
            <h2 class="text-center fw-bolder text-decoration-underline">${selectedSuperheroDetails.name}</h2>
        </div>
        <div class="description-box overflow-hidden p-2">
            ${selectedSuperheroDetails.description ? `<p>Description: ${selectedSuperheroDetails.description}</p>` : '<p class="d-flex justify-content-center align-items-center fs-4 fw-bold">No data found</p>'}
        </div>
        <div class="other-details-box row row-cols-2 m-0">
            <div class="comics col text-center">
                <p>Comics: ${selectedSuperheroDetails.comics}</p>
            </div>
            <div class="events col text-center">
                <p>Events: ${selectedSuperheroDetails.events}</p>
            </div>
            <div class="series col text-center">
                <p>Series: ${selectedSuperheroDetails.series}</p>
            </div>
            <div class="stories col text-center">
                <p>Stories: ${selectedSuperheroDetails.stories}</p>
            </div>
        </div>
    </div>
</div>`;

// function to redirecting to home page
function activateSearchFunction(){
    window.location.href = 'index.html';
}
