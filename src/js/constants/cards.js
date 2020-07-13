import { findElement } from '../utils/helpers';

const NEWS_CARD_LIST = {
  container: findElement('.results'),
};

const NEWS_CARD = {
  template: findElement('#news-card'),
};

const CARDS_DISPLAYED = 3;

export {
  NEWS_CARD,
  NEWS_CARD_LIST,
  CARDS_DISPLAYED
}