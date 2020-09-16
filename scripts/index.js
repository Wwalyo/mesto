console.log(`подключили скрипт`);

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.content-form__save-button');
const profile = document.querySelector('.profile__info');
const popupDescription = popup.querySelector('.content-form__description');
const formElement =  popup.querySelector('.content-form');
const nameInput = formElement.querySelector('.content-form__input[name="name-input"]');
const jobInput = formElement.querySelector('.content-form__input[name="description-input"]');
const currentName = profile.querySelector('.profile__name');
const currentJob = profile.querySelector('.profile__description');
console.log(nameInput);
console.log(jobInput);

const popupOpen = (event) => {
  popup.classList.add('popup_is-opened');
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
};

const popupClose = (event) => {
  popup.classList.remove('popup_is-opened');
};

function formSubmitHandler (event) {
    event.preventDefault();
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', popupOpen, false);
popupCloseButton.addEventListener('click', popupClose, false);