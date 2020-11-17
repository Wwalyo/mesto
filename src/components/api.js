export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
      .then((res) => {
        if (res.ok) {  
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }) 
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
      .then((res) => {
        if (res.ok) {  
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }

  editUserInfo({ currentName, currentInfo }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify({
        name: currentName,
        about: currentInfo
      })
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }

  editUserPhoto({ currentPhoto }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify({
        avatar: currentPhoto,
      })
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }

  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      'Content-Type': 'application/json'
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }
  
  putLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }
  
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      'Content-Type': 'application/json'
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }
}