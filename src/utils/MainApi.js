// const baseUrl = 'https://api.cerea62.nomoredomainswork.ru'


const config = {
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
}

class Api {
  #handleResponse = res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  constructor(baseUrl, headers) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  checkToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });
  }

  signup({ name, email, password }) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
  }

  signin({ email, password }) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }
  getUserMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then(this.#handleResponse);
  }

  editUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this.#handleResponse)
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this.#handleResponse)
  }

  saveMovie(movie) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(movie),
    }).then(this.#handleResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then(this.#handleResponse);
  }

}
const mainApi = new Api(config);

export default mainApi;