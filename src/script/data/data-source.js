class DataSource {
  static searchCocktail(keyword) {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.drinks) {
          return Promise.resolve(responseJson.drinks);
        }
        return Promise.reject(`${keyword} tidak ditemukan`);
      });
  }
}
export default DataSource;
