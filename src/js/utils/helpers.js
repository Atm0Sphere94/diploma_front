import { DATE } from '../constants/date';
import { MESSAGES } from '../constants/messages'

const findElement = (element) => document.querySelector(element);
const toggleClass = (element, className) => element.classList.toggle(className);

const dateFormat = (datePublished) => {
  const formatter = new Intl.DateTimeFormat(DATE.locale, DATE.options);
  const [
    { value: day },,{ value: month },,{ value: year }
  ] = formatter.formatToParts(new Date(datePublished));

  return `${day} ${month}, ${year}`;
}

function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

const predecateArticle = (article, keyword) => {
    const objArticle = {};
    objArticle.keyword = ucFirst(keyword);
    objArticle.title = article.title;
    objArticle.text = article.description || MESSAGES.descriptionStubText;
    objArticle.source = article.source.name;
    objArticle.date = dateFormat(article.publishedAt);
    objArticle.link = article.url;
    objArticle.image = article.urlToImage || MESSAGES.imageStubUrl;

    return objArticle;
}

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
     ? 2
     : cases[(number % 10 < 5) ? number % 10 : 5 ]
  ];
}

export {
  findElement,
  toggleClass,
  dateFormat,
  predecateArticle,
  declOfNum,
  ucFirst
}