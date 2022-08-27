import { fullscreenImagePopup, popupImage, popupTitle } from "./utils/constants.js";
import { closePopup, openPopup } from "./utils.js";


export function openImagePopup(name, link) {
   popupImage.src = link;
   popupTitle.textContent = name;
   popupImage.alt = name;
   openPopup(fullscreenImagePopup);
}

export function closeOnEsc(evt) {
   if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
   }
}