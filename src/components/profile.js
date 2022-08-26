import { editForm, inputJob, inputName, profileJob, profileName, avatarLink, avatarPopup, avatar } from "./utils/constants.js";
import { editUserData, patchUserAvatar, handleError } from "./api.js";
import { closePopup } from "./utils.js";

export function changeProfile(evt) {
   evt.preventDefault();
   const newName = inputName.value;
   const newJob = inputJob.value;
   profileName.textContent = newName;
   profileJob.textContent = newJob;
   editUserData(newName, newJob)
      .then(() => {
         evt.submitter.textContent = 'Сохранение...';
         closePopup(editForm);
         evt.submitter.classList.add('edit-form__save-button_disabled');
         evt.submitter.disabled = true;
      })
      .catch(handleError)
      .finally(() => {
         evt.submitter.textContent = 'Сохранить';
      });
}

export function changeAvatar(evt) {
   evt.preventDefault();
   const newAvatar = avatarLink.value;
   patchUserAvatar(newAvatar)
      .then((res) => {
         evt.target.reset();
         avatar.src = res.avatar;
         evt.submitter.textContent = 'Сохранение...';
         closePopup(avatarPopup);
         evt.submitter.classList.add('edit-form__save-button_disabled');
         evt.submitter.disabled = true;
      })
      .catch(handleError)
      .finally(() => {
         evt.submitter.textContent = 'Сохранить';
      });
}