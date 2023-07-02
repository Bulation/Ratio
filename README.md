# module5

test

## Краткая информация о проекте

Сайт предстm,m,авляет из себя SPA и состоит из 4 страниц: Home, Search, Details и Order. Все технические требования выполнены, также добавлена работа с Local Storage.

## Стек технологий

- Vue 3
- Pinia
- Swiper
- Leaflet Map
- Skeleton from Element-Plus
- Vue Datepicker
- Vue Router
- TypeScript
- ESLint
- Prettier
- Vite
- SCSS
- БЭМ

## Архитектура

Приложение поделено на папку pages, в которых хранятся файлы для работы с конкретными страницами; на папку store, в котором заключена логика работы с глобальным стейтом; на папку layout, в котором находятся хедер и футер, на папку с хуками и директивами, на папку components, в котором находятся компоненты, общие для всех страниц и с подпапкой UI для переиспользуемух мелких компонентов без логики чисто для отрисовки.

## Установка проекта

```sh
npm install
```

### Запуск в браузере

```sh
npm run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Деплой

https://ratio-module5.netlify.app
