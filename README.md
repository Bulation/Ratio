# Сайт Nuntium Blog

[Видео о модуле](https://youtu.be/WzmHU8D7sMY)

## Краткая информация о проекте

Сайт представляет из себя SPA и состоит из 4 страниц: Home, Blog, About и страница со статьей. Все технические требования выполнены, в том числе и сверхтребования: сайт задеплоен на gh-pages и набирает свыше 90 баллов на десктопе. Также реализован весь описанный функционал.

## Стек технологий

- TypeScript, ESLint, Prettier, Vite, SCSS, БЭМ

## Архитектура

При разработке был частично применен паттерн MVC и частично React-архитектура. Приложение состоит из роутера, контроллера и классов страниц, отвечающих за рендер страницы. 

- Router: отвечает за навигацию по маршрутам: при изменении адресной строки вызывается метод navigate, который вызывает метод контроллера, отвечающий за рендер нужной страницы, изменение View и изменение мета-тегов. 
- Классы в папке page рендерят страницы и отвечают за вид страницы и обрабатывают ивенты.
- Компоненты Header и Navigation не изменяются при перемещении по страницам, поэтому они вынесены отдельно и рендерятся при первом запуске сайта в конструкторе контроллера. Отвечают за отображение шапки и клики по пунктам меню

## Как запустить проект

- Прописать в терминале ```npm install```
- Затем ```npm start```

## Деплой

https://bulation.github.io/Ratio/module4/