const { default: Popup } = require("./popup");

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);  
  }
  
  open(item) {
    const imageItem = this._popup.querySelector('.popup__item');
    imageItem.src =  item.link;
    this._popup.querySelector('.popup__title').textContent = item.name;
    imageItem.alt = item.name;
    document.addEventListener('keydown', this._handleEscClose.bind(this)); 
    this._popup.classList.add('popup_is-opened');
  }
}
