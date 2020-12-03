import {initialCards, popupImage, image, caption, closeImageButton} from './Constants.js';

class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector('.card__image');
    imageElement.src = this._image;
    imageElement.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    closeImageButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
    popupImage.addEventListener('mousedown', () => {
      this._handleClosePopupByClickOnOverlay();
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteClick() {
    this._element.querySelector('.card__delete').closest('.card').remove();
  }

  _handleOpenPopup() {
    popupImage.classList.add('popup_opened');
    image.src = this._image;
    caption.textContent = this._title;
    document.addEventListener('keydown', this._handleEscape);
  }

  _handleClosePopup() {
    popupImage.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscape);
  }

  _handleEscape(evt) {
    if (evt.key === 'Escape') {
      popupImage.classList.remove('popup_opened');
    }
  }

  _handleClosePopupByClickOnOverlay() {
    if (event.target !== event.currentTarget) {
      return
    }
    popupImage.classList.remove('popup_opened');
  }

}

initialCards.forEach((item) => {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();
  document.querySelector('.cards').append(cardElement);
});

export default Card;
