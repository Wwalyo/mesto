
export default class FormValidator {
  constructor(config) {
    this._formElement = document.querySelector(config.formSelector);
    this._inputElement = document.querySelector(config.inputSelector);
    this._buttonElement = document.querySelector(config.inputSelector);
    this._inputSelector = config.inputSelector
    this._formSelector = config.formSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;    
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    const save = formElement.querySelector(this._submitButtonSelector);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    save.disabled = 'true';
  };
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    const save = formElement.querySelector(this._submitButtonSelector);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    save.removeAttribute('disabled');
    // save.classList.remove(this._inactiveButtonClass);
  };

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(formElement, inputElement, errorMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      formElement.addEventListener('reset', (evt) => {
        const inputs = Array.from(evt.target.querySelectorAll(this._inputSelector));
        inputs.forEach((input) => {
          this._hideInputError(evt.target, input);
        });
      })
    this._setEventListeners(formElement);  
    });
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add('content-form__save-button_disabled');
    } else {
      buttonElement.classList.remove('content-form__save-button_disabled');
    }
  };
}  

