import Card from './card.js';
import { openPopup, closePopup } from './popups.js';

import formValidate from './validate.js';

const popup = document.querySelector('.popup');
const cardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_profile');
const imagePopup = document.querySelector('.popup_type_image-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.control-panel__add-button');
const popupProfileCloseButton = popup.querySelector('.popup__close-button');
const popupCardCloseButton = cardPopup.querySelector('.popup__close-button');
const popupImageCloseButton = imagePopup.querySelector('.popup__close-button');
const profile = document.querySelector('.profile__info');
const profileFormElement =  popup.querySelector('.content-form_type_profile');
const cardFormElement =  cardPopup.querySelector('.content-form_type_new-card');
const nameInput = profileFormElement.querySelector('.content-form__input[name="name-input"]');
const jobInput = profileFormElement.querySelector('.content-form__input[name="description-input"]');
const titleInput = cardFormElement.querySelector('.content-form__input[name="place-name"]');
const linkInput = cardFormElement.querySelector('.content-form__input[name="link"]');
const currentName = profile.querySelector('.profile__name');
const currentJob = profile.querySelector('.profile__description');
const cardsContainer = document.querySelector('.cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validation = new formValidate({
  formSelector: '.popup',
  inputSelector: '.content-form__input',
  submitButtonSelector: '.content-form__save-button',
  inactiveButtonClass: 'content-form__save-button_disabled',
  inputErrorClass: 'content-form__input_type_error',
  errorClass: 'content-form__input-error_active'
});

validation.enableValidation();

const addCard = (item) => {
  const newCard = new Card(item, '#card');
  console.log(newCard._imageBtn);
  cardsContainer.prepend(newCard.getCard(item));
}

const addCards = (items) => {
  items.forEach((item) => {
    const cardItem = new Card(item, '#card');

    cardsContainer.prepend(cardItem.getCard(item));
  });
}

addCards(initialCards);

const setupEditProfile = () => {
  profileFormElement.reset();
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  openPopup(popup);
}

const setupAddCard = () => {
  cardFormElement.reset();
  openPopup(cardPopup);
}

const formSubmitHandler = (event) => {
  event.preventDefault();
  if (event.target.closest('.popup') === profilePopup)  {
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value;
    closePopup(popup);  
  } else {
    const card = {};
    card.name = titleInput.value;
    card.link = linkInput.value;
    addCard(card);
    titleInput.value = '';
    linkInput.value = '';
    closePopup(cardPopup);  
  }
}

const closeByOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return
  }
  closePopup(evt.currentTarget);
}

profileFormElement.addEventListener('submit', formSubmitHandler);
cardFormElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', setupEditProfile);
addCardButton.addEventListener('click', setupAddCard);
popupProfileCloseButton.addEventListener('click', () => closePopup(profilePopup));
popupCardCloseButton.addEventListener('click', () => closePopup(cardPopup));
popupCardCloseButton.addEventListener('click', () => closePopup(cardPopup));
popupImageCloseButton.addEventListener('click', () => closePopup(imagePopup));
profilePopup.addEventListener('click', closeByOverlay);
cardPopup.addEventListener('click', closeByOverlay);
imagePopup.addEventListener('click', closeByOverlay);
