import type { IAmenity } from "./IAmenity";
import type { IAuthor } from "./IAuthor";
import type { IHotelData } from "./IHotelData";

export interface IDetailedHotelData extends IHotelData {
  type: string[];
  period: string[];
  coords: string[];
  description: string;
  amenities: IAmenity[];
  reviews: IAuthor[];
  __v: number;
}