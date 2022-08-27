import { cards, photoLink, photoName, addForm, deleteForm } from "./utils/constants.js";
import { closePopup, openPopup } from "./utils.js";
import { openImagePopup } from "./modal.js";
import { toggleUserLike, deleteCardById, postNewCard, handleError } from "./api.js";
import { userId } from "../index.js";

export function createCard(card) {
   const cardTemplate = document.querySelector('#card').content;
   const newCard = cardTemplate.querySelector('.card').cloneNode(true);
   const newCardImg = newCard.querySelector('.card__image');
   const likeButton = newCard.querySelector('.card__like-button');
   const deleteButton = newCard.querySelector('.card__delete-button');
   newCard.querySelector('.card__title').textContent = card.name;
   newCard.querySelector('.card__likes').textContent = card.likes.length;
   newCardImg.alt = card.name;
   newCardImg.src = card.link;
   newCard._id = card._id;
   for (let i = 0; i < card.likes.length; i++) {
      if (card.likes[i]._id === userId) {
         likeButton.classList.add('card__like-button_active');
      }
   }
   if (card.owner._id !== userId) {
      deleteButton.remove();
   } else {
      deleteButton.addEventListener('click', (evt) => {
         console.log(evt.target.closest('.card'));
         deleteCard(evt.target.closest('.card'));
         
         // openPopup(deleteForm);
         // deleteForm.addEventListener('submit', deleteCard(newCard));
      });
   }
   likeButton.addEventListener('click', likeCard);
   newCardImg.addEventListener('click', () => openImagePopup(card.name, card.link));
   return newCard;
}

export function addInitialCard(newCard) {
   cards.append(newCard);
}

function addNewCard(newCard) {
   cards.prepend(newCard);
}

function likeCard(evt) {
   if (evt.target.classList.contains('card__like-button')) {
      const cardLike = evt.target.closest('.card').querySelector('.card__likes');
      if (!evt.target.classList.contains('card__like-button_active')) {
         const method = 'PUT';
         toggleUserLike(userId, evt.target.closest('.card')._id, method)
            .then((res) => {
               evt.target.classList.toggle('card__like-button_active');
               cardLike.textContent = res.likes.length;
            })
            .catch(handleError);
      } else {
         const method = 'DELETE';
         toggleUserLike(userId, evt.target.closest('.card')._id, method)
            .then((res) => {
               evt.target.classList.toggle('card__like-button_active');
               cardLike.textContent = res.likes.length;
            })
            .catch(handleError);
      }
   }
}

export function deleteCard(card) {
   deleteCardById(card._id)
      .then(() => {
         card.remove();
         closePopup(deleteForm);
      })
      .catch(handleError);
}

export function saveNewCard(evt) {
   evt.preventDefault();
   const newPhotoName = photoName.value;
   const newPhotoLink = photoLink.value;
   postNewCard(newPhotoName, newPhotoLink)
      .then((res) => {
         const newCard = createCard(res);
         evt.target.reset();
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