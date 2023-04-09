import Component from '../../common/component';
import { ARTICLES_COUNT_PER_PAGE, SITE_URL } from '../../constants/constants';
import getCreatedDate from '../../helperFunctions/getCreatedDate';
import getMinsRead from '../../helperFunctions/getMinsRead';
import { IArticle } from '../../interfaces/IArticle';
import Page from '../Page';

export default class Home extends Page {
  parent: HTMLElement;
  main: Component;
  articlesContainer: Component;
  constructor(parent: HTMLElement) {
    super();
    this.parent = parent;
  }

  removePage() {
    this.main.destroy();
  }

  render(featuredArticle: IArticle, articles: IArticle[]) {
    this.main = new Component(this.parent, 'main', '', '');
    this.renderBanner(featuredArticle, { top: '0', left: '45px' });
    this.renderArticles();
    for (let i = 0; i < ARTICLES_COUNT_PER_PAGE; i += 1) {
      const img = new URL(`../../assets/article${i}.jpg`, import.meta.url).href;
      this.renderArticle(articles[i], img);
    }
    this.renderBanner(featuredArticle, { top: '54px', right: '78px' });
  }

  renderArticles() {
    const articlesSection = new Component(this.main.node, 'section', 'articles-section', '');
    this.articlesContainer = new Component(articlesSection.node, 'ul', 'articles-list', '');
    const articlesTitle = new Component(
      this.articlesContainer.node,
      'h2',
      'articles-list__title',
      `Editor’s Picks`
    );
  }

  renderArticle(articleData: IArticle, img: string) {
    const article = new Component(
      this.articlesContainer.node,
      'li',
      'article-item articles-list__article-item',
      ''
    ).setListener('click', () => {
      history.pushState('', '', `${SITE_URL}blog/article/${articleData.id}`);
      const popStateEvent = new PopStateEvent('popstate', { state: '' });
      dispatchEvent(popStateEvent);
    });
    const articleImage = new Component<HTMLImageElement>(
      article.node,
      'img',
      'article-item__img',
      ''
    );
    articleImage.node.src = img;
    const articleContent = new Component(article.node, 'div', 'article-item__content', '');
    const articleTag = new Component(
      articleContent.node,
      'p',
      'article-item__tag',
      articleData.tag
    );
    const articleTitle = new Component(
      articleContent.node,
      'h3',
      'article-item__title',
      articleData.title
    );
    const authorName = new Component(
      articleContent.node,
      'span',
      'article-item__name',
      articleData.author
    );
    const createdTime = new Component(
      articleContent.node,
      'span',
      'article-item__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      articleContent.node,
      'span',
      'article-item__read-time',
      getMinsRead(articleData.readTime)
    );
    const articleDescription = new Component(
      articleContent.node,
      'div',
      'article-item__description',
      ''
    );
    articleDescription.node.innerHTML = articleData.description;
  }

  renderBanner(articleData: IArticle, articleStyles: Record<string, string>) {
    const banner = new Component(this.main.node, 'section', 'banner-section', '');
    const bannerContainer = new Component(banner.node, 'div', 'banner-container', '');
    const bannerImg = new Component(bannerContainer.node, 'div', 'banner-img', '').setStyle(
      'background-image',
      `url(${articleData.image})`
    );
    const featuredArticle = new Component(
      bannerContainer.node,
      'article',
      'article-item banner-container__featured-article',
      ''
    );
    Object.keys(articleStyles).forEach((style) => {
      featuredArticle.setStyle(style, articleStyles[style]);
    });
    const articleTag = new Component(
      featuredArticle.node,
      'p',
      'article-item__tag',
      articleData.tag
    );
    const articleTitle = new Component(
      featuredArticle.node,
      'h3',
      'article-item__title',
      articleData.title
    ).setListener('click', () => {
      history.pushState('', '', `${SITE_URL}blog/article/${articleData.id}`);
      const popStateEvent = new PopStateEvent('popstate', { state: '' });
      dispatchEvent(popStateEvent);
    });
    const authorName = new Component(
      featuredArticle.node,
      'span',
      'article-item__name',
      articleData.author
    );
    const createdTime = new Component(
      featuredArticle.node,
      'span',
      'article-item__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      featuredArticle.node,
      'span',
      'article-item__read-time',
      getMinsRead(articleData.readTime)
    );
    const articleDescription = new Component(
      featuredArticle.node,
      'p',
      'article-item__description',
      articleData.description
    );
  }
}
