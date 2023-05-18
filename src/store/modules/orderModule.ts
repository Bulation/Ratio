import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePreservedHotel = defineStore(
  'preserved-hotel',
  () => {
    const preservedHotel = ref<IDetailedHotelData>(null)
    const getPreservedHotel = computed(() => preservedHotel.value)
    const setPreservedHotel = (hotel: IDetailedHotelData) => {
      preservedHotel.value = hotel
    }
    return { preservedHotel, getPreservedHotel, setPreservedHotel }
  },
  {
    persist: true
  }
)
