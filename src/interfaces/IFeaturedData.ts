import type { IFlatInfo } from "./IFlatInfo";
import type { ILatestData } from "./ILatestData";

export interface IFeaturedData extends ILatestData {
  price: string[];
  images: string[];
  info: IFlatInfo[];
}