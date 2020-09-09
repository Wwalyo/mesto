console.log(`подключили скрипт`);

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.edit-button');
const popupCloseButton = popup.querySelector('.close-popup-button');
const popupSaveButton = popup.querySelector('.content-form__save-button');
const profile = document.querySelector('.profile-info');
const popupDescription = popup.querySelector('.content-form__description');

const popupOpen = (event) => {
  popup.classList.add('popup_is-opened');
};

const popupClose = (event) => {
  popup.classList.remove('popup_is-opened');
};


popupOpenButton.addEventListener('click', popupOpen, false);
popupCloseButton.addEventListener('click', popupClose, false);


let formElement =  popup.querySelector('.content-form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = formElement.querySelector('.content-form__name')
    let jobInput = formElement.querySelector('.content-form__description');
    let name = nameInput.value;
    let job = jobInput.value;
    let currentName = profile.querySelector('.profile-info__name');
    let currentJob = profile.querySelector('.profile-info__description');
    currentName.textContent = name;
    currentJob.textContent= job;
    popup.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', popupClose);