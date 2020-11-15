
const profileFormElement =  document.querySelector('.content-form_type_profile');
const nameInput = profileFormElement.querySelector('.content-form__input[name="name-input"]');
const jobInput = profileFormElement.querySelector('.content-form__input[name="description-input"]');
const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.control-panel__add-button');
const editPhotoButton = document.querySelector('.profile__photo-overlay');

export { 
          nameInput, 
          jobInput, 
          userName, 
          userAbout, 
          userAvatar, 
          profileEditButton, 
          addCardButton, 
          editPhotoButton 
};  