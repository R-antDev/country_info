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
        // data ? console.log(data) : console.log('Failed to read data');
        return data
    } catch (error) {
        console.error(error);
    }
})()

countriesData.then(data => console.log(data));