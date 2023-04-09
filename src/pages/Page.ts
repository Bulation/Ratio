import { IAbout } from '../interfaces/IAbout';
import { IArticle } from '../interfaces/IArticle';
import { IDetailedArticle } from '../interfaces/IDetailedArticle';

export default abstract class Page {
  abstract render(
    ...params: Array<IAbout | string | IDetailedArticle | IArticle | IArticle[]>
  ): void;
  abstract removePage(): void;
}
