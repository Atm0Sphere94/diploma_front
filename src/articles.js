import "./pages/articles.css";

/** Хелперы */
import {
  handleClickHamburger,
  handleClickSignOut
} from './js/utils/handlers';
import {
  auth,
  mainApi,
} from './js/utils/index';

/** Константы */
import {
  HEADER
} from './js/constants/header'
import {
 SUMMARY_ELEMENT
} from './js/constants/summary'
import {
  NEWS_CARD,
  NEWS_CARD_LIST
} from './js/constants/cards';

/** Классы */
import Header from './blocks/header/Header';
import Summary from './blocks/summary/Summary';
import Results from './blocks/results/Results';
import Card from './blocks/card/Card';

/** Создаем экземпляры классов */
/** Хеадер */
const header = new Header({
  signOutButton: HEADER.signOutBtn,
  navigation: HEADER.navigation,
});

/** Краткая информация */
const articlesSummary = new Summary({ ...SUMMARY_ELEMENT });

/** Вывод сохраненных результатов */
const newsCardList = new Results({ ...NEWS_CARD_LIST });

/** Добавляем обработчики событий на элементы шапки */
header.setHandlers([
  {
    element: HEADER.signOutBtn,
    event: 'click',
    callback: _ => handleClickSignOut()
  },
  {
    element: HEADER.hamburgerBtn,
    event: 'click',
    callback: _ => handleClickHamburger()
  }
]);

/** Функция рендера шапки */
function headerRender(userName) {
  const isLoggedIn = true;
  const disabledLink = false;
  header.render(isLoggedIn, userName, disabledLink);
}

/** Если не авторизован редирект на главную
 *  Иначе рендерим шапку
 */
const token = auth.getToken();
if (!token) {
  auth._redirectToMainPage();
} else {
  mainApi
    .getUserData(token)
    .then(res => {
      headerRender(res.data.name);
      articlesSummary.setUserName(res.data.name);
    })
    .catch(err => console.log(err));
}

newsCardList.showResults();
newsCardList.renderLoader();
mainApi
  .getArticles(token)
  .then(res => {
    newsCardList.cards = res.data;
    if (newsCardList.cards.length > 0) {
      newsCardList.renderResults();
      newsCardList.showMore(false);
      newsCardList.cards.forEach(card => {
        const newsCard = new Card({ ...NEWS_CARD });
        newsCard.init(card);
        newsCard.setHandlers([
          {
            element: newsCard.node.querySelector('.card__button'),
            event: 'click',
            callback: e => handlerDeleteCard(e, newsCard, card)
          },
        ]);
        newsCardList.addCard(newsCard.node);
      });

      articlesSummary.setCardsData(newsCardList.cards);
    } else {
      newsCardList.renderError();
      auth._redirectToMainPage();
    }
  })
  .catch(err => newsCardList.renderError(err));

const handlerDeleteCard = (e, card, data) => {
  e.preventDefault();
  e.stopPropagation();

  mainApi
    .removeArticle(data._id, token, event)
    .then(() => {
      card.remove();
      const deletedId = data._id;
      newsCardList.cards = newsCardList.cards.filter(card => card._id !== deletedId);
      articlesSummary.setCardsData(newsCardList.cards);


      if (newsCardList.cards.length === 0) {
        newsCardList.hideResults();
        auth._redirectToMainPage();
      }
    })
    .catch(err => console.log(err));
};