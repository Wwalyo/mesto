import openPopup from './popups.js';

const imagePopup = document.querySelector('.image-popup');
const imageItem = imagePopup.querySelector('.image-popup__item');
const showImage = (item) => {
  imageItem.src =  item.link;
  imagePopup.querySelector('.image-popup__title').textContent = item.name;
  imageItem.alt = item.name;
  console.log(imageItem);
  console.log(imagePopup);
  openPopup(imagePopup);
}

export default showImage;