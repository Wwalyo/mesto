import Card from '../components/card.js';
import formValidate from '../components/validate.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithConfirm from '../components/popupWithConfirm.js';
import UserInfo from '../components/userInfo.js';
import Section from '../components/section.js';
import Api from '../components/api.js';
import {  nameInput, 
          jobInput, 
          userName, 
          userAbout, 
          userAvatar, 
          profileEditButton, 
          addCardButton, 
          editPhotoButton 
} from '../constants.js'; 

import './index.css';
import { Promise } from 'core-js';

let userId = "";

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

const validateEditPhotoForm = new formValidate({
  formSelector: '.content-form_type_edit-photo',
  inputSelector: '.content-form__input',
  submitButtonSelector: '.content-form__save-button',
  inactiveButtonClass: 'content-form__save-button_disabled',
  inputErrorClass: 'content-form__input_type_error',
  errorClass: 'content-form__input-error_active'
})



validateProfileForm.enableValidation();
validateAddCardForm.enableValidation();
validateEditPhotoForm.enableValidation();

function submitDeleteCard(item) {
  api.deleteCard(item.id)
  .then(() => {
    const cardElement = document.querySelector('.card');
    cardElement.remove();
    popupDeleteCard.close();
  })
}

const popupDeleteCard = new PopupWithConfirm('.popup_type_delete-card', submitDeleteCard); 
popupDeleteCard.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_image-popup');
popupWithImage.setEventListeners();



function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

function handleLikeClick(item) {
  api.putLike(item._id)
  .then((arrLike) => { 
                        arrLike.find()
  });
}

// arr.find( // находим первый элемент, который соответствуют условию заданному в передаваемой функции
//   function( currentValue ) {
//     return this.checkNumber( currentValue ); //  возвращаемое значение метода checkNumber объекта myObject
//   }

function createCard(item) {
  const card = new Card(item, '#card', () => {popupWithImage.open(item)}, () => {popupDeleteCard.open(item._id)}, handleLikeClick);
  return card;  
}

const cardsList = new Section('.cards');

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});

function submitFormEditProfile(inputValues) {
  const currentUserInfo = {};
  currentUserInfo.currentName = inputValues["name-input"];
  currentUserInfo.currentInfo = inputValues["description-input"];
  api.editUserInfo(currentUserInfo)
  .then(() => api.getUserInfo())
  .then((userInfo) => {   
                userName.textContent = userInfo.name;
                userAbout.textContent = userInfo.about;
                userAvatar.src = userInfo.avatar;
  })
  .catch(error => console.log(error));
  popupEditProfile.close();
}


const popupEditProfile = new PopupWithForm('.popup_type_profile', submitFormEditProfile);
popupEditProfile.setEventListeners();

function addUserInfoForPopup() {
  const allInfo = userInfo.getUserInfo();
  nameInput.value = allInfo.name;
  jobInput.value = allInfo.info; 
}

addUserInfoForPopup();

function submitFormAddCard(inputValues) {
  const item = {};
  item.name = inputValues["place-name"];
  item.link = inputValues["link"];
  api.postNewCard(item)
  .then((res) => {  
                    const card = createCard(res);
                    cardsList.setItem(card.getCard(res))
                  })
  .catch(error => console.log(error));       
  popupAddCard.close();
}

const popupAddCard = new PopupWithForm('.popup_type_new-card', submitFormAddCard);
popupAddCard.setEventListeners();

function submitFormEditPhoto(inputs) {
  
  const currentUserInfo = {};
  currentUserInfo.currentPhoto = inputs["photo-input"];
  api.editUserPhoto(currentUserInfo)
  .then(() => api.getUserInfo())
  .then((userInfo) => {   
                userAvatar.src = userInfo.avatar;
  })
  .catch(error => console.log(error));
  popupEditPhoto.close();
}

const popupEditPhoto = new PopupWithForm('.popup_type_edit-photo', submitFormEditPhoto);
popupEditPhoto.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '5ed2afeb-ad65-4caf-aa08-0c033c043ac1',
    'Content-Type': 'application/json'
  }
}); 

Promise.all([
  api.getUserInfo(), 
  api.getInitialCards()
])
.then(([userInfo, initialCards]) => {
  userName.textContent = userInfo.name;
  userAbout.textContent = userInfo.about;
  userAvatar.src = userInfo.avatar;
  userId = userInfo._id;
  console.log(userId);
  initialCards.forEach(item => {
    const cardItem = createCard(item);
    const card = cardItem.getCard(item);
    const deleteButton = card.querySelector('.card__trash-button');
    if (cardItem._cardOwnerId !== userInfo._id) {
      deleteButton.style.display = "none";
    }
    cardsList.setItem(card);
  })    
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 



profileEditButton.addEventListener('click', () => {
                                                    addUserInfoForPopup();
                                                    popupEditProfile.open();
                                                  });
addCardButton.addEventListener('click', () => {                                                
                                                popupAddCard.open()
                                              });
editPhotoButton.addEventListener('click', () => {                                                  
                                                  popupEditPhoto.open()
                                                });


