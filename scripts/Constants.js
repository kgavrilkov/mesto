export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupImage = document.querySelector('.popup_type_image');
export const image = document.querySelector('.popup__image');
export const caption = document.querySelector('.popup__caption');
export const closeImageButton = document.querySelector('.popup__close_type_image');

export const defaultConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const ESC_KEYCODE = 27;

export const handleOpenPopup = () => {
  popupImage.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
};

export const handleClosePopup = () => {
  popupImage.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleEscape);
};

export const handleEscape = (evt) => {
  if (evt.which === ESC_KEYCODE) {
    popupImage.classList.remove('popup_opened');
  }
};

export const handleClosePopupByClickOnOverlay = () => {
  if (event.target !== event.currentTarget) {
    return
  }
  popupImage.classList.remove('popup_opened');
};
