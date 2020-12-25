import './pages/index.css';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import {defaultConfig, popupProfileSelector, popupCardSelector, popupImageSelector,
cardTemplateSelector, initialCards, cardsSelector, profileNameSelector, profileJobSelector,
popupEditButton, popupAddButton, editButton, inputName, inputJob, addButton} from './utils/Constants.js';

const editFormValidator = new FormValidator(defaultConfig, popupProfileSelector);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(defaultConfig, popupCardSelector);
addFormValidator.enableValidation();

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const createCard = (cardData) => {
  const card = new Card({
    data: {...cardData},
    handleCardClick: () => {
      imagePopup.open(cardData);
    }
  }, cardTemplateSelector);
  return card.generateCard();
};

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    cardList.setItem(createCard(data));
  }
}, cardsSelector);
cardList.renderItems();

const cardPopup = new PopupWithForm({
  popupSelector: popupCardSelector,
  handleFormSubmit: (cardData) => {
    cardList.addItem(createCard(cardData));
    cardPopup.close();
  }
});
cardPopup.setEventListeners();

const userData = new UserInfo ({
  userNameSelector: profileNameSelector,
  userInfoSelector: profileJobSelector
});

const profilePopup = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (data) => {
    userData.setUserInfo({
      userName: data.name,
      userInfo: data.job
    });
    profilePopup.close();
  }
});
profilePopup.setEventListeners();

const activatePopupEditButton = () => {
  popupEditButton.classList.remove(defaultConfig.inactiveButtonClass);
  popupEditButton.removeAttribute('disabled', true);
};

const inactivatePopupAddButton = () => {
  popupAddButton.classList.add(defaultConfig.inactiveButtonClass);
  popupAddButton.setAttribute('disabled', true);
};

const removeErrorComponents = () => {
  const inputList = Array.from(document.querySelectorAll(defaultConfig.inputSelector));
  inputList.forEach((inputElement) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(defaultConfig.inputErrorClass);
    errorElement.classList.remove(defaultConfig.errorClass);
    errorElement.textContent = '';
  });
};

editButton.addEventListener('click', () => {
  activatePopupEditButton();
  removeErrorComponents();
  const currentUserData = userData.getUserInfo();
  inputName.value = currentUserData.userName;
  inputJob.value = currentUserData.userInfo;
  profilePopup.open();
});

addButton.addEventListener('click', () => {
  inactivatePopupAddButton();
  removeErrorComponents();
  cardPopup.open();
});