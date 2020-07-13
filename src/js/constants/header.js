import { findElement } from '../utils/helpers';

const HEADER = {
  signInBtn: findElement('#loginBtn'),
  signOutBtn: findElement('#logOutBtn'),
  hamburgerBtn: findElement('#hamburger'),
  navigation: findElement('.header__nav'),
}

export {
  HEADER
}