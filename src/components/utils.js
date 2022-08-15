import { editForm, inputJob, inputName, profileJob, profileName } from "../index.js";
import { closePopup } from "./modal.js";

export default function changeProfile(evt) {
   evt.preventDefault();
   const newName = inputName.value;
   const newJob = inputJob.value;
   const oldName = profileName;
   const oldJob = profileJob;
   oldName.textContent = newName;
   oldJob.textContent = newJob;
   closePopup(editForm);
}