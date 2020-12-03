import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {defaultConfig} from './Constants.js';

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_add');
const closeProfileButton = document.querySelector('.popup__close_type_edit');
const closeCardButton = document.querySelector('.popup__close_type_add');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupAddForm = document.querySelector('.popup__form_type_add');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const popupEditButton = document.querySelector('.popup__button_type_edit');
const popupAddButton = document.querySelector('.popup__button_type_add');
const cards = document.querySelector('.cards');

const editFormValidator = new FormValidator(defaultConfig, 'popup_type_edit');
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(defaultConfig, 'popup_type_add');
addFormValidator.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function closePopupByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function fillEditFormInputs() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function activatePopupEditButton() {
  popupEditButton.classList.remove('popup__button_disabled');
  popupEditButton.removeAttribute('disabled', true);
}

function clearAddFormInputs() {
  inputPlace.value = '';
  inputLink.value = '';
}

function inactivatePopupAddButton() {
  popupAddButton.classList.add('popup__button_disabled');
  popupAddButton.setAttribute('disabled', true);
}

function removeErrorComponents() {
  const inputList = Array.from(document.querySelectorAll(defaultConfig.inputSelector));
  inputList.forEach((inputElement) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(defaultConfig.inputErrorClass);
    errorElement.classList.remove(defaultConfig.errorClass);
    errorElement.textContent = '';
  });
};

function createCard(item) {
  const card = new Card(item, '#card');
  return card.generateCard();
}

function renderCard(cards, cardsElement) {
  cards.prepend(cardsElement);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardTitle = inputPlace.value;
  const cardImage = inputLink.value;
  const item = {
    name: cardTitle,
    link: cardImage,
  };
  const cardsElement = createCard(item);
  renderCard(cards, cardsElement);
  closePopup(popupCard);
}

editButton.addEventListener('click', function () {
  fillEditFormInputs();
  activatePopupEditButton();
  removeErrorComponents();
  openPopup(popupProfile);
});
addButton.addEventListener('click', function () {
  clearAddFormInputs();
  inactivatePopupAddButton();
  removeErrorComponents();
  openPopup(popupCard);
});
closeProfileButton.addEventListener('click', () => closePopup(popupProfile));
closeCardButton.addEventListener('click', () => closePopup(popupCard));
popupProfile.addEventListener('mousedown', closePopupByClickOnOverlay);
popupCard.addEventListener('mousedown', closePopupByClickOnOverlay);
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
