import "./pages/index.css";

/** Хелперы */
import {
  handleClickHamburger,
  handleClickSignOut
} from './js/utils/handlers';

import {
  findElement,
  predecateArticle
} from './js/utils/helpers';

import {
  auth,
  mainApi,
  newsApi
} from './js/utils/index';

/** Классы */
import Header from './blocks/header/Header';
import Popup from './blocks/popup/Popup';
import Results from './blocks/results/Results';
import Card from './blocks/card/Card';
import Form from './js/components/Form';

/** Константы */
import {
  HEADER
} from './js/constants/header'
import {
  NEWS_CARD,
  NEWS_CARD_LIST,
  CARDS_DISPLAYED
} from './js/constants/cards';
import {
  POPUP,
  POPUP_LINKS,
  POPUP_SIGN_IN,
  POPUP_SIGN_UP,
  POPUP_SIGN_UP_SUCCESS
} from './js/constants/popup';
import {
  FORM_SIGN_IN,
  FORM_SIGN_UP,
  FORM_SEARCH
} from './js/constants/form';

/** Создаем экземпляры классов */
/** Вывод сохраненных результатов */
const newsCardList = new Results({ ...NEWS_CARD_LIST });

/** Хеадер */
const header = new Header({
  signOutButton: HEADER.signOutBtn,
  navigation: HEADER.navigation,
});

