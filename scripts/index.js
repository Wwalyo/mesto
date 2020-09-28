const popup = document.querySelector('.popup');
const imagePopup = document.querySelector('.image-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.control-panel__add-button');
const popupTitle = popup.querySelector('.content-form__title');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.content-form__save-button');
const profile = document.querySelector('.profile__info');
const popupDescription = popup.querySelector('.content-form__description');
const formElement =  popup.querySelector('.content-form');
const nameInput = formElement.querySelector('.content-form__input[name="name-input"]');
const jobInput = formElement.querySelector('.content-form__input[name="description-input"]');
const currentName = profile.querySelector('.profile__name');
const currentJob = profile.querySelector('.profile__description');
const cardTemplate = document.querySelector('#card').content;
const popupTemplate = document.querySelector('#popup').content;
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

const popupClose = (event) => {
  popup.classList.remove('popup_is-opened');
  imagePopup.classList.remove('image-popup_is-opened');
};

const addCard = (item) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__name').textContent = item.name;
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__trash-button');
  const imageBtn = cardElement.querySelector('.card__image');
  const imageCloseBtn = imagePopup.querySelector('.popup__close-button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  deleteButton.addEventListener('click', function () {
  const item = deleteButton.closest('.card');
  item.remove();
  });
  imageBtn.addEventListener('click', function (evt) {
    imagePopup.classList.add('image-popup_is-opened');
    imagePopup.querySelector('.image-popup__item').src =  item.link;
    imagePopup.querySelector('.image-popup__title').textContent = item.name;
  });
  imageCloseBtn.addEventListener('click', popupClose, false);
  cardsContainer.prepend(cardElement);
}

const addCards = (items) => {
  items.forEach(addCard);
}

addCards(initialCards);

const popupOpen = (event) => {
  if (event.target === profileEditButton) {
    popup.classList.add('popup_is-opened');
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
    popupTitle.textContent = 'Редактировать профиль';
    popupSaveButton.textContent = 'Сохранить';
  } else if (event.target === addCardButton) {
    popup.classList.add('popup_is-opened');
    nameInput.value = '';
    jobInput.type = 'url';
    jobInput.value = '';
    popupTitle.textContent = 'Новое место';
    popupSaveButton.textContent = 'Создать';
  }
};




const formSubmitHandler = (event) => {
    event.preventDefault();
    if (popupTitle.textContent === 'Редактировать профиль') {
      currentName.textContent = nameInput.value;
      currentJob.textContent = jobInput.value;
      popupClose();  
    } else {
      const card = {};
      card.name = nameInput.value;
      card.link = jobInput.value;
      console.log(card.link);
      addCard(card);
      popupClose();  
    }
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', popupOpen, false);
popupCloseButton.addEventListener('click', popupClose, false);
addCardButton.addEventListener('click', popupOpen, false);

