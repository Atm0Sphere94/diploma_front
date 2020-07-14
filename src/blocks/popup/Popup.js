import "./index.css";

import BaseComponent from '../../js/components/BaseComponent';

export default class Popup extends BaseComponent {
  constructor(props) {
    super();

    const {
      layout,
      container,
      closeButton
    } = props;

    this._layout = layout;
    this._container = container;
    this._closeButton = closeButton;

    this._handleKeydown = this._handleKeydown.bind(this);
    this.close = this.close.bind(this);
  }

  _setEventListeners() {
    this.setHandlers([
      { element: this._closeButton, event: 'click', callback: _ => this.close() },
      { element: document, event: 'mousedown', callback: e => this._handleKeydown(e) },
      { element: document, event: 'keydown', callback: e => this._handleKeydown(e) }
    ])
  }

  setContent(template) {
    this._container.appendChild(template.cloneNode(true).content);
  }

  clearContent() {
    this._container.innerHTML = '';
  }

  open() {
    this._layout.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  close() {
    this._layout.classList.remove('popup_is-opened');
    this.removeHandlers();
  }

  _handleKeydown(event) {
    if (Number(event.which) === 27 ||
      event.target.classList.contains('popup_is-opened') ||
      event.target.classList.contains('popup__close')
    ) {
      this.close();
    }
  }
}