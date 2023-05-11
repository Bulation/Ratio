<script setup lang="ts">
import type { IHotelData } from '@/interfaces/IHotelData';
import LoaderComponent from '@/components/LoaderComponent.vue';
import HotelCardList from '@/components/HotelCardList.vue';
import { ElSkeletonItem } from 'element-plus';
import { onActivated, ref } from 'vue';
const emit = defineEmits(['showMore'])

interface ISearchHotelsProps {
  copyList: IHotelData[],
  list: IHotelData[],
}

const isExpand = ref(false);

onActivated(() => isExpand.value = false); // при возвращении на страницу возвращаем кнопку

const handleButtonClick = () => {
  emit('showMore')
  isExpand.value = true;
}

defineProps<ISearchHotelsProps>()
</script>
<template>
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
              <HotelCardList :list="copyList" location="details" />
            </TransitionGroup>
          </div>
          <button class="hotels-list__button" v-if="!isExpand && list.length > 3" @click="handleButtonClick" type="button">Other as per found results...</button>
        </template>
      </LoaderComponent>
    </div>
</template>

<style scoped lang="scss">
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
    transition: color 0.3s ease-in;
    font: 700 16px/20px Montserrat;
    &:hover {
      color: var(--second-text-color);
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 20px;
  }
}
</style>