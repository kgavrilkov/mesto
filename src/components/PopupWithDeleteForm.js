import PopupWithForm from './PopupWithForm.js';

class PopupWithDeleteForm extends PopupWithForm {
  setSubmit(action) {
    this._handleFormSubmit = action;
  }
}

export default PopupWithDeleteForm;
