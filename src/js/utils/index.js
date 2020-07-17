
import {
  MAIN_API,
  NEWS_API
} from '../constants/api';

import Auth from '../../js/utils/Auth';
import MainApi from '../../js/api/MainApi';
import NewsApi from '../../js/api/NewsApi';

/*Вспомогательный класс содержит общие методы авторизации*/
const auth = new Auth();

/*АПИ*/
const mainApi = new MainApi({ ...MAIN_API });
const newsApi = new NewsApi({ ...NEWS_API });

export {
  auth,
  mainApi,
  newsApi
}