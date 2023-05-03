<script setup lang="ts">
import type { IFeaturedData } from '@/interfaces/IFeaturedData';
import CardList from '@/components/CardList.vue';

interface IFeaturedProps {
  featuredList: IFeaturedData[]
}
defineProps<IFeaturedProps>();
</script>

<template>
  <section class="featured">
    <div class="featured__container">
      <h2 class="section-title featured__title">Featured Properties on our Listing</h2>
      <CardList :list="featuredList" />
    </div>
  </section>
</template>

<style scoped lang="scss">
  .featured__container {
    max-width: 1206px;
    width: calc(100% - 30px);
    margin: 0 auto;
    padding: 20px 0 64px;
  }

  .featured__title {
    max-width: 412px;
    margin-bottom: 83px;
  }
</style>