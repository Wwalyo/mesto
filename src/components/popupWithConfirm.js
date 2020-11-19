import Popup from './popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.content-form');
    this._onSubmit = null;
  }

  setOnSubmit(value) {
    this._onSubmit = value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._onSubmit();
    });
  }
}