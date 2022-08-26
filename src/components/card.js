import { cards, photoLink, photoName, addForm } from "./utils/constants.js";
import { closePopup } from "./utils.js";
import { openImagePopup } from  "./modal.js";
import { addUserLike, deleteUserLike, deleteCardById, postNewCard, handleError } from "./api.js";
import { userId } from "../index.js";

export function createCard(photoName, photoLink) {
   const cardTemplate = document.querySelector('#card').content;
   const newCard = cardTemplate.querySelector('.card').cloneNode(true);
   const newCardImg = newCard.querySelector('.card__image');
   newCard.querySelector('.card__title').textContent = photoName;
   newCardImg.alt = photoName;
   newCardImg.src = photoLink;
   newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
   newCard.querySelector('.card__like-button').addEventListener('click', likeCard);
   newCardImg.addEventListener('click', () => openImagePopup(photoName, photoLink));
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
            .catch(handleError);
      } else {
         deleteUserLike(userId, evt.target.closest('.card').id)
            .then((res) => {
               evt.target.classList.remove('card__like-button_active');
               evt.target.closest('.card').querySelector('.card__likes').textContent = res.likes.length;
            })
            .catch(handleError);
      }
   }
}

export function deleteCard(evt) {
   if (evt.target.classList.contains('card__delete-button')) {
      deleteCardById(evt.target.closest('.card').id)
         .then((result) => {
            evt.target.closest('.card').remove();
         })
         .catch(handleError);
   }
}

export function saveNewCard(evt) {
   evt.preventDefault();
   const newPhotoName = photoName.value;
   const newPhotoLink = photoLink.value;
   const newCard = createCard(newPhotoName, newPhotoLink);
   postNewCard(newPhotoName, newPhotoLink)
      .then((res) => {
         evt.target.reset();
         newCard.id = res._id;
         evt.submitter.textContent = 'Сохранение...';
         addNewCard(newCard);
         closePopup(addForm);
         evt.submitter.classList.add('edit-form__save-button_disabled')
         evt.submitter.disabled = true;
      })
      .catch(handleError)
      .finally(() => {
         evt.submitter.textContent = 'Сохранить';
      });
}