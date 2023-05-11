<script setup lang="ts">
import ErrorComponent from '@/components/ErrorComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import MapComponent from '@/components/MapComponent.vue';
import HotelInfo from '@/components/HotelInfo.vue';
import { ElSkeletonItem } from 'element-plus';
import CardList from '@/components/CardList.vue';
import API from '@/services/api';
import { useSearchedState } from '@/store';
import { onActivated, onMounted, ref } from 'vue';
import type { IHotelData } from '@/interfaces/IHotelData';
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData';
import { useHead } from 'unhead'
const store = useSearchedState();
const list = ref<IHotelData[]>(null)
const copyList = ref<IHotelData[]>(null);
const firstHotel = ref<IDetailedHotelData>(null);
const isError = ref(false);
const isExpand = ref(false);

const getList = async () => {
  list.value = null;
  isExpand.value = false;
  try {
    list.value = await API.postFilter(store.getSearchedState);
    firstHotel.value = await API.getHotelData(list.value[0]._id);
    copyList.value = list.value.slice(0, 3);
  } catch (e) {
    isError.value = true;
  }
}

onMounted(async () => { 
  await getList();
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

onActivated(() => getList());

const showMore = () => {
  copyList.value = list.value;
  isExpand.value = true;
}


</script>

<template>
  <template v-if="isError">
    <ErrorComponent />
  </template>
  <section class="search">
    <div class="hotels-list">
      <LoaderComponent :style="'margin-top: 110px;'" :data="list" :count="3">
        <template #template>
          <ElSkeletonItem :style="'display: block; max-width: 574px; height: 384px; margin-bottom: 30px;'" variant="rect" />
          <ElSkeletonItem :style="'display: block; max-width: 453px; height: 24px; margin-bottom: 57px;'" variant="text" />
          <ElSkeletonItem :style="'display: block; max-width: 453px; height: 24px; margin-bottom: 93px;'" variant="text" />
        </template>
        <template #default>
          <h3 class="hotels-list__title">{{ list.length }} Results Found</h3>
          <div class="hotels-list__wrapper">
            <TransitionGroup name="hotels-list">
              <CardList :list="copyList" location="details" />
            </TransitionGroup>
          </div>
          <button class="hotels-list__button" v-if="!isExpand && list.length" @click="showMore" type="button">Other as per found results...</button>
        </template>
      </LoaderComponent>
    </div>
    <LoaderComponent :data="firstHotel">
      <template #template>
        <ElSkeletonItem :style="'display: block; max-width: 668px; height: 736px;'" variant="rect" />
      </template>
      <template #default>
        <div class="map">
          <MapComponent :center="firstHotel.coords" />
          <div class="hotel-info-wrapper">
            <div class="about-hotel">
              <HotelInfo :name="firstHotel.name" :address="firstHotel.address" />
              <ul class="amenities-list">
                <li class="amenities-list__item amenity" v-for="(amenity, ind) in firstHotel.amenities.slice(0, 4)" :key="amenity.icon">
                  <div :style="`background-image: url(${amenity.icon})`" class="amenity__icon"></div>
                  <span>{{ ind }}</span> <!-- в бэке нет инфы о количестве amenity, поэтому стоит заглушка -->
                </li>
              </ul>
            </div>
          </div>
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
.hotels-list {
  padding: 95px 40px 70px 80px;
  &__title {
    margin-bottom: 115px;
    color: var(--main-text-color);
    font: 700 24px/29px Montserrat;
  }
  &__wrapper {
    max-width: 574px;
    padding-bottom: 211px;
  }
  &__button {
    cursor: pointer;
    background: none;
    color: var(--main-text-color);
    font: 700 16px/20px Montserrat;
  }
  @media screen and (max-width: 1024px) {
    padding: 20px;
  }
}

.map {
  position: relative;
  width: 100%;
  max-width: 668px;
  height: 736px;
}
.hotel-info-wrapper {
  width: 485px;
  position: absolute;
  z-index: 1000;
  bottom: 117px;
  left: 50%;
  right: 50%;
  transform: translate(-50%);
  background-color: var(--hotel-info-bg);
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 490px) {
    width: 100%;
  }
}

.about-hotel {
  max-width: 325px;
  padding: 26px 36px 43px 18px;
  background-color: #ffffff;
}

.amenities-list {
  display: flex;
  padding-top: 20px;
  gap: 15px;
  font: 600 16px/20px Montserrat;
  color: var(--main-text-color);
}

.amenity {
  display: flex;
  align-items: center;
  gap: 9px;
  &__icon {
    width: 23px;
    height: 23px;
    background-position: center;
  }
}


</style>