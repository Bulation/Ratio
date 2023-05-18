<script setup lang="ts">
import SearchMap from './SearchMap.vue';
import SearchHotelsList from './SearchHotelsList.vue';
import API from '@/services/api';
import { useSearchedState } from '@/store/modules/searchModule';
import type { IHotelData } from '@/interfaces/IHotelData';
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData';
import { useHead } from 'unhead'
import { onActivated, ref, watch } from 'vue';

const store = useSearchedState();
const list = ref<IHotelData[]>([])
const firstHotel = ref<IDetailedHotelData>(null);

const getList = async () => {
    list.value = await API.postFilter(store.getSearchedState);
    firstHotel.value = await API.getHotelData(list.value[0]._id); // получаем данные для отображения их поверх карты
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
}) // изначально в list находится пустой массив, поэтому следим за изменениями, чтобы отобразить их в мета-тегах

onActivated(async () => {
  await getList();
});

</script>

<template>
  <section class="search">
    <SearchHotelsList :list="list" />
    <SearchMap :firstHotel="firstHotel" />
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
</style>