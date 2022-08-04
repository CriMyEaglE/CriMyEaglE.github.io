const editForm = document.querySelector('#editFormPopup');

const editButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');

const profileJob = document.querySelector('.profile__description');

const addForm = document.querySelector('#addFormPopup');

const addButton = document.querySelector('#addButton');

function closePopup(popup) {
  const closeButton = popup.querySelector('.edit-form__close-button');
  popup.style.opacity = 0;
  setTimeout(function() {popup.classList.add('popup_hidden')}, 500)
}

function openPopup(popup) {
  const closeButton = popup.querySelector('.edit-form__close-button');
  popup.style.opacity = 1;
  closeButton.addEventListener('click', () => {
    closePopup(popup);
  })
  popup.classList.remove('popup_hidden');
}

editButton.addEventListener('click',function() {
  openPopup(editForm);
  editForm.querySelector('#inputName').value = profileName.textContent;
  editForm.querySelector('#inputJob').value = profileJob.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(addForm);
  addForm.querySelector('#photoName').value = '';
  addForm.querySelector('#photoLink').value = '';
});

function formSubmitHandlerChangeProfile (evt) {
  evt.preventDefault();
    const newName = editForm.querySelector('#inputName').value;
    const newJob = editForm.querySelector('#inputJob').value;
    const oldName = document.querySelector('.profile__name');
    const oldJob = document.querySelector('.profile__description');
    oldName.textContent = newName;
    oldJob.textContent = newJob;
  closePopup(editForm);
}
editForm.addEventListener('submit', formSubmitHandlerChangeProfile); 


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(photoName, photoLink) {

  const cardTemplate = document.querySelector('#card').content;
  const cards = document.querySelector('.cards');
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = photoName;
  newCard.querySelector('.card__image').setAttribute('alt', photoName)
  newCard.querySelector('.card__image').src = photoLink;
  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-button_active');
  });
  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteButton.parentNode.remove();
  });

  cards.prepend(newCard);
}

for (let i = 0; i < initialCards.length; i++) {
  createCard(initialCards[i].name,initialCards[i].link);
}

function formSubmitHandlerNewCard (evt) {
  evt.preventDefault();
  if (evt.submitter.getAttribute('class') === 'edit-form__save-button') {
  const newPhotoName = addForm.querySelector('#photoName').value;
  const newPhotoLink = addForm.querySelector('#photoLink').value;
  createCard(newPhotoName, newPhotoLink);
  }
  closePopup(addForm);
}
addForm.addEventListener('submit', formSubmitHandlerNewCard); 
