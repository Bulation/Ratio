import { BASE_URL } from '../constants/constants';
import { IAbout } from '../interfaces/IAbout';
import { IArticle } from '../interfaces/IArticle';
import { IDetailedArticle } from '../interfaces/IDetailedArticle';

const API = {
  async fetchData(path: string) {
    const response = await fetch(`${BASE_URL}${path}`);
    const data = await response.json();
    return data;
  },

  async getAboutData(): Promise<IAbout> {
    const data = await this.fetchData('/about/');
    return data;
  },

  async getArticles(): Promise<IArticle[]> {
    const data = await this.fetchData('/blog/articles/');
    return data;
  },

  async getArticle(id: string): Promise<IDetailedArticle> {
    const data = await this.fetchData(`/blog/article/${id}`);
    return data;
  },

  async getFeaturedData(): Promise<IArticle> {
    const data = await this.fetchData('/blog/featured/');
    return data;
  },
};

export default API;
