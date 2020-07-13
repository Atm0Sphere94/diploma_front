
import { MESSAGES } from '../../js/constants/messages';

export default class MainApi {
  constructor(props) {
    const {
      url,
      routes
    } = props;

    this._url = url;
    this._routes = routes;
  }

  /* регистрирует нового пользователя */
  signup({ email, password, name }) {
    return fetch(`${this._url + this._routes.signUp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
    .then(res => res.json())
    .catch((err) => {
      if (err.message === 'Failed to fetch') {
        return new Error(MESSAGES.errorNotConnect);
      }
      return new Error(err);
    });
  }

  /* аутентифицирует пользователя на основе почты и пароля */
  signin({ email, password }) {
    return fetch(`${this._url + this._routes.signIn}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      .then(res => res.json())
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(MESSAGES.errorNotConnect);
        }
        return err;
      });
  }

  /* возвращает информацию о пользователе */
  getUserData(token) {
    this._token = token;

    return fetch(`${this._url + this._routes.currentUser}`, {
        method: 'GET',
        headers: {
          authorization: this._token,
        },
      })
      .then(res => res.json())
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(MESSAGES.errorNotConnect);
        }
        return err;
      });
  }

  /* забирает все статьи */
  getArticles(token) {
    this._token = token;

    return fetch(`${this._url + this._routes.articles}`, {
        method: 'GET',
        headers: {
          authorization: this._token,
        },
      })
      .then(res => res.json())
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(MESSAGES.errorNotConnect);
        }
        return err;
      });
  }

  /* создаёт статью */
  createArticle(article, token) {
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = article;
    this._token = token;

    return fetch(`${this._url + this._routes.articles}`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          title,
          text,
          date,
          source,
          link,
          image,
        })
      })
      .then(res => res.json())
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(MESSAGES.errorNotConnect);
        }
        return err;
      });
  }

  /* удаляет статью */
  removeArticle(id, token) {
    this._token = token;

    return fetch(`${this._url + this._routes.articles}/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(MESSAGES.errorNotConnect);
        }
        return err;
      });
  }
}