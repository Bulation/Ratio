<script setup lang="ts">
import type { IHotelData } from '@/interfaces/IHotelData'
import HotelCardList from '@/components/HotelCardList.vue'
import { ElSkeletonItem } from 'element-plus'
import LoaderComponent from '@/components/LoaderComponent.vue'

interface IFeaturedProps {
  featuredList: IHotelData[]
}
defineProps<IFeaturedProps>()
</script>

<template>
  <section class="featured">
    <div class="featured__container">
      <h2 class="section-title featured__title">Featured Properties on our Listing</h2>
      <LoaderComponent :data="featuredList" :count="6">
        <template #template>
          <ElSkeletonItem class="card-skeleton" variant="rect" />
        </template>
        <template #default>
          <HotelCardList :list="featuredList" location="featured" />
        </template>
      </LoaderComponent>
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
  margin-bottom: 78px;
}

.card-skeleton {
  width: 382px;
  height: 340px;
  margin-right: 20px;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
}
</style>
