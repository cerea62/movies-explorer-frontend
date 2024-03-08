import { MOVIES_API_ADDRESS } from "./constants";

class Api {
  #handleResponse = res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor() {
    this._movieUrl = MOVIES_API_ADDRESS;
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
const moviesApi = new Api();

export default moviesApi;