/** Добавляем обработчики событий на элементы шапки */
header.setHandlers([
  {
    element: HEADER.signInBtn,
    event: 'click',
    callback: event => handlerClickSignIn(event)
  },
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

/*Попап*/
const popup = new Popup({ ...POPUP });

/** Форма поиска */
const searchForm = new Form({ ...FORM_SEARCH });
searchForm.setHandlers([
  {
    element: findElement(FORM_SEARCH.form),
    event: 'submit',
    callback: event => handlerSearch(event)
  },
]);

/** Массив сохраненных карточек */
let savedCards = [];

/**Если авторизован рендерим шапку */
const token = auth.getToken();

if (token) {
  handlerLoadPage(token)
}

/** Обработчик загрузки страницы */
function handlerLoadPage(token) {
  if (token) {
    //getArticles(token)
    mainApi
      .getUserData(token)
      .then(res => headerRender(res))
      .catch(err => console.log(err))
  }
}

/** Функция рендера шапки */
function headerRender(res) {
  const isLoggedIn = true;
  const userName = res.data.name;

  const token = auth.getToken();
  mainApi
    .getArticles(token)
    .then(res => {
      savedCards = res.data
      const disabledLink = (
        (savedCards.length <= 0) || (savedCards === [])
      ) ? true : false;
      header.render(isLoggedIn, userName, disabledLink);
    })
    .catch(err => console.log(err));
}

/** Функция открытия попопа "Авторизации" */
function openSignInPopup(event) {
  event.target
    .removeEventListener('click', openSignInPopup);

  popup.close();
  popup.clearContent();
  popup.setContent(
    POPUP_SIGN_IN.template
  );
  popup.open();

  const loginForm = new Form({ ...FORM_SIGN_IN });
  loginForm.setFormValidate();
  loginForm.setHandlers([
    {
      element: findElement(FORM_SIGN_IN.form),
      event: 'submit',
      callback: handlerSubmitFormSignIn
    },
  ]);

  findElement(POPUP_LINKS.signUpLink)
    .addEventListener('click', openSignUpPopup);
}

/** Функция открытия попопа "Регистрации" */
function openSignUpPopup(event) {
  event.target
    .removeEventListener('click', openSignUpPopup);

  popup.close();
  popup.clearContent();
  popup.setContent(
    POPUP_SIGN_UP.template
  );
  popup.open();

  const registerForm = new Form({ ...FORM_SIGN_UP });
  registerForm.setFormValidate();
  registerForm.setHandlers([
    {
      element: findElement(FORM_SIGN_UP.form),
      event: 'submit',
      callback: handleSubmitFormSignUp
    },
  ]);

  findElement(POPUP_LINKS.signInLink)
    .addEventListener('click', openSignInPopup);
}

/** Функция открытия попопа при успешной регистрации */
function openSuccessRegisteredPopup() {
  popup.clearContent();
  popup.setContent(
    POPUP_SIGN_UP_SUCCESS.template
  );
  popup.open();

  findElement(POPUP_LINKS.signInLink)
    .addEventListener('click', openSignInPopup);
};

/* Обработчик при клике на кнопку Автризации в шапке */
function handlerClickSignIn(event) {
  const token = auth.getToken();
  if (token) {
    mainApi
      .getUserData(token)
      .then(res => {
        headerRender(res);
      })
      .catch(err => console.log(err))

  } else {
    openSignInPopup(event);
  }

  event.target.blur();
}

/* Обработчик формы попапа "Авторизации"*/
function handlerSubmitFormSignIn(event) {
  event.preventDefault();
  const loginForm = this;

  loginForm.formDisabled();
  const formData = loginForm.getInfo();

  mainApi
    .signin(formData)
    .then(res => {
      const { token } = res;

      if (token) {
        auth.setToken(token);
        mainApi
          .getUserData(token)
          .then(res => headerRender(res))
          .catch(err => err);

        loginForm.removeHandlers();
        popup.close();
        loginForm.formEnabled();
        popup.clearContent();
      } else {
        return Promise.reject(res.message);
      }

    })
    .catch(err => {
      loginForm.setServerError(err)
    });
}

/* Обработчик формы попапа "Регистрация"*/
function handleSubmitFormSignUp(event) {
  event.preventDefault();
  const registerForm = this;

  registerForm.formDisabled();
  const formData = registerForm.getInfo();

  mainApi
    .signup(formData)
    .then((res) => {
      if(!res.message) {
        registerForm.removeHandlers();
        popup.close();
        registerForm.formEnabled();
        openSuccessRegisteredPopup();

      } else {
        return Promise.reject(res.message);
      }

    })
    .catch(err => registerForm.setServerError(err))
}

/** Обработчик поиска новостей с формы */
function handlerSearch(event) {
  event.preventDefault();
  searchForm.formDisabled();

  const token = auth.getToken();
  const searchData = searchForm.getInfo();
  const searchDataValue = Object.values(searchData)[0];

  newsCardList.showResults();
  newsCardList.renderLoader();

  if (token) {
    mainApi
      .getArticles(token)
      .then(res => {return savedCards = res.data})
      .catch(err => err);
  }


  newsApi
  .getNews(searchDataValue)
  .then(res => {
    if (res.status === 'ok') {
      newsCardList.cards = res.articles;
      newsCardList.renderResults(handlerShowMoreCards);
      if(newsCardList.cards.length > 0) {
        for (let i = 0; i < CARDS_DISPLAYED; i++) {
          if (newsCardList.cards[i]) {
            addNewsCard(newsCardList.cards[i], searchDataValue);
          } else {
            break;
          }
        }
        if (newsCardList.cards.length > CARDS_DISPLAYED) {
          newsCardList.showMore(true);
          newsCardList.counter = CARDS_DISPLAYED;
        }
        searchForm.formEnabled();
      } else {
        newsCardList.renderError();
        searchForm.formEnabled();
      }
    }
  })
  .catch((err) => {
    newsCardList.renderError(err);
    searchForm.formEnabled();
  })
}

/** Функция добавляет новую карточку статьи
 * Преобразуем данные для сохранения в нужно виде
 * добавляем карточку в разметку
 */
const addNewsCard = (article, searchValue) => {
  const articleData = predecateArticle(article, searchValue);
  const newsCard = new Card({ ...NEWS_CARD });
  newsCard.init(articleData);

  const buttonElement = newsCard.node.querySelector('.card__button')

  newsCard.setHandlers([
    {
      element: buttonElement,
      event: 'click',
      callback: e => handlerMarkButtons(e, newsCard, articleData)
    },
    {
      element: buttonElement,
      event: 'mouseover',
      callback: e => handlerShowTooltip(e)
    },
    {
      element: buttonElement,
      event: 'mouseout',
      callback: e => handlerShowTooltip(e)
    },
  ]);

  if (token) {
    savedCards.forEach(card => {
      if (card.title === articleData.title && card.link === articleData.link) {
        newsCard.id = card._id;
        buttonElement.classList.add('card__button_mark_active');
      }
    })
  }

  newsCardList.renderCards.push(newsCard)
  newsCardList.addCard(newsCard.node);
}

/** Обработчик кнопки "Показать больше",
 * для подгрузки следующих статей
 */
const handlerShowMoreCards = () => {
  const searchData = searchForm.getInfo();
  const searchDataValue = Object.values(searchData)[0];

  for (let i = newsCardList.counter; i < newsCardList.counter + CARDS_DISPLAYED; i++) {
    if (newsCardList.cards[i]) {
      addNewsCard(newsCardList.cards[i], searchDataValue);
    } else {
      newsCardList.showMore(false);
      break;
    }
  }
  newsCardList.counter += CARDS_DISPLAYED;
};

/** Обработчик кнопки для сохранения статей */
const handlerMarkButtons = (e, articleElement, articleData) => {
  e.preventDefault();
  e.stopPropagation();

  const token = auth.getToken();

  if (token) {
    if (e.target.classList.contains('card__button_mark_active')) {
      mainApi
        .removeArticle(articleElement.id, token)
        .then(() => {
          e.target.classList.remove('card__button_mark_active');
        })
        .catch(err => console.log(err));
    } else {
      mainApi
        .createArticle(articleData, token)
        .then(res => {
          articleElement.id = res.data._id;
          e.target.classList.add('card__button_mark_active');
        })
        .catch(err => console.log(err));
    }

    handlerLoadPage(token)
  }

  event.target.blur();
}

/** Обработчик при наведении на кнопку
 * если не авторизован показываем Тооltip
 * c сообщением об авторизации
 */
const handlerShowTooltip = e => {
  const token = auth.getToken();

  if (!token) {
    const tooltip = e.target.querySelector('.card__tooltip');
    tooltip.classList.toggle('card__tooltip_show');
  }
};