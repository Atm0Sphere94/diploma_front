[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger) [![](https://img.shields.io/badge/version-1.1.0-green)](https://img.shields.io/badge/version-1.1.0-green)

# Дипломная работа. Frontend проекта NewsExplorer. (Яндекс.Практикум)

### Дипломный проект представляет собой сервис, в котором можно найти новости по запросу и сохранить в личном кабинете.

### Проект состоит из двух страниц:
 - Главная. Содержит только окно поиска.
 - Страница с сохранёнными статьями. На ней отображаются новости, которые пользователь добавил в избранное.
 - Кроме этого есть попапы для авторизации и регистрации

### Предварительный результат можно посмотреть по следующим ссылкам:
 - Фронтенд расположен на https://news-explorer.tk или на [Github Pages](https://kravr.github.io/news-explorer-frontend/). На данный момент здесь реализована инфраструктура и верстка.

 - Реализовано [API](https://github.com/kravR/news-explorer-api). Бэкенд расположен на https://api.news-explorer.tk.

### Сборка и запуск
 - Склонировать репозиторий;
 - Установить необходимые зависимости: ```npm install```;
 - Запуск сервера с hot reload: ```npm run dev```;
 - Продакшн сборка проекта : ```npm run build```.
 - Продакшн сборка проекта и деплой на сервер: ```npm run deploy-serv```.
 - Продакшн сборка проекта и деплой на Github Pages: ```npm run deploy```.

 *При деплое на сервер или Github Pages в package.json необходимо внести соотвествующие изменения в настройках.
