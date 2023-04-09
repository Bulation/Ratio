export const BASE_URL = 'https://course.7t33n.ru/rest/v1';
export const SITE_URL = import.meta.env.BASE_URL;
export const MENU_ITEMS_COUNT = 3;
export const ARTICLES_COUNT_PER_PAGE = 3;
export const MENU_LINKS_OBJECT = [
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
