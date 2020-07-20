import BaseComponent from "../../js/components/BaseComponent"
import { SAVED_ARTICLE_VARIANTS } from '../../js/constants/summary';
import { declOfNum } from '../../js/utils/helpers';

export default class Summary extends BaseComponent {
  constructor(props){
    super();

    const {
      container
    } = props;

    this._container = container;
    this._user = this._findElement(this._container, '#userName');
    this._amountArticles = this._findElement(this._container, '#amountArticles');

    this._summaryKeywords = this._findElement(this._container, '#summaryKeywords');
    this._keywords = this._findElement(this._container, '#keywords');
    this._keywordsOther = this._findElement(this._container, '#amountKeywords');
    this._otherKeywordsWrap = this._findElement(this._container, '#otherKeywordsWrap');
  }

  setCardsData(data) {
    this._cardsData = data;
    this._render();
  }

  setUserName(name) {
    this._userName = name;
    if (this._userName) {
      this._user.textContent = this._userName
    }
  }

  _render() {
    if (this._cardsData) {
      const articlesAmount = this._cardsData.length;
      this._amountArticles.textContent = `${articlesAmount} ${declOfNum(articlesAmount, SAVED_ARTICLE_VARIANTS)}`;

      if (articlesAmount > 0 && this._summaryKeywords) {
        this._summaryKeywords.classList.remove('block_hidden');
        const amountKeywords = this._countingKeywords(this._cardsData);
        this._keywords.textContent = this._getFirstTwoKeywords(amountKeywords);

        const amountKeywordsArr = Object.keys(amountKeywords)

        if (amountKeywordsArr.length > 2) {
          this._otherKeywordsWrap.style.display = 'inline-block';
          this._keywordsOther.textContent = amountKeywordsArr.length - 2;
        } else {
          this._otherKeywordsWrap.style.display = 'none';
        }

      } else {
        this._summaryKeywords.classList.add('block_hidden');
      }

    }
  }

  _getFirstTwoKeywords(amount) {
    const keywords = Object.keys(amount);
    keywords.sort((a, b) => amount[b] - amount[a]);

    let result = '';
    if (keywords.length > 0) {
        result += keywords[0];
    }

    if (keywords.length > 1) {
        result += `, ${keywords[1]}`;
    }

    return result;
  }

  _countingKeywords(data) {
    return data.reduce((acc, card) => {
        const count = acc[card.keyword] ? acc[card.keyword] + 1 : 1;

        return { ...acc, [card.keyword]: count };
    }, {});
  }
}