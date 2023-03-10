const countryDetails = document.getElementById('country-details');
export let countryBorders = [];

export function renderDetails(data) {
    data.forEach(country => {
        let {name, flags, population, region, subregion, capital, borders} = country;

        const nativeName = country.name.nativeName[Object.keys(country.name.nativeName)[0]].official;
        const tld = splitBetweenElements(Object.values(country.tld));
        let currenciesArray = [];
        Object.keys(country.currencies).forEach(currency => {
            currenciesArray.push(country.currencies[currency].name);
        })
        currenciesArray = splitBetweenElements(currenciesArray);
        const languages = splitBetweenElements(Object.values(country.languages));

        countryDetails.innerHTML = `<div class="col">
        <img alt="Flag of Germany" class="align-self-center h-100 w-100 border-0 object-fit-cover"
         src="${flags.svg}"/>
        </div>
        <div class="col align-self-center">
        <div class="row row-cols-1">
        <div class="col mb-3">
            <h2 class="fw-bold">${name.common}</h2>
        </div>
        </div>

        <div class="row row-cols-1 row-cols-md-2">
            <div class="col mb-4 mt-md-3">
                <ul class="list-unstyled">
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Native Name: </span>${nativeName}
                    </li>
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Population: </span>${population.toLocaleString()}
                    </li>
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Region: </span>${region}
                    </li>
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Sub Region: </span>${subregion}
                    </li>
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Capital: </span>${capital}
                    </li>
                </ul>
            </div>
            <div class="col mb-sm-4 mt-md-3">
                <ul class="list-unstyled">
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Top Level Domain: </span>${tld}
                    </li>
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Currencies: </span>${currenciesArray}
                    </li>
                    <li class="list-item mb-1">
                        <span class="fw-semibold pe-1">Languages: </span>${languages}
                    </li>
                </ul>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 mt-4 mt-md-0">
            <div class="col-md-auto align-self-center gy-0">
                <h6 class="fw-bold col-6 w-100">Border Countries:</h6>
            </div>
            <div class="col-md-auto" id="border-countries"></div>
        </div>
        </div>`;

        if (borders) {
            countryBorders = Object.values(country.borders);
        } else {
            const border = document.createTextNode('None');
            document.getElementById('border-countries').appendChild(border);
            countryBorders = [];
        }
    })
}

export function renderBorder(name) {
    const border = document.createElement('button');
    const borderStyle = ["border", "border-2", "rounded-1", "shadow-sm", "py-1", "px-3", "me-2", "mb-2", "theme-color"];
    border.classList.add(...borderStyle);
    border.innerText = name;
    document.getElementById('border-countries').appendChild(border);
}

function splitBetweenElements(elements) {
    return elements.toString().split(",").join(", ");
}