import { BASE_URL } from "@/constants"
import type { IBannerData } from "@/interfaces/IBannerData";
import type { ICountry } from "@/interfaces/ICountry";
import type { IHotelData } from '@/interfaces/IHotelData'
import type { IFilter } from "@/interfaces/IFilter";
import type { IOrderForm } from "@/interfaces/IOrderForm";
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData'

const API = {
  async fetchData(path: string) {
    const response = await fetch(`${BASE_URL}${path}`)
    if (response.status >= 400 && response.status <= 600) {
      throw new Error('Error')
    }
    const data = await response.json()
    return data
  },

  async postData(path: string, body: IFilter | IOrderForm) {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
  },

  async getBanners(): Promise<IBannerData> {
    const data = await this.fetchData('/banners')
    return data
  },

  async getFeaturedData(): Promise<IHotelData[]> {
    const data = await this.fetchData('/hotel/featured')
    return data
  },

  async getLatestData(): Promise<ILatestHotelData[]> {
    const data = await this.fetchData('/hotel/latest')
    return data
  },

  async getHotelData(id: string): Promise<IDetailedHotelData> {
    const data = await this.fetchData(`/hotel/detail/${id}`)
    return data
  },

  async getCountries(): Promise<ICountry[]> {
    const data = await this.fetchData('/hotel/location')
    return data
  },

  async postFilter(body: IFilter) {
    return this.postData('/hotel/filter', body)
  },

  async postOrder(body: IOrderForm) {
    return this.postData('/order', body)
  }
}

export default API
