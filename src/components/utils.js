import { editForm, inputJob, inputName, profileJob, profileName, editUserData } from "../index.js";
import { closePopup } from "./modal.js";

export default function changeProfile(evt) {
   evt.preventDefault();
   const newName = inputName.value;
   const newJob = inputJob.value;
   profileName.textContent = newName;
   profileJob.textContent = newJob;
   editUserData(newName, newJob)
   .then((res) => res.json())
   .catch((err) => {
     console.log(err);
   });
   closePopup(editForm);
}