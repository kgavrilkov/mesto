import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._button = this._popupElement.querySelector('.popup__button');
    this._defaultButton = this._button.textContent;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  renderLoading(isLoading) {
    this._button.textContent = isLoading ? 'Сохранение...' : this._defaultButton;
  }
}

export default PopupWithForm;
