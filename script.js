const editButton = document.querySelector('#editButton');
editButton.addEventListener('click', function () {
  document.querySelector('#editFormPopup').classList.add('popup_opened');
  document.querySelector('#editFormName').value = document.querySelector('.profile__name').textContent;
  document.querySelector('#editFormJob').value = document.querySelector('.profile__description').textContent;
  timerFade = setTimeout(() => document.querySelector('.popup_opened').style.opacity = 1, 50);
});
const closeButton = document.querySelector('#closeButton');
closeButton.addEventListener('click', function () {
  let timerFade = setTimeout(() => document.querySelector('.popup_opened').style.opacity = 0, 50);
  let timerClosed = setTimeout(() => document.querySelector('#editFormPopup').classList.remove('popup_opened'), 500);
});
  

const editFormSaveButton = document.querySelector('#editFormSaveButton');
editFormSaveButton.addEventListener('click', function () {
  document.querySelector('.profile__name').textContent = document.querySelector('#editFormName').value;
  document.querySelector('.profile__description').textContent = document.querySelector('#editFormJob').value;
  let timerFade = setTimeout(() => document.querySelector('.popup_opened').style.opacity = 0, 50);
  let timerClosed = setTimeout(() => document.querySelector('#editFormPopup').classList.remove('popup_opened'), 500);
});