const movieUrl = 'https://api.nomoreparties.co/beatfilm-movies'
class Api {
  #handleResponse = res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor(baseUrl) {
    this._movieUrl = movieUrl;
  }
  getMovies() {
    return fetch(`${this._movieUrl}`, {
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then(this.#handleResponse);
  }
}
const moviesApi = new Api(movieUrl);

export default moviesApi;
