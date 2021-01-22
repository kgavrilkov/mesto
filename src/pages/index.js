import './index.css';
import Api from '../components/Api.js';
import PopupWithDeleteForm from '../components/PopupWithDeleteForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {defaultConfig, popupProfileSelector, popupCardSelector, popupImageSelector,
popupAvatarSelector, popupSubmitSelector, cardTemplateSelector, cardsSelector,
profileNameSelector, profileJobSelector, profileAvatarSelector, editButton, inputName,
inputJob, addButton, editAvatarButton, apiConfig} from '../utils/Constants.js';

let userId = null;

const api = new Api(apiConfig);

const editFormValidator = new FormValidator(defaultConfig, popupProfileSelector);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(defaultConfig, popupCardSelector);
addFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(defaultConfig, popupAvatarSelector);
editAvatarFormValidator.enableValidation();

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const createCard = (cardData) => {
  const card = new Card({
    data: {...cardData, currentUserId: userId},
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleDeleteClick: () => {
      submitPopup.setSubmit(() => {
        api.removeCard(card.getId())
          .then(() => {
            card.removeCard();
            submitPopup.close();
          })
          .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      });
      submitPopup.open();
    },
    handleLikeClick: () => {
      api.changeLikeStatus(card.getId(), !card.isLiked())
        .then(data => {
          card.setLikeItem({...data});
        })
        .catch(err => console.log(`Ошибка в статусе лайка: ${err}`))
    }
  }, cardTemplateSelector);
  return card.generateCard();
};

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data));
  }
}, cardsSelector);

const cardPopup = new PopupWithForm({
  popupSelector: popupCardSelector,
  handleFormSubmit: (data) => {
    cardPopup.renderLoading(true);
    api.addCard(data)
      .then((cardData) => {
        cardList.addItem(createCard(cardData));
        cardPopup.close();
      })
      .catch(err => console.log(`Ошибка добавления карточки: ${err}`))
      .finally(() => cardPopup.renderLoading(false));
  }
});
cardPopup.setEventListeners();

const userInformation = new UserInfo ({
  userNameSelector: profileNameSelector,
  userInfoSelector: profileJobSelector,
  userAvatarSelector: profileAvatarSelector
});

const profilePopup = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true);
    api.setUserInfo({
      name: data.name,
      about: data.about
    })
      .then((info) => {
        userInformation.setUserInfo({
          userName: info.name,
          userInfo: info.about
        })
        profilePopup.close();
      })
      .catch(err => console.log(`Ошибка в информации о пользователе: ${err}`))
      .finally(() => profilePopup.renderLoading(false));
  }
});
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.setUserAvatar({
      avatar: data.avatar
    })
      .then((info) => {
        userInformation.setUserInfo({
          userAvatar: info.avatar
        });
        avatarPopup.close();
      })
      .catch(err => console.log(`Ошибка при замене аватара пользователя: ${err}`))
      .finally(() => avatarPopup.renderLoading(false));
  }
});
avatarPopup.setEventListeners();

const submitPopup = new PopupWithDeleteForm({
  popupSelector: popupSubmitSelector,
  handleFormSubmit: () => {}
});
submitPopup.setEventListeners();

editButton.addEventListener('click', () => {
  editFormValidator.activateButton();
  editFormValidator.removeErrorComponents();
  const currentUserData = userInformation.getUserInfo();
  inputName.value = currentUserData.userName;
  inputJob.value = currentUserData.userInfo;
  profilePopup.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.inactivateButton();
  addFormValidator.removeErrorComponents();
  cardPopup.open();
});

editAvatarButton.addEventListener('click', () => {
  editAvatarFormValidator.inactivateButton();
  editAvatarFormValidator.removeErrorComponents();
  avatarPopup.open();
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInformation.setUserInfo({
      userName: userData.name,
      userInfo: userData.about,
      userAvatar: userData.avatar
    });
    cardList.renderItems(cards.reverse());
  })
  .catch(err => console.log(`Ошибка при загрузке данных: ${err}`))
