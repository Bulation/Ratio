import type { IFlatInfo } from './IFlatInfo'
import type { ILatestHotelData } from './ILatestHotelData'

export interface IHotelData extends ILatestHotelData {
  price: string[]
  images: string[]
  info: IFlatInfo[]
}
