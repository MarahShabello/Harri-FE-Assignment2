// ------------------------------------------------------ FILTER ------------------------------------------------------
const regionFilter = document.getElementById('filter');
regionFilter.onchange = (evt) => {
    const selectedRegion = regionFilter.value;
    console.log("Selected region: " + selectedRegion);
    if (selectedRegion === "no-filter") {
        console.log("Inside if statement");
        getCountries();
    }

    const availableCountries = Array.from(document.querySelectorAll('#region'));
    console.log("Available countries: " + availableCountries);
    console.log(window["region"].innerHTML);
    availableCountries.forEach(country => {
        const myCountry = country.innerHTML.toLowerCase().trim();
        console.log("myCountry: " + myCountry);
        if (myCountry == selectedRegion) {
            console.log("Same Region");
        }
    })
}

// ------------------------------------------------------ SEARCH ------------------------------------------------------
const searchBar = document.getElementById('search');
searchBar.addEventListener("keyup", searchForCountries);

function searchForCountries() {
    const searchValue = searchBar.value;
    console.log(searchValue);
    if (searchValue.length === 0) {
        console.log("searchBar is empty");
        getCountries();
    }
    let searchURL = `https://restcountries.com/v3.1/name/${searchValue}`;
    console.log("URL: " + searchURL);

    fetch(searchURL)
        .then(response =>
            response.json()
        )
        .then(data => {
            const count = Object.keys(data).length;
            console.log("Count = " + count);
            countryCard.innerHTML = "";
            for (let i = 0; i < count; i++) {
                const capital = data[i].capital;
                const flagSrc = data[i].flags.svg;
                const name = data[i].name.common;
                const population = data[i].population;
                const region = data[i].region;

                countryCard.innerHTML += `<div class="col">
           <div class="card h-100 border-0 rounded-2 shadow-sm" id="country-card">
               <a class="anchor text-decoration-none" href="#" id="country-anchor">
                   <img alt="Flag" class="card-img-top w-100 object-fit-cover" src=${flagSrc}>
                   <div class="card-body p-4">
                       <h5 class="card-title pb-4 fw-bold g-0" id="country-name">${name}</h5>
                       <ul class="list-unstyled">
                           <li class="list-item">
                               <div class="row row-cols-2 g-0">
                                   <div class="col-auto pe-1">
                                       <p class="fw-semibold">Population:</p>
                                   </div>
                                   <div class="col">
                                       <p class="fw-light">${population}</p>
                                   </div>
                               </div>
                           </li>
                           <li class="list-item">
                               <div class="row row-cols-2 g-0">
                                   <div class="col-auto pe-1">
                                       <p class="fw-semibold">Region:</p>
                                   </div>
                                   <div class="col">
                                       <p id="region" class="fw-light country-region">${region}</p>
                                   </div>
                               </div>
                           </li>
                           <li class="list-item">
                               <div class="row row-cols-2 g-0">
                                   <div class="col-auto pe-1">
                                       <p class="fw-semibold">Capital:</p>
                                   </div>
                                   <div class="col">
                                       <p class="fw-light">${capital}</p>
                                   </div>
                               </div>
                           </li>
                       </ul>
                   </div>
               </a>
           </div>
       </div>`;
            }
        })
} // onkeyup="searchForCountries()"
