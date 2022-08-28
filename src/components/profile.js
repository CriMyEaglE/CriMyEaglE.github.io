import { editForm, inputJob, inputName, profileJob, profileName, avatarLink, avatarPopup, avatar } from "./utils/constants.js";
import { editUserData, patchUserAvatar, handleError } from "./api.js";
import { closePopup } from "./utils.js";
import { changeButtonText, disableButton } from "./card.js";

export function changeProfile(evt) {
   evt.preventDefault();
   const newName = inputName.value;
   const newJob = inputJob.value;
   profileName.textContent = newName;
   profileJob.textContent = newJob;
   changeButtonText(evt.submitter, 'Сохранение...');
   editUserData(newName, newJob)
      .then(() => {
         closePopup(editForm);
         disableButton(evt.submitter);
      })
      .catch(handleError)
      .finally(() => {
         changeButtonText(evt.submitter);
      });
}

export function changeAvatar(evt) {
   evt.preventDefault();
   const newAvatar = avatarLink.value;
   changeButtonText(evt.submitter, 'Сохранение...');
   patchUserAvatar(newAvatar)
      .then((res) => {
         evt.target.reset();
         avatar.src = res.avatar;
         closePopup(avatarPopup);
         disableButton(evt.submitter);
      })
      .catch(handleError)
      .finally(() => {
         changeButtonText(evt.submitter);
      });
}