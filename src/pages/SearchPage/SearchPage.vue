<script setup lang="ts">
import ErrorComponent from '@/components/ErrorComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import MapComponent from '@/components/MapComponent.vue';
import SearchHotelsList from '@/components/SearchHotelsList.vue';
import SearchAboutHotel from '@/components/SearchAboutHotel.vue';
import { ElSkeletonItem } from 'element-plus';
import API from '@/services/api';
import { useSearchedState } from '@/store';
import { onActivated, ref, watch } from 'vue';
import type { IHotelData } from '@/interfaces/IHotelData';
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData';
import { useHead } from 'unhead'
const store = useSearchedState();
const list = ref<IHotelData[]>(null)
const copyList = ref<IHotelData[]>(null);
const firstHotel = ref<IDetailedHotelData>(null);
const isError = ref(false);

const getList = async () => {
  list.value = null;
  try {
    list.value = await API.postFilter(store.getSearchedState);
    firstHotel.value = await API.getHotelData(list.value[0]._id);
    copyList.value = list.value.slice(0, 3);
  } catch (e) {
    isError.value = true;
  }
}

watch(list, () => {
  useHead({
    title: `${list.value?.length} hotels found`,
    meta: [
      { name: 'description', content: "list of found hotels" },
      { name: 'keywords', content: "hotel, search, hotel search results, hotel in map" },
      { property: 'og:title', content: `${list.value?.length} hotels found` },
      { property: 'og:description', content: "list of found hotels"},
    ]
  })
})

onActivated(() => { 
  getList();
});

const showMore = () => {
  copyList.value = list.value;
}

</script>

<template>
  <template v-if="isError">
    <ErrorComponent />
  </template>
  <section class="search">
    <SearchHotelsList :list="list" :copyList="copyList" @showMore="showMore" />
    <LoaderComponent :style="'width: auto;'" :data="firstHotel">
      <template #template>
        <ElSkeletonItem :style="'display: block; width: 668px; height: 736px;'" variant="rect" />
      </template>
      <template #default>
        <div class="map">
          <MapComponent :center="firstHotel.coords" />
          <SearchAboutHotel :name="firstHotel.name" :address="firstHotel.address" :amenities="firstHotel.amenities" />
        </div>
      </template>
    </LoaderComponent>
  </section>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1366px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    display: block;
  }
}
.map {
  position: relative;
  width: 100%;
  max-width: 668px;
  height: 736px;
}

</style>