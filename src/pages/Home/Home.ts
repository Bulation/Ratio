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

  pageWillUnmount() {
    this.main.destroy();
  }

  render(featuredArticle: IArticle, articles: IArticle[]) {
    this.main = new Component(this.parent, 'main', '', '');
    this.renderBanner(featuredArticle, { top: '0', left: '45px' }); // рендер баннера, передаем туда данные и стили
    this.renderArticlesSection(); // рендер блока со статьями
    for (let i = 0; i < ARTICLES_COUNT_PER_PAGE; i += 1) {
      const img = new URL(`../../assets/article${i}.jpg`, import.meta.url).href;
      this.renderArticle(articles[i], img); // рендер каждой статьи в блоке со статьями
    }
    this.renderBanner(featuredArticle, { top: '54px', right: '78px' });
  }

  renderArticlesSection() {
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
      'articles-list__article-item',
      ''
    );
    const articleLink = new Component<HTMLAnchorElement>(
      article.node,
      'a',
      'article-link articles-list__article-link',
      ''
    );
    articleLink.node.href = `${SITE_URL}blog/article/${articleData.id}`;
    articleLink.setListener('click', (e) => {
      e.preventDefault();
      history.pushState('', '', articleLink.node.href); // при клике на статью создаем запись в истории
      const popStateEvent = new PopStateEvent('popstate');
      dispatchEvent(popStateEvent); // создаем ивент и диспатчим его. Затем роутер перенаправит на страницу со статьей
    });
    const articleImage = new Component<HTMLImageElement>(
      articleLink.node,
      'img',
      'article-link__img',
      ''
    );
    articleImage.node.src = img; // добавляем путь к фото в src
    articleImage.node.alt = 'Article image';
    const articleContent = new Component(articleLink.node, 'div', 'article-link__content', '');
    const articleTag = new Component(
      articleContent.node,
      'p',
      'article-link__tag',
      articleData.tag
    );
    const articleTitle = new Component(
      articleContent.node,
      'h3',
      'article-link__title',
      articleData.title
    );
    const authorName = new Component(
      articleContent.node,
      'span',
      'article-link__name',
      articleData.author
    );
    const createdTime = new Component(
      articleContent.node,
      'span',
      'article-link__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      articleContent.node,
      'span',
      'article-link__read-time',
      getMinsRead(articleData.readTime)
    );
    const articleDescription = new Component(
      articleContent.node,
      'div',
      'article-link__description',
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
      'div',
      'article-link banner-container__featured-article',
      ''
    );
    Object.keys(articleStyles).forEach((style) => {
      featuredArticle.setStyle(style, articleStyles[style]); // добавляем стили для баннера
    });
    const articleTag = new Component(
      featuredArticle.node,
      'p',
      'article-link__tag',
      articleData.tag
    );
    const articleTitle = new Component(
      featuredArticle.node,
      'h3',
      'article-link__title',
      articleData.title
    ).setListener('click', () => {
      history.pushState('', '', `${SITE_URL}blog/article/${articleData.id}`);
      const popStateEvent = new PopStateEvent('popstate', { state: '' });
      dispatchEvent(popStateEvent);
    });
    const authorName = new Component(
      featuredArticle.node,
      'span',
      'article-link__name',
      articleData.author
    );
    const createdTime = new Component(
      featuredArticle.node,
      'span',
      'article-link__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      featuredArticle.node,
      'span',
      'article-link__read-time',
      getMinsRead(articleData.readTime)
    );
    const articleDescription = new Component(
      featuredArticle.node,
      'p',
      'article-link__description',
      articleData.description
    );
  }
}
