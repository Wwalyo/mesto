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
  editPhotoFormConfig
} from '../utils/constants.js'; 

import './index.css';

let userId = "";

const validateProfileForm = new FormValidate(profileFormConfig);
const validateAddCardForm = new FormValidate(addCardFormConfig);
const validateEditPhotoForm = new FormValidate(editPhotoFormConfig);

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
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
};

const popupDeleteCard = new PopupWithConfirm('.popup_type_delete-card', submitDeleteCard); 
popupDeleteCard.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_image-popup');
popupWithImage.setEventListeners();

function isLiked(arrLikes) {
  return !!arrLikes.find(like => like._id === userId);
};

function handleLikeClick(item) {
  const cardIdSelector = "#id" + item._id;
  const cardElement = document.querySelector(cardIdSelector);
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const arrLikes = item.likes;
  const beLike = isLiked(arrLikes, userId);
  if (!beLike) {
    api.putLike(item._id)
    .then((card) => {
      likeButton.classList.add('card__like-button_active'); 
      likeCounter.textContent = card.likes.length;
      item.likes = card.likes;
    })
    .catch(error => console.log(error)); 
  } else {
    api.deleteLike(item._id)
    .then((card) => {
      likeButton.classList.remove('card__like-button_active'); 
      likeCounter.textContent = card.likes.length;
      item.likes = card.likes; 
    })
    .catch(error => console.log(error)); 
  } 
};

function createCard(item) {
  //сюда передать всю ф-цию handkeDeleteLike и в ней сначала открывать попап и далее
  const card = new Card(item, '#card', () => {popupWithImage.open(item)}, () => {popupDeleteCard.open(item._id)}, handleLikeClick);
  return card;  
};

// const cardsList = new Section({
//   items: initialCards,	
//   renderer: (item) => {	
//     const cardItem = createCard(item);	
//     cardsList.setItem(cardItem.getCard(item));  	
//   }	
// },	
//   '.cards'	
// );

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});

function submitFormEditProfile(inputValues) {
  loadingRate(true, '.content-form_type_profile');
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
    loadingRate(false, '.content-form_type_profile');
  }); 
};

const popupEditProfile = new PopupWithForm('.popup_type_profile', submitFormEditProfile);
popupEditProfile.setEventListeners();

function addUserInfoForPopup() {
  const allInfo = userInfo.getUserInfo();
  nameInput.value = allInfo.name;
  jobInput.value = allInfo.info; 
};

function submitFormAddCard(inputValues) {
  loadingRate(true, '.content-form_type_new-card');
  const item = {};
  item.name = inputValues["place-name"];
  item.link = inputValues["link"];
  api.postNewCard(item)
  .then((res) => {  
    const card = createCard(res);
    cardsList.setItem(card.getCard(res))
    popupAddCard.close()
 })
  .catch(error => console.log(error))
  .finally(() => {
    loadingRate(false, '.content-form_type_new-card');
  });    
};

const popupAddCard = new PopupWithForm('.popup_type_new-card', submitFormAddCard);
popupAddCard.setEventListeners();

function submitFormEditPhoto(inputs) {
  loadingRate(true, '.content-form_type_edit-photo');
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
    loadingRate(false, '.content-form_type_edit-photo');
  }); 
  
};

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
  initialCards.forEach(item => {
    
    const cardItem = createCard(item);
    const card = cardItem.getCard(item);
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__trash-button');
    if (isLiked(item.likes)) {
      likeButton.classList.add('card__like-button_active');
    }
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
