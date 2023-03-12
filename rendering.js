let debounceInput = debounce();
const searchBar = document.getElementById('search');
const regionFilter = document.getElementById('filter');
let countryCards = document.getElementById('country-cards');
let favouriteCountriesElement = document.getElementById('favourite-countries');

export function renderCountries(data, starCountry) {
    countryCards.innerHTML = '';
    if (data) {
        data.forEach(country => {
            let {name, flags, population, region, capital, cca3} = country;
            let card = document.createElement('div');
            card.className = 'col';
            card.innerHTML += `<div class="card border border-0 rounded-3 shadow-sm theme-color" draggable="true">
                <a class="anchor h-100 text-decoration-none" href="country.html?id=${cca3}" draggable="false">
                <img alt="${name.common} Flag" class="card-img-top w-100 object-fit-cover rounded-top-3" src=${flags.svg} draggable="false" >
                <div class="card-body p-4 border-0 rounded-bottom-3 pb-2">
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
                
                </a>
                <button class="fav-btn theme-color d-block d-lg-none d-md-none border-0 ms-auto me-3 mt-0 mb-2" type="button">
                    <i class='bi bi-star-fill' id="${cca3}"></i>
                </button> 
            </div>`;

            card.querySelector('button').addEventListener('click', (event) => {
                // clickStar(event)
                if (event.target.style.color === 'orange') {
                    event.target.style.color = 'lightgray';
                } else {
                    event.target.style.color = 'orange';
                }
                starCountry(country)
            });

            card.addEventListener('dragstart', () => dragCountry(country))
            card.addEventListener('dragend', () => dragEnd(event))
            countryCards.appendChild(card);
        })
    } else {
        countryCards.innerHTML = 'No Results found';
    }
}

export function onFilter(callback) {
    regionFilter.addEventListener('change', () => {
        debounceInput(() => {
            let selectedRegion = regionFilter.value;
            callback(selectedRegion);
        }, 300);
    })
}

export function onSearch(callback) {
    searchBar.addEventListener('input', () => {
        debounceInput(() => {
            let searchValue = searchBar.value;
            callback(searchValue);
        }, 300);
    })
}

function dragCountry(country) {
    event.target.style.opacity = '0.5';
    let {cca3} = country;
    event.dataTransfer.setData("text/plain", cca3);
}

function dragEnd(event) {
    event.target.style.opacity = '1.0';
}

export function onDrop(dropCountry) {
    favouriteCountriesElement.addEventListener('dragover', (event) => {
        allowDrop(event)
    })
    favouriteCountriesElement.addEventListener('drop', (event) => {
        drop(event)
        dropCountry(event.dataTransfer.getData("text/plain"))
    })
}

function allowDrop(event) {
    event.preventDefault();
    event.target.style.border = '2px solid #27ae60';
}

function drop(event) {
    event.preventDefault();
    event.target.style.border = 'none';
}

// function clickStar(event) {
//     if (event.target.style.color === 'orange') {
//         event.target.style.color = 'lightgray';
//     } else {
//         event.target.style.color = 'orange';
//     }
// }

export function renderFav(data, onRemove) {
    favouriteCountriesElement.innerHTML = `<h4 class="fw-bold mb-4">Favourites</h4>`;
    data.forEach(country => {
        let {name, flags, cca3} = country;
        let favouriteCountry = document.createElement('div');
        favouriteCountry.className = 'col mb-3 d-flex justify-content-between';
        favouriteCountry.innerHTML += `<span class="fw-semibold">
                <img alt="Flag" class="fav-img rounded-2 object-fit-cover me-1" src="${flags.svg}">${name.common}
            </span>
            <button aria-label="Remove" class="border-0 rounded-5 ms-auto me-0" type="button">
                <i class="bi bi-x-lg"></i>
            </button>`;
        let starElement = document.getElementById(`${cca3}`);
        console.log(`starElement: ${starElement.innerHTML}`)
        starElement.style.color = 'orange';
        favouriteCountry.querySelector('button').addEventListener('click', () => {
            let {cca3} = country;
            let starElement = document.getElementById(`${cca3}`);
            starElement.style.color = 'lightgray';
            onRemove(cca3);
        });
        favouriteCountriesElement.appendChild(favouriteCountry);
    })
}

// ------------------------- DEBOUNCE -------------------------
function debounce() {
    let delayTime;
    return function (callback, delay) {
        clearTimeout(delayTime);
        delayTime = setTimeout(callback, delay);
    };
}