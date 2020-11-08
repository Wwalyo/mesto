export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    console.log(evt.keyCode)
    if (evt.keyCode === 27) {
      this.close();
    }
  }

  _handlecloseByOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return
    }
    this.close();
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button'); 
    closeButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handlecloseByOverlay.bind(this));   
  }
}


