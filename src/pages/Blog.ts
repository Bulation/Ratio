import Component from '../common/component';
import { IArticle } from '../interfaces/IArticle';
import Home from './Home/Home';

export default class Blog {
  parent: HTMLElement;
  home: Home;
  main: Component;
  renderBanner: (articleData: IArticle, articleStyles: Record<string, string>) => void;
  renderArticles: () => void;
  renderArticle: (articleData: IArticle, img: string) => void;
  articles: IArticle[];
  counter: number;
  timer: NodeJS.Timer | null;
  constructor(parent: HTMLElement) {
    this.parent = parent;
    const home = new Home(parent); // применяем композицию и привязываем методы из класса Home
    this.renderBanner = home.renderBanner.bind(this);
    this.renderArticles = home.renderArticles.bind(this);
    this.renderArticle = home.renderArticle.bind(this);
  }

  pageWillUnmount() {
    window.onscroll = null;
    window.onresize = null; // снимаем обработчики при уничтожении страницы
    this.main.destroy();
  }

  render(featuredArticle: IArticle, articles: IArticle[]) {
    window.onscroll = () => this.throttle(250);
    window.onresize = () => this.throttle(250); // при ресайзе высота документа будет меняться, поэтому прикрепляем обработчик
    this.counter = 0; // свойство будет содержать индекс статьи, которую надо отрендерить
    this.main = new Component(this.parent, 'main', '', '');
    this.articles = articles;
    this.renderBanner(featuredArticle, { top: '0', left: '45px' });
    this.renderArticles();
    for (let i = 0; i < 3; i += 1) {
      const img = new URL(`../assets/article${this.counter}.jpg`, import.meta.url).href;
      this.renderArticle(articles[this.counter], img);
      this.counter++;
    }
  }

  throttle(timeout: number) {
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.checkPosition();
      const timer = this.timer;
      clearTimeout(timer);
      this.timer = null;
    }, timeout);
  }

  checkPosition() {
    const height = document.body.offsetHeight; // высота документа
    const screenHeight = window.innerHeight; // высота экрана
    const scrolledHeight = window.scrollY; // высота проскроленного контента
    const threshold = height - screenHeight / 4; // пороговое значение при котором будет происходить загрузка нового контента
    const positionOfPageBottom = scrolledHeight + screenHeight;
    if (positionOfPageBottom >= threshold) {
      for (let i = 0; i < 3; i += 1) {
        const img = new URL(`../assets/article${this.counter}.jpg`, import.meta.url).href;
        this.renderArticle(this.articles[this.counter], img);
        this.counter++;
        if (this.counter === this.articles.length) {
          // если счетчик превысил индекс последнего элемента в массиве, то обнуляем счетчик
          this.counter = 0;
        }
      }
    }
  }
}
