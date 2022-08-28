import { closePopup, openPopup } from "./components/utils.js";
import { changeAvatar, changeProfile } from "./components/profile.js";
import { enableValidation } from "./components/validation.js";
import { addInitialCard, createCard, saveNewCard} from "./components/card.js";
import { getUserData, getInitialCards, handleError } from "./components/api.js"
import { avatar, avatarPopup, editButton, editForm, inputName, inputJob, addButton, addForm, profileName, profileJob, popups, validationConfigurations } from './components/utils/constants.js';
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
  .then(([userData, cards]) => {

    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatar.src = userData.avatar;

    for (let i = 0; i < cards.length; i++) {
      const newCard = createCard(cards[i]);
      addInitialCard(newCard);
    }
  })
  .catch(handleError);