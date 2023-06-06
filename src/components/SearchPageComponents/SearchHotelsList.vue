<script setup lang="ts">
import type { IHotelData } from '@/interfaces/IHotelData'
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent.vue'
import HotelCardList from '@/components/HotelCard/HotelCardList.vue'
import { ElSkeletonItem } from 'element-plus'
import { onActivated, ref, watch } from 'vue'

interface ISearchHotelsProps {
  list: IHotelData[]
}

const isExpand = ref(false)
const props = defineProps<ISearchHotelsProps>()
const copyList = ref(props.list.slice(0, 3))

onActivated(() => (isExpand.value = false)) // при возвращении на страницу отображаем кнопку показа всех результатов

const showMore = () => {
  copyList.value = props.list
  isExpand.value = true
}

watch(
  () => props.list,
  () => (copyList.value = props.list.slice(0, 3))
) // наблюдаем за изменением пропса, чтобы обновить copyList
</script>
<template>
  <div class="hotels-list">
    <LoaderComponent :style="'margin-top: 110px;'" :data="list" :count="3">
      <template #template>
        <ElSkeletonItem class="hotel-skeleton" variant="rect" />
        <ElSkeletonItem class="text-skeleton" variant="text" />
        <ElSkeletonItem class="text-skeleton" :style="'margin-bottom: 93px;'" variant="text" />
      </template>
      <template #default>
        <h3 class="hotels-list__title">{{ list.length }} Results Found</h3>
        <div class="hotels-list__wrapper">
          <HotelCardList :style="'row-gap: 80px'" :list="copyList" location="details" />
        </div>
        <button
          class="hotels-list__button"
          v-if="!isExpand && list.length > 3"
          @click="showMore"
          type="button"
        >
          Other as per found results...
        </button>
      </template>
    </LoaderComponent>
  </div>
</template>

<style scoped lang="scss">
.hotels-list {
  padding: 90px 40px 70px 75px;
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

.hotel-skeleton {
  display: block;
  width: 574px;
  height: 384px;
  margin-bottom: 30px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
}

.text-skeleton {
  display: block;
  width: 453px;
  height: 24px;
  margin-bottom: 57px;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
}
</style>
