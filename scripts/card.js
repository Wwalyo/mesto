export default class Card {
  constructor(item, cardSelector) {
    this._item = item;
    this._cardElement = document.querySelector(cardSelector).content.cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardName = this._cardElement.querySelector('.card__name');
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__trash-button');
    this._imageBtn = this._cardElement.querySelector('.card__image');
    this._setEventListeners();
  }
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
    this._imageBtn.addEventListener('click', () => this._handleImageClick(item));        
  }
  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like-button_active');  
  }
  _handleDeleteClick() {
    this._deleteButton.closest('.card').remove();
  }
  _handleImageClick(item) {
    showImage(item);
  }
  getCard(item) {
    this._cardImage.src = item.link;
    this._cardImage.alt = item.name;
    this._cardName.textContent = item.name;
    return  this._cardElement;   
  }
}