import changeProfile from "./components/utils.js";
import { enableValidation } from "./components/validation.js";
import { fadePopup, closePopup, openPopup, openImagePopup, closeOnOverlay, closeOnEsc } from "./components/modal.js";
import { addNewCard, addInitialCard, likeCard, deleteCard, createCard, saveNewCard } from "./components/card.js";
import initialCards from "./components/initial.js";
import './pages/index.css';

export let userId;

const editButton = document.querySelector('.profile__edit-button');
const allPopups = document.querySelectorAll('.popup');
const addButton = document.querySelector('#addButton');
const closeButtons = document.querySelectorAll('.popup__close-button');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const addForm = document.querySelector('#addFormPopup');
export const photoName = addForm.querySelector('#title-input');
export const photoLink = addForm.querySelector('#url-input');
export const cards = document.querySelector('.cards');
export const editForm = document.querySelector('#editFormPopup');
export const inputName = editForm.querySelector('#name-input');
export const inputJob = editForm.querySelector('#job-input');
export const fullscreenImagePopup = document.querySelector('#fullscreenImagePopup');

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', () => { closePopup(closeButtons[i].parentElement.parentElement); });
}

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editForm);
});

editForm.addEventListener('submit', changeProfile);

addButton.addEventListener('click', () => {
  photoName.value = '';
  photoLink.value = '';
  openPopup(addForm);
});

addForm.addEventListener('submit', saveNewCard);

// cards.addEventListener('click', likeCard);
// cards.addEventListener('click', deleteCard);
// cards.addEventListener('click', openImagePopup);

allPopups.forEach((element) => {
  element.addEventListener('mousedown', closeOnOverlay);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    allPopups.forEach(closePopup);
  }
})

enableValidation();

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbc-cohort-1',
  headers: {
    authorization: 'f3738230-a228-4435-8289-a861e5a04082',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`,
    config
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const editUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'f3738230-a228-4435-8289-a861e5a04082',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`,
    config
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: 'f3738230-a228-4435-8289-a861e5a04082',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

export const deleteCardById = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'f3738230-a228-4435-8289-a861e5a04082',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: cardId })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const addUserLike = (userId, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'f3738230-a228-4435-8289-a861e5a04082',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likes: userId })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const deleteUserLike = (userId, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'f3738230-a228-4435-8289-a861e5a04082',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likes: userId })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

getUserData()
  .then((result) => {
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
    userId = result._id;
    console.log(result, userId)
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const newCard = createCard(result[i].name, result[i].link);
      newCard.id = result[i]._id;
      newCard.ownerId = result[i].owner._id;
      newCard.likes = result[i].likes.length;
      newCard.querySelector('.card__likes').textContent = newCard.likes;
      for (let j = 0; j < newCard.likes; j++) {
        if (result[i].likes[j]._id === userId) {
          newCard.querySelector('.card__like-button').classList.add('card__like-button_active');
        }
      }
      if (newCard.ownerId !== userId) {
        newCard.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
      }
      addInitialCard(newCard);
    }
  })
  .catch((err) => {
    console.log(err);
  });

