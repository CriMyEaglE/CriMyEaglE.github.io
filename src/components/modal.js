import { fullscreenImagePopup } from "../index.js";

export function fadePopup(popup) {
   popup.classList.add('popup_fade');
   setTimeout(function () { popup.classList.remove('popup_fade') }, 500);
}

export function closePopup(popup) {
   fadePopup(popup);
   setTimeout(function () { popup.classList.add('popup_hidden') }, 500);
}

export function openPopup(popup) {
   popup.classList.remove('popup_hidden');
}

export function openImagePopup(evt) {
   if (evt.target.classList.contains('card__image')) {
      const popupImage = fullscreenImagePopup.querySelector('.fullscreen__image');
      const popupTitle = fullscreenImagePopup.querySelector('.fullscreen__title');
      popupImage.src = evt.target.parentNode.querySelector('.card__image').src;
      popupTitle.textContent = evt.target.parentNode.querySelector('.card__title').textContent;
      openPopup(fullscreenImagePopup);
   }
}

export function closeOnOverlay(evt) {
   if ((evt.target.classList.contains('popup')) && (evt.button === 0)) {
      closePopup(evt.target);
   }
}

export function closeOnEsc(evt) {
   if (evt.target.classList.contains('popup')) {
   }
}