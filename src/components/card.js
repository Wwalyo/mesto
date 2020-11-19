
export default class Card {
  constructor(item, cardSelector, userId, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._item = item;
    this._userId = userId;
    this._cardElement = document.querySelector(cardSelector).content.cloneNode(true);
    this._handleImageClick = handleImageClick.bind(this);
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._item));
    this._deleteButton.addEventListener('click', () => {  this._handleDeleteClick(this._item)});
    this._cardImage.addEventListener('click', () => this._handleImageClick());        
  }

  getCard(item) {
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardName = this._cardElement.querySelector('.card__name');
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');
    this._deleteButton = this._cardElement.querySelector('.card__trash-button');
    this._cardElement.firstElementChild.id = "id" + item._id;
    this._cardOwnerId = item.owner._id;
    this._cardImage.src = item.link;
    this._cardImage.alt = item.name;
    this._cardName.textContent = item.name;
    this._likeCounter.textContent = item.likes.length;
    if (!!item.likes.find(like => like._id === this._userId)) {
      this._likeButton.classList.add('card__like-button_active');
    }
    if (this._cardOwnerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }
    this._setEventListeners();
    return  this._cardElement;   
  }
}
