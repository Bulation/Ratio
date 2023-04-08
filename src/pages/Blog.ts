import Component from '../common/component';
import { IArticle } from '../interfaces/IArticle';
import Home from './Home';

export default class Blog {
  parent: HTMLElement;
  home: Home;
  main: Component;
  renderBanner: (articleData: IArticle, articleStyles: Record<string, string>) => void;
  renderArticles: () => void;
  renderArticle: (articleData: IArticle) => void;
  constructor(parent: HTMLElement) {
    this.parent = parent;
    const home = new Home(parent);
    this.renderBanner = home.renderBanner.bind(this);
    this.renderArticles = home.renderArticles.bind(this);
    this.renderArticle = home.renderArticle.bind(this);
  }

  removePage() {
    this.main.destroy();
  }

  render(featuredArticle: IArticle, articles: IArticle[]) {
    this.main = new Component(this.parent, 'main', '', '');
    this.renderBanner(featuredArticle, { top: '0', left: '45' });
    this.renderArticles();
    for (let i = 0; i < articles.length; i += 1) {
      this.renderArticle(articles[i]);
    }
  }
}
