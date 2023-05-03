<script setup lang="ts">
import type { IBanner } from '@/interfaces/IBanner';

interface IBannerProps {
  bannerData: IBanner
}
defineProps<IBannerProps>();
</script>

<template>
  <section class="banner">
    <div class="banner__container" :style="{ backgroundImage: `url(${bannerData.image})`}">
      <h3 class="banner__title">{{ bannerData.title }}</h3>
      <p class="banner__description">{{ bannerData.description }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .banner {
    &__container {
      background-size: cover;
      background-repeat: no-repeat;
    }
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
      max-width: 1206px;
      width: calc(100% - 30px);
      margin: 0 auto;
      min-height: 395px;
      border-radius: 12px;
      padding-top: 70px;
      padding-left: 55px;
    }
  }
</style>