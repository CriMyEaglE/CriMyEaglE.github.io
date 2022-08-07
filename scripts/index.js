const editForm = document.querySelector('#editFormPopup');

const editButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');

const profileJob = document.querySelector('.profile__description');

const addForm = document.querySelector('#addFormPopup');

const addButton = document.querySelector('#addButton');

const closeButtons = document.querySelectorAll('.popup__close-button');

const cards = document.querySelector('.cards');

const fullscreenImagePopup = document.querySelector('#fullscreenImagePopup');

const inputName = editForm.querySelector('#inputName');

const inputJob = editForm.querySelector('#inputJob');

const photoName = addForm.querySelector('#photoName');

const photoLink = addForm.querySelector('#photoLink');

function fadePopup(popup) {
  popup.classList.add('popup_fade');
  setTimeout(function () { popup.classList.remove('popup_fade') }, 500);
}

function closePopup(popup) {
  fadePopup(popup);
  setTimeout(function () { popup.classList.add('popup_hidden') }, 500);
}

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', () => { closePopup(closeButtons[i].parentElement.parentElement); });
}

function openPopup(popup) {
  popup.classList.remove('popup_hidden');
}

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editForm);
});

function changeProfile(evt) {
  evt.preventDefault();
  console.log(evt.submitter)
  const newName = inputName.value;
  const newJob = inputJob.value;
  const oldName = profileName;
  const oldJob = profileJob;
  oldName.textContent = newName;
  oldJob.textContent = newJob;
  closePopup(editForm);
}

editForm.addEventListener('submit', changeProfile);

function createCard(photoName, photoLink) {
  const cardTemplate = document.querySelector('#card').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const newCardImg = newCard.querySelector('.card__image');
  newCard.querySelector('.card__title').textContent = photoName;
  newCardImg.setAttribute('alt', photoName)
  newCardImg.src = photoLink;
  return newCard;
}

function addCard(newCard) {
  cards.prepend(newCard);
}

function toggleLike(btn) {
  btn.classList.toggle('card__like-button_active');
}

function addLikeButton(newCard) {
  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => toggleLike(likeButton));
};

function deleteCard(btn) {
  btn.parentNode.remove();
}

function addDeleteButton(newCard) {
  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(deleteButton));
}

function fillImagePopup(newCard) {
  const popupImage = fullscreenImagePopup.querySelector('.fullscreen__image');
  const popupTitle = fullscreenImagePopup.querySelector('.fullscreen__title');
  popupImage.src = newCard.querySelector('.card__image').src;
  popupTitle.textContent = newCard.textContent;
}

function increaseCardImage(newCard) {
  const img = newCard.querySelector('.card__image');
  img.addEventListener('click', () => { fillImagePopup(newCard); openPopup(fullscreenImagePopup); })
}

addButton.addEventListener('click', () => {
  photoName.value = '';
  photoLink.value = '';
  openPopup(addForm);
});

function saveNewCard(evt) {
  evt.preventDefault();
  const newPhotoName = photoName.value;
  const newPhotoLink = photoLink.value;
  const newCard = createCard(newPhotoName, newPhotoLink);
  addLikeButton(newCard);
  addDeleteButton(newCard);
  increaseCardImage(newCard);
  addCard(newCard);
  closePopup(addForm);
}

addForm.addEventListener('submit', saveNewCard);

for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
  addLikeButton(newCard);
  addDeleteButton(newCard);
  increaseCardImage(newCard);
  addCard(newCard);
}
