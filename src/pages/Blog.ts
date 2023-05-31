import Component from '../common/component';
import { IArticle } from '../interfaces/IArticle';
import Home from './Home/Home';
import Page from './Page';

export default class Blog extends Page {
  parent: HTMLElement;
  home: Home;
  main: Component;
  renderBanner: (articleData: IArticle, articleStyles: Record<string, string>) => void;
  renderArticlesSection: () => void;
  renderArticle: (articleData: IArticle, img: string) => void;
  articles: IArticle[];
  counter: number;
  articlesSection: Component;
  constructor(parent: HTMLElement) {
    super();
    this.parent = parent;
    const home = new Home(parent); // применяем композицию и привязываем методы из класса Home
    this.renderBanner = home.renderBanner.bind(this);
    this.renderArticlesSection = home.renderArticlesSection.bind(this);
    this.renderArticle = home.renderArticle.bind(this);
  }

  pageWillUnmount() {
    this.main.destroy();
  }

  render(featuredArticle: IArticle, articles: IArticle[]) {
    this.counter = 0; // свойство будет содержать индекс статьи, которую надо отрендерить
    this.main = new Component(this.parent, 'main', '', '');
    this.articles = articles;
    this.renderBanner(featuredArticle, { top: '0', left: '45px' });
    this.renderArticlesSection();
    for (let i = 0; i < 3; i += 1) {
      const img = new URL(`../../public/img/article${this.counter}.jpg`, import.meta.url).href;
      this.renderArticle(this.articles[this.counter], img);
      this.counter++;
    }
    this.observeArticles();
  }

  observeArticles() {
    // метод для реализации бесконечной ленты
    const observerDiv = new Component(this.articlesSection.node, 'div', '', '');
    observerDiv.setStyle('height', '1px'); // создание дива, за которым будет следить обсервер. При скролле до дива будет подгружаться контент
    const options = {
      rootMargin: '0px',
      threshold: 0.5,
    };
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        for (let i = 0; i < 3; i += 1) {
          const img = new URL(`../../public/img/article${this.counter}.jpg`, import.meta.url).href;
          this.renderArticle(this.articles[this.counter], img);
          this.counter++;
          if (this.counter === this.articles.length) {
            // если счетчик превысил индекс последнего элемента в массиве, то обнуляем счетчик
            this.counter = 0;
          }
        }
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(observerDiv.node);
  }
}
