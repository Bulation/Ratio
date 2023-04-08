export interface IDetailedArticle {
  id: number; // id новости
  title: string; // Заголовок новости
  seo: {
    id: number;
    title: string; // Заголовок для СЕО
    description: string; // Описание для СЕО
    keywords: string; // Ключевые слова для СЕО
    content: string;
  };
  author: {
    id: number;
    name: string;
    nick: string;
    about: string;
  };
  tag: {
    id: number;
    name: string;
  };
  createdAt: number; // Когда статья создана
  image: string; // Обложка статьи
  readTime: number; // Сколько времени читать
  description: string; // Контент
  nextId: number | null; // ID следующий статьи
  prevId: number | null; // ID прошлой статьи.
}
