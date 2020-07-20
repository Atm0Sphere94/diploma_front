import { findElement } from '../utils/helpers';

const POPUP = {
  layout: findElement('.popup'),
  container: findElement('.popup__content'),
  closeButton: findElement('.popup__close'),
};

const POPUP_LINKS = {
  signInLink: '#signInLink',
  signUpLink: '#signUpLink',
}

const POPUP_SIGN_IN = {
  template: findElement('#popupSignIn'),
};

const POPUP_SIGN_UP = {
  template: findElement('#popupSignUp'),
};

const POPUP_SIGN_UP_SUCCESS = {
  template: findElement('#popupSignUpSuccess'),
};

export {
  POPUP,
  POPUP_SIGN_IN,
  POPUP_SIGN_UP,
  POPUP_LINKS,
  POPUP_SIGN_UP_SUCCESS
}
