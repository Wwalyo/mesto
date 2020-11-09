const { default: Popup } = require("./popup");

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageItem = this._popup.querySelector('.popup__item');
    this._imageName = this._popup.querySelector('.popup__title');   

  }
  
  open(item) {
    this._imageItem.src =  item.link;
    this._imageName.textContent = item.name;
    this._imageItem.alt = item.name;
    super.open();
  }
}
