
const cardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_profile');
const imagePopup = document.querySelector('.image-popup');







const openPopup = (modalWindow) => {
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
