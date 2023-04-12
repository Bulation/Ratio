import { IAboutSEO } from './IAboutSEO';

export interface IAbout {
  // интерфейс для данных, приходящих для страницы About
  title: string;
  seo: IAboutSEO;
  content: string;
}
