import initialCards from "./initial.js";
import { cards, photoLink, photoName, addForm, postNewCard, deleteCardById, getCardById, userId, addLike, addUserLike, deleteUserLike } from "../index.js";
import { closePopup, openImagePopup } from "./modal.js";

export function createCard(photoName, photoLink) {
   const cardTemplate = document.querySelector('#card').content;
   const newCard = cardTemplate.querySelector('.card').cloneNode(true);
   const newCardImg = newCard.querySelector('.card__image');
   newCard.querySelector('.card__title').textContent = photoName;
   newCardImg.setAttribute('alt', photoName);
   newCardImg.src = photoLink;
   newCard.addEventListener('click', deleteCard);
   newCard.addEventListener('click', likeCard);
   newCard.addEventListener('click', openImagePopup);
   return newCard;
}

export function addInitialCard(newCard) {
   cards.append(newCard);
}

export function addNewCard(newCard) {
   cards.prepend(newCard);
}

export function likeCard(evt) {
   if (evt.target.classList.contains('card__like-button')) {
      if (!evt.target.classList.contains('card__like-button_active')) {
         addUserLike(userId, evt.target.closest('.card').id)
         .then((res) => {
            evt.target.classList.add('card__like-button_active');
            evt.target.closest('.card').querySelector('.card__likes').textContent = res.likes.length;
         })
         .catch((err) => {
            console.log(err);
         });
      } else {
         deleteUserLike(userId, evt.target.closest('.card').id)
         .then((res) => {
            evt.target.classList.remove('card__like-button_active');
            evt.target.closest('.card').querySelector('.card__likes').textContent = res.likes.length;
         })
         .catch((err) => {
            console.log(err);
         });
      }
   }
}

export function deleteCard(evt) {
   if (evt.target.classList.contains('card__delete-button')) {
      deleteCardById(evt.target.parentNode.id)
         .then((result) => {
            evt.target.parentNode.remove();
         });
   }
}

export function saveNewCard(evt) {
   evt.preventDefault();
   const newPhotoName = photoName.value;
   const newPhotoLink = photoLink.value;
   const newCard = createCard(newPhotoName, newPhotoLink);
   newCard.querySelector('.card__likes').textContent = res.likes.length;
   postNewCard(newPhotoName, newPhotoLink)
      .then((res) => res.json())
      .catch((err) => {
         console.log(err);
      });
   addNewCard(newCard);
   closePopup(addForm);
}