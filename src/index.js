import changeProfile from "./components/utils.js";
import {  enableValidation} from "./components/validation.js";
import { fadePopup, closePopup, openPopup, openImagePopup, closeOnOverlay, closeOnEsc } from "./components/modal.js";
import { addCard, likeCard, deleteCard, createCard, saveNewCard} from "./components/card.js";
import initialCards from "./components/initial.js";


const editButton = document.querySelector('.profile__edit-button');

const allPopups = document.querySelectorAll('.popup');

const addButton = document.querySelector('#addButton');

const closeButtons = document.querySelectorAll('.popup__close-button');

export const profileName = document.querySelector('.profile__name');

export const profileJob = document.querySelector('.profile__description');

export const addForm = document.querySelector('#addFormPopup');

export const photoName = addForm.querySelector('#title-input');

export const photoLink = addForm.querySelector('#url-input');

export const cards = document.querySelector('.cards');

export const editForm = document.querySelector('#editFormPopup');

export const inputName = editForm.querySelector('#name-input');

export const inputJob = editForm.querySelector('#job-input');

export const fullscreenImagePopup = document.querySelector('#fullscreenImagePopup');


for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', () => { closePopup(closeButtons[i].parentElement.parentElement); });
}

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editForm);
});

editForm.addEventListener('submit', changeProfile);

addButton.addEventListener('click', () => {
  photoName.value = '';
  photoLink.value = '';
  openPopup(addForm);
});

addForm.addEventListener('submit', saveNewCard);

for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
  addCard(newCard);
}

cards.addEventListener('click', likeCard);
cards.addEventListener('click', deleteCard);
cards.addEventListener('click', openImagePopup);

allPopups.forEach((element) => {
  element.addEventListener('mousedown', closeOnOverlay);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    allPopups.forEach(closePopup);
  }
})

enableValidation();