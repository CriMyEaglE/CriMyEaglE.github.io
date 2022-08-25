import { changeProfile, changeAvatar } from "./components/utils.js";
import { enableValidation, toggleButtonState } from "./components/validation.js";
import { closePopup, openPopup, closeOnEsc } from "./components/modal.js";
import { addInitialCard, createCard, saveNewCard } from "./components/card.js";
import { getUserData, getInitialCards, userId } from "./components/api.js"
import { avatar, avatarPopup, avatarLink, editButton, editForm, inputName, inputJob, addButton, addForm, photoName, photoLink, allPopups, closeButtons, profileName, profileJob, popups } from './components/variables.js';
import './pages/index.css';

const validationConfigurations = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input-form',
  submitButtonSelector: '.edit-form__save-button',
  inactiveButtonClass: 'edit-form__save-button_disabled',
  inputErrorClass: 'edit-form__input-form_type_error',
  errorClass: 'edit-form__input-error_active'
}

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
  avatarPopup.querySelector('.edit-form__save-button').textContent = 'Сохранить';
  avatarLink.value = '';
  openPopup(avatarPopup)
});
avatarPopup.addEventListener('submit', changeAvatar);

editButton.addEventListener('click', () => {
  editForm.querySelector('.edit-form__save-button').textContent = 'Сохранить';
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editForm);
});

editForm.addEventListener('submit', changeProfile);

addButton.addEventListener('click', () => {
  addForm.querySelector('.edit-form__save-button').textContent = 'Сохранить';
  photoName.value = '';
  photoLink.value = '';
  openPopup(addForm);
});

addForm.addEventListener('submit', saveNewCard);

document.addEventListener('keydown', closeOnEsc);

enableValidation(validationConfigurations);

getUserData()
  .then((result) => {
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
    avatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const newCard = createCard(result[i].name, result[i].link);
      newCard.id = result[i]._id;
      newCard.ownerId = result[i].owner._id;
      newCard.likes = result[i].likes.length;
      newCard.querySelector('.card__likes').textContent = newCard.likes;
      for (let j = 0; j < newCard.likes; j++) {
        if (result[i].likes[j]._id === userId) {
          newCard.querySelector('.card__like-button').classList.add('card__like-button_active');
        }
      }
      if (newCard.ownerId !== userId) {
        newCard.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
      }
      addInitialCard(newCard);
    }
  })
  .catch((err) => {
    console.log(err);
  });