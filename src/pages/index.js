import Card from '../components/card.js';
import formValidate from '../components/validate.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import Section from '../components/section.js';
import { initialCards, nameInput, jobInput } from '../constants.js'; 

import './index.css';

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.control-panel__add-button');

const validateProfileForm = new formValidate({
  formSelector: '.content-form_type_profile',
  inputSelector: '.content-form__input',
  submitButtonSelector: '.content-form__save-button',
  inactiveButtonClass: 'content-form__save-button_disabled',
  inputErrorClass: 'content-form__input_type_error',
  errorClass: 'content-form__input-error_active'
});

const validateAddCardForm = new formValidate({
  formSelector: '.content-form_type_new-card',
  inputSelector: '.content-form__input',
  submitButtonSelector: '.content-form__save-button',
  inactiveButtonClass: 'content-form__save-button_disabled',
  inputErrorClass: 'content-form__input_type_error',
  errorClass: 'content-form__input-error_active'
});

validateProfileForm.enableValidation();
validateAddCardForm.enableValidation();


const popupWithImage = new PopupWithImage('.popup_type_image-popup');
popupWithImage.setEventListeners(); 

function createCard(item) {
  const card = new Card(item, '#card', () => {popupWithImage.open(item)});
  return card;  
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardItem = createCard(item);
    cardsList.setItem(cardItem.getCard(item));  
  }
},
  '.cards'
);

cardsList.renderItems();

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});

function submitFormEditProfile(inputValues) {
  userInfo.setUserInfo(inputValues);
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm('.popup_type_profile', submitFormEditProfile);
popupEditProfile.setEventListeners();

function addUserInfo() {
  const allInfo = userInfo.getUserInfo();
  nameInput.value = allInfo.name;
  jobInput.value = allInfo.info; 
}

addUserInfo();

function submitFormAddCard(inputValues) {
  const item = {};
  item.name = inputValues["place-name"];
  item.link = inputValues["link"];
  const card = createCard(item);       
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



