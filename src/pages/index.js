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
});

validateProfileForm.enableValidation();
validateAddCardForm.enableValidation();
validateEditPhotoForm.enableValidation();

function submitDeleteCard(item) {
  api.deleteCard(item.id)
  .then(() => {
    const cardElement = document.querySelector('.card');
    cardElement.remove();
    popupDeleteCard.close();
  });
};

const popupDeleteCard = new PopupWithConfirm('.popup_type_delete-card', submitDeleteCard); 
popupDeleteCard.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_image-popup');
popupWithImage.setEventListeners();

function loadingRate(isLoading, formSelector) {
  const form = document.querySelector(formSelector);
  const submitButton = form.querySelector('.content-form__save-button');
  if (isLoading) {
    submitButton.value = "Сохранение..."
  } else {
    submitButton.value = "Сохранить" 
  }
};

function isLiked(arrLikes) {
  return !!arrLikes.find(like => like._id === userId);
};

function handleLikeClick(item) {
  const cardIdSelector = "#id" + item._id;
  const cardElement = document.querySelector(cardIdSelector);
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const arrThis = item.likes;
  const beLike = isLiked(arrThis, userId);
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
  const card = new Card(item, '#card', () => {popupWithImage.open(item)}, () => {popupDeleteCard.open(item._id)}, handleLikeClick);
  return card;  
};

const cardsList = new Section('.cards');

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
                      })
  .catch(error => console.log(error))
  .finally(() => {
    loadingRate(false, '.content-form_type_profile');
  }); 
  popupEditProfile.close();  
};

const popupEditProfile = new PopupWithForm('.popup_type_profile', submitFormEditProfile);
popupEditProfile.setEventListeners();

function addUserInfoForPopup() {
  const allInfo = userInfo.getUserInfo();
  nameInput.value = allInfo.name;
  jobInput.value = allInfo.info; 
};

addUserInfoForPopup();

function submitFormAddCard(inputValues) {
  loadingRate(true, '.content-form_type_new-card');
  const item = {};
  item.name = inputValues["place-name"];
  item.link = inputValues["link"];
  api.postNewCard(item)
  .then((res) => {  
                    const card = createCard(res);
                    cardsList.setItem(card.getCard(res))
                  })
  .catch(error => console.log(error))
  .finally(() => {
    loadingRate(false, '.content-form_type_new-card');
  });
  popupAddCard.close();       
};

const popupAddCard = new PopupWithForm('.popup_type_new-card', submitFormAddCard);
popupAddCard.setEventListeners();

function submitFormEditPhoto(inputs) {
  loadingRate(true, '.content-form_type_edit-photo');
  const currentUserInfo = {};
  currentUserInfo.currentPhoto = inputs["photo-input"];
  api.editUserPhoto(currentUserInfo)
  .then(() => api.getUserInfo())
  .then((userInfo) => {   
                userAvatar.src = userInfo.avatar;
  })
  .catch(error => console.log(error))
  .finally(() => {
    loadingRate(false, '.content-form_type_edit-photo');
  }); 
  popupEditPhoto.close();
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
