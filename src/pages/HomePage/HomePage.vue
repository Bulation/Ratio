<script setup lang="ts">
import SearchSection from './SearchSection.vue'
import LatestSection from './LatestSection.vue'
import BannerComponent from '@/components/BannerComponent.vue'
import PageFooter from '@/layout/PageFooter.vue'
import API from '@/services/api'
import { onMounted, ref } from 'vue'
import type { IBannerData } from '@/interfaces/IBannerData'
import FeaturedSection from './FeaturedSection.vue'
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData'
import type { IHotelData } from '@/interfaces/IHotelData'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { useHead } from 'unhead'
useHead({
  title: "Home",
  meta: [
    { name: 'description', content: "Order and research our list of hotels" },
    { name: 'keywords', content: "hotel, hotel list, order, preserve hotel" },
    { property: 'og:title', content: "Hotel"},
    { property: 'og:description', content: "Order and research our list of hotels"},
  ]
})

const banners = ref<IBannerData>(null)
const latestList = ref<ILatestHotelData[]>(null)
const featuredList = ref<IHotelData[]>(null)

const isError = ref(false);

onMounted(() => {
  getBanners()
  getLatestList()
  getFeaturedList()
})

const getBanners = async () => {
  try {
    banners.value = await API.getBanners()
  } catch (e) {
    isError.value = true;
  }
}

const getLatestList = async () => {
  try {
    latestList.value = await API.getLatestData()
  } catch (e) {
    isError.value = true;
  }
}

const getFeaturedList = async () => {
  try {
    featuredList.value = await API.getFeaturedData()
  } catch (e) {
    isError.value = true;
  }
}
</script>

<template>
  <template v-if="isError">
    <ErrorComponent />
  </template>
  <main>
    <SearchSection :bannerData="banners" />
    <LatestSection :latest-list="latestList" />
    <BannerComponent :bannerData="banners" bannerKey="second" />
    <FeaturedSection :featured-list="featuredList" />
    <BannerComponent :bannerData="banners" bannerKey="last" />
  </main>
  <PageFooter />
</template>

<style scoped>
main {
  padding-bottom: 57px;
}
</style>
