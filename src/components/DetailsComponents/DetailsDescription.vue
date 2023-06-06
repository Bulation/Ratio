<script setup lang="ts">
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent.vue'
import { ElSkeletonItem } from 'element-plus'

interface IDetailsDescriptionProps {
  hotel: IDetailedHotelData
}

defineProps<IDetailsDescriptionProps>()
</script>

<template>
  <LoaderComponent :data="hotel">
    <template #template>
      <h3>Apartment Description</h3>
      <ElSkeletonItem v-for="i in 2" :key="i" class="details-text-skeleton" variant="text" />
    </template>
    <template #default>
      <div class="details-description">
        <h3 class="details-description__title">Apartment Description</h3>
        <p class="details-description__text">{{ hotel.description[0] }}</p>
      </div>
    </template>
  </LoaderComponent>
</template>

<style scoped lang="scss">
.details-text-skeleton {
  width: 745px;
  height: 60px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.details-description {
  &__title {
    font: 700 22px/27px Montserrat;
    color: var(--main-text-color);
  }
  &__text {
    font: 400 15px/20px Montserrat;
    color: var(--second-text-color);
    margin-top: 15px;
  }
}
</style>
