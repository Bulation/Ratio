<script setup lang="ts">
import SearchComponent from './SearchComponent.vue'
import type { IBannerData } from '@/interfaces/IBannerData'
import { ElSkeletonItem } from 'element-plus'
import LoaderComponent from '@/components/LoaderComponent.vue'
interface ISearchProps {
  bannerData: IBannerData
}
defineProps<ISearchProps>()
</script>

<template>
  <section class="search">
    <LoaderComponent :data="bannerData">
      <template #template>
        <ElSkeletonItem class="search__container" variant="rect" />
      </template>
      <template #default>
        <div
          class="search__container"
          :style="{ backgroundImage: `url(${bannerData.main.image})` }"
        ></div>
      </template>
    </LoaderComponent>
    <div class="search__wrap">
      <h2 class="search__title">Find</h2>
      <SearchComponent />
    </div>
  </section>
</template>

<style scoped lang="scss">
.search {
  position: relative;
  &__container {
    max-width: 1366px;
    width: 100%;
    min-height: 566px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-size: cover;
    margin: 0 auto;
  }
  &__title {
    text-transform: uppercase;
    color: var(--title-color);
    font: 700 40px/49px Montserrat;
    margin-bottom: 24px;
    padding-left: 30px;
  }
  &__wrap {
    max-width: 794px;
    margin: 0 auto;
    width: calc(100% - 30px);
    position: absolute;
    bottom: 76px;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
