import { cards, photoLink, photoName, addForm} from "./variables.js";
import { closePopup, openImagePopup } from "./modal.js";
import { addUserLike, deleteUserLike, deleteCardById, postNewCard, userId } from "./api.js";

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
      deleteCardById(evt.target.closest('.card').id)
         .then((result) => {
            evt.target.closest('.card').remove();
         });
   }
}

export function saveNewCard(evt) {
   evt.preventDefault();
   const newPhotoName = photoName.value;
   const newPhotoLink = photoLink.value;
   const newCard = createCard(newPhotoName, newPhotoLink);
   evt.target.querySelector('.edit-form__save-button').textContent = 'Сохранение...';
   postNewCard(newPhotoName, newPhotoLink)
      .then((res) => {
         console.log(res);
         newCard.id = res._id;
      })
      .catch((err) => {
         console.log(err);
      });
   addNewCard(newCard);
   closePopup(addForm);
   evt.target.querySelector('.edit-form__save-button').classList.add('edit-form__save-button_disabled')
   evt.target.querySelector('.edit-form__save-button').disabled = true;
}