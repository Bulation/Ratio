<script setup lang="ts">
import SearchSection from '@/components/SearchSection/SearchSection.vue'
import LatestSection from '@/components/HomeLatestSection/LatestSection.vue'
import FeaturedSection from '@/components/HomeFeaturedSection/FeaturedSection.vue'
import BannerComponent from '@/components/BannerComponent/BannerComponent.vue'
import PageFooter from '@/layout/PageFooter/PageFooter.vue'
import API from '@/services/api'
import { onActivated, onMounted, ref } from 'vue'
import type { IBannerData } from '@/interfaces/IBannerData'
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData'
import type { IHotelData } from '@/interfaces/IHotelData'
import { useHead } from '@vueuse/head'

const banners = ref<IBannerData>(null)
const latestList = ref<ILatestHotelData[]>([])
const featuredList = ref<IHotelData[]>([])

onActivated(() => {
  useHead({
    title: 'Home',
    meta: [
      { name: 'description', content: 'Order and research our list of hotels' },
      { name: 'keywords', content: 'hotel, hotel list, order, preserve hotel' },
      { property: 'og:title', content: 'Home' },
      { property: 'og:description', content: 'Order and research our list of hotels' }
    ]
  })
})
onMounted(async () => {
  await getData()
})

const getData = async () => {
  banners.value = await API.getBanners()
  latestList.value = await API.getLatestData()
  featuredList.value = await API.getFeaturedData()
}
</script>

<template>
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
