import Popup from './Popup.js';

class PopupWithImage extends Popup {
  open({link, name}) {
    const image = this._popupElement.querySelector('.popup__image');
    image.src = link;
    image.alt = name;
    this._popupElement.querySelector('.popup__caption').textContent = name;
    super.open();
  }
}

export default PopupWithImage;
