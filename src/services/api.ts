import { BASE_URL } from "@/constants"
import type { IBannerData } from "@/interfaces/IBannerData";
import type { ICountry } from "@/interfaces/ICountry";
import type { IFeaturedData } from "@/interfaces/IFeaturedData";
import type { IFilter } from "@/interfaces/IFilter";
import type { IForm } from "@/interfaces/IForm";
import type { IHotel } from "@/interfaces/IHotel";
import type { ILatestData } from "@/interfaces/ILatestData";

const API = {
  async fetchData(path: string) {
    const response = await fetch(`${BASE_URL}${path}`);
    if (response.status >= 400 && response.status <= 600) {
      throw new Error('Error');
    }
    const data = await response.json();
    return data;
  },

  async postData(path: string, body: IFilter | IForm) {
    await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  },

  async getBanners(): Promise<IBannerData> {
    const data = await this.fetchData('/banners');
    return data;
  },

  async getFeaturedData(): Promise<IFeaturedData[]> {
    const data = await this.fetchData('/hotel/featured')
    return data;
  },

  async getLatestData(): Promise<ILatestData[]> {
    const data = await this.fetchData('/hotel/latest')
    return data;
  },

  async getHotelData(id: string): Promise<IHotel> {
    const data = await this.fetchData(`/hotel/detail/${id}`)
    return data;
  },

  async getCountries(): Promise<ICountry[]> {
    const data = await this.fetchData('/hotel/location')
    return data;
  },

  async postFilter(body: IFilter) {
    await this.postData('/hotel/filter', body);
  },

  async postOrder(body: IForm) {
    await this.postData('/order', body);
  }
}

export default API
