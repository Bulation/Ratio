import Header from './components/Header/header';
import About from './pages/About/About';
import API from './api/api';
import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home/Home';
import Blog from './pages/Blog';
import Article from './pages/Article/Article';
import { IDetailedArticle } from './interfaces/IDetailedArticle';
import Page from './pages/Page';

export default class Controller {
  about: About;
  header: Header;
  currentPage: Page;
  notFoundPage: NotFoundPage;
  home: Home;
  blog: Blog;
  article: Article;
  constructor() {
    this.header = new Header(document.body);
    this.home = new Home(document.body);
    this.about = new About(document.body);
    this.blog = new Blog(document.body);
    this.notFoundPage = new NotFoundPage(document.body);
    this.article = new Article(document.body);
  }

  async handleHomeRoute() {
    if (this.currentPage) {
      this.currentPage.removePage();
    }
    this.currentPage = this.home;
    this.header.navigation.addActiveClass(0);
    this.header.toggleHome(true);
    const articles = await API.getArticles();
    const featuredArticle = await API.getFeaturedData();
    this.home.render(featuredArticle, articles);
  }

  async handleBlogRoute() {
    if (this.currentPage) {
      this.currentPage.removePage();
    }
    this.currentPage = this.blog;
    this.header.navigation.addActiveClass(1);
    this.header.toggleHome(false);
    const articles = await API.getArticles();
    const featuredArticle = await API.getFeaturedData();
    this.blog.render(featuredArticle, articles);
  }

  async handleAboutRoute() {
    if (this.currentPage) {
      this.currentPage.removePage();
    }
    this.currentPage = this.about;
    this.header.navigation.addActiveClass(2);
    this.header.toggleHome(false);
    const aboutData = await API.getAboutData();
    this.about.render(aboutData);
  }

  async handleArticleRoute(params: { [key: string]: string }) {
    let prevArticle: IDetailedArticle;
    let nextArticle: IDetailedArticle;
    if (this.currentPage) {
      this.currentPage.removePage();
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
    const img = new URL(`../public/article${params.id}.jpg`, import.meta.url).href;
    this.article.render(articleData, img, prevArticle, nextArticle);
  }

  async handleWrongRoute() {
    if (this.currentPage) {
      this.currentPage.removePage();
    }
    this.currentPage = this.notFoundPage;
    this.notFoundPage.render();
    this.header.toggleHome(false);
  }
}
