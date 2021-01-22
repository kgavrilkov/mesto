export const defaultConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
export const popupProfileSelector = '.popup_type_edit';
export const popupCardSelector = '.popup_type_add';
export const popupImageSelector = '.popup_type_image';
export const popupAvatarSelector = '.popup_type_avatar';
export const popupSubmitSelector = '.popup_type_remove';
export const cardTemplateSelector = '#card';
export const cardsSelector = '.cards';
export const profileNameSelector = '.profile__title';
export const profileJobSelector = '.profile__subtitle';
export const profileAvatarSelector = '.profile__avatar';
export const editButton = document.querySelector('.button_type_edit');
export const inputName = document.querySelector('.popup__input_type_name');
export const inputJob = document.querySelector('.popup__input_type_job');
export const addButton = document.querySelector('.button_type_add');
export const editAvatarButton = document.querySelector('.profile__avatar');
export const ESC_KEYCODE = 27;
export const apiConfig = {
  address: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-19',
  token: '979f327c-b875-4f2f-925c-fd9cce3cb14f'
};
