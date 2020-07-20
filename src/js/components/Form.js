
import BaseComponent from '../../js/components/BaseComponent';
import { MESSAGES } from '../../js/constants/messages';

export default class Form extends BaseComponent {
  constructor(props) {
    super();

    const {
      form
   } = props;

    this._form = this._findElement(document, form);
    this._inputElements = this._findElements(this._form, 'input');
    this._submitButton = this._findElement(
      this._form, 'button[type="submit"]'
    );

  }

  setFormValidate() {
    this._validateForm();

    this.setHandlers([
      {
        event: 'input',
        element: this._form,
        callback: this._validateForm,
      }
    ]);
  }

  getInfo() {
    return Array.from(this._inputElements).reduce((acc, { name, value }) => {
        return { ...acc, [name]: value };
    }, {});
  }

  formDisabled() {
    this._inputElements.forEach(element => this._elementDisabled(element));
    this._submitButtonDisabled(this._submitButton);
  }

  formEnabled() {
    this._inputElements.forEach(element => this._elementEnabled(element));
    this._submitButtonEnabled(this._submitButton);
  }

  setServerError(err) {
    const errorElement = this._generateError(err);

    this
      ._submitButton
      .parentElement
      .insertBefore(
        errorElement,
        this._submitButton
      )

    this.formEnabled();
    this._submitButtonDisabled(this._submitButton);
  }

  _removeServerError() {
    const errorElement = this._findElement(
      this._form, '.popup__error-message-form'
    );

    if (errorElement) errorElement.remove();
  }

  _validateForm() {
    this._removeServerError();

    let isValid = Array.from(this._inputElements).every(
      element => this._validateInputElement(element)
    );

    if (!isValid) {
      this._submitButtonDisabled(this._submitButton);
    } else {
      this._submitButtonEnabled(this._submitButton);
    }
  }

  _validateInputElement(element) {
    const errorElement = this._findElement(
      this._form, `#error-${element.id}`
    );

    let errorMessage = '';

    switch (element.type) {
      case 'text':
        errorMessage = MESSAGES.validationLenght;
        break;
      case 'email':
        errorMessage = MESSAGES.validationEmail;
        break;
      case 'password':
        errorMessage = MESSAGES.validationPassword;
        break;
    }

    if (!element.value) {
      errorMessage = MESSAGES.validationRequiredField;
      this._isInputError(errorElement, errorMessage);
    } else if (!element.checkValidity()) {
      this._isInputError(errorElement, errorMessage);
    } else {
      this._resetInputError(errorElement);
      return true;
    }
  }

  _generateError(text) {
    const error = document.createElement('span')
    error.className = 'popup__error-message popup__error-message-form'
    error.innerHTML = text
    return error
  }

  _isInputError(element, errorMessage) {
    element.classList.remove('popup__error-message_hidden');
    element.textContent = errorMessage;
  }

  _resetInputError(element) {
    element.classList.add('popup__error-message_hidden');
  }

  _elementDisabled(element) {
    element.disabled = true;
  }

  _elementEnabled(element) {
    element.disabled = false;
  }

  _submitButtonDisabled(element) {
    element.classList.add('button_disabled');
    this._elementDisabled(element);
  }

  _submitButtonEnabled(element) {
    element.classList.remove('button_disabled');
    this._elementEnabled(element);
  }
}