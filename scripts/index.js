let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__item_type_name');
let inputJob = document.querySelector('.popup__item_type_job');
let popupSaveButton = document.querySelector('.button_type_save');
let popupOpenButton = document.querySelector('.button_type_edit');
let popupCloseButton = document.querySelector('.button_type_close');

function popupToggle() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
  } else {
    inputName.value = '';
    inputJob.value = '';
  }
}

function popupCloseByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  popupToggle();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupToggle();
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupCloseByClickOnOverlay);
popupForm.addEventListener('submit', formSubmitHandler);
