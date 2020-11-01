export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }
  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose() {
    if (evt.keyCode === 27) {
      this.close();
    }
  }
  setEventListeners() {
  const closeButton = this._popup.querySelector('.popup__close-button'); 
  closeButton.addEventListener('click', () => this.close);    
  }
}


