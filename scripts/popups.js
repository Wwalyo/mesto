
const cardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_profile');
const imagePopup = document.querySelector('.image-popup');


const openPopup = (modalWindow) => {
  if (modalWindow.classList.contains('popup_type_new-card')) {
    const formItem = modalWindow.querySelector('.content-form_type_new-card');
    const submitbutton = formItem.querySelector('.content-form__save-button');
    submitbutton.classList.add('content-form__save-button_disabled');
    submitbutton.disabled = 'true';
  }
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeESC);
}

const closeESC = (evt) => {
  if (evt.keyCode === 27) {
    closePopup(cardPopup);
    closePopup(imagePopup);
    closePopup(profilePopup);
  }
}

const closePopup = (modalWindow) => {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeESC);
};
  
export { openPopup, closeESC, closePopup };
