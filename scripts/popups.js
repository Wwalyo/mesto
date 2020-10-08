const openPopup = (modalWindow) => {
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeESC);
}

export default openPopup;