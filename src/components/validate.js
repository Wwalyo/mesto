
export default class FormValidator {
  constructor(config) {
    this._inputSelector = config.inputSelector;
    this._formElement = document.querySelector(config.formSelector);
    this._submitElement = this._formElement.querySelector(config.submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;    
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener('reset', (evt) => {
      const inputs = Array.from(evt.target.querySelectorAll(this._inputSelector));
      inputs.forEach((input) => {
        this._hideInputError(input);
      });
    });
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._updateFormState();
      });
    });
    document.addEventListener('DOMContentLoaded', () => {
      this._updateFormState();
    });
  };

  enableValidation() {
    this._updateFormState();
    this._setEventListeners();
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _updateFormState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._disableSubmit();
    } else {
      this._enableSubmit();
    }
  };

  _disableSubmit() {
    this._submitElement.classList.add(this._inactiveButtonClass);
    this._submitElement.disabled = 'true';  
  };

  _enableSubmit() {
    this._submitElement.removeAttribute('disabled');
    this._submitElement.classList.remove(this._inactiveButtonClass);    
  }; 
}  

