<script setup lang="ts">
import type { ILatestData } from '@/interfaces/ILatestData';
import CardList from '@/components/CardList.vue';

interface ILatestProps {
  latestList: ILatestData[]
}
defineProps<ILatestProps>()

</script>

<template>
  <section class="latest">
    <div class="latest__container">
      <h2 class="section-title latest__title">Latest on the Property Listing</h2>
      <CardList :list="latestList" />
    </div>
  </section>
</template>

<style scoped lang="scss">
  .latest__container {
    max-width: 1206px;
    width: calc(100% - 30px);
    margin: 0 auto;
    padding: 80px 0 50px;
  }

  .latest__title {
    max-width: 340px;
    margin-bottom: 100px;
  }
</style>