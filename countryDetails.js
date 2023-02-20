// ----------------------------------------------- DETAILS -------------------------------------------------------------
function fetchDetails() {
    console.log("Inside fetch details");
    const countryName = document.getElementById('country-name').innerText;
    console.log("Country Name: " + countryName);
    sessionStorage.setItem("name", `${countryName}`);

    window.open('country.html');
    window.onload = printDetails();
    // printDetails();
}

function printDetails() {
    console.log("Inside printDetails function");
    let name = sessionStorage.getItem("name");
    console.log("Name: " + name);
    name = name.toLowerCase();
    console.log("Name: " + name);
    let countryDetails = document.getElementsByClassName('country-details')[0];
    const api = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    console.log("API: " + api);

    fetch(api)
        .then(response =>
            response.json()
        )
        .then(data => {
            const capital = data[0].capital;
            console.log("Capital:" + capital);
            const flagSrc = data[0].flags.svg;
            const name = data[0].name.common;
            const nativeName = Object.keys(data[0].name.nativeName)[0];
            const population = data[0].population;
            const region = data[0].region;
            const subRegion = data[0].subregion;
            const tld = data[0].tld;
            const currencies = Object.keys(data[0].currencies)[0];

            countryDetails.innerHTML = `<div class="col">
    <img alt="Flag of Germany" class="align-self-center h-100 w-100 border-0 object-fit-cover"
         src="${flagSrc}"/>
</div>
<div class="col align-self-center">

    <div class="row row-cols-1">
        <div class="col mb-3">
            <h2 class="fw-bold">${name}</h2>
        </div>
    </div>

    <div class="row row-cols-1 row-cols-md-2">
        <div class="col mb-4 mt-md-3">
            <ul class="list-unstyled">
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold fs-6">Native Name:</h6>
                        </div>
                        <div class="col">
                            <h6 class="fw-light">${nativeName}</h6>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold">Population:</h6>
                        </div>
                        <div class="col">
                            <h6 class="fw-light">${population}</h6>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold">Region: </h6>
                        </div>
                        <div class="col">
                            <h6 class="fw-light">${region}</h6>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold">Sub Region: </h6>
                        </div>
                        <div class="col">
                            <h6 class="fw-light">${subRegion}</h6>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold">Capital: </h6>
                        </div>
                        <div class="col-auto">
                            <h6 class="fw-light">${capital}</h6>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col mb-sm-4">
            <ul class="list-unstyled">
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1 mt-md-3">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold">Top Level Domain:</h6>
                        </div>
                        <div class="col">
                            <h6 class="fw-light">${tld}</h6>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold">Currencies:</h6>
                        </div>
                        <div class="col-auto">
                            <h6 class="fw-light">${currencies}</h6>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="row row-cols-2 g-0 mb-1 w-100">
                        <div class="col-auto pe-1">
                            <h6 class="fw-semibold">Languages: </h6>
                        </div>
                        <div class="col-auto">
                            <h6 class="fw-light">Dutch, French, German</h6>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 mt-4 mt-md-0">
        <div class="col-md-auto align-self-center gy-0">
            <p class="fw-bold col-6 w-100">Border Countries:</p>
        </div>
        <div class="col-md-auto">
            <button class="border border-2 rounded-1 shadow-sm py-1 px-3 theme-color" type="button">
                France
            </button>
            <button class="border border-2 rounded-1 shadow-sm py-1 px-3 theme-color" type="button">
                Germany
            </button>
            <button class="border border-2 rounded-1 shadow-sm py-1 px-3 theme-color" type="button">
                Netherlands
            </button>
        </div>
    </div>

</div>`;
            console.log("HTML: " + countryDetails.innerHTML);

        })
}
