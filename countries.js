import {onSearch, onFilter, onDrop, renderCountries, renderFav} from "./rendering.js";

let countriesArray;
let previousRequest;
let filteredCountries = [];
let favouriteCountries = [];
let selectedRegion = 'no-filter';

async function initCountries() {

    onSearch(async (searchValue) => {
        if (searchValue.length === 0) {
            countriesArray = await loadCountries()
            renderCountries(filterCountries(selectedRegion, countriesArray), onStar)
        } else {
            countriesArray = await loadCountries(searchValue)
            renderCountries(filterCountries(selectedRegion, countriesArray), onStar)
        }
    })

    onFilter((region) => {
        selectedRegion = region;
        if (selectedRegion === "Favourites") {
            renderCountries(getFromLocalStorage('favouriteCountries'), onStar)
        } else {
            filteredCountries = filterCountries(selectedRegion, countriesArray)
            renderCountries(filteredCountries, onStar)
        }
    })

    onDrop((code) => {
        let countries = countriesArray.find(country => findFavCountries(country, code))
        if (!checkDuplicate(code)) {
            addToFavourites(countries)
        } else {
            alert(`Already in favourites list`);
        }
    })

    countriesArray = await loadCountries();
    renderCountries(countriesArray, onStar);

    favouriteCountries = getFromLocalStorage('favouriteCountries') || [];
    renderFav(favouriteCountries, removeFromFavourites);
}

export function loadCountries (searchValue) {
    let activeRequest = searchValue;
    previousRequest = activeRequest;

    return new Promise((resolve, reject) => {
        let countries_api = searchValue ? `https://restcountries.com/v3.1/name/${searchValue}` : `https://restcountries.com/v3.1/all`
        return fetch(countries_api)
            .then((response) => {
                if (previousRequest === activeRequest) {
                    if (response.status === 200)
                        resolve(response.json());
                    else
                        resolve(null);
                }
                else
                    console.log(`Request ignored`);
            })
            .catch(error => {
                resolve(null);
            });
    });
}

// -------------------------- FILTER --------------------------
export function filterCountries(selectedRegion, countries) {
    let array = countries.filter(country =>
        (selectedRegion === "no-filter" || country.region === selectedRegion)
    )
    return array;
}

// ------------------------- FAVOURITES -------------------------
function findFavCountries(country, code) {
    const {cca3} = country;
    if (cca3 === code) {
        return country;
    }
}

function checkDuplicate(countryCode) {
    let favCountries = getFromLocalStorage('favouriteCountries', favouriteCountries) || [];
    return favCountries.find(country => findFavCountries(country, countryCode));
}

function addToFavourites(data) {
    favouriteCountries.push(data)
    setInLocalStorage('favouriteCountries', favouriteCountries);
    renderFav(favouriteCountries, removeFromFavourites)
}

function removeFromFavourites(countryCode) {
    let countryToBeRemoved = countriesArray.find(country => findFavCountries(country, countryCode));
    favouriteCountries = removeCountry(favouriteCountries, countryToBeRemoved);
    setInLocalStorage('favouriteCountries', favouriteCountries);
    renderFav(favouriteCountries, removeFromFavourites);
}

function removeCountry(favCountries, countryToBeRemoved) {
    let {cca3} = countryToBeRemoved;
    return favCountries.filter(country => country.cca3 !== cca3)
}


export function onStar(country) {
    let {cca3} = country;
    if (!checkDuplicate(cca3)) {
        addToFavourites(country)
    } else {
        removeFromFavourites(cca3);
    }
}

// ------------------------- LOCAL STORAGE -------------------------
export function setInLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.log("Error");
    }
}

export function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        console.log("Error");
    }
}

initCountries().then(() => null);