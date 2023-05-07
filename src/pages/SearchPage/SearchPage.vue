<script setup lang="ts">
import ErrorComponent from '@/components/ErrorComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { ElSkeletonItem } from 'element-plus';
import CardList from '@/components/CardList.vue';
import API from '@/services/api';
import { useSearchedState } from '@/store';
import { onActivated, onMounted, ref } from 'vue';
import type { IHotelData } from '@/interfaces/IHotelData';
const store = useSearchedState();
const list = ref<IHotelData[]>(null)
const copyList = ref<IHotelData[]>(null);
const isError = ref(false);
const isExpand = ref(false);

const getList = async () => {
  list.value = null;
  isExpand.value = false;
  try {
    list.value = await API.postFilter(store.getSearchedState);
    copyList.value = list.value.slice(0, 3);
  } catch (e) {
    isError.value = true;
  }
}

onMounted(() => getList())
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
          <ElSkeletonItem :style="'display: block; width: 574px; height: 384px; margin-bottom: 30px;'" variant="rect" />
          <ElSkeletonItem :style="'display: block; width: 453px; height: 24px; margin-bottom: 57px;'" variant="text" />
          <ElSkeletonItem :style="'display: block; width: 453px; height: 24px; margin-bottom: 93px;'" variant="text" />
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
    <div class="map"></div>
  </section>
</template>

<style scoped lang="scss">
.search {
  max-width: 1366px;
  width: 100%;
  margin: 0 auto;
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
}


</style>