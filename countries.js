async function initCountries() {
    let countriesArray = [];
    let debounceInput = debounce();
    let selectedRegion = 'no-filter';
    let countryCards = document.getElementById('country-cards');
    const searchBar = document.getElementById('search');
    const regionFilter = document.getElementById('filter');
    const countries_api = `https://restcountries.com/v3.1/all`;

    searchBar.addEventListener('input', () => {
        debounceInput(async () => {
            const searchValue = searchBar.value;
            if (searchValue.length === 0) {
                countriesArray = await loadAndDisplayCountries(countries_api);
                renderCountries(countryCards, filterCountries(selectedRegion, countriesArray, countryCards));
            } else {
                countriesArray = await searchByName(searchValue)
                renderCountries(countryCards, filterCountries(selectedRegion, countriesArray, countryCards));
            }
        }, 300);
    })

    regionFilter.addEventListener('change', () => {
        debounceInput(async () => {
            selectedRegion = regionFilter.value;
            countriesArray = await filterCountries(selectedRegion, countriesArray, countryCards);
            renderCountries(countryCards, countriesArray);
        }, 300);
    })

    countriesArray = await loadAndDisplayCountries(countries_api);
    renderCountries(countryCards, countriesArray);
}

function loadAndDisplayCountries(countries_api) {
    return new Promise((resolve, reject) => {
        let countries = [];
        fetch(countries_api)
            .then(async response => {
                const data = await response.json();
                countries = Array.from(data);
                resolve(countries);
            })
            .catch(error => {
                console.log("ERROR!");
                console.error(error);
            });
    });
}

function renderCountries(elementID, data) {
    elementID.innerHTML = '';
    Promise.resolve(data)
        .then(result => result.forEach(country => {
            let {name, flags, population, region, capital, cca3} = country;

            elementID.innerHTML += `<div class="col">
        <div class="card h-100 border-0 rounded-3 shadow-sm">
            <a class="anchor text-decoration-none" href="country.html?id=${cca3}" id="country-anchor">
                <img alt="Flag" class="card-img-top w-100 object-fit-cover" src=${flags.svg}>
                <div class="card-body p-4 rounded-bottom-2">
                    <h5 class="card-title pb-3 fw-bold g-0 country-name">${name.common}</h5>
                    <ul class="list-unstyled">
                        <li class="list-item pb-1">
                            <span class="fw-semibold pe-1">Population:</span>${population.toLocaleString()}
                        </li>
                        <li class="list-item pb-1">
                            <span class="fw-semibold">Region:</span>
                            <span class="country-region">${region}</span>
                        </li>
                        <li class="list-item">
                            <span class="fw-semibold pe-1">Capital:</span>${capital}
                        </li>
                       </ul>
                   </div>
               </a>
        </div>
    </div>`;
        }))
}

// -------------------------- FILTER --------------------------
function filterCountries(selectedRegion, countriesArray, elementID) {
    return new Promise((resolve, reject) => {
        let array = [];
        elementID.innerHTML = '';
        countriesArray.forEach(country => {
            const {region} = country;
            if (selectedRegion === "no-filter" || region === selectedRegion) {
                array.push(country);
            }
        })
        resolve(array);
    });
}

// -------------------------- SEARCH --------------------------
function searchByName(searchValue) {
    return new Promise((resolve, reject) => {
        let countries = [];
        let searchURL = `https://restcountries.com/v3.1/name/${searchValue}`;
        fetch(searchURL)
            .then(async response => await response.json())
            .then(data => {
                countries = Array.from(data);
                resolve(countries);
            })
            .catch(error => {
                console.log("ERROR!");
                console.error(error);
            });
    });
}

// ------------------------- DEBOUNCE -------------------------
function debounce() {
    let delayTime;
    return function (callback, delay) {
        clearTimeout(delayTime);
        delayTime = setTimeout(callback, delay);
    };
}

initCountries();