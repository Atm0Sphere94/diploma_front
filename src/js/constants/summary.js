import { findElement } from '../utils/helpers';

const SUMMARY_ELEMENT = {
  container: findElement('.summary'),
}

const SAVED_ARTICLE_VARIANTS = [
  'сохранённая статья',
  'сохранённые статьи',
  'сохранённых статей'
];

export {
  SUMMARY_ELEMENT,
  SAVED_ARTICLE_VARIANTS
}