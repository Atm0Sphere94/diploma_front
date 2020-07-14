import BaseComponent from "../../js/components/BaseComponent";

export default class Results extends BaseComponent {
    constructor(props) {
      super();

      const {
        container,
      } = props;

      this._container = container;
      this._loaderTemplate = this._findElement(document, '#loader-template');
      this._errorTemplate = this._findElement(document, '#error-template');
      this._resultsTemplate = this._findElement(document, '#results-template');

      this.renderCards = [];
      this.cards = null;
    }

    renderResults(handleShowMore) {
      this._clearResults();
      this._setTemplate(this._resultsTemplate);

      this._resultsContainer = this._findElement(this._container, '.results__items');
      this._showMoreBtn = this._findElement(this._container, '.results__more-button');

      if (handleShowMore) {
        this._handlerShowMore = handleShowMore;
        this._addListener(
          this._showMoreBtn,
          'click',
          () => {
            this._handlerShowMore();
            this._showMoreBtn.blur();
          }
        );
      }

    }

    renderError(error) {
      this._clearResults();
      this._setTemplate(this._errorTemplate);
      this._showElement(this._container);

      if (error) {
        const errorTextElement = this._findElement(
          document, '.results__additional-text'
        );
        errorTextElement.textContent = error;
      }
    }

    renderLoader() {
      this._clearResults();
      this._setTemplate(this._loaderTemplate);
      this._showElement(this._container);
    }

    hideLoader() {
      this._clearResults();
      this._setTemplate(this._loaderTemplate);
      this._hideElement(this._container);
    }

    hideResults() {
      this._clearResults();
      this._hideElement(this._container);
    }

    showResults() {
      this._clearResults();
      this._showElement(this._container);
    }

    showMore(isShow) {
      if (isShow) {
        this._showElement(this._showMoreBtn);
      } else {
        this._hideElement(this._showMoreBtn);
      }
    }

    addCard(card) {
      this._resultsContainer.appendChild(card);
    }

    _setTemplate(template) {
      this._container.appendChild(template.content.cloneNode(true));
    }

    _clearResults() {
      this._container.innerHTML = '';
    }

    _hideElement(element) {
      if (element) {
        element.classList.add('block_hidden');
      }
    }

    _showElement(element) {
      if (element && element.classList.contains('block_hidden')) {
        element.classList.remove('block_hidden');
      }
    }
}