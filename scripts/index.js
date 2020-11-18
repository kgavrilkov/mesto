const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupAddForm = document.querySelector('.popup__form_type_add');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const popupSaveButton = document.querySelector('.popup__button');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

function openPopup() {
  const idPopup = this.dataset.forPopup;
  const popup = document.getElementById(idPopup);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  processForms();
  removeErrorComponents(config);
}

function closePopup() {
  const idPopup = this.dataset.forPopup;
  const popup = document.getElementById(idPopup);
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function closePopupByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopups();
}

function processForms() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  inputPlace.value = '';
  inputLink.value = '';
  popupSaveButton.classList.remove('popup__button_disabled');
  const buttonElement = document.querySelector('.popup__button_inactive');
  buttonElement.classList.add('popup__button_disabled');
}

function closePopups() {
  popups.forEach(popup => popup.classList.remove('popup_opened'));
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  imageElement.src = item.link;
  imageElement.alt.textContent = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__image').addEventListener('click', function openPopup() {
    const popup = document.querySelector('#popupZoomImage');
    popup.classList.add('popup_opened');
    const popupImage = popup.querySelector('.popup__image');
    popupImage.src = item.link;
    popupImage.alt.textContent = item.name;
    popup.querySelector('.popup__caption').textContent = item.name;
    document.addEventListener('keydown', handleEscape);
  });
  return cardElement;
}

initialCards.reverse().forEach((item) => {
  const cardsElement = createCard(item);
  renderCard(cards, cardsElement);
});

function renderCard(cards, cardsElement) {
  cards.prepend(cardsElement);
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopups();
}

function handleEscape (evt) {
  if (evt.key === 'Escape') {
    closePopups();
  }
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const cardTitle = inputPlace.value;
  const cardImage = inputLink.value;
  const item = {
    name: cardTitle,
    link: cardImage,
  };
  const cardsElement = createCard(item);
  renderCard(cards, cardsElement);
  cards.prepend(cardsElement);
  closePopups();
}

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
[...document.querySelectorAll('.button_type_close')].forEach(button =>
button.addEventListener('click', closePopup));
popups.forEach(popup => popup.addEventListener('mousedown', closePopupByClickOnOverlay));
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
