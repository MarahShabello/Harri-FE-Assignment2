async function initCountries() {
    let countriesArray = [];
    let selectedRegion = "";
    let countryCard = document.getElementById('country-card');
    const countries_api = `https://restcountries.com/v3.1/all`;
    const searchBar = document.getElementById('search');
    const regionFilter = document.getElementById('filter');

    searchBar.addEventListener("search", function() {
        loadAndDisplayCountries(countryCard, countries_api);
    });

    await searchBar.addEventListener("keyup", async function () {
        const searchValue = searchBar.value;
        if (searchValue.length === 0) {
            countriesArray = await loadAndDisplayCountries(countryCard, countries_api);
        } else {
            countriesArray = await searchByName(searchValue, countryCard);
        }
    });

    regionFilter.onchange = async (event) => {
        selectedRegion = event.target.value;
        countriesArray = await filterByRegion(selectedRegion, countriesArray, countryCard);
    }

    countriesArray = await loadAndDisplayCountries(countryCard, countries_api);
}

async function loadAndDisplayCountries(countryCard, countries_api) {
    let countries = [];
    countryCard.innerHTML = '';
    await fetch(countries_api)
        .then(async response => {
            const data = await response.json();
            data.forEach(country => {
                countries.push(country);
                renderCountries(countryCard, country);
            })
        })
        .catch(error => {
            console.log("ERROR!");
            console.error(error);
        });
    return countries;
}

function renderCountries(elementID, data) {
    let {name, flags, population, region, capital, cca3} = data;

    elementID.innerHTML += `<div class="col">
        <div class="card h-100 border-0 rounded-2 shadow-sm">
            <a class="anchor text-decoration-none" href="country.html?id=${cca3}" id="country-anchor">
                <img alt="Flag" class="card-img-top w-100 object-fit-cover" src=${flags.svg}>
                <div class="card-body p-4">
                    <h5 class="card-title pb-4 fw-bold g-0 country-name">${name.common}</h5>
                    <ul class="list-unstyled">
                        <li class="list-item pb-2">
                            <span class="fw-semibold pe-1">Population:</span>${population.toLocaleString()}
                        </li>
                        <li class="list-item pb-2">
                            <span class="fw-semibold">Region:</span>
                            <span class="country-region">${region}</span>
                        </li>
                        <li class="list-item pb-2">
                            <span class="fw-semibold pe-1">Capital:</span>${capital}
                        </li>
                       </ul>
                   </div>
               </a>
        </div>
    </div>`;
}

// -------------------------- FILTER --------------------------
async function filterByRegion(selectedRegion, countriesArray, elementID) {
    debounce(250);
    let array = [];
    elementID.innerHTML = '';
    await countriesArray.forEach(country => {
        const {region} = country;
        if (selectedRegion === "no-filter") {
            array.push(country);
            renderCountries(elementID, country);
        } else if (region === selectedRegion) {
            array.push(country);
            renderCountries(elementID, country)
        }
    })
    return array;
}

// -------------------------- SEARCH --------------------------
async function searchByName(searchValue, countryCard) {
    debounce(250);
    let countries = [];
    let searchURL = `https://restcountries.com/v3.1/name/${searchValue}`;
    await fetch(searchURL)
        .then(async response =>
            await response.json()
        )
        .then(data => {
            countryCard.innerHTML = '';
            data.forEach(country => {
                countries.push(country);
                renderCountries(countryCard, country);
            })
        })
    console.log(`Countries: ${countries}`)
    return countries;
}

// ------------------------- DEBOUNCE -------------------------
const debounce = (delay) => {
    let delayTime;
    return function () {
        const later = () => {
            clearTimeout(delayTime);
        };
        clearTimeout(delayTime);
        delayTime = setTimeout(later, delay);
    };
}

initCountries();