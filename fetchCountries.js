const countries_api = 'https://restcountries.com/v3.1/all';
const countryCard = document.getElementById('country-card');

async function getCountries() {
    countryCard.innerHTML = "";
    await fetch(countries_api)
        .then(async response => {
            const data = await response.json();
            const count = Object.keys(data).length;
            for (let i = 0; i < count; i++) {
                const {name, flags, population, region, capital} = data[i];

                countryCard.innerHTML += `<div class="col">
           <div class="card h-100 border-0 rounded-2 shadow-sm" id="country-card">
               <a class="anchor text-decoration-none" href="#" id="country-anchor" onclick="fetchDetails()">
                   <img alt="Flag" class="card-img-top w-100 object-fit-cover" src=${flags.svg}>
                   <div class="card-body p-4">
                       <h5 class="card-title pb-4 fw-bold g-0" id="country-name">${name.common}</h5>
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
        .catch(error => {
            console.log("ERROR!");
            console.error(error);
        });
}

getCountries();
