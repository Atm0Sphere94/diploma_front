import {
  findElement,
  toggleClass
} from '../utils/helpers';
import {
  auth
} from '../utils';

function handleClickHamburger() {
  toggleClass(findElement('#hamburger'), 'header__toogle_open')
  toggleClass(findElement('.header__nav'), 'header__nav_is-open')
  toggleClass(findElement('.header__logo'), 'header__logo_is-open-menu')
}

/** Обработчик кнопки выхода */
function handleClickSignOut() {
  auth.removeToken();
  auth._redirectToMainPage();
}

export {
  handleClickHamburger,
  handleClickSignOut
}