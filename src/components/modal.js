import { fullscreenImagePopup, popupImage, popupTitle } from "./variables.js";

export function fadePopup(popup) {
   popup.classList.add('popup_fade');
   setTimeout(function () { popup.classList.remove('popup_fade') }, 500);
}

export function closePopup(popup) {
   fadePopup(popup);
   setTimeout(function () { popup.classList.remove('popup_opened') }, 500);
}

export function openPopup(popup) {
   popup.classList.add('popup_opened');
   popup.addEventListener('keydown', closeOnEsc);
}

export function openImagePopup(evt) {
   if (evt.target.classList.contains('card__image')) {
      popupImage.src = evt.target.parentNode.querySelector('.card__image').src;
      popupTitle.textContent = evt.target.parentNode.querySelector('.card__title').textContent;
      popupImage.setAttribute('alt', evt.target.parentNode.querySelector('.card__image').src);
      openPopup(fullscreenImagePopup);
   }
}

export function closeOnEsc(evt) {
   if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
      openedPopup.removeEventListener('keydown', closeOnEsc);
   }
}