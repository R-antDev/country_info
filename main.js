const fetchCountriesData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Failed to fetch Data");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const countriesData = (async () => {
  try {
    const data = await fetchCountriesData();
    return data;
  } catch (error) {
    console.error(error);
  }
})();

countriesData.then((data) => {
  const countryContainer = document.getElementById("country-container");

  data.forEach((country, index) => {
    // Create country card elements
    const countryCard = document.createElement("div");
    countryCard.id = `country-card-${index}`;
    countryCard.classList.add("country-card");

    // Create card info element
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    // name
    let name = document.createElement("p");
    name.classList.add("country-name");
    name.textContent = country.name.common;
    cardInfo.appendChild(name);

    // capital
    let capital = document.createElement("p");
    capital.classList.add("country-capital");
    capital.textContent = `Capital: ${country.capital}`;
    cardInfo.appendChild(capital);

    // currency
    let currency = document.createElement("p");
    currency.classList.add("country-currency");
    let currencyList = Object.keys(country.currencies);
    let currencyNames = currencyList.map(
      (currency) => country.currencies[currency].name
    );
    currency.textContent = `Currencies: ${currencyNames.join(", ")}`;
    cardInfo.appendChild(currency);

    // languages
    let language = document.createElement("p");
    language.classList.add("country-language");
    let languageList = Object.values(country.languages);
    language.textContent = `Languages: ${languageList.join(", ")}`;
    cardInfo.appendChild(language);

    // population
    let population = document.createElement("p");
    population.classList.add("country-population");
    population.textContent = `Population: ${country.population}`;
    cardInfo.appendChild(population);

    // region
    let region = document.createElement("p");
    region.classList.add("country-region");
    region.textContent = `Region: ${country.region}`;
    cardInfo.appendChild(region);

    countryCard.appendChild(cardInfo);
    countryContainer.appendChild(countryCard);
  });
});
