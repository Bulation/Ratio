<script setup lang="ts">
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData'
import CardList from '@/components/CardList.vue'
import { ElSkeletonItem } from 'element-plus'
import LoaderComponent from '@/components/LoaderComponent.vue'

interface ILatestProps {
  latestList: ILatestHotelData[]
}
defineProps<ILatestProps>()
</script>

<template>
  <section class="latest">
    <div class="latest__container">
      <h2 class="section-title latest__title">Latest on the Property Listing</h2>
      <LoaderComponent :data="latestList" :count="4">
        <template #template>
          <ElSkeletonItem :style="'width: 279px; height: 340px; margin-right: 20px;'" variant="rect" />
        </template>
        <template #default>
          <CardList :list="latestList" location="latest" />
        </template>
      </LoaderComponent>
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
