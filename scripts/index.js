const popup = document.querySelector('.popup');
const cardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_profile');
const imagePopup = document.querySelector('.image-popup');
const imageItem = imagePopup.querySelector('.image-popup__item');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.control-panel__add-button');
const popupProfileCloseButton = popup.querySelector('.popup__close-button');
const popupCardCloseButton = cardPopup.querySelector('.popup__close-button');
const popupImageCloseButton = imagePopup.querySelector('.popup__close-button');
const profile = document.querySelector('.profile__info');
const saveBtn = popup.querySelector('.content-form__save-button');
const profileFormElement =  popup.querySelector('.content-form_type_profile');
const cardFormElement =  cardPopup.querySelector('.content-form_type_new-card');
const nameInput = profileFormElement.querySelector('.content-form__input[name="name-input"]');
const jobInput = profileFormElement.querySelector('.content-form__input[name="description-input"]');
const titleInput = cardFormElement.querySelector('.content-form__input[name="place-name"]');
const linkInput = cardFormElement.querySelector('.content-form__input[name="link"]');
const currentName = profile.querySelector('.profile__name');
const currentJob = profile.querySelector('.profile__description');
const cardTemplate = document.querySelector('#card').content;
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

const closePopup = (modalWindow) => {
  modalWindow.classList.remove('popup_is-opened');
};

const getCardElement = (item) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector('.card__name').textContent = item.name;
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__trash-button');
  const imageBtn = cardElement.querySelector('.card__image');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  deleteButton.addEventListener('click', function () {
    deleteButton.closest('.card').remove();
  });
  imageBtn.addEventListener('click', function () {
    showImage(item);
  });
  return cardElement;
}

const addCard = (item) => {
  cardsContainer.prepend(getCardElement(item));
}

const addCards = (items) => {
  items.forEach(addCard);
}

addCards(initialCards);

const openPopup = (modalWindow) => {
  modalWindow.classList.add('popup_is-opened');
}

const setupEditProfile = () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  openPopup(popup);
}

const setupAddCard = () => {
  openPopup(cardPopup);
}


const showImage = (item) => {
  imageItem.src =  item.link;
  imagePopup.querySelector('.image-popup__title').textContent = item.name;
  imageItem.alt = item.name;
  openPopup(imagePopup);
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
    closePopup(cardPopup);  
  }
}

const closeESC = (evt) => {
  if (evt.keyCode === 27) {
   closePopup(cardPopup);
   closePopup(imagePopup);
   closePopup(profilePopup);
  }
}

const closeByOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return
  }
  closePopup(evt.currentTarget);
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  const save = formElement.querySelector('.content-form__save-button');
  inputElement.classList.add('content-form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('content-form__input-error_active');
  save.classList.add('content-form__save-button_disabled');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  const save = formElement.querySelector('.content-form__save-button');
  inputElement.classList.remove('content-form__input_type_error');
  errorElement.classList.remove('content-form__input-error_active');
  errorElement.textContent = '';
  save.saveBtn.classList.remove('content-form__save-button_disabled');
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.content-form__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup'));
  console.log(formList);
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
});
}

enableValidation();




profileFormElement.addEventListener('submit', formSubmitHandler);
cardFormElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', setupEditProfile);
addCardButton.addEventListener('click', setupAddCard);
popupProfileCloseButton.addEventListener('click', () => closePopup(profilePopup));
popupCardCloseButton.addEventListener('click', () => closePopup(cardPopup));
popupImageCloseButton.addEventListener('click', () => closePopup(imagePopup));
profilePopup.addEventListener('click', closeByOverlay);
cardPopup.addEventListener('click', closeByOverlay);
imagePopup.addEventListener('click', closeByOverlay);
document.addEventListener('keydown', closeESC);

