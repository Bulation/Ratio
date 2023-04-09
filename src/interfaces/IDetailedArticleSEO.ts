export interface IDetailedArticleSEO {
  [key: string]: string | number;
  id: number;
  title: string; // Заголовок для СЕО
  description: string; // Описание для СЕО
  keywords: string; // Ключевые слова для СЕО
  content: string;
}
