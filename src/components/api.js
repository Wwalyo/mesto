

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
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      }); 
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
      .then((res) => {
        if (res.ok) {  
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      }); 
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
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
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
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
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
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
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
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }  
    // другие методы работы с API
}