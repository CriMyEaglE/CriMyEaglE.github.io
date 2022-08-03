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

const likeButton = document.querySelector('#likeButton');
likeButton.addEventListener('click', function () {
  document.querySelector('#likeButton').classList.toggle('card__like-button_active');
})

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

for (let i = 0; i < initialCards.length; i++) {
  const cardTemplate = document.querySelector('#card').content;
  const cards = document.querySelector('.cards');
  
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  
  console.log(initialCards[i].link);
  console.log(initialCards[i].link.value);

  newCard.querySelector('.card__image').src = initialCards[i].link;
  newCard.querySelector('.card__image').setAttribute('alt', initialCards[i].name);

  newCard.querySelector('.card__title').textContent = initialCards[i].name;
  
  cards.append(newCard);
}
