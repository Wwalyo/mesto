const showInputError = (formElement, inputElement, errorMessage , obj) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    const save = formElement.querySelector(obj.submitButtonSelector);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
    save.classList.add(obj.errorSubmitButtonSelector);
    save.disabled = 'true';
  };
  
  const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    const save = formElement.querySelector(obj.submitButtonSelector);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
    save.classList.remove(obj.errorSubmitButtonSelector);
    save.removeAttribute('disabled');
  };
  
  const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
      hideInputError(formElement, inputElement, obj);
    }
  };
  
  const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, obj);
      });
    });
  };
  
  const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    console.log(formList);
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    formElement.addEventListener('reset', () => hideInputError(formElement, inputElement, obj));
    setEventListeners(formElement, obj);
  });
  }
  
  enableValidation({
    formSelector: '.popup',
    inputSelector: '.content-form__input',
    submitButtonSelector: '.content-form__save-button',
    errorSubmitButtonSelector: 'content-form__save-button_disabled',
    inactiveButtonClass: '.content-form__save-button_disabled',
    inputErrorClass: 'content-form__input_type_error',
    errorClass: 'content-form__input-error_active'
  });