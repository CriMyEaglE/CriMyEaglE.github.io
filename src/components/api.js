export const config = {
   baseUrl: 'https://nomoreparties.co/v1/wbc-cohort-1',
   headers: {
      authorization: 'f3738230-a228-4435-8289-a861e5a04082',
      'Content-Type': 'application/json'
   }
}
export const handleResponse = (res) => {
   if (res.ok) {
      return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
}
export let userId;

const getUserId = () => {
   return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
   }
   )
      .then(handleResponse)
      .then((res) => {
         userId = res._id;
      })
}

getUserId();

export const getInitialCards = () => {
   return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
   }
   )
      .then(handleResponse);
}

export const editUserData = (name, about) => {
   return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
         name: name,
         about: about
      })
   })
      .then(handleResponse);
}

export const patchUserAvatar = (link) => {
   return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
         avatar: link
      })
   })
      .then(handleResponse);
}

export const getUserData = () => {
   return fetch(`${config.baseUrl}/users/me`,
      config
   )
      .then(handleResponse);
}

export const postNewCard = (name, link) => {
   return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
         name: name,
         link: link
      })
   })
      .then(handleResponse);
}

export const deleteCardById = (cardId) => {
   return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
      body: JSON.stringify({ id: cardId })
   })
      .then(handleResponse);
}

export const addUserLike = (userId, cardId) => {
   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
      body: JSON.stringify({ likes: userId })
   })
      .then(handleResponse);
}

export const deleteUserLike = (userId, cardId) => {
   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
      body: JSON.stringify({ likes: userId })
   })
      .then(handleResponse);
}