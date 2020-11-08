import Card from './scripts/card.js';
import formValidate from './scripts/validate.js';
import PopupWithImage from './scripts/popupWithImage.js';
import PopupWithForm from './scripts/popupWithForm.js';
import UserInfo from './scripts/userInfo.js';
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


const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.control-panel__add-button');

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

const popupWithImage = new PopupWithImage('.popup_type_image-popup');
popupWithImage.setEventListeners();   

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});

function submitFormEditProfile(obj) {
  userInfo.setUserInfo(obj);
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm('.popup_type_profile', submitFormEditProfile);
popupEditProfile.setEventListeners();

function addUserInfo() {
  const allInfo = userInfo.getUserInfo();
  const profileFormElement =  document.querySelector('.content-form_type_profile');
  const nameInput = profileFormElement.querySelector('.content-form__input[name="name-input"]');
  const jobInput = profileFormElement.querySelector('.content-form__input[name="description-input"]');
  nameInput.value = allInfo.name;
  jobInput.value = allInfo.info; 
}

function submitFormAddCard(obj) {
  const item = {};
  item.name = obj["place-name"];
  item.link = obj["link"];
  console.log(item);
  const card = new Card( 
    item, 
    '#card', 
    () => {
            const popupWithImage = new PopupWithImage('.popup_type_image-popup');
            popupWithImage.open(item);                                             
          })
  console.log(card)        
  cardsList.setItem(card.getCard(item));
  popupAddCard.close();
}

const popupAddCard = new PopupWithForm('.popup_type_new-card', submitFormAddCard);
popupAddCard.setEventListeners();

profileEditButton.addEventListener('click', () => {
                                                    addUserInfo();
                                                    popupEditProfile.open();
                                                  });
addCardButton.addEventListener('click', () => {popupAddCard.open()});


