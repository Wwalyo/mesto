import Card from './scripts/card.js';
import { openPopup, closePopup } from './scripts/popups.js';
import formValidate from './scripts/validate.js';
import PopupWithImage from './scripts/popupWithImage.js';
import PopupWithForm from './scripts/popupWithForm/js';
import Section from './scripts/section.js';
import './pages/index.css';
import './images/add-icon.svg';
import './images/close-icon.svg';
import './images/edit-icon.svg';
import './images/header-logo.svg';
import './images/like-active.svg';
import './images/like.svg';
import './images/profile-photo.jpg';
import './images/trash-icon.svg';


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

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardItem = new Card( 
                              item, 
                              '#card', 
                              () => {
                                      const popupWithImage = new PopupWithImage('.popup_type_image-popup');
                                      popupWithImage.open(item);                                             
                                    })

    cardsList.setItem(cardItem.getCard(item));  
  }
},
  '.cards'
);

cardsList.renderItems();

const popupEditProfile = new PopupWithForm('.popup_type_profile', () => {
  
})

const popupAddCard = new PopupWithForm('.popup_type_new-card', () => {
  
})

const setupEditProfile = () => {
  profileFormElement.reset();
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  openPopup(popup);
}

const setupAddCard = () => {
  cardFormElement.reset();
  const submitbutton = cardFormElement.querySelector('.content-form__save-button');
  submitbutton.classList.add('content-form__save-button_disabled');
  submitbutton.disabled = 'true';
  openPopup(cardPopup);
}



const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popup);  
}

const handleAddCardFormSubmit = (event) => {
  event.preventDefault();
  const card = {};
  card.name = titleInput.value;
  card.link = linkInput.value;
  addCard(card);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(cardPopup);  
}

const closeByOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return
  }
  closePopup(evt.currentTarget);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleAddCardFormSubmit);
profileEditButton.addEventListener('click', popupEditProfile.open());
addCardButton.addEventListener('click', popupAddCard.open());
popupProfileCloseButton.addEventListener('click', () => closePopup(profilePopup));
popupCardCloseButton.addEventListener('click', () => closePopup(cardPopup));
popupImageCloseButton.addEventListener('click', () => closePopup(imagePopup));
profilePopup.addEventListener('click', closeByOverlay);
cardPopup.addEventListener('click', closeByOverlay);
imagePopup.addEventListener('click', closeByOverlay);
