let favouriteCountriesElement = document.getElementById('favourite-countries');
let codeAPI = '';

async function initCountries() {
    let countriesArray = [];
    let selectedRegion = 'no-filter';
    let debounceInput = debounce();
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
            if (selectedRegion === "Favourites") {
                renderCountries(countryCards, getFavourites())
            } else {
                countriesArray = await filterCountries(selectedRegion, countriesArray, countryCards);
                renderCountries(countryCards, countriesArray);
            }

        }, 300);
    })

    countriesArray = await loadAndDisplayCountries(countries_api);
    renderCountries(countryCards, countriesArray);

    renderFav(getFavourites())
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
    })
}

function renderCountries(elementID, data) {
    elementID.innerHTML = '';
    Promise.resolve(data)
        .then(result => result.forEach(country => {
            let {name, flags, population, region, capital, cca3} = country;

            elementID.innerHTML += `<div class="col">
        <div class="card border border-0 rounded-3 shadow-sm theme-color" draggable="true" ondragstart="drag(event, '${cca3}')" ondragend="dragEnd(event)">
            <a class="anchor h-100 text-decoration-none" href="country.html?id=${cca3}">
                <img alt="${name.common} Flag" class="card-img-top w-100 object-fit-cover rounded-top-3" src=${flags.svg}>
                <div class="card-body p-4 border-0 rounded-bottom-0 pb-2">
                    <h5 class="card-title pb-3 fw-bold g-0 country-name">${name.common}</h5>
                    <ul class="list-unstyled mb-0">
                        <li class="list-item pb-1">
                            <span class="fw-semibold pe-1">Population:</span>${population.toLocaleString()}
                        </li> 
                        <li class="list-item pb-1">
                            <span class="fw-semibold">Region:</span>
                            <span class="country-region">${region}</span>
                        </li>
                        <li class="list-item mb-0 mb-sm-0 mb-md-3 border-0 rounded-bottom-5">
                            <span class="fw-semibold pe-1">Capital:</span>${capital}
                        </li>
                       </ul>
                   </div>
                                   <button class="fav-btn theme-color d-block d-lg-none d-md-none border-0 ms-auto me-3 mb-2" type="button" onclick="clickStar(event, '${cca3}')">
                    <i class='bi bi-star-fill'></i>
                </button> 
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

// ------------------------- FAVOURITES -------------------------
function clickStar(event, code) {
    if (event.target.style.color === 'orange') {
        event.target.style.color = 'lightgray';
        removeFromFavourites(event, code);
    } else {
        event.target.style.color = 'orange';
        favouriteCountriesElement.innerHTML = `<h5 class="fw-bold mb-4">Favourites</h5>`;
        let data = fetchFavourite(`https://restcountries.com/v3.1/alpha/${code}`);
        Promise.resolve(data)
            .then(result => result.forEach(country => {
                    let {cca3} = country;
                    setInLocalStorage(cca3, country);
                    setInLocalStorage('code', cca3);
                })
            )
            .then(r => renderFav(getFavourites()))
    }
}


function drag(event, code) {
    let el = event.target.getElementsByClassName('bi-star-fill')[0];
    el.style.color = 'orange';
    event.target.style.opacity = '0.5';
    codeAPI = `https://restcountries.com/v3.1/alpha/${code}`;
}

function dragEnd(event) {
    event.target.style.opacity = '1.0';
}

function allowDrop(event) {
    event.preventDefault();
    event.target.style.border = '2px solid #27ae60';
}

function drop(event) {
    event.preventDefault();
    event.target.style.border = 'none';

    favouriteCountriesElement.innerHTML = `<h5 class="fw-bold mb-4">Favourites</h5>`;
    let data = fetchFavourite(codeAPI);
    Promise.resolve(data)
        .then(result => result.forEach(country => {
                let {cca3} = country;
                setInLocalStorage(cca3, country);
                setInLocalStorage('code', cca3);
            })
        ).then(r => renderFav(getFavourites())
    )
}

function fetchFavourite(api) {
    return new Promise((resolve, reject) => {
        fetch(api)
            .then(async response => await response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.log("ERROR!");
                console.error(error);
            });
    });
}

function renderFav(data) {
    Promise.resolve(data)
        .then(result => result.forEach(country => {
            let {name, flags, cca3} = country;
            favouriteCountriesElement.innerHTML += `<div class="col mb-3">
                <img alt="Flag" class="fav-img rounded-2 object-fit-cover me-1" src="${flags.svg}">
                <span class="fw-bold">${name.common}</span>
                <button aria-label="Remove" class="border-0 rounded-5 ms-auto me-0" type="button" onclick="removeFromFavourites(event, '${cca3}')">
                    <i class="bi bi-x"></i>
                </button>
            </div>`;
        }))
}

function setInLocalStorage(key, value) {
    try {
        let val = getFromLocalStorage(key);
        if (!(val === value)) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            alert(`Already in favourites list`);
        }
    } catch {
        console.log("Error");
    }
}

function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        console.log("Error");
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        alert(`Not found in favourites list`);
    }
}

function removeFromFavourites(event, countryCode) {
    removeFromLocalStorage(countryCode);
    let favCountries = getFavourites();
    favouriteCountriesElement.innerHTML = `<h5 class="fw-bold mb-4">Favourites</h5>`;
    renderFav(favCountries);
}

function getFavourites() {
    let favouriteCountriesArray = [];
    Object.keys(localStorage).forEach(key => {
        if (!(key === "theme") && !(key === "code")) {
            favouriteCountriesArray.push(getFromLocalStorage(key));
        }
    })
    return favouriteCountriesArray;
}

initCountries();