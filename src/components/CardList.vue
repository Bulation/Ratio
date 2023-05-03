<script setup lang="ts">
import type { IHotelData } from '@/interfaces/IHotelData';
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData';
import CardItem from './CardItem.vue';

interface ICardListProps {
  list: ILatestHotelData[] | IHotelData[]
}
defineProps<ICardListProps>()

</script>

<template>
  <ul class="card-list">
    <CardItem :list="list" location="latest" />
  </ul>
</template>

<style scoped lang="scss">
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
</style>