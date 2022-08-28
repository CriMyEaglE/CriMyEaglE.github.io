import { cards, photoLink, photoName, addForm, deleteForm } from "./utils/constants.js";
import { closePopup, openPopup } from "./utils.js";
import { openImagePopup } from "./modal.js";
import { toggleUserLike, deleteCardById, postNewCard, handleError } from "./api.js";
import { userId } from "../index.js";

let currentCard = null;

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
         currentCard = evt.target.closest('.card');
         openPopup(deleteForm);
      });
   }
   likeButton.addEventListener('click', likeCard);
   newCardImg.addEventListener('click', () => openImagePopup(card.name, card.link));
   return newCard;
}

deleteForm.addEventListener('submit', deleteCard);

export function addInitialCard(newCard) {
   cards.append(newCard);
}

function addNewCard(newCard) {
   cards.prepend(newCard);
}

function likeCard(evt) {
   if (evt.target.classList.contains('card__like-button')) {
      const closestCard = evt.target.closest('.card');
      const cardLike = closestCard.querySelector('.card__likes');
      if (!evt.target.classList.contains('card__like-button_active')) {
         const method = 'PUT';
         toggleUserLike(userId, closestCard._id, method)
            .then((res) => {
               evt.target.classList.toggle('card__like-button_active');
               cardLike.textContent = res.likes.length;
            })
            .catch(handleError);
      } else {
         const method = 'DELETE';
         toggleUserLike(userId, closestCard._id, method)
            .then((res) => {
               evt.target.classList.toggle('card__like-button_active');
               cardLike.textContent = res.likes.length;
            })
            .catch(handleError);
      }
   }
}

export function deleteCard(evt) {
   changeButtonText(evt.submitter, 'Удаление...');
   deleteCardById(currentCard._id)
      .then(() => {
         currentCard.remove();
         closePopup(deleteForm);
      })
      .then(() => {
         currentCard = null;
      })
      .catch(handleError)
      .finally(() => {
         changeButtonText(evt.submitter, 'Да');
      });
}

export function changeButtonText(btn, text = 'Сохранить') {
   btn.textContent = text;
}

export function disableButton(btn) {
   btn.classList.add('edit-form__save-button_disabled')
   btn.disabled = true;   
}

export function saveNewCard(evt) {
   evt.preventDefault();
   const newPhotoName = photoName.value;
   const newPhotoLink = photoLink.value;
   changeButtonText(evt.submitter, 'Сохранение...');
   postNewCard(newPhotoName, newPhotoLink)
      .then((res) => {
         const newCard = createCard(res);
         evt.target.reset();
         addNewCard(newCard);
         closePopup(addForm);
         disableButton(evt.submitter);
      })
      .catch(handleError)
      .finally(() => {
         changeButtonText(evt.submitter);
      });
}