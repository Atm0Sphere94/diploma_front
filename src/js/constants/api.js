const MAIN_API = {
  url: 'https://api.a1mosandbox.ru/',
  routes: {
    signIn: '/signin',
    signUp: '/signup',
    logOut: '/logout',
    currentUser: '/users/me',
    articles: '/articles'
  }
};

const NEWS_API = {
  url: 'https://newsapi.org/v2/everything',
  apiKey: 'bdab9afdb3f54105b4acbf586ed328e8',
  pageSize: 100,
  amountDays: 7
}

const GITHUB_PAGES_MAIN = 'https://atm0sphere94.github.io/diploma_front/';

export {
  MAIN_API,
  NEWS_API,
  GITHUB_PAGES_MAIN
}