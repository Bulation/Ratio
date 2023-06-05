import Header from '../components/Header/header';
import About from '../pages/About/About';
import API from '../api/api';
import NotFoundPage from '../pages/NotFoundPage';
import Home from '../pages/Home/Home';
import Blog from '../pages/Blog';
import Article from '../pages/Article/Article';
import { IDetailedArticle } from '../interfaces/IDetailedArticle';
import Page from '../pages/Page';
import { IAboutSEO } from '../interfaces/IAboutSEO';
import { IDetailedArticleSEO } from '../interfaces/IDetailedArticleSEO';

export default class Controller {
  about: About;
  header: Header;
  currentPage: Page;
  notFoundPage: NotFoundPage;
  home: Home;
  blog: Blog;
  article: Article;
  metaTags = ['id', 'title', 'content', 'description', 'keywords'];
  constructor() {
    this.header = new Header(document.body);
    this.home = new Home(document.body);
    this.about = new About(document.body);
    this.blog = new Blog(document.body);
    this.notFoundPage = new NotFoundPage(document.body);
    this.article = new Article(document.body); // создание инстансов классов страниц
  }

  async handleHomeRoute() {
    if (this.currentPage) {
      // если надо переключиться с одной страницы на другую, то текущую удаляем
      this.currentPage.pageWillUnmount();
    }
    this.currentPage = this.home;
    this.header.navigation.removeActiveClass();
    this.header.navigation.addActiveClass(0); // удаляем класс с текущего активного пункта меню и ставим на другой пункт
    this.header.toggleHome(true); // так как находимся на домашней странице, то ставим соответствующий флаг
    const articles = await API.getArticles();
    const featuredArticle = await API.getFeaturedData();
    this.home.render(featuredArticle, articles); // рендерим страницу с полученными данными
    this.deleteSEO(); // удаляем метатеги, если они есть
    document.title = 'Home';
  }

  async handleBlogRoute() {
    if (this.currentPage) {
      this.currentPage.pageWillUnmount();
    }
    this.currentPage = this.blog;
    this.header.navigation.removeActiveClass();
    this.header.navigation.addActiveClass(1);
    this.header.toggleHome(false);
    const articles = await API.getArticles();
    const featuredArticle = await API.getFeaturedData();
    this.blog.render(featuredArticle, articles);
    this.deleteSEO();
    document.title = 'Blog';
  }

  async handleAboutRoute() {
    if (this.currentPage) {
      this.currentPage.pageWillUnmount();
    }
    this.currentPage = this.about;
    this.header.navigation.removeActiveClass();
    this.header.navigation.addActiveClass(2);
    this.header.toggleHome(false);
    const aboutData = await API.getAboutData();
    this.about.render(aboutData);
    this.deleteSEO();
    this.addSEO(aboutData.seo); // добавляем мета-теги, полученные с api
    document.title = aboutData.seo.title;
  }

  async handleArticleRoute(params: { [key: string]: string }) {
    let prevArticle: IDetailedArticle;
    let nextArticle: IDetailedArticle;
    if (this.currentPage) {
      this.currentPage.pageWillUnmount();
    }
    this.currentPage = this.article;
    this.header.toggleHome(false);
    const articleData = await API.getArticle(params.id);
    if (articleData.prevId !== null) {
      prevArticle = await API.getArticle(articleData.prevId.toString());
    }
    if (articleData.nextId !== null) {
      nextArticle = await API.getArticle(articleData.nextId.toString());
    }
    const imgSrc = new URL(`../assets/article${params.id}.jpg`, import.meta.url).href; // получаем зарезолвенный для билда урл картинки
    this.article.render(articleData, imgSrc, prevArticle, nextArticle);
    this.deleteSEO();
    this.addSEO(articleData.seo);
    document.title = articleData.seo.title;
  }

  async handleWrongRoute() {
    if (this.currentPage) {
      this.currentPage.pageWillUnmount();
    }
    this.currentPage = this.notFoundPage;
    this.notFoundPage.render();
    this.header.toggleHome(false);
    this.deleteSEO();
    document.title = 'Page is not found';
  }

  addSEO(metaData: IAboutSEO | IDetailedArticleSEO) {
    const head = document.head;
    Object.keys(metaData).forEach((tag) => {
      const metaTag = document.createElement('meta');
      metaTag.name = tag;
      metaTag.content = metaData[tag] as string;
      head.append(metaTag); // создаем мета-тег, добавляем атрибуты name и content и добавляем в head
    });
  }

  deleteSEO() {
    const head = document.head;
    this.metaTags.forEach((tag) => {
      const metaTag = head.querySelector(`[name=${tag}]`);
      if (metaTag) {
        // получаем мета-тег из head и если он есть, то удаляем его
        metaTag.remove();
      }
    });
  }
}
