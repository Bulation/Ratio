export const BASE_URL = 'https://course.7t33n.ru/rest/v1';
export const SITE_URL = import.meta.env.BASE_URL; // получение адреса сайта из env переменной
export const MENU_ITEMS_COUNT = 3; // количество пунктов в меню
export const ARTICLES_COUNT_PER_PAGE = 3; // количество статей на домашней странице
export const MENU_LINKS_OBJECT = [
  // массив объектов с контентом и урл для пунктов меню
  {
    content: 'Home',
    url: SITE_URL,
  },
  {
    content: 'Blog',
    url: `${SITE_URL}blog`,
  },
  {
    content: 'About',
    url: `${SITE_URL}about`,
  },
];
