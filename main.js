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

// Function to sort countries data
const sortCountriesData = (data, sortBy) => {
  switch (sortBy) {
    case "name-asce":
      return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    case "name-dsce":
      return data.sort((a, b) => b.name.common.localeCompare(a.name.common));
    case "population-h":
      return data.sort((a, b) => b.population - a.population);
    case "population-l":
      return data.sort((a, b) => a.population - b.population);
    case "area-h":
      return data.sort((a, b) => b.area - a.area);
    case "area-l":
      return data.sort((a, b) => a.area - b.area);
    default:
      return data;
  }
};

const renderCountriesData = (data) => {
  const countryContainer = document.getElementById("country-container");
  // Clear previous content
  countryContainer.innerHTML = "";
  data.forEach((country, index) => {
    // Create country card elements
    const countryCard = document.createElement("div");
    countryCard.id = `country-card-${index}`;
    countryCard.classList.add("country-card");

    const countryFlag = document.createElement("img");
    countryFlag.classList.add("country-flag");
    countryFlag.src = country.flags.png;
    countryFlag.alt = country.name.common;
    countryCard.appendChild(countryFlag);

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
    if (country.currencies) {
      // Check if currencies are defined
      let currencyList = Object.keys(country.currencies);
      let currencyNames = currencyList.map(
        (currency) => country.currencies[currency].name
      );
      currency.textContent = `Currencies: ${currencyNames.join(", ")}`;
    } else {
      currency.textContent = "Currencies: Not available";
    }
    cardInfo.appendChild(currency);

    // languages
    let language = document.createElement("p");
    language.classList.add("country-language");
    if (country.languages) {
      let languageList = Object.values(country.languages);
      language.textContent = `Languages: ${languageList.join(", ")}`;
    } else {
      language.textContent = "Language: Not available";
    }
    cardInfo.appendChild(language);

    // population
    let population = document.createElement("p");
    population.classList.add("country-population");
    population.textContent = `Population: ${country.population}`;
    cardInfo.appendChild(population);

    // area
    let area = document.createElement("p");
    area.classList.add("country-area");
    area.textContent = `Area: ${country.area} Sqaure KM`;
    cardInfo.appendChild(area);

    // region
    let region = document.createElement("p");
    region.classList.add("country-region");
    region.textContent = `Region: ${country.region}`;
    cardInfo.appendChild(region);

    countryCard.appendChild(cardInfo);
    countryContainer.appendChild(countryCard);
  });
};

// Function to initially render all country data
const renderAllCountriesData = (data) => {
  renderCountriesData(data); // Assuming renderCountriesData function exists
};

// Event listener for dropdown change
const dropDown = document.getElementById("drop-down");
dropDown.addEventListener("change", async (event) => {
  const selectedValue = event.target.value;
  // Fetch countries data
  try {
    const data = await countriesData;
    // Sort data according to selected value
    const sortedData = sortCountriesData(data, selectedValue);
    // Render sorted data
    renderCountriesData(sortedData);
  } catch (error) {
    console.error(error);
  }
});

// Fetch countries data and render all countries data when the page loads
window.addEventListener("load", async () => {
  try {
    const data = await countriesData;
    renderAllCountriesData(data);
  } catch (error) {
    console.error(error);
  }
});
