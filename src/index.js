import { closePopup, openPopup } from "./components/utils.js";
import { changeAvatar, changeProfile } from "./components/profile.js";
import { enableValidation } from "./components/validation.js";
import { addInitialCard, createCard, saveNewCard } from "./components/card.js";
import { getUserData, getInitialCards, handleError, handleResponse } from "./components/api.js"
import { avatar, avatarPopup, avatarLink, editButton, editForm, inputName, inputJob, addButton, addForm, photoName, photoLink, allPopups, closeButtons, profileName, profileJob, popups, validationConfigurations } from './components/utils/constants.js';
import './pages/index.css';

export let userId;


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

avatar.addEventListener('click', () => {
  openPopup(avatarPopup)
});

avatarPopup.addEventListener('submit', changeAvatar);

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editForm);
});

editForm.addEventListener('submit', changeProfile);

addButton.addEventListener('click', () => {
  openPopup(addForm);
});

addForm.addEventListener('submit', saveNewCard);

enableValidation(validationConfigurations);


Promise.all([getUserData(), getInitialCards()])
  .then((values) => {
    const userData = values[0];
    const cards = values[1];

    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatar.src = userData.avatar;

    for (let i = 0; i < cards.length; i++) {
      const newCard = createCard(cards[i].name, cards[i].link);
      newCard.id = cards[i]._id;
      newCard.ownerId = cards[i].owner._id;
      newCard.likes = cards[i].likes.length;
      newCard.querySelector('.card__likes').textContent = newCard.likes;
      for (let j = 0; j < newCard.likes; j++) {
        if (cards[i].likes[j]._id === userId) {
          newCard.querySelector('.card__like-button').classList.add('card__like-button_active');
        }
      }
      if (newCard.ownerId !== userId) {
        newCard.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
      }
      addInitialCard(newCard);
    }
  })
  .catch(handleError);