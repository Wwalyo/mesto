
export const profileFormElement =  document.querySelector('.content-form_type_profile');
export const nameInput = profileFormElement.querySelector('.content-form__input[name="name-input"]');
export const jobInput = profileFormElement.querySelector('.content-form__input[name="description-input"]');
export const userName = document.querySelector('.profile__name');
export const userAbout = document.querySelector('.profile__description');
export const userAvatar = document.querySelector('.profile__photo');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.control-panel__add-button');
export const editPhotoButton = document.querySelector('.profile__photo-overlay');

export const profileFormConfig = {
    formSelector: '.content-form_type_profile',
    inputSelector: '.content-form__input',
    submitButtonSelector: '.content-form__save-button',
    inactiveButtonClass: 'content-form__save-button_disabled',
    inputErrorClass: 'content-form__input_type_error',
    errorClass: 'content-form__input-error_active'
};
export const addCardFormConfig = {
    formSelector: '.content-form_type_new-card',
    inputSelector: '.content-form__input',
    submitButtonSelector: '.content-form__save-button',
    inactiveButtonClass: 'content-form__save-button_disabled',
    inputErrorClass: 'content-form__input_type_error',
    errorClass: 'content-form__input-error_active'
};
export const editPhotoFormConfig = {
    formSelector: '.content-form_type_edit-photo',
    inputSelector: '.content-form__input',
    submitButtonSelector: '.content-form__save-button',
    inactiveButtonClass: 'content-form__save-button_disabled',
    inputErrorClass: 'content-form__input_type_error',
    errorClass: 'content-form__input-error_active'
};

