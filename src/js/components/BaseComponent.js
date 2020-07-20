export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  _findElement(container, element) {
    return container.querySelector(element);
  }

  _findElements(container, element) {
    return container.querySelectorAll(element)
  }

  _addListener(element, event, callback) {
    element.addEventListener(event, callback);
    this._listeners.push({ element, event, callback });
  }

  _removeListener({ element, event, callback }) {
    element.removeEventListener(event, callback);
  }

  setHandlers(handlers = []) {
    handlers.forEach(({ element, event, callback }) => {
      this.callback = callback.bind(this);
      this._addListener(element, event, this.callback)
    });
  }

  removeHandlers() {
    this._listeners.forEach(handler => this._removeListener(handler));
  }
}