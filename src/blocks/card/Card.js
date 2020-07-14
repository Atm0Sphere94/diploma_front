import BaseComponent from "../../js/components/BaseComponent";

export default class Card extends BaseComponent {
  constructor(props) {
    super();

    const {
      template
    } = props;

    this._template = template;
    this._id = null;
  }

  _createCardElement() {
    const cardElement = document.createElement('article');
    cardElement.className = 'card';

    return cardElement;
  }

  _setTemplate(container, template) {
    return container.appendChild(template.content.cloneNode(true));
  }

  init(article) {
    const {
      title,
      text,
      date,
      source,
      image,
      keyword,
      link,
      _id
    } = article;

    this._card = this._createCardElement();
    this._setTemplate(this._card, this._template);

    if (_id) {
      this._id = _id;
    }

    this._findElement(this._card, '.card__title').textContent = title;
    this._findElement(this._card, '.card__text').textContent = text;
    this._findElement(this._card, '.card__source').textContent = source;

    const markElement = this._findElement(this._card, '.card__mark');
    if (markElement) {
      markElement.textContent = keyword;
    }

    const cardDateElement = this._findElement(this._card, '.card__date');
    cardDateElement.setAttribute('datetime', date);
    cardDateElement.textContent = date;

    const cardImgElement = this._findElement(this._card, '.card__image');
    cardImgElement.src = image;
    cardImgElement.alt = title;

    this.setHandlers([
      {
        element: this._card,
        event: 'click',
        callback: () => {
          window.open(link, '_blank');
        },
      }
    ]);
    return this._card;
  }

  remove() {
    this.removeHandlers();
    this._card.remove();
  }

  set id(cardId) {
    this._id = cardId;
  }

  get id() {
    return this._id;
  }

  get node() {
    return this._card;
  }
}