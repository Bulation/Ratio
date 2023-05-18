<script setup lang="ts">
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
import LoaderComponent from '@/components/LoaderComponent.vue'
import SvgIcon from '@/components/UI/SvgIcon.vue'
import { ElSkeletonItem } from 'element-plus'

interface IDetailsFlatsProps {
  hotel: IDetailedHotelData
}
defineProps<IDetailsFlatsProps>()
</script>

<template>
  <LoaderComponent :data="hotel">
    <template #template>
      <ElSkeletonItem class="flat-info-skeleton" variant="rect" />
      <ElSkeletonItem class="flat-info-skeleton" variant="rect" />
    </template>
    <template #default>
      <ul class="details-flats-info-list">
        <li class="details-flats-info-item" v-for="(value, key) in hotel.info[0]" :key="key">
          <SvgIcon :id="String(key)" className="details-flats-info-item__svg" />
          <p class="details-flats-info-item__text">{{ value }} {{ key }}</p>
        </li>
      </ul>
    </template>
  </LoaderComponent>
</template>

<style scoped lang="scss">
.flat-info-skeleton {
  display: inline-block;
  width: 176px;
  height: 160px;
  margin-right: 14px;
}

.details-flats-info-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.details-flats-info-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 176px;
  min-height: 160px;
  padding: 39px;
  border-radius: 8px;
  background-color: var(--flats-bg);
  &__text {
    margin-top: 19px;
    color: var(--main-text-color);
    font: 600 16px/20px Montserrat;
  }
  &__svg {
    width: 43px;
    height: 36px;
  }
}
</style>
