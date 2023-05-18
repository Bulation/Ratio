<script setup lang="ts">
import type { IBannerData } from '@/interfaces/IBannerData'
import { ElSkeletonItem } from 'element-plus'
import LoaderComponent from './LoaderComponent.vue'

interface IBannerProps {
  bannerData: IBannerData
  bannerKey: keyof IBannerData
}
defineProps<IBannerProps>()
</script>

<template>
  <section class="banner">
    <LoaderComponent :data="bannerData">
      <template #template>
        <ElSkeletonItem class="banner__container" variant="rect" />
      </template>
      <template #default>
        <div
          class="banner__container"
          :style="{ backgroundImage: `url(${bannerData[bannerKey].image})` }"
        >
          <h3 class="banner__title">{{ bannerData[bannerKey].title }}</h3>
          <p class="banner__description">{{ bannerData[bannerKey].description }}</p>
        </div>
      </template>
    </LoaderComponent>
  </section>
</template>

<style scoped lang="scss">
.banner {
  &__title {
    max-width: 328px;
    font: 700 38px/52px Montserrat;
    color: var(--title-color);
    margin-bottom: 7px;
  }
  &__description {
    font: 500 16px/52px Montserrat;
    color: var(--banner-color);
  }
  &__container {
    display: block;
    max-width: 1206px;
    width: calc(100% - 30px);
    margin: 0 auto;
    min-height: 395px;
    border-radius: 12px;
    padding-top: 70px;
    padding-left: 55px;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
