const { default: Popup } = require("./popup");

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;  
  }
  _getInputValues() {
    const inputs = [...this._popup.querySelectorAll('.content-form__input')];
    return inputs;
  }


  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    const submitButton = this._popup.querySelector('.content-form__save-button');  
    closeButton.addEventListener('click', this.close());
    submitButton.addEventListener('click', this._submitForm(this._getInputValues));
  }
  close() {
    this._popup.classList.remove('popup_is-opened');
    // this._popup.reset();
    document.removeEventListener('keydown', this._handleEscClose);
  }

}
  