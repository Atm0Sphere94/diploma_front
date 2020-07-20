import './index.css';

import BaseComponent from '../../js/components/BaseComponent';

export default class Header extends BaseComponent {
  constructor(props) {
    super();

    const {
      signOutButton,
      navigation
    } = props;

    this._signOutButton = signOutButton;
    this._navigation = navigation;
  }

  render(isLoggedIn, userName, disabledLink) {
    const signOutButtonText = this._findElement(
      this._navigation, '.button__text'
    );

    const savedPagesLinkElement = this._findElement(
      this._navigation, '#savedPages'
    );

    if (disabledLink) {
      savedPagesLinkElement.classList.add('header__nav-link_disable')
    } else {
      savedPagesLinkElement.classList.remove('header__nav-link_disable')
    }

    if(isLoggedIn) {
      this._setUserName(signOutButtonText, userName);
      this._navigation.classList.add('header__nav_is-auth');
    } else {
      this._clearUserName(signOutButtonText);
      this._navigation.classList.remove('.header__nav_is-auth');
    }

  }

  _setUserName(element, value) {
    element.textContent = value;
  }

  _clearUserName(element) {
    element.textContent = '';
  }
}