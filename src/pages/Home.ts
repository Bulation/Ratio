import Component from '../common/component';
import { ARTICLES_COUNT_PER_PAGE } from '../constants/constants';
import getCreatedDate from '../helperFunctions/getCreatedDate';
import getMinsRead from '../helperFunctions/getMinsRead';
import { IArticle } from '../interfaces/IArticle';
import Page from './Page';

export default class Home extends Page {
  parent: HTMLElement;
  main: Component<HTMLElement>;
  articlesContainer: Component<HTMLElement>;
  constructor(parent: HTMLElement) {
    super();
    this.parent = parent;
  }

  removePage() {
    this.main.destroy();
  }

  render(featuredArticle: IArticle, articles: IArticle[]) {
    this.main = new Component(this.parent, 'main', '', '');
    this.renderBanner(featuredArticle, { top: '0', left: '45' });
    this.renderArticles();
    for (let i = 0; i < ARTICLES_COUNT_PER_PAGE; i += 1) {
      this.renderArticle(articles[i]);
    }
    this.renderBanner(featuredArticle, { top: '54', right: '78' });
  }

  renderArticles() {
    const articlesSection = new Component(this.main.node, 'section', 'articles-section', '');
    this.articlesContainer = new Component(articlesSection.node, 'div', 'articles-container', '');
    const articlesTitle = new Component(
      this.articlesContainer.node,
      'h2',
      'articles-container__title',
      `Editor’s Picks`
    );
  }

  renderArticle(articleData: IArticle) {
    const article = new Component(
      this.articlesContainer.node,
      'article',
      'article article-container__article',
      ''
    ).setListener('click', () => {
      window.location.href = `/blog/articles/${articleData.id}`;
    });
    const articleImage = new Component<HTMLImageElement>(article.node, 'img', 'article__img', '');
    articleImage.node.src = articleData.image;
    const articleContent = new Component(article.node, 'div', 'article__content', '');
    const articleTag = new Component(articleContent.node, 'p', 'article__tag', articleData.tag);
    const articleTitle = new Component(
      articleContent.node,
      'h3',
      'article__title',
      articleData.title
    );
    const authorName = new Component(
      articleContent.node,
      'span',
      'article__name',
      articleData.author
    );
    const createdTime = new Component(
      articleContent.node,
      'span',
      'article__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      articleContent.node,
      'span',
      'article__readtime',
      getMinsRead(articleData.readTime)
    );
    const articleDescription = new Component(articleContent.node, 'p', 'article__description', '');
    articleDescription.node.innerHTML = articleData.description;
  }

  renderBanner(articleData: IArticle, articleStyles: Record<string, string>) {
    const banner = new Component(this.main.node, 'article', 'banner-article', '');
    const bannerContainer = new Component(banner.node, 'div', 'banner-container', '').setStyle(
      'background',
      `url(${articleData.image})`
    );
    const featuredArticle = new Component(
      bannerContainer.node,
      'div',
      'article banner-container__featured-article',
      ''
    );
    Object.keys(articleStyles).forEach((style) => {
      featuredArticle.setStyle(style, articleStyles[style]);
    });
    const articleTag = new Component(featuredArticle.node, 'p', 'article__tag', articleData.tag);
    const articleTitle = new Component(
      featuredArticle.node,
      'h3',
      'article__title',
      articleData.title
    ).setListener('click', () => {
      window.location.href = `/blog/article/${articleData.id}`;
    });
    const authorName = new Component(
      featuredArticle.node,
      'span',
      'article__name',
      articleData.author
    );
    const createdTime = new Component(
      featuredArticle.node,
      'span',
      'article__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      featuredArticle.node,
      'span',
      'article__readtime',
      getMinsRead(articleData.readTime)
    );
    const articleDescription = new Component(
      featuredArticle.node,
      'p',
      'article__description',
      articleData.description
    );
  }
}
