import Component from '../common/component';
import getCreatedDate from '../helperFunctions/getCreatedDate';
import getMinsRead from '../helperFunctions/getMinsRead';
import { IDetailedArticle } from '../interfaces/IDetailedArticle';

export default class Article {
  main: Component;
  parent: HTMLElement;
  article: Component<HTMLElement>;

  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  removePage() {
    this.main.destroy();
  }

  render(
    articleData: IDetailedArticle,
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
    articleImage.node.src = articleData.image;
    this.renderArticle(articleData);
    this.renderAuthor(articleData);
    this.renderPagination(articleData, prevArticle, nextArticle);
  }

  renderArticle(articleData: IDetailedArticle) {
    this.article = new Component(this.main.node, 'article', 'article', '');
    const articleTitle = new Component(
      this.article.node,
      'h2',
      'article__title',
      articleData.title
    );
    const authorName = new Component(
      this.article.node,
      'span',
      'article__name',
      articleData.author.name
    );
    const createdTime = new Component(
      this.article.node,
      'span',
      'article__time',
      getCreatedDate(articleData.createdAt)
    );
    const articleReadTime = new Component(
      this.article.node,
      'span',
      'article__readtime',
      getMinsRead(articleData.readTime)
    );
    const articleTag = new Component(
      this.article.node,
      'p',
      'article__tag',
      `#${articleData.tag.name}`
    );
    const articleDescription = new Component(this.article.node, 'p', 'article__description', '');
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
    authorImg.node.src = articleData.image;
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
      articleData.author.nick
    );
    const authorDescription = new Component(
      authorInfo.node,
      'p',
      'author__description',
      articleData.author.about
    );
  }

  renderPagination(
    articleData: IDetailedArticle,
    prevArticle: IDetailedArticle | undefined,
    nextArticle: IDetailedArticle | undefined
  ) {
    const pagination = new Component(this.main.node, 'div', 'pagination', ''); // для стрелок сделать стили flex-grow: 50; width: 50%
    if (prevArticle) {
      const prev = new Component<HTMLAnchorElement>(pagination.node, 'a', 'pagination__prev', '');
      prev.node.href = `/blog/articles/${prevArticle.id}`;
      prev.setListener('click', (e) => {
        e.preventDefault();
        history.pushState('', '', prev.node.href);
        const popStateEvent = new PopStateEvent('popstate');
        dispatchEvent(popStateEvent);
      });
      const arrow = new Component(
        prev.node,
        'div',
        'pagination__arrow pagination__arrow_left',
        '<'
      );
      const paginationText = new Component(prev.node, 'span', 'pagination__text', 'Go back: ');
      const paginationTextWeight = new Component(
        prev.node,
        'span',
        'pagination__text_weight',
        prevArticle.title
      );
    }
    if (nextArticle) {
      const next = new Component<HTMLAnchorElement>(pagination.node, 'a', 'pagination__prev', '');
      next.node.href = `/blog/articles/${nextArticle.id}`;
      next.setListener('click', (e) => {
        e.preventDefault();
        history.pushState('', '', next.node.href);
        const popStateEvent = new PopStateEvent('popstate');
        dispatchEvent(popStateEvent);
      });
      const paginationText = new Component(next.node, 'span', 'pagination__text', 'Next up: ');
      const paginationTextWeight = new Component(
        next.node,
        'span',
        'pagination__text_weight',
        nextArticle.title
      );
      const arrow = new Component(
        next.node,
        'div',
        'pagination__arrow pagination__arrow_right',
        '>'
      );
    }
  }
}
