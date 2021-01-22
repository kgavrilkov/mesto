class Card {
  constructor({data, handleCardClick, handleDeleteClick, handleLikeClick}, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._userId = data.currentUserId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;


    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._updateLikeItem();

    const imageElement = this._element.querySelector('.card__image');
    imageElement.src = this._image;
    imageElement.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__delete')
      .classList.add(this._userId === this._ownerId ? 'card__delete_visible' : 'card__delete_invisible');

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
      this._handleCardClick();
    });
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _updateLikeItem() {
    if (this.isLiked()) {
      this._element.querySelector('.card__like').classList.add('card__like_active');
    } else {
      this._element.querySelector('.card__like').classList.remove('card__like_active');
    }
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
  }

  setLikeItem(data) {
    this._updateLikeItem();
    this._likes = data.likes;
  }

  removeCard() {
    this._element.remove();
  }

  getId() {
    return this._cardId;
  }
}

export default Card;
