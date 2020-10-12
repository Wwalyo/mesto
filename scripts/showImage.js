import { openPopup } from './popups.js';

const imagePopup = document.querySelector('.popup_type_image-popup');
const imageItem = imagePopup.querySelector('.popup__item');

const showImage = (item) => {
  imageItem.src =  item.link;
  imagePopup.querySelector('.popup__title').textContent = item.name;
  imageItem.alt = item.name;
  openPopup(imagePopup);
}

export default showImage;
