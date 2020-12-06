import {popupImage, image, caption, closeImageButton, handleOpenPopup, handleEscape,
        handleClosePopup, handleClosePopupByClickOnOverlay} from './Constants.js';

class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;

    this._handleOpenPopup = handleOpenPopup;
    this._handleEscape = handleEscape;
    this._handleClosePopup = handleClosePopup;
    this._handleClosePopupByClickOnOverlay = handleClosePopupByClickOnOverlay;
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
      image.src = this._image;
      image.alt = this._title;
      caption.textContent = this._title;
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

}

export default Card;
