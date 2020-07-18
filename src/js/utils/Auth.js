import BaseComponent from '../components/BaseComponent';

import {
  GITHUB_PAGES_MAIN
} from '../constants/api';

export default class Auth extends BaseComponent {
  _redirectToMainPage() {
    if (window.location.href === `https://atm0sphere94.github.io/diploma_front/articles`) {
      window.location.href = `https://atm0sphere94.github.io/diploma_front/` ;
    } else {
      window.location.href = `https://atm0sphere94.github.io/diploma_front/`;
    }
  }

  setToken(token) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    return localStorage.removeItem('token');
  }
}