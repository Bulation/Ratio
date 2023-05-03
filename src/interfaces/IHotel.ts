import type { IAmenity } from "./IAmenity";
import type { IAuthor } from "./IAuthor";
import type { IFeaturedData } from "./IFeaturedData";

export interface IHotel extends IFeaturedData {
  type: string[];
  period: string[];
  coords: string[];
  description: string;
  amenities: IAmenity[];
  reviews: IAuthor[];
  __v: number;
}