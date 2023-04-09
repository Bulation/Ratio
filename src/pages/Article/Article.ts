import Component from '../../common/component';
import getCreatedDate from '../../helperFunctions/getCreatedDate';
import getMinsRead from '../../helperFunctions/getMinsRead';
import { IDetailedArticle } from '../../interfaces/IDetailedArticle';
import Page from '../Page';
import authorAvatar from '../../assets/author.jpg';
import { SITE_URL } from '../../constants/constants';

export default class Article extends Page {
  main: Component;
  parent: HTMLElement;
  article: Component;

  constructor(parent: HTMLElement) {
    super();
    this.parent = parent;
  }

  removePage() {
    this.main.destroy();
  }

  render(
    articleData: IDetailedArticle,
    img: string,
    prevArticle: IDetailedArticle | undefined,
    nextArticle: IDetailedArticle | undefined
  ) {
    this.main = new Component(this.parent, 'main');
    const imageContainer = new Component(this.main.node, 'div', 'img-container', '');
    const articleImage = new Component<HTMLImageElement>(
      imageContainer.node,
      'img',
      'img-container__img',
      ''
    );
    articleImage.node.src = img;
    this.renderArticle(articleData);
    this.renderAuthor(articleData);
    this.renderPagination(prevArticle, nextArticle);
  }

  renderArticle(articleData: IDetailedArticle) {
    this.article = new Component(this.main.node, 'article', 'article', '');
    const articleTitle = new Component(
      this.article.node,
      'h2',
      'article__title',
      articleData.title
    );
    const articleInfo = new Component(this.article.node, 'p', 'article__info', '');
    const authorName = new Component(
      articleInfo.node,
      'span',
      'article__name',
      articleData.author.name
    );
    const createdTime = new Component(
      articleInfo.node,
      'span',
      'article__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      articleInfo.node,
      'span',
      'article__read-time',
      getMinsRead(articleData.readTime)
    );
    const articleTag = new Component(
      this.article.node,
      'p',
      'article__tag',
      `#${articleData.tag.name}`
    );
    const articleDescription = new Component(this.article.node, 'div', 'article__description', '');
    articleDescription.node.innerHTML = articleData.description;
  }

  renderAuthor(articleData: IDetailedArticle) {
    const articleAuthor = new Component(this.article.node, 'div', 'author article__author', '');
    const articleAuthorAbout = new Component(
      articleAuthor.node,
      'div',
      'author__about',
      'About the author'
    );
    const authorContent = new Component(articleAuthor.node, 'div', 'author__content', '');
    const authorImg = new Component<HTMLImageElement>(authorContent.node, 'img', 'author__img', '');
    authorImg.node.src = authorAvatar;
    const authorInfo = new Component(authorContent.node, 'div', 'author__info', '');
    const authorName = new Component(
      authorInfo.node,
      'h3',
      'author__name',
      articleData.author.name
    );
    const authorNick = new Component(
      authorInfo.node,
      'span',
      'author__nick',
      `@${articleData.author.nick}`
    );
    const authorDescription = new Component(
      authorInfo.node,
      'p',
      'author__description',
      articleData.author.about
    );
    const authorDescriptionMobile = new Component(
      articleAuthor.node,
      'p',
      'author__description_mobile',
      articleData.author.about
    );
  }

  renderPagination(
    prevArticle: IDetailedArticle | undefined,
    nextArticle: IDetailedArticle | undefined
  ) {
    const pagination = new Component(this.main.node, 'div', 'pagination', ''); // для стрелок сделать стили flex-grow: 50; width: 50%
    if (prevArticle) {
      const prev = new Component<HTMLAnchorElement>(
        pagination.node,
        'a',
        'pagination__btn pagination__btn_left',
        ''
      );
      prev.node.href = `${SITE_URL}blog/article/${prevArticle.id}`;
      prev.setListener('click', (e) => {
        e.preventDefault();
        history.pushState('', '', prev.node.href);
        const popStateEvent = new PopStateEvent('popstate');
        dispatchEvent(popStateEvent);
      });
      const arrow = new Component(prev.node, 'div', 'pagination__arrow pagination__arrow_left', '');
      const paginationText = new Component(prev.node, 'p', 'pagination__text', 'Go back: ');
      const paginationTextWeight = new Component(
        paginationText.node,
        'span',
        'pagination__text_weight',
        prevArticle.title
      );
    }
    if (nextArticle) {
      const next = new Component<HTMLAnchorElement>(
        pagination.node,
        'a',
        'pagination__btn pagination__btn_right',
        ''
      );
      next.node.href = `${SITE_URL}blog/article/${nextArticle.id}`;
      next.setListener('click', (e) => {
        e.preventDefault();
        history.pushState('', '', next.node.href);
        const popStateEvent = new PopStateEvent('popstate');
        dispatchEvent(popStateEvent);
      });
      const paginationText = new Component(next.node, 'p', 'pagination__text', 'Next up: ');
      const paginationTextWeight = new Component(
        paginationText.node,
        'span',
        'pagination__text_weight',
        nextArticle.title
      );
      const arrow = new Component(
        next.node,
        'div',
        'pagination__arrow pagination__arrow_right',
        ''
      );
    }
  }
}
