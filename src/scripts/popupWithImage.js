const { default: Popup } = require("./popup");

export default class PopupWithImage extends Popup {
  constructor(item, popupSelector) {
    super(popupSelector);
    this._item = item;  
  }
  open() {
    const imageItem = this.popup.querySelector('.popup__item');
    imageItem.src =  this._item.link;
    this.popup.querySelector('.popup__title').textContent = this._item.name;
    imageItem.alt = this._item.name;
    document.addEventListener('keydown', _handleEscClose()); 
    this._popup.classList.add('popup_is-opened');
  }
}
