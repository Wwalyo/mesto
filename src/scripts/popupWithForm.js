const { default: Popup } = require("./popup");

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;  
    this._form = this._popup.querySelector('.content-form');
  }

  _getInputValues(){
    this._formValue = {};
    this._inputs = this._form.querySelectorAll('.content-form__input');
    this._arrayInputs = Array.from(this._inputs);
    this._arrayInputs.forEach(input => {
      this._formValue[input.name] = input.value;
    });
    return this._formValue;
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    const submitButton = this._popup.querySelector('.content-form__save-button');
    closeButton.addEventListener('click', this.close.bind(this));
    submitButton.addEventListener('click', () => {
                                                    this._submitForm(this._getInputValues());
                                                  });
    this._popup.addEventListener('click', this._handlecloseByOverlay.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.reset();
  }
}
  