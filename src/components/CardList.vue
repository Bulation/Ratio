<script setup lang="ts">
import type { IFeaturedData } from '@/interfaces/IFeaturedData';
import type { ILatestData } from '@/interfaces/ILatestData';
import CardItem from './CardItem.vue';

interface ICardListProps {
  list: ILatestData[] | IFeaturedData[]
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