export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;  
  }
  _getInputValues() {
    //тут получается массив из этих элементов, а не их значений
    const inputs = [...this._popup.querySelectorAll('content-form__input')];
  }
  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    const submitButton = this._popup.querySelector('content-form__save-button');  
    closeButton.addEventListener('click', this.close);
    submitButton.addEventListener('click', this._submitForm);
  }
  close() {
    this._popup.classList.remove('popup_is-opened');
    this._popup.reset();
    document.removeEventListener('keydown', this._handleEscClose);
  }

}
  