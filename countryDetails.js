import {renderDetails, countryBorders, renderBorder} from "./renderingDetails.js";

async function initCountryDetails() {
    let url = new URLSearchParams(window.location.search);
    let id = url.get('id');
    let countryData = await fetchDetails(assignCodeAPI(id));

    renderDetails(countryData);
    displayBorders(countryBorders);
}

async function fetchDetails(codeAPI) {
    return new Promise((resolve, reject) => {
        let country = [];
        fetch(codeAPI)
            .then(async response => {
                const data = await response.json();
                country = Array.from(data);
                resolve(country);
            })
            .catch(error => {
                console.log("ERROR!");
                resolve(null);
            });
    });
}

// function renderDetails(data) {
//     data.forEach(country => {
//         let {name, flags, population, region, subregion, capital, borders} = country;
//
//         const nativeName = country.name.nativeName[Object.keys(country.name.nativeName)[0]].official;
//         const tld = splitBetweenElements(Object.values(country.tld));
//         let currenciesArray = [];
//         Object.keys(country.currencies).forEach(currency => {
//             currenciesArray.push(country.currencies[currency].name);
//         })
//         currenciesArray = splitBetweenElements(currenciesArray);
//         const languages = splitBetweenElements(Object.values(country.languages));
//
//         countryDetails.innerHTML = `<div class="col">
//     <img alt="Flag of Germany" class="align-self-center h-100 w-100 border-0 object-fit-cover"
//          src="${flags.svg}"/>
// </div>
// <div class="col align-self-center">
//
//     <div class="row row-cols-1">
//         <div class="col mb-3">
//             <h2 class="fw-bold">${name.common}</h2>
//         </div>
//     </div>
//
//     <div class="row row-cols-1 row-cols-md-2">
//         <div class="col mb-4 mt-md-3">
//             <ul class="list-unstyled">
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Native Name: </span>${nativeName}
//                 </li>
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Population: </span>${population.toLocaleString()}
//                 </li>
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Region: </span>${region}
//                 </li>
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Sub Region: </span>${subregion}
//                 </li>
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Capital: </span>${capital}
//                 </li>
//             </ul>
//         </div>
//         <div class="col mb-sm-4 mt-md-3">
//             <ul class="list-unstyled">
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Top Level Domain: </span>${tld}
//                 </li>
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Currencies: </span>${currenciesArray}
//                 </li>
//                 <li class="list-item mb-1">
//                     <span class="fw-semibold pe-1">Languages: </span>${languages}
//                 </li>
//             </ul>
//         </div>
//     </div>
//     <div class="row row-cols-1 row-cols-md-2 mt-4 mt-md-0">
//         <div class="col-md-auto align-self-center gy-0">
//             <h6 class="fw-bold col-6 w-100">Border Countries:</h6>
//         </div>
//         <div class="col-md-auto" id="border-countries"></div>
//     </div>
// </div>`;
//
//         if (borders) {
//             borders = Object.values(country.borders);
//             displayBorders(borders);
//         } else {
//             const border = document.createTextNode('None');
//             document.getElementById('border-countries').appendChild(border);
//         }
//     })
// }

function displayBorders(borders) {
    Promise.all([
        borders.forEach(country => {
            fetchBorder(assignCodeAPI(country))
        })
    ])
        .catch(error => null)
}

function fetchBorder(api) {
    fetch(api)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let {name} = data[0];
            name = name.common;
            renderBorder(name)
        })
}

function assignCodeAPI(code) {
    return `https://restcountries.com/v3.1/alpha/${code}`;
}

initCountryDetails().then(() => null);