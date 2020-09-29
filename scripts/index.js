const popup = document.querySelector('.popup');
const imagePopup = document.querySelector('.image-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.control-panel__add-button');
const popupTitle = popup.querySelector('.content-form__title');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.content-form__save-button');
const profile = document.querySelector('.profile__info');
const formElement =  popup.querySelector('.content-form');
const nameInput = formElement.querySelector('.content-form__input[name="name-input"]');
const jobInput = formElement.querySelector('.content-form__input[name="description-input"]');
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

const closePopup = (event) => {
  popup.classList.remove('popup_is-opened');
  imagePopup.classList.remove('image-popup_is-opened');
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
  const imageCloseBtn = imagePopup.querySelector('.popup__close-button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  deleteButton.addEventListener('click', function () {
    deleteButton.closest('.card').remove();
  });
  imageBtn.addEventListener('click', function (evt) {
    showImage(item.link, item.name);
  });
  imageCloseBtn.addEventListener('click', closePopup, false);
  return cardElement;
}

const addCard = (item) => {
  cardsContainer.prepend(getCardElement(item));
}

const addCards = (items) => {
  items.forEach(addCard);
}

addCards(initialCards);

const setupEditProfile = (event) => {
  nameInput.placeholder = currentName.textContent;
  jobInput.type = 'text';
  jobInput.placeholder = currentJob.textContent;
  popupTitle.textContent = 'Редактировать профиль';
  popupSaveButton.textContent = 'Сохранить';
}

const setupAddCard = (event) => {
  nameInput.style.color = '#C4C4C4';
  jobInput.style.color = '#C4C4C4';
  nameInput.placeholder = 'Название';
  jobInput.type = 'url';
  jobInput.placeholder = 'Ссылка на картинку';
  popupTitle.textContent = 'Новое место';
  popupSaveButton.textContent = 'Создать';
}

const openPopup = (event) => {
  if (event.target === profileEditButton) {
    popup.classList.add('popup_is-opened');
    setupEditProfile(event);

  } else if (event.target === addCardButton) {
    popup.classList.add('popup_is-opened');
    setupAddCard(event);
  }
};

const showImage = (link, name) => {
  imagePopup.querySelector('.image-popup__item').src =  link;
  imagePopup.querySelector('.image-popup__title').textContent = name;
  imagePopup.querySelector('.image-popup__title').alt = name;
  imagePopup.classList.add('image-popup_is-opened'); 
}

const formSubmitHandler = (event) => {
  event.preventDefault();
  if (popupTitle.textContent === 'Редактировать профиль') {
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value;
    closePopup();  
  } else {
    const card = {};
    card.name = nameInput.value;
    card.link = jobInput.value;
    addCard(card);
    closePopup();  
  }
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
addCardButton.addEventListener('click', openPopup);

