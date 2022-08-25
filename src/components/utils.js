import { editForm, inputJob, inputName, profileJob, profileName, avatarLink, avatarPopup, avatar } from "./variables.js";
import { closePopup } from "./modal.js";
import { editUserData, patchUserAvatar } from "./api.js";

export function changeProfile(evt) {
   evt.preventDefault();
   const newName = inputName.value;
   const newJob = inputJob.value;
   profileName.textContent = newName;
   profileJob.textContent = newJob;
   evt.target.querySelector('.edit-form__save-button').textContent = 'Сохранение...';
   editUserData(newName, newJob)
   .catch((err) => {
     console.log(err);
   });
   closePopup(editForm);
   evt.target.querySelector('.edit-form__save-button').classList.add('edit-form__save-button_disabled')
   evt.target.querySelector('.edit-form__save-button').disabled = true;
}

export function changeAvatar(evt) {
  evt.preventDefault();
  const newAvatar = avatarLink.value;
  evt.target.querySelector('.edit-form__save-button').textContent = 'Сохранение...';
  patchUserAvatar(newAvatar)
  .then((res) => {
    avatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  });
  closePopup(avatarPopup);
  evt.target.querySelector('.edit-form__save-button').classList.add('edit-form__save-button_disabled')
  evt.target.querySelector('.edit-form__save-button').disabled = true;
}