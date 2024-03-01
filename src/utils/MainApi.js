const baseUrl = 'https://api.cerea62.nomoredomainswork.ru'
class Api {
    #handleResponse = res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    constructor(baseUrl, headers) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
    _getHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
          Authorization: `Bearer ${jwt}`,
          ...this._headers,
        };
      }
    getUserMovies() {
        return fetch(`${this._baseUrl}/movies`, { 
          method: 'GET',
          headers: this._getHeaders(),
        }).then(this.#handleResponse);
      }
}
const mainApi = new Api(baseUrl);

export default mainApi;