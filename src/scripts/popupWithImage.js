const { default: Popup } = require("./popup");

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);  
  }
  open(item) {
    const imageItem = this.popup.querySelector('.popup__item');
    imageItem.src =  item.link;
    this.popup.querySelector('.popup__title').textContent = item.name;
    imageItem.alt = item.name;
    document.addEventListener('keydown', _handleEscClose()); 
    this._popup.classList.add('popup_is-opened');
  }
}
