const showInputError = (formElement, inputElement, errorMessage , config) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  const save = formElement.querySelector(config.submitButtonSelector);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  save.disabled = 'true';
};
  
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  const save = formElement.querySelector(config.submitButtonSelector);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  save.removeAttribute('disabled');
};
  
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
  
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement)
    });
  });
};
  
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
  formElement.addEventListener('reset', (evt) => {
    const inputs = Array.from(evt.target.querySelectorAll(config.inputSelector));
    inputs.forEach((input) => {
      hideInputError(evt.target, input, config);
    });
  })
  setEventListeners(formElement, config);
 });
}

enableValidation({
  formSelector: '.popup',
  inputSelector: '.content-form__input',
  submitButtonSelector: '.content-form__save-button',
  inactiveButtonClass: 'content-form__save-button_disabled',
  inputErrorClass: 'content-form__input_type_error',
  errorClass: 'content-form__input-error_active'
});

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('content-form__save-button_disabled');
  } else {
    buttonElement.classList.remove('content-form__save-button_disabled');
  }
};
