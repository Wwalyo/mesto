import Card from '../components/card.js';
import FormValidate from '../components/validate.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithConfirm from '../components/popupWithConfirm.js';
import UserInfo from '../components/userInfo.js';
import Section from '../components/section.js';
import Api from '../components/api.js';
import { loadingRate } from '../utils/utils.js';
import {  
  nameInput, 
  jobInput, 
  userName, 
  userAbout, 
  userAvatar, 
  profileEditButton, 
  addCardButton, 
  editPhotoButton,
  profileFormConfig,
  addCardFormConfig,
  editPhotoFormConfig,
  cardTemplateSelector
} from '../utils/constants.js'; 

import './index.css';

let userId = "";
let cardsList = [];

const popupDeleteCardSelector = '.popup_type_delete-card';
const popupWithImageSelector = '.popup_type_image-popup';
const popupProfileSelector = '.popup_type_profile';
const popupEditPhotoSelector = '.popup_type_edit-photo';
const popupNewCardSelector ='.popup_type_new-card';
const profileFormSelector = '.content-form_type_profile';
const newCardFormSelector = '.content-form_type_new-card';
const editPhotoFormSelector = '.content-form_type_edit-photo';
const nameSelector = '.profile__name';
const infoSelector = '.profile__description';
const photoSelector = '.profile__photo';
const likeButtonSelector = '.card__like-button';
const likeCounterSelector = '.card__like-counter';
const likeButtonActiveSelector = 'card__like-button_active';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '5ed2afeb-ad65-4caf-aa08-0c033c043ac1',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({ nameSelector, infoSelector, photoSelector });

api.getUserInfo()
.then((userInfoFromServer) => {
  userInfo.setUserInfo(userInfoFromServer); 
  userId = userInfoFromServer._id;
}) 
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
});

const validateProfileForm = new FormValidate(profileFormConfig);
const validateAddCardForm = new FormValidate(addCardFormConfig);
const validateEditPhotoForm = new FormValidate(editPhotoFormConfig);

function submitDeleteCard(item) {
  api.deleteCard(item.id)
  .then(() => {
    const cardElement = document.querySelector(`#id${item.id}`);
    cardElement.remove();
    popupDeleteCard.close();
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
};

const popupDeleteCard = new PopupWithConfirm(popupDeleteCardSelector, submitDeleteCard); 
popupDeleteCard.setEventListeners();

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

function isLiked(arrLikes) {
  return !!arrLikes.find(like => like._id === userId);
};

function handleLikeClick(item) {
  const cardIdSelector = "#id" + item._id;
  const cardElement = document.querySelector(cardIdSelector);
  const likeButton = cardElement.querySelector(likeButtonSelector);
  const likeCounter = cardElement.querySelector(likeCounterSelector);
  const arrLikes = item.likes;
  const beLike = isLiked(arrLikes, userId);
  if (!beLike) {
    api.putLike(item._id)
    .then((card) => {
      likeButton.classList.add(likeButtonActiveSelector); 
      likeCounter.textContent = card.likes.length;
      item.likes = card.likes;
    })
    .catch(error => console.log(error)); 
  } else {
    api.deleteLike(item._id)
    .then((card) => {
      likeButton.classList.remove(likeButtonActiveSelector); 
      likeCounter.textContent = card.likes.length;
      item.likes = card.likes; 
    })
    .catch(error => console.log(error)); 
  } 
};



function createCard(item) {
  const card = new Card(item, cardTemplateSelector, userId, () => {popupWithImage.open(item)}, () => {popupDeleteCard.open(item._id)}, handleLikeClick);
  return card;  
};

Promise.all([
  api.getUserInfo(), 
  api.getInitialCards()
])
.then(([userInfoFromServer, initialCards]) => {
  userInfo.setUserInfo(userInfoFromServer); 
  userId = userInfoFromServer._id;
  cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardItem = createCard(item);	
      cardsList.setItem(cardItem.getCard(item));  	
    }	
  },	
    '.cards'	
  )
  cardsList.renderItems(initialCards);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
});


function submitFormEditProfile(inputValues) {
  loadingRate(true, profileFormSelector);
  const currentUserInfo = {};
  currentUserInfo.currentName = inputValues["name-input"];
  currentUserInfo.currentInfo = inputValues["description-input"];
  api.editUserInfo(currentUserInfo)
  .then(() => api.getUserInfo())
  .then((userInfo) => {   
    userName.textContent = userInfo.name;
    userAbout.textContent = userInfo.about;
    userAvatar.src = userInfo.avatar;
    popupEditProfile.close();
  })
  .catch(error => console.log(error))
  .finally(() => {
    loadingRate(false, profileFormSelector);
  }); 
};

const popupEditProfile = new PopupWithForm(popupProfileSelector, submitFormEditProfile);
popupEditProfile.setEventListeners();

function addUserInfoForPopup() {
  const allInfo = userInfo.getUserInfo();
  nameInput.value = allInfo.name;
  jobInput.value = allInfo.info; 
};

function submitFormAddCard(inputValues) {
  loadingRate(true, newCardFormSelector);
  const item = {};
  item.name = inputValues["place-name"];
  item.link = inputValues["link"];
  api.postNewCard(item)
  .then((res) => {  
    const card = createCard(res);
    cardsList.setItem(card.getCard(res));
    popupAddCard.close();
    popupAddCard.reset();
 })
  .catch(error => console.log(error))
  .finally(() => {
    loadingRate(false, newCardFormSelector);
  });    
};

const popupAddCard = new PopupWithForm(popupNewCardSelector, submitFormAddCard);
popupAddCard.setEventListeners();

function submitFormEditPhoto(inputs) {
  loadingRate(true, editPhotoFormSelector);
  const currentUserInfo = {};
  currentUserInfo.currentPhoto = inputs["photo"];
  api.editUserPhoto(currentUserInfo)
  .then(() => api.getUserInfo())
  .then((userInfo) => {   
    userAvatar.src = userInfo.avatar;
    popupEditPhoto.close();
  })
  .catch(error => console.log(error))
  .finally(() => {
    loadingRate(false, editPhotoFormSelector);
  }); 
  
};

const popupEditPhoto = new PopupWithForm(popupEditPhotoSelector, submitFormEditPhoto);
popupEditPhoto.setEventListeners();

 



profileEditButton.addEventListener('click', () => {
  addUserInfoForPopup();
  validateProfileForm.enableValidation();
  popupEditProfile.open();
});
addCardButton.addEventListener('click', () => {
  validateAddCardForm.enableValidation();
  popupAddCard.open();

});
editPhotoButton.addEventListener('click', () => {
  popupEditPhoto.open()
  validateEditPhotoForm.enableValidation();
});
