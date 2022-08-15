import initialCards from "./initial.js";
import { cards, photoLink, photoName, addForm } from "../index.js";
import { closePopup } from "./modal.js";

export function createCard(photoName, photoLink) {
   const cardTemplate = document.querySelector('#card').content;
   const newCard = cardTemplate.querySelector('.card').cloneNode(true);
   const newCardImg = newCard.querySelector('.card__image');
   newCard.querySelector('.card__title').textContent = photoName;
   newCardImg.setAttribute('alt', photoName)
   newCardImg.src = photoLink;
   return newCard;
}

export function addCard(newCard) {
   cards.prepend(newCard);
}

export function likeCard(evt) {
   if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_active');
   }
}

export function deleteCard(evt) {
   if (evt.target.classList.contains('card__delete-button')) {
      evt.target.parentNode.remove();
   }
}

export function saveNewCard(evt) {
   evt.preventDefault();
   const newPhotoName = photoName.value;
   const newPhotoLink = photoLink.value;
   const newCard = createCard(newPhotoName, newPhotoLink);
   addCard(newCard);
   closePopup(addForm);
}