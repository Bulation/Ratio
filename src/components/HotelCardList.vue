<script setup lang="ts">
import type { IHotelData } from '@/interfaces/IHotelData'
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData'
import HotelCardItem from './HotelCardItem.vue'
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'

interface IHotelCardListProps {
  list: ILatestHotelData[] | IHotelData[] | IDetailedHotelData[]
  location: 'featured' | 'latest' | 'details'
}
defineProps<IHotelCardListProps>()
</script>

<template>
  <ul class="card-list">
    <TransitionGroup  name="list">
      <HotelCardItem v-for="item in list" :key="item._id" :item="item" :location="location"  />
    </TransitionGroup>
  </ul>
</template>

<style lang="scss">
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 30px;
  row-gap: 70px;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
