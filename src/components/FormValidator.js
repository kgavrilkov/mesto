class FormValidator {
  constructor (config, popupSelector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = document.querySelector(popupSelector);
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  inactivateButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  activateButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', true);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.inactivateButton();
    } else {
      this.activateButton();
    }
  }

  removeErrorComponents() {
    this._inputList;
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputList;
    this._buttonElement = this._element.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

}

export default FormValidator;
