<script setup lang="ts">
import SearchSection from './SearchSection.vue';
import LatestSection from './LatestSection.vue';
import BannerComponent from '@/components/BannerComponent.vue';
import PageFooter from '@/layout/PageFooter.vue';
import API from '@/services/api';
import { onMounted, ref } from 'vue';
import type { IBannerData } from '@/interfaces/IBannerData';
import FeaturedSection from './FeaturedSection.vue';
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData';
import type { IHotelData } from '@/interfaces/IHotelData';

const banners = ref<IBannerData>();
const latestList = ref<ILatestHotelData[]>([]);
const featuredList = ref<IHotelData[]>([]);

onMounted(() => {
  getBanners();
  getLatestList();
  getFeaturedList();
})

const getBanners = async () => {
  try {
    banners.value = await API.getBanners();
  } catch (e) {
    // render Error Component
  }
}

const getLatestList = async () => {
  try {
    latestList.value = await API.getLatestData();
  } catch (e) {
    // render Error Component
  }
}

const getFeaturedList = async () => {
  try {
    featuredList.value = await API.getFeaturedData();
  } catch (e) {
    // render Error Component
  }
}
</script>

<template>
  <main v-if="banners">
    <SearchSection :imageUrl="banners.main.image" />
    <LatestSection :latest-list="latestList" />
    <BannerComponent :bannerData="banners.second" />
    <FeaturedSection :featured-list="featuredList" />
    <BannerComponent :bannerData="banners.last" />
  </main>
  <PageFooter />
</template>

<style scoped>
  main {
    padding-bottom: 57px;
  }
</style>
