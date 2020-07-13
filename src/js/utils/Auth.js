import BaseComponent from '../components/BaseComponent';

import {
  GITHUB_PAGES_MAIN
} from '../constants/api';

export default class Auth extends BaseComponent {
  _redirectToMainPage() {
    if (window.location.href === `${GITHUB_PAGES_MAIN}/articles`) {
      window.location.href = GITHUB_PAGES_MAIN;
    } else {
      window.location.href = '/';
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